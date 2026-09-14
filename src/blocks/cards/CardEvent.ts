import type { Block } from "payload";
import { imageUploadField } from "../../fields/content";

/** → components/molecules/CardEvent.tsx */
export const CardEventBlock: Block = {
  slug: "cardEvent",
  interfaceName: "CardEventBlock",
  labels: { singular: "Card: Event", plural: "Cards: Event" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dates", type: "text" },
    { name: "yacht", type: "text" },
    { name: "model", type: "text" },
    { name: "skipper", type: "text" },
    ...imageUploadField(),
  ],
};
