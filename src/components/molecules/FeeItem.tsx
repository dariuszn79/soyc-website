import { Overline } from "@/components/atoms/Overline";

/**
 * FeeItem — a single membership or sailing fee row used in the Fees tab of TabsJoinUs.
 *
 * Figma: small overline + fee name (italic 40px, left) + price (40px, right) +
 * unit label + description.
 */

interface FeeItemProps {
  heading: string;
  price: string;
  unit: string;
  description: string;
}

export function FeeItem({ heading, price, unit, description }: FeeItemProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-brand-rule py-spacing-fee last:border-b-0">
      <Overline size="md" />
      <div className="flex items-start justify-between gap-4">
        <p className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100">
          {heading}
        </p>
        <div className="shrink-0 text-right">
          <p className="font-baskerville text-heading-md leading-heading text-brand-secondary-100">{price}</p>
          <p className="font-gill text-label text-brand-secondary-100/70">{unit}</p>
        </div>
      </div>
      <p className="font-gill text-body-sm leading-body-sm text-brand-secondary-100">{description}</p>
    </div>
  );
}
