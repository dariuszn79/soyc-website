import "server-only";

/**
 * AISstream.io live vessel positions — a single long-lived WebSocket shared
 * by all requests. The stream is opened lazily on first poll and re-opened
 * with a fresh subscription when the tracked MMSI set changes.
 *
 * Requires `AISSTREAM_API_KEY` (server-only env — never exposed to the
 * browser). When unset, `getVesselPositions` just returns an empty list.
 *
 * NOTE: this holds state in the Next.js server process — it works in dev and
 * on any long-lived Node host, but not on short-lived serverless functions.
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
  /** Epoch ms of the last position report. */
  updatedAt: number;
}

// South Coast / Solent bounding box — AISstream requires a box plus the MMSI
// filter. [[minLat, minLon], [maxLat, maxLon]].
const BOUNDING_BOXES = [[[50.3, -2.2], [51.3, -0.3]]];
const RECONNECT_MS = 5000;

const positions = new Map<string, VesselPosition>();
let socket: WebSocket | null = null;
let subscribedTo = "";
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Ensure the upstream stream is subscribed to `mmsis` and return the latest
 * cached positions for them (empty until the first reports arrive).
 */
export function getVesselPositions(mmsis: string[]): VesselPosition[] {
  ensureStream(mmsis);
  return mmsis
    .map((mmsi) => positions.get(mmsi))
    .filter((p): p is VesselPosition => Boolean(p));
}

function ensureStream(mmsis: string[]) {
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
      const report = msg?.Message?.PositionReport;
      // MetaData uses lowercase latitude/longitude; Message.* uses capitals.
      if (meta?.MMSI != null && meta.latitude != null && meta.longitude != null) {
        positions.set(String(meta.MMSI), {
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
    reconnectTimer ??= setTimeout(() => {
      reconnectTimer = null;
      ensureStream(mmsis);
    }, RECONNECT_MS);
  };

  ws.onerror = () => {
    try {
      ws.close();
    } catch {
      // already closed
    }
  };
}
