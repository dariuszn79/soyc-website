/**
 * SectionHeader — page-level intro block matching Figma node 8:11964.
 *
 * Responsive two-column layout:
 *  • Mobile  : stacked — text on top, masked photo below (aspect-ratio driven height)
 *  • Desktop : side-by-side — text left (~47%), masked photo right (flex-1, stretches
 *              to match text column height automatically)
 *
 * No fixed pixel widths or heights — everything scales with the viewport.
 *
 * Props:
 *   kicker    — small red italic Baskerville label
 *   heading   — large blue Baskerville headline (non-italic)
 *   body      — Gill Sans body paragraph
 *   imageSrc  — optional right-column photo path
 *   imageAlt  — accessible alt text for the photo
 *   as        — semantic heading tag, default "h1"
 *   cta       — optional primary action rendered beneath the body copy
 */

import type { ReactNode } from "react";
import Link from "next/link";

interface SectionHeaderProps {
  kicker: ReactNode;
  heading: string;
  body?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  as?: "h1" | "h2";
  compact?: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({
  kicker,
  heading,
  body,
  imageSrc,
  imageAlt = "",
  as: Tag = "h1",
  compact = false,
  cta,
}: SectionHeaderProps) {
  const hasImage = Boolean(imageSrc);
  const isSubheading = Tag === "h2";

  return (
    <section
      className={`flex w-full flex-col bg-brand-tertiary-100 max-w-[1440px] ${
        hasImage ? "lg:flex-row lg:items-center lg:overflow-hidden" : ""
      }`}
    >
      {/* ── Left: text column ──────────────────────────────────────────── */}
      {/*
        Mobile  : full-width, padding scales with viewport (px-6 → px-10 → px-[60px])
        Desktop : 47% of section width (≈ 680 / 1440 from Figma)
      */}
      <div
        className={`flex flex-col ${
          hasImage
            ? `gap-spacing-sm px-spacing-md py-spacing-section-y sm:px-10 sm:py-14 lg:w-[48.85%] lg:shrink-0 lg:gap-spacing-tight ${
                compact
                  ? "lg:px-spacing-xl lg:py-spacing-md"
                  : "lg:px-spacing-card-x lg:py-spacing-card-x"
              }`
            : "w-full max-w-[720px] gap-spacing-md px-0 py-0"
        }`}
      >
        {/* Kicker — italic Baskerville, red */}
        {typeof kicker === "string" ? (
          <p className="font-baskerville italic text-body-sm leading-body-sm text-brand-primary-100 lg:text-body">
            {kicker}
          </p>
        ) : (
          kicker
        )}

        {/* Headline — regular Baskerville, blue; scales sm→md→lg */}
        <Tag
          className={
            isSubheading
              ? "font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl"
              : "whitespace-pre-line font-baskerville text-4xl leading-heading text-brand-secondary-100 md:text-5xl lg:text-display lg:leading-display"
          }
        >
          {heading}
        </Tag>

        {/* Body — Gill Sans */}
        {body != null && (
          <div
            className={
              "font-gill text-[18px] leading-[1.4] text-brand-ink sm:text-[24px] sm:leading-[32px]"
                
            }
          >
            {body}
          </div>
        )}

        {cta && (
          <Link
            href={cta.href}
            className="inline-flex w-fit items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* ── Right: SVG-masked photo ─────────────────────────────────────── */}
      {/*
        IMPORTANT: The container is locked to aspect-[711/540] on EVERY breakpoint
        (matching the original designer SVG dimensions exactly).
        Because clipPathUnits="objectBoundingBox" scales control points relative
        to the bounding box, the curve only stays the correct shape when the box
        aspect ratio never changes.
        On desktop the container takes the remaining 53% of width; the fixed ratio
        drives its height, and the section uses items-center so text is vertically
        centred alongside the image.
      */}
      {hasImage && (
        <div className="relative aspect-[711/540] w-full overflow-hidden lg:w-[51.15%] lg:shrink-0">
          {/*
          Inline clipPath normalised to objectBoundingBox (0–1 coords) from
          the 711×540 designer SVG. Scales to any container size automatically.
        */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <clipPath id="sh-photo-mask" clipPathUnits="objectBoundingBox">
                <path d="M0.9992 1 H0 C0.039 0.6461 0.1395 0.3096 0.2913 0 H0.9992 V1 Z" />
              </clipPath>
            </defs>
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: "url(#sh-photo-mask)" }}
          />
        </div>
      )}
    </section>
  );
}
