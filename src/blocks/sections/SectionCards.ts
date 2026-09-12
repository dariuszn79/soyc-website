import type { Block } from "payload";
import { cardBlocks } from "../cards";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** Grid of cards — pick any card types. */
export const SectionCardsBlock: Block = {
  slug: "sectionCards",
  interfaceName: "SectionCardsBlock",
  labels: { singular: "Section: Cards", plural: "Sections: Cards" },
  fields: [
    ...sectionHeadingFields(),
    {
      name: "columns",
      type: "select",
      defaultValue: "2",
      options: [
        { label: "2 columns", value: "2" },
        { label: "3 columns", value: "3" },
      ],
    },
    {
      name: "cards",
      type: "blocks",
      minRows: 1,
      blocks: cardBlocks,
      labels: { singular: "Card", plural: "Cards" },
    },
  ],
};
