import type { Block } from "payload";
import { ctaField } from "../../fields/cta";
import { imageUploadField } from "../../fields/content";

/**
 * Page header — two-column text + masked photo + optional CTA
 * (Figma node 8:11964). → components/organisms/SectionHeader.tsx
 */
export const SectionHeaderBlock: Block = {
  slug: "sectionHeader",
  interfaceName: "SectionHeaderBlock",
  labels: { singular: "Section: Header", plural: "Sections: Header" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    ...imageUploadField({ label: "Header photo" }),
    ctaField({ required: false }),
  ],
};
