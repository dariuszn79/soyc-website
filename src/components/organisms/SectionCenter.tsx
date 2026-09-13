import Link from "next/link";
import { Overline } from "@/components/atoms/Overline";

/**
 * SectionCenter — the red full-bleed "Thinking of joining?" CTA section.
 *
 * Figma: 663px red section with a yacht photo background at 30% opacity,
 * centred card with white overline + italic heading + body + outlined CTA button.
 *
 * All content has sensible defaults so the component works with zero props on
 * every inner page, but each value can be overridden for the Join page variant.
 */

interface SectionCenterProps {
  heading?: string;
  body?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}

export function SectionCenter({
  heading = "Thinking of joining?",
  body = (
    <>
      Two modern offshore yachts, meticulously maintained and fully equipped for racing, cruising,
      and training.
      <br />
      <br />
      Our fleet is maintained to the highest standard for offshore cruising — from Channel crossings
      to Biscay passages. Both yachts fully equipped and RYA compliant.
    </>
  ),
  ctaLabel = "Apply to join",
  ctaHref = "/join",
}: SectionCenterProps) {
  return (
    <section className="relative flex h-[663px] w-full items-center justify-center overflow-hidden bg-brand-primary-100">
      {/* Background yacht photo */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cta-yacht-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-[560px] flex-col items-center gap-spacing-lg px-spacing-card-x py-spacing-card-y text-center">
        <Overline white />
        <div className="flex flex-col gap-spacing-md">
          <h2 className="font-baskerville text-heading-xl italic leading-heading text-brand-tertiary-100">{heading}</h2>
          <p className="font-gill text-body leading-body text-brand-muted">{body}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center border border-brand-tertiary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-tertiary-100/10"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
