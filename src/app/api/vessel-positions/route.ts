import "server-only";
import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import { ensureStream, type VesselPosition } from "@/lib/ais/stream";

export const dynamic = "force-dynamic";

/** Last-known AIS positions of fleet boats.
 *
 * Reads the `lastPosition` each Boat record (written by the AIS tracker —
 * in-process in dev, the ais-worker script on serverless). The browser polls
 * this; the AISstream key never leaves the server.
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
    // ensureStream opens a persistent upstream WebSocket — on serverless that
    // socket pins the function's event loop until maxDuration and holds its DB
    // pool connections, starving the shared pooler. Only run it off-Vercel.
    if (!process.env.VERCEL) ensureStream(mmsis);

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
