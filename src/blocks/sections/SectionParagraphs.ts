import type { Block } from "payload";
import { ctaField } from "../../fields/cta";

/** Kicker/heading + paragraph list (+ optional CTA). */
export const SectionParagraphsBlock: Block = {
  slug: "sectionParagraphs",
  interfaceName: "SectionParagraphsBlock",
  labels: { singular: "Section: Paragraphs", plural: "Sections: Paragraphs" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    {
      name: "paragraphs",
      type: "array",
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    ctaField({ required: false }),
  ],
};
