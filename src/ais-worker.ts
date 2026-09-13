import { getPayload } from "payload";
import config from "@payload-config";
import { persistPosition, startStream } from "./lib/ais/stream";

/**
 * Always-on AIS tracker for production / serverless hosting.
 *
 * The web app on Vercel can't hold a WebSocket open, so this script keeps the
 * AISstream connection alive on any persistent host and writes each position
 * fix to the Boat's `lastPosition`. /api/vessel-positions then just reads the
 * database.
 *
 * Run with:  pnpm payload run src/ais-worker.ts
 * Set AISSTREAM_MODE=worker on the web app so it doesn't open its own socket.
 */

const RESCAN_MS = 5 * 60 * 1000;

const main = async () => {
  const payload = await getPayload({ config });

  const resubscribe = async () => {
    const { docs } = await payload.find({
      collection: "boats",
      where: { mmsi: { exists: true } },
      limit: 200,
      depth: 0,
    });
    const mmsis = docs
      .map((b: { mmsi?: string | null }) => b.mmsi?.trim())
      .filter((m): m is string => Boolean(m));
    if (!mmsis.length) {
      console.log("[ais-worker] no boats with MMSI — retrying in 5 min");
      return;
    }
    startStream(mmsis, (pos) => {
      console.log(`[ais-worker] ${pos.shipName ?? pos.mmsi} ${pos.lat},${pos.lon}`);
      persistPosition(payload, pos).catch((err) =>
        console.error("[ais-worker] persist failed", err),
      );
    });
    console.log(`[ais-worker] tracking ${mmsis.length} vessel(s): ${mmsis.join(", ")}`);
  };

  await resubscribe();
  setInterval(resubscribe, RESCAN_MS);
};

main().catch((err) => {
  console.error("[ais-worker] fatal", err);
  process.exit(1);
});
