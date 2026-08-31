/**
 * Overline — the red accent bar used above headings throughout the design.
 *
 * Sizes (matching Figma):
 *  "lg"  4px × 84px  — section / card headings (default)
 *  "md"  4px × 48px  — CardMed headings in tabs
 *  "sm"  2px × 48px  — CardPerson and small card overlines
 */

interface OverlineProps {
  size?: "lg" | "md" | "sm";
  white?: boolean;
}

export function Overline({ size = "lg", white = false }: OverlineProps) {
  const colour = white ? "bg-brand-tertiary-100" : "bg-brand-primary-100";

  const dimensions =
    size === "sm"
      ? "h-0.5 w-spacing-overline"
      : size === "md"
        ? "h-1 w-spacing-overline"
        : "h-1 w-spacing-overline-lg";

  return <div className={`shrink-0 ${colour} ${dimensions}`} />;
}
