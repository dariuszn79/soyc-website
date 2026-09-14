import type { Block } from "payload";
import { ctaField } from "../../fields/cta";
import { richTextBlocksField } from "../../fields/richTextBlocks";

/** → components/molecules/CardLrg.tsx */
export const CardLrgBlock: Block = {
  slug: "cardLrg",
  interfaceName: "CardLrgBlock",
  labels: { singular: "Card: Large", plural: "Cards: Large" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    richTextBlocksField("body"),
    ctaField({ required: false }),
    {
      name: "variant",
      type: "select",
      defaultValue: "tertiary",
      options: [
        { label: "Tertiary (white)", value: "tertiary" },
        { label: "Secondary (dark blue)", value: "secondary" },
        { label: "Primary (red)", value: "primary" },
      ],
    },
    {
      name: "bordered",
      type: "checkbox",
      defaultValue: false,
      label: "Bordered card",
      admin: { description: "Draw a hairline border around the card." },
    },
    {
      name: "fullWidth",
      type: "checkbox",
      defaultValue: false,
      label: "Span full width",
    },
  ],
};
