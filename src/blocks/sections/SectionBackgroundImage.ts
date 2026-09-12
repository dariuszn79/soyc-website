import type { Block } from "payload";
import { imageUploadField } from "../../fields/content";

/** Full-bleed CTA band over a background photo
 * → components/organisms/SectionBackgroundImage.tsx */
export const SectionBackgroundImageBlock: Block = {
  slug: "sectionBackgroundImage",
  interfaceName: "SectionBackgroundImageBlock",
  labels: { singular: "Section: CTA Band", plural: "Sections: CTA Band" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    ...imageUploadField({ label: "Background image" }),
  ],
};
