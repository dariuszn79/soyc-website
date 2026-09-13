"use client";

import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";
import type { TrackedVessel } from "./CardFleetLiveMap";

export type { TrackedVessel };

/**
 * Browser-only live map — mapbox-gl can't run during SSR, so it is loaded via
 * a dynamic import with `ssr: false`. The mapbox stylesheet is imported here
 * (a statically-bundled module) because CSS inside lazily-loaded chunks is not
 * reliably injected.
 */
export const CardFleetLiveMap = dynamic(() => import("./CardFleetLiveMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-brand-tertiary-100" aria-hidden="true" />
  ),
});
