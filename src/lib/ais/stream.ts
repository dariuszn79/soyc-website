import type { Payload } from "payload";

/**
 * AISstream.io vessel tracking.
 *
 * `startStream` opens the upstream WebSocket and calls `onReport` for each
 * position fix. It is used in two places:
 *
 * - Dev / persistent Node host: `ensureStream` lazily starts it in-process and
 *   positions are persisted to the Boat's `lastPosition` (throttled).
 * - Serverless production: `scripts/ais-worker.ts` runs the same stream on an
 *   always-on machine — /api/vessel-positions only ever reads the database,
 *   so no socket is needed at request time.
 *
 * Requires `AISSTREAM_API_KEY` (server-only env — never sent to the browser).
 */

export interface VesselPosition {
  mmsi: string;
  lat: number;
  lon: number;
  /** Course over ground, degrees. */
  cog?: number;
  /** Speed over ground, knots. */
  sog?: number;
  shipName?: string;
  /** Epoch ms of the position report. */
  updatedAt: number;
}

// South Coast / Solent bounding box — AISstream requires a box plus the MMSI
// filter. [[minLat, minLon], [maxLat, maxLon]].
const BOUNDING_BOXES = [[[49.5, -3.5], [52.0, 1.0]]];
const RECONNECT_MS = 5000;
/** Minimum ms between DB writes per vessel. */
const PERSIST_MS = 45_000;

let socket: WebSocket | null = null;
let subscribedTo = "";
const lastPersist = new Map<string, number>();

/**
 * Lazily ensure the in-process stream is subscribed to `mmsis`. No-op when the
 * key is missing or the AIS worker is responsible (`AISSTREAM_MODE=worker`).
 */
export function ensureStream(mmsis: string[]) {
  if (process.env.AISSTREAM_MODE === "worker") return;
  startStream(mmsis, async (pos) => {
    const { getPayloadClient } = await import("@/lib/payload/client");
    await persistPosition(await getPayloadClient(), pos);
  });
}

/**
 * Open (or re-subscribe) the upstream stream. One socket is kept per process;
 * resending a subscription replaces it, so a changed MMSI set reconnects.
 */
export function startStream(mmsis: string[], onReport: (pos: VesselPosition) => void) {
  const apiKey = process.env.AISSTREAM_API_KEY;
  if (!apiKey || !mmsis.length) return;

  const signature = mmsis.slice().sort().join(",");
  if (socket && subscribedTo === signature) return;
  subscribedTo = signature;

  socket?.close();
  const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
  // Server sends binary frames containing UTF-8 JSON.
  ws.binaryType = "arraybuffer";
  socket = ws;

  ws.onopen = () => {
    // Subscription must arrive within 3 seconds of connect.
    ws.send(
      JSON.stringify({
        APIKey: apiKey,
        BoundingBoxes: BOUNDING_BOXES,
        FiltersShipMMSI: mmsis,
        // Class A ships send PositionReport; yachts' Class B transponders send
        // StandardClassB/ExtendedClassB position reports instead.
        FilterMessageTypes: [
          "PositionReport",
          "StandardClassBPositionReport",
          "ExtendedClassBPositionReport",
        ],
      }),
    );
  };

  ws.onmessage = (event) => {
    try {
      const raw = event.data;
      const text =
        typeof raw === "string" ? raw : Buffer.from(raw as ArrayBuffer).toString("utf8");
      const msg = JSON.parse(text);
      const meta = msg?.MetaData;
      const report = msg?.Message?.[msg?.MessageType];
      // MetaData uses lowercase latitude/longitude; Message.* uses capitals.
      if (meta?.MMSI != null && meta.latitude != null && meta.longitude != null) {
        onReport({
          mmsi: String(meta.MMSI),
          lat: meta.latitude,
          lon: meta.longitude,
          cog: report?.Cog,
          sog: report?.Sog,
          shipName: meta.ShipName?.trim(),
          updatedAt: Date.now(),
        });
      }
    } catch {
      // malformed message — ignore
    }
  };

  ws.onclose = () => {
    if (socket !== ws) return;
    socket = null;
    setTimeout(() => startStream(mmsis, onReport), RECONNECT_MS);
  };

  ws.onerror = () => {
    try {
      ws.close();
    } catch {
      // already closed
    }
  };
}

/** Write a position fix onto the matching Boat's `lastPosition`, throttled to
 * one write per vessel per PERSIST_MS. */
export async function persistPosition(payload: Payload, pos: VesselPosition) {
  const last = lastPersist.get(pos.mmsi) ?? 0;
  if (Date.now() - last < PERSIST_MS) return;
  lastPersist.set(pos.mmsi, Date.now());

  const { docs } = await payload.find({
    collection: "boats",
    where: { mmsi: { equals: pos.mmsi } },
    limit: 1,
    depth: 0,
  });
  if (!docs[0]) return;
  await payload.update({
    collection: "boats",
    id: docs[0].id,
    data: {
      lastPosition: {
        lat: pos.lat,
        lon: pos.lon,
        sog: pos.sog ?? null,
        cog: pos.cog ?? null,
        reportedAt: new Date(pos.updatedAt).toISOString(),
      },
    } as never,
  });
}
