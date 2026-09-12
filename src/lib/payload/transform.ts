import type { Boat, Person, RichTextBlock } from "@/data/content-types";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDoc = any;

/** Resolve an upload field (media doc | id | plain path) to a URL string. */
export const toMediaSrc = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : ((v as { url?: string | null } | null)?.url ?? fallback);

/** Resolve the alt text of an upload field (or its sibling alt field). */
export const toMediaAlt = (v: unknown, fallback = ""): string =>
  ((v as { alt?: string | null } | null)?.alt ?? fallback) || fallback;

/** Map a Boats collection doc (photo = media upload) to the frontend Boat shape. */
export const toBoat = (b: AnyDoc): Boat => ({
  name: b?.name ?? "",
  model: b?.model ?? "",
  year: b?.year ?? "",
  description: b?.description ?? "",
  photo: toMediaSrc(b?.photo),
  photoAlt: b?.photoAlt || toMediaAlt(b?.photo),
  specsLeft: b?.specsLeft ?? [],
  specsRight: b?.specsRight ?? [],
});

/** Map a People collection doc to the frontend Person shape. */
export const toPerson = (p: AnyDoc): Person => ({
  dept: p?.dept ?? "",
  name: p?.name ?? "",
  title: p?.title ?? "",
  photo: toMediaSrc(p?.photo),
  email: p?.email ?? "",
});

/** Map a cruise/training event doc to CardEvent props. */
export const toEventCard = (e: AnyDoc) => ({
  title: e?.title ?? "",
  dates: e?.dates ?? "",
  yacht: e?.yacht ?? "",
  model: e?.model ?? "",
  skipper: e?.skipper ?? "",
  imageSrc: toMediaSrc(e?.imageSrc ?? e?.image) || undefined,
  imageAlt: e?.imageAlt || toMediaAlt(e?.imageSrc ?? e?.image),
});
