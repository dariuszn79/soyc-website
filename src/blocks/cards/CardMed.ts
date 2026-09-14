import type { Block } from "payload";
import { richTextBlocksField } from "../../fields/richTextBlocks";

/** → components/molecules/CardMed.tsx */
export const CardMedBlock: Block = {
  slug: "cardMed",
  interfaceName: "CardMedBlock",
  labels: { singular: "Card: Medium", plural: "Cards: Medium" },
  fields: [
    { name: "heading", type: "text", required: true },
    richTextBlocksField("body"),
    {
      name: "fullWidth",
      type: "checkbox",
      defaultValue: false,
      label: "Span full width",
    },
  ],
};
