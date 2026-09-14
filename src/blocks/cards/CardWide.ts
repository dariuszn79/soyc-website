import type { Block } from "payload";

/** Heading-only divider card → components/molecules/CardWide.tsx */
export const CardWideBlock: Block = {
  slug: "cardWide",
  interfaceName: "CardWideBlock",
  labels: { singular: "Card: Wide", plural: "Cards: Wide" },
  fields: [
    { name: "label", type: "text" },
    { name: "heading", type: "text", required: true },
  ],
};
