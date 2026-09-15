import "server-only";
import { NextResponse, after } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import {
  collectPositions,
  ensureStream,
  persistPosition,
  type VesselPosition,
} from "@/lib/ais/stream";

export const dynamic = "force-dynamic";
// Upper bound for the post-response AIS collection window below.
export const maxDuration = 60;

/** How long each serverless collection listens for AIS fixes. aisstream
 * relays roughly one fix per minute per vessel, so keep the window generous. */
const COLLECT_MS = 50_000;
/** Minimum gap between collections per instance — aisstream caps concurrent
 * sockets per API key, and the browser polls far more often than this. */
const COLLECT_EVERY_MS = 75_000;

// Survives across requests on a warm instance (Vercel fluid compute).
const guard = ((globalThis as Record<string, unknown>).__aisCollect ??= { last: 0 }) as {
  last: number;
};

/** Last-known AIS positions of fleet boats.
 *
 * Reads the `lastPosition` each Boat record. Positions are written by:
 * - dev / persistent Node host: the in-process stream (`ensureStream`);
 * - Vercel: a bounded collection run *after* the response is sent (`after()`),
 *   at most once a minute per instance — a serverless-safe stand-in for the
 *   always-on `ais-worker`. The socket is closed when the window ends, so it
 *   never pins the function or hoards DB connections.
 * The browser polls this; the AISstream key never leaves the server.
 */
export async function GET() {
  try {
    const payload = await getPayloadClient();
    const { docs: boats } = await payload.find({
      collection: "boats",
      where: { mmsi: { exists: true } },
      limit: 200,
      depth: 0,
    });

    const mmsis = boats
      .map((b: any) => b.mmsi?.trim())
      .filter((m: string | undefined): m is string => Boolean(m));

    if (process.env.AISSTREAM_MODE !== "worker" && mmsis.length) {
      if (!process.env.VERCEL) {
        ensureStream(mmsis);
      } else if (Date.now() - guard.last > COLLECT_EVERY_MS) {
        guard.last = Date.now();
        after(async () => {
          const n = await collectPositions(mmsis, (pos) => persistPosition(payload, pos), COLLECT_MS);
          console.log(`[ais] collected ${n} fix(es) for ${mmsis.length} vessel(s)`);
        });
      }
    }

    const vessels: VesselPosition[] = boats
      .filter((b: any) => b.mmsi && b.lastPosition?.lat != null && b.lastPosition?.lon != null)
      .map((b: any) => ({
        mmsi: b.mmsi.trim(),
        lat: b.lastPosition.lat,
        lon: b.lastPosition.lon,
        cog: b.lastPosition.cog ?? undefined,
        sog: b.lastPosition.sog ?? undefined,
        shipName: b.name,
        updatedAt: b.lastPosition.reportedAt
          ? Date.parse(b.lastPosition.reportedAt)
          : Date.now(),
      }));

    return NextResponse.json({ vessels });
  } catch (err) {
    console.error("vessel-positions failed", err);
    return NextResponse.json({ vessels: [] });
  }
}
