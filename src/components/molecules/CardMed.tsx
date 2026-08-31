import type { ReactNode } from "react";
import { Overline } from "@/components/atoms/Overline";

/**
 * CardMed — medium content card used in 3-column tab grids (TabsJoinUs).
 *
 * Figma: small red overline + italic heading + free-form body content.
 */

interface CardMedProps {
  heading: string;
  children: ReactNode;
}

export function CardMed({ heading, children }: CardMedProps) {
  return (
    <div className="flex max-w-[480px] flex-col gap-spacing-lg p-6 sm:p-[56px]">
      <Overline />
      <div className="flex flex-col gap-spacing-md">
        <h2 className="font-baskerville text-[40px] italic leading-[44px] text-brand-secondary-100 sm:text-heading-xl sm:leading-heading">
          {heading}
        </h2>
        <div className="font-gill text-[18px] leading-[24px] text-brand-ink sm:max-h-[180px] sm:overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
