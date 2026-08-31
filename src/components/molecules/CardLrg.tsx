import type { ReactNode } from "react";
import Link from "next/link";
import { Overline } from "@/components/atoms/Overline";

/**
 * CardLrg — large content card matching Figma node 6:188.
 *
 * Three style variants:
 *  • secondary — dark-blue bg, light text, red CTA button  (was "blue")
 *  • tertiary  — white bg, blue heading, dark body text, red CTA button (was "white", default)
 *  • primary   — red bg, white text, white-outline CTA button  (was "red")
 *
 * Props mirror the Figma component:
 *  kicker  — small all-caps label above the heading (Figma: "kicker")
 *  heading — italic serif headline
 *  body    — body copy
 *  variant — "secondary" | "tertiary" | "primary"  (default: "tertiary")
 *  cta     — optional call-to-action button
 */

interface Cta {
  label: string;
  href: string;
  /** Opens in a new tab; renders <a> instead of Next.js <Link>. */
  external?: boolean;
}

interface CardLrgProps {
  kicker: string;
  showKickerLabel?: boolean;
  heading: ReactNode;
  body: ReactNode;
  variant?: "secondary" | "tertiary" | "primary";
  cta?: Cta;
  figmaLayout?: boolean;
}

export function CardLrg({
  kicker,
  showKickerLabel = true,
  heading,
  body,
  variant = "tertiary",
  cta,
  figmaLayout = false,
}: CardLrgProps) {
  const isPrimary   = variant === "primary";
  const isSecondary = variant === "secondary";
  const isTertiary  = variant === "tertiary";

  /* ── Container ──────────────────────────────────────────────────────── */
  const containerBg = isPrimary
    ? "bg-brand-primary-100"
    : isSecondary
      ? "bg-brand-secondary-100"
      : "bg-brand-tertiary-100";

  /* ── Overline colour ────────────────────────────────────────────────── */
  // primary variant → white overline; secondary/tertiary → red overline
  const overlineWhite = isPrimary;

  /* ── Text colours ───────────────────────────────────────────────────── */
  const headingGroupColor = isTertiary
    ? "text-brand-secondary-100"
    : isSecondary
      ? "text-brand-muted"
      : "text-brand-tertiary-100";

  const bodyColor = isTertiary
    ? "text-brand-ink"
    : isSecondary
      ? "text-brand-muted"
      : "text-brand-tertiary-100";

  const kickerColor = isTertiary
    ? "text-brand-secondary-100"
    : "text-brand-tertiary-100";

  /* ── CTA button ─────────────────────────────────────────────────────── */
  // primary variant → white outline button; secondary/tertiary → solid red button
  const ctaClass = isPrimary
    ? "inline-flex items-center justify-center border border-brand-tertiary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-tertiary-100/10"
    : "inline-flex items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover";

  const containerSpacing = figmaLayout
    ? "h-full items-start justify-center gap-[56px] p-spacing-md sm:p-spacing-xl"
    : "items-start gap-spacing-lg px-spacing-md py-spacing-card-y sm:px-spacing-card-x";

  const headingSize = figmaLayout
    ? "text-4xl sm:text-heading-xl"
    : "text-4xl sm:text-heading-xl";

  const bodyType = figmaLayout
    ? "text-[18px] leading-[1.4] sm:text-[24px] sm:leading-[32px] lg:max-h-[180px] lg:overflow-hidden"
    : "text-body leading-body";

  return (
    <div
      className={`flex flex-col ${containerSpacing} ${containerBg}`}
    >
      <div className="flex flex-col gap-spacing-md">
        <div className="flex flex-col gap-spacing-xs">
          <Overline white={overlineWhite} />
          {showKickerLabel && (
            <p className={`font-gill text-label uppercase leading-label ${kickerColor}`}>
              {kicker}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-spacing-md">
          <h2
            className={`break-words whitespace-pre-line font-baskerville italic leading-heading ${headingGroupColor} ${headingSize}`}
          >
            {heading}
          </h2>
          <div className={`font-gill ${bodyColor} ${bodyType}`}>
            {body}
          </div>
        </div>
      </div>

      {cta &&
        (cta.external ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {cta.label}
          </a>
        ) : (
          <Link href={cta.href} className={ctaClass}>
            {cta.label}
          </Link>
        ))}
    </div>
  );
}
