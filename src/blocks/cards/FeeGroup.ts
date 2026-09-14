import type { Block } from "payload";
import { FeeItemBlock } from "./FeeItem";

/**
 * Fee group — a heading/body/note column beside a list of feeItem rows
 * (1/3 + 2/3 split, matching the join page's fee tables). Always spans the
 * full width of its parent grid.
 */
export const FeeGroupBlock: Block = {
  slug: "feeGroup",
  interfaceName: "FeeGroupBlock",
  labels: { singular: "Card: Fee Group", plural: "Cards: Fee Group" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "note", type: "textarea" },
    {
      name: "fees",
      type: "blocks",
      blocks: [FeeItemBlock],
      labels: { singular: "Fee", plural: "Fees" },
    },
  ],
};
