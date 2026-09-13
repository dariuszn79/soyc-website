"use client";

import dynamic from "next/dynamic";
import data from "@/data/json/components/cruise-map.json";
import type { CruiseMapContent } from "@/data/page-types";
import type { TrackedVessel } from "./FleetLiveMap";

export type { TrackedVessel };

const defaultContent: CruiseMapContent = data;

/**
 * Browser-only live map — mapbox-gl can't run during SSR, so it is loaded via
 * a dynamic import with `ssr: false`. Also used by SectionFleetLocation.
 */
export const FleetLiveMap = dynamic(() => import("./FleetLiveMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-brand-tertiary-100" aria-hidden="true" />
  ),
});

/**
 * CardFleetMap — live vessel tracking on a Mapbox map.
 *
 * Renders a Mapbox GL map with a marker per tracked boat (Boats with an MMSI
 * set) fed by /api/vessel-positions (aisstream.io). Falls back to the static
 * mock image when no boats are tracked or no Mapbox token is configured.
 */
export function CardFleetMap({
  content = defaultContent,
  vessels = [],
  mapboxToken = "",
}: {
  content?: CruiseMapContent;
  vessels?: TrackedVessel[];
  mapboxToken?: string;
}) {
  if (vessels.length === 0 || !mapboxToken) return <StaticMap content={content} />;
  return (
    <div className="relative aspect-[784/652] w-full overflow-hidden lg:aspect-auto lg:h-[652px]">
      <FleetLiveMap vessels={vessels} mapboxToken={mapboxToken} className="absolute inset-0" />
    </div>
  );
}

function StaticMap({ content }: { content: CruiseMapContent }) {
  return (
    <div className="relative aspect-[784/652] w-full overflow-hidden lg:h-[652px] lg:aspect-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.mapSrc}
        alt={content.mapAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.logoSrc}
        alt=""
        className="absolute left-[35.7%] top-[22.2%] h-[6.6%] w-auto"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.speedbirdMarkerSrc}
        alt={content.speedbirdMarkerAlt}
        className="absolute left-[38.5%] top-[30.5%] h-[4.6%] w-auto"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.concordeMarkerSrc}
        alt={content.concordeMarkerAlt}
        className="absolute left-[33%] top-[67%] h-[4.6%] w-auto -rotate-[135deg]"
      />

      <div className="absolute bottom-[6.4%] left-[3.3%] flex flex-col gap-[10px]">
        <div className="flex h-[25px] items-center gap-[10px] rounded-full border border-brand-primary-100 bg-brand-tertiary-100 px-[6px] text-brand-primary-100">
          <span className="h-4 w-4 shrink-0 rounded-full bg-brand-primary-100" />
          <span className="w-[105px] text-center font-button text-button leading-button">
            {content.concordeLabel}
          </span>
        </div>
        <div className="flex h-[25px] items-center gap-[10px] rounded-full border border-brand-secondary-100 bg-brand-tertiary-100 px-[6px] text-brand-secondary-100">
          <span className="h-4 w-4 shrink-0 rounded-full bg-brand-secondary-100" />
          <span className="w-[105px] text-center font-button text-button leading-button">
            {content.speedbirdLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
