import type { ReactNode } from "react";

/**
 * SectionHeading — standalone text heading matching Figma node 73:16903.
 *
 * Simple kicker + heading + body, no photo. Used as the optional heading
 * above sections (the `showHeading` toggle on section blocks) and as a
 * standalone `sectionHeading` page block.
 */

interface SectionHeadingProps {
  /** Small red label — pass a string or a <Kicker/> element. */
  kicker?: ReactNode;
  heading: string;
  body?: ReactNode;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  kicker,
  heading,
  body,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className="flex w-full max-w-[720px] flex-col gap-spacing-md">
      {typeof kicker === "string" ? (
        <p className="font-baskerville italic text-body-sm leading-body-sm text-brand-primary-100 lg:text-body">
          {kicker}
        </p>
      ) : (
        kicker
      )}
      <Tag
        className={
          Tag === "h1"
            ? "whitespace-pre-line font-baskerville text-4xl leading-heading text-brand-secondary-100 md:text-5xl lg:text-display lg:leading-display"
            : "whitespace-pre-line font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl"
        }
      >
        {heading}
      </Tag>
      {body != null && (
        <div
          className={
            Tag === "h1"
              ? "font-gill text-body leading-body text-brand-ink lg:text-body-lg lg:leading-body-lg"
              : "font-gill text-[18px] leading-[1.4] text-brand-ink sm:text-[24px] sm:leading-[32px]"
          }
        >
          {body}
        </div>
      )}
    </div>
  );
}
