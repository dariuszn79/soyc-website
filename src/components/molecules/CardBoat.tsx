import { Overline } from "@/components/atoms/Overline";
import { SpecList } from "@/components/molecules/SpecList";
import type { Boat } from "@/data/fleet";
import { componentLabels } from "@/data/component-labels";

/**
 * CardBoat — the white yacht specification panel from the Fleet design.
 */

export function CardBoat({ name, model, year, description, specsLeft, specsRight }: Boat) {
  return (
    <article className="flex h-auto w-full flex-col gap-spacing-md overflow-hidden bg-brand-tertiary-100 p-spacing-md sm:p-spacing-xl lg:h-[663px] lg:w-[560px] lg:p-[60px]">
      <div className="flex flex-col gap-spacing-xs">
        <Overline />
        <p className="font-gill text-[14px] uppercase leading-[14px] text-brand-secondary-100">
          {componentLabels.cardBoat.kicker}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-spacing-md gap-y-spacing-xs">
        <h2 className="min-w-0 flex-1 font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
          {name}
        </h2>
        <div className="shrink-0 font-gill text-[18px] leading-body text-brand-secondary-100">
          <p className="font-semibold">{model}</p>
          <p>{componentLabels.cardBoat.built} {year}</p>
        </div>
      </div>

      <div className="flex flex-col gap-spacing-sm">
        <div className="h-px w-full bg-brand-rule" />

        <div className="flex flex-col gap-spacing-xxs">
          <p className="font-gill text-[18px] leading-body text-brand-secondary-100">
            {componentLabels.cardBoat.specifications}
          </p>
          <div className="grid min-w-0 grid-cols-1 gap-spacing-xs sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:gap-spacing-xxs">
            <SpecList items={specsLeft} />
            <div className="hidden h-full min-h-[96px] bg-brand-rule sm:block" aria-hidden="true" />
            <SpecList items={specsRight} />
          </div>
        </div>

        <div className="h-px w-full bg-brand-rule" />
        <p className="font-gill text-[16px] leading-body text-[#333444] sm:text-[18px]">
          {description}
        </p>
      </div>
    </article>
  );
}
