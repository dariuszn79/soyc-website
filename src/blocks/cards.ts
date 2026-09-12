import type { Block } from "payload";
import { ctaField } from "../fields/cta";
import { headingGroup } from "../fields/content";
import { richTextBlocksField } from "../fields/richTextBlocks";

/** Grid of simple cards, each with a CTA → CardLrg / the-club cards */
export const CardGridBlock: Block = {
  slug: "cardGrid",
  interfaceName: "CardGridBlock",
  labels: { singular: "Section: Card Grid", plural: "Sections: Card Grid" },
  fields: [
    { name: "sectionKicker", type: "text" },
    { name: "sectionHeading", type: "text" },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      fields: [...headingGroup(), ctaField({ required: false })],
    },
  ],
};

/** Grid of rich-text cards → CardLrg with RichText (cruise types) */
export const RichTextCardsBlock: Block = {
  slug: "richTextCards",
  interfaceName: "RichTextCardsBlock",
  labels: { singular: "Section: Rich Text Cards", plural: "Sections: Rich Text Cards" },
  fields: [
    {
      name: "cards",
      type: "array",
      minRows: 1,
      fields: [
        { name: "kicker", type: "text" },
        { name: "heading", type: "text", required: true },
        richTextBlocksField("blocks"),
      ],
    },
  ],
};
