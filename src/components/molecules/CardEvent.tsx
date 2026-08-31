import { Overline } from "@/components/atoms/Overline";
import { componentLabels } from "@/data/component-labels";
import type { CruiseEvent } from "@/data/content-types";

export type { CruiseEvent } from "@/data/content-types";

interface CardEventProps {
  title: string;
  dates: string;
  yacht: string;
  model: string;
  skipper: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "carousel" | "grid";
}

export function CardEvent({
  title,
  dates,
  yacht,
  model,
  skipper,
  imageSrc,
  imageAlt = "",
  variant = "carousel",
}: CardEventProps) {
  const isGrid = variant === "grid";

  return (
    <article
      className={[
        "flex min-h-[256px] shrink-0 flex-col gap-spacing-md overflow-hidden border border-[#e3e3e3] bg-brand-tertiary-100 p-spacing-md",
        isGrid
          ? "w-full"
          : "w-[calc(100vw-32px)] sm:h-[256px] sm:w-[766px] sm:flex-row",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-spacing-md">
        <Overline />

        <div className="flex flex-col gap-spacing-sm text-brand-secondary-100">
          <h3 className="font-baskerville text-[30px] italic leading-[36px] sm:text-[36px] sm:leading-[40px]">
            {title}
          </h3>
          <p className="font-gill text-[24px] font-semibold leading-[30px] sm:text-[32px] sm:leading-[36px]">
            {dates}
          </p>
          <div className="flex flex-wrap items-center gap-spacing-sm font-gill text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px]">
            <span>{yacht}</span>
            <span className="h-6 w-px bg-brand-secondary-100" aria-hidden="true" />
            <span>{model}</span>
          </div>
          <p className="flex flex-wrap items-baseline gap-spacing-xs font-gill text-[16px] leading-[21px]">
            <span>{componentLabels.cardEvent.skipper}</span>
            <span className="text-[18px] leading-[24px]">{skipper}</span>
          </p>
        </div>
      </div>

      {imageSrc && (
        <div className="relative aspect-[405.5/300] w-full shrink-0 overflow-hidden sm:h-full sm:w-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
    </article>
  );
}