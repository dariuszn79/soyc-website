import { Overline } from "@/components/atoms/Overline";
import { CardFleetLiveMap, type TrackedVessel } from "@/components/molecules/CardFleetLiveMapLazy";
import data from "@/data/json/components/fleet-location.json";
import type { FleetLocationContent } from "@/data/page-types";

const defaultContent: FleetLocationContent = data;

interface SectionFleetLocationProps {
  flush?: boolean;
  /** Content from the `fleet-location` global; falls back to bundled JSON. */
  content?: FleetLocationContent;
  /** Tracked boats (with MMSI) — when present the map goes live. */
  vessels?: TrackedVessel[];
  mapboxToken?: string;
}

export function SectionFleetLocation({ flush = false, content = defaultContent, vessels = [], mapboxToken = "" }: SectionFleetLocationProps) {
  const live = vessels.length > 0 && !!mapboxToken;
  return (
    <section
      id="fleet-location"
      className={`grid w-full grid-cols-1 overflow-hidden bg-brand-tertiary-100 lg:min-h-[652px] lg:grid-cols-[560px_minmax(0,1fr)] ${
        flush ? "" : "sm:px-spacing-md"
      }`}
    >
      <div className="flex flex-col gap-spacing-md bg-brand-tertiary-100 p-spacing-md sm:p-spacing-xl">
        <Overline />
        <div className="flex flex-col gap-spacing-md">
          <h2 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
            {content.heading}
          </h2>
          <p className="font-gill text-[18px] leading-[1.35] text-[#333444] sm:text-[24px] sm:leading-[32px]">
            {content.body}
          </p>
        </div>
      </div>

      <div
        className="relative min-h-[440px] overflow-hidden sm:min-h-[520px] lg:min-h-[652px]"
        aria-label={content.mapAriaLabel}
      >
        {live ? (
          <CardFleetLiveMap vessels={vessels} mapboxToken={mapboxToken} className="absolute inset-0" />
        ) : (
          <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.mapSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute left-[42%] top-[22%] h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.logoSrc}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.concordeMarkerSrc}
          alt=""
          className="absolute left-[45%] top-[30%] h-[30px] w-[12px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.speedbirdMarkerSrc}
          alt=""
          className="absolute left-[39%] top-[67%] h-[30px] w-[12px] rotate-45"
        />

        <div className="absolute bottom-spacing-xl left-spacing-md flex flex-col gap-spacing-compact font-button text-[16px] sm:text-button">
          <div className="flex h-[28px] items-center gap-spacing-compact rounded-full border border-brand-primary-100 bg-white px-spacing-xxs text-brand-primary-100">
            <span className="h-4 w-4 rounded-full bg-brand-primary-100" aria-hidden="true" />
            <span className="min-w-[96px] text-center">{content.concordeLabel}</span>
          </div>
          <div className="flex h-[28px] items-center gap-spacing-compact rounded-full border border-brand-secondary-100 bg-white px-spacing-xxs text-brand-secondary-100">
            <span className="h-4 w-4 rounded-full bg-brand-secondary-100" aria-hidden="true" />
            <span className="min-w-[96px] text-center">{content.speedbirdLabel}</span>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
}