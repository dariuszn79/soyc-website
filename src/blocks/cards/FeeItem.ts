import type { Block } from "payload";

/** Single membership/sailing fee row → components/molecules/FeeItem.tsx */
export const FeeItemBlock: Block = {
  slug: "feeItem",
  interfaceName: "FeeItemBlock",
  labels: { singular: "Card: Fee Row", plural: "Cards: Fee Row" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "price", type: "text" },
    { name: "unit", type: "text" },
    { name: "description", type: "textarea" },
  ],
};
