import data from "@/data/json/components/cruise-map.json";
import type { CruiseMapContent } from "@/data/page-types";

const defaultContent: CruiseMapContent = data;

export function CardFleetMap({ content = defaultContent }: { content?: CruiseMapContent }) {
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