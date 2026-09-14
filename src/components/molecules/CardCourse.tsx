import { Overline } from "@/components/atoms/Overline";
import type { Course } from "@/data/courses";
import { componentLabels } from "@/data/component-labels";

/**
 * CardCourse — RYA course card used in the Training page tabs.
 *
 * Figma: overline + level label + italic title + description + "You'll learn" list
 * + price blocks + notes.
 */

export function CardCourse({ title, desc, prices, notes }: Course) {
  return (
    <article className="flex h-full flex-col gap-spacing-md border border-[#e3e3e3] bg-brand-tertiary-100 p-spacing-md sm:p-[60px]">
      <div className="flex flex-col gap-spacing-md">
        <Overline />
        <h3 className="font-baskerville text-[32px] italic leading-[38px] text-brand-secondary-100 sm:text-[36px] sm:leading-[40px]">
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-spacing-md">
        <p className="font-gill text-[18px] leading-[24px] text-brand-ink">{desc}</p>

        <div className="grid w-full max-w-[440px] grid-cols-2">
          {prices.map((price, index) => (
            <div
              key={`${price.from}-${price.amount}-${index}`}
              className={`flex min-w-0 flex-col px-spacing-xs ${
                index > 0 ? "border-l border-brand-rule-strong" : ""
              }`}
            >
              <p className="font-gill text-[14px] leading-[19px] text-brand-ink sm:text-[16px]">
                {componentLabels.cardCourse.from}{price.from}
                <br />
                {componentLabels.cardCourse.till} {price.til}
              </p>
              <p className="font-gill text-[28px] font-semibold leading-[36px] text-brand-secondary-100 sm:text-[32px]">
                {price.amount}
              </p>
              <p className="font-gill text-[16px] leading-[21px] text-brand-ink">
                {price.duration}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <p className="font-gill text-[13px] font-bold leading-[19px] text-brand-secondary-100">
            {componentLabels.cardCourse.notes}
          </p>
          <p className="font-gill text-[14px] leading-[19px] text-brand-ink">{notes}</p>
        </div>
      </div>
    </article>
  );
}
