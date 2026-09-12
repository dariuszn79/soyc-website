import type { RichTextBlock } from "@/data/content-types";

/** Convert an array of `{ item: string }` rows back to `string[]`. */
export const itemsToStrings = (
  rows: Array<{ item?: string | null }> | null | undefined,
): string[] => (rows ?? []).map((r) => r?.item ?? "").filter(Boolean);

/**
 * Convert Payload rich-text blocks (from richTextBlocksField) back into the
 * `RichTextBlock[]` shape consumed by components/molecules/RichText.tsx.
 */
export const toRichTextBlocks = (
  blocks:
    | Array<{
        blockType: string;
        text?: string | null;
        variant?: "spaced" | "compact" | null;
        items?: Array<{ item?: string | null }> | null;
      }>
    | null
    | undefined,
): RichTextBlock[] =>
  (blocks ?? []).map((b): RichTextBlock => {
    switch (b.blockType) {
      case "paragraph":
        return { type: "paragraph", text: b.text ?? "" };
      case "list":
        return {
          type: "list",
          items: itemsToStrings(b.items),
          variant: b.variant ?? "spaced",
        };
      case "orderedList":
        return {
          type: "orderedList",
          items: itemsToStrings(b.items),
          variant: b.variant ?? "spaced",
        };
      default:
        return { type: "break" };
    }
  });

/** Normalise a Payload CTA group `{ label, href, external }` to the CTA type. */
export const toCta = (
  cta: { label?: string | null; href?: string | null; external?: boolean | null } | null | undefined,
) =>
  cta && (cta.label || cta.href)
    ? { label: cta.label ?? "", href: cta.href ?? "#", external: cta.external ?? undefined }
    : undefined;
