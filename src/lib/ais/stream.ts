import type { Payload } from "payload";

/**
 * AISstream.io vessel tracking.
 *
 * `startStream` opens the upstream WebSocket and calls `onReport` for each
 * position fix. It is used in two places:
 *
 * - Dev / persistent Node host: `ensureStream` lazily starts it in-process and
 *   positions are persisted to the Boat's `lastPosition` (throttled).
 * - Vercel: /api/vessel-positions runs `collectPositions` for a bounded window
 *   after each response (at most ~once a minute per instance) and persists the
 *   fixes. Optionally `src/ais-worker.ts` can run the persistent stream on an
 *   always-on machine instead (set AISSTREAM_MODE=worker on the web app).
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

const RECONNECT_MS = 5000;
/** Minimum ms between DB writes per vessel. */
const PERSIST_MS = 45_000;

// Kept on globalThis so Next.js dev-mode HMR (which re-evaluates this module
// on edits) reuses the same socket instead of leaking one connection per
// reload — aisstream enforces a concurrent-connection limit per API key.
const state = ((globalThis as Record<string, unknown>).__aisStream ??= {
  socket: null as WebSocket | null,
  subscribedTo: "",
  lastPersist: new Map<string, number>(),
}) as {
  socket: WebSocket | null;
  subscribedTo: string;
  lastPersist: Map<string, number>;
};

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

/** aisstream subscription filters shared by both stream modes.
 * BoundingBoxes is mandatory — with it omitted the server confirms the
 * subscription but never sends a message. A world-spanning box keeps tracking
 * global so fixes still arrive when a club boat sails outside home waters. */
const subscriptionFilters = (mmsis: string[]) => ({
  BoundingBoxes: [[[-90, -180], [90, 180]]],
  FiltersShipMMSI: mmsis.slice().sort(),
  // Class A ships send PositionReport; yachts' Class B transponders send
  // StandardClassB/ExtendedClassB position reports instead.
  FilterMessageTypes: [
    "PositionReport",
    "StandardClassBPositionReport",
    "ExtendedClassBPositionReport",
  ],
});

/**
 * Open (or re-subscribe) the upstream stream. One socket is kept per process;
 * resending a subscription replaces it, so a changed MMSI set reconnects.
 */
export function startStream(mmsis: string[], onReport: (pos: VesselPosition) => void) {
  const apiKey = process.env.AISSTREAM_API_KEY;
  if (!apiKey || !mmsis.length) return;

  const subscription = JSON.stringify({ APIKey: apiKey, ...subscriptionFilters(mmsis) });
  // Dedupe on the full payload so a changed subscription (e.g. new MMSI or
  // filter) reconnects instead of silently reusing the old socket.
  if (state.socket && state.subscribedTo === subscription) return;
  state.subscribedTo = subscription;

  state.socket?.close();
  const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
  // Server sends binary frames containing UTF-8 JSON.
  ws.binaryType = "arraybuffer";
  state.socket = ws;

  ws.onopen = () => {
    // Subscription must arrive within 3 seconds of connect.
    ws.send(subscription);
    console.log(`[ais] stream subscribed — tracking ${mmsis.length} vessel(s)`);
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

  ws.onclose = (e) => {
    if (state.socket !== ws) return;
    state.socket = null;
    console.log(`[ais] stream closed (code ${e.code}) — reconnecting in ${RECONNECT_MS / 1000}s`);
    setTimeout(() => startStream(mmsis, onReport), RECONNECT_MS);
  };

  ws.onerror = (e) => {
    console.error("[ais] stream error", e);
    try {
      ws.close();
    } catch {
      // already closed
    }
  };
}

/**
 * Serverless-safe alternative to `startStream`: open a short-lived socket,
 * forward every fix to `onReport` for `durationMs`, then close. Resolves with
 * the number of fixes received. Never reconnects and never touches the
 * persistent `state.socket`, so it can run inside a bounded function
 * lifetime (e.g. Next `after()` on Vercel) without pinning the instance.
 */
export function collectPositions(
  mmsis: string[],
  onReport: (pos: VesselPosition) => void | Promise<void>,
  durationMs: number,
): Promise<number> {
  const apiKey = process.env.AISSTREAM_API_KEY;
  if (!apiKey || !mmsis.length) return Promise.resolve(0);

  return new Promise((resolve) => {
    let count = 0;
    const pending: Promise<void>[] = [];
    const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
    ws.binaryType = "arraybuffer";
    const finish = () => {
      clearTimeout(timer);
      try {
        ws.close();
      } catch {
        // already closed
      }
      Promise.allSettled(pending).then(() => resolve(count));
    };
    const timer = setTimeout(finish, durationMs);

    ws.onopen = () => ws.send(JSON.stringify({ APIKey: apiKey, ...subscriptionFilters(mmsis) }));
    ws.onmessage = (event) => {
      try {
        const raw = event.data;
        const msg = JSON.parse(
          typeof raw === "string" ? raw : Buffer.from(raw as ArrayBuffer).toString("utf8"),
        );
        const meta = msg?.MetaData;
        const report = msg?.Message?.[msg?.MessageType];
        if (meta?.MMSI == null || meta.latitude == null || meta.longitude == null) return;
        count++;
        const r = onReport({
          mmsi: String(meta.MMSI),
          lat: meta.latitude,
          lon: meta.longitude,
          cog: report?.Cog,
          sog: report?.Sog,
          shipName: meta.ShipName?.trim(),
          updatedAt: Date.now(),
        });
        if (r) pending.push(r.catch((err) => console.error("[ais] persist failed", err)));
      } catch {
        // malformed message — ignore
      }
    };
    ws.onerror = (e) => {
      console.error("[ais] collect error", e);
      finish();
    };
    ws.onclose = () => finish();
  });
}

/** Write a position fix onto the matching Boat's `lastPosition`, throttled to
 * one write per vessel per PERSIST_MS. */
export async function persistPosition(payload: Payload, pos: VesselPosition) {
  const last = state.lastPersist.get(pos.mmsi) ?? 0;
  if (Date.now() - last < PERSIST_MS) return;
  state.lastPersist.set(pos.mmsi, Date.now());

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
