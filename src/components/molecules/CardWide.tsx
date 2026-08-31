import { Overline } from "@/components/atoms/Overline";

/**
 * CardWide — heading-only card: overline + label + italic heading, no body or CTA.
 * Used as section dividers / group headings (e.g. "Our dedicated board members").
 */

interface CardWideProps {
  label: string;
  heading: string;
}

export function CardWide({ label, heading }: CardWideProps) {
  return (
    <div className="flex flex-col gap-spacing-lg bg-brand-tertiary-100 px-spacing-card-x py-spacing-card-y">
      <Overline />
      <div className="flex flex-col leading-normal text-brand-secondary-100">
        <p className="font-gill text-label uppercase leading-label">{label}</p>
        <p className="font-baskerville whitespace-pre-line text-heading-xl italic leading-heading">
          {heading}
        </p>
      </div>
    </div>
  );
}
