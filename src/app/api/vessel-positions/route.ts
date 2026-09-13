import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import { getVesselPositions } from "@/lib/ais/stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Latest AIS positions for tracked boats — polled by CardFleetMap. */
export async function GET() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({ collection: "boats", limit: 100, depth: 0 });
    const mmsis = docs
      .map((d) => (d as { mmsi?: string | null }).mmsi?.trim())
      .filter((m): m is string => Boolean(m));
    return NextResponse.json({ vessels: getVesselPositions(mmsis) });
  } catch {
    return NextResponse.json({ vessels: [] });
  }
}
