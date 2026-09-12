import type { Block } from "payload";
import { cardBlocks } from "../cards";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/**
 * Universal tabbed section — sticky tab bar, each tab holds either
 * hand-picked cards or cards sourced from a collection.
 * → components/organisms/SectionTabs.tsx (StickyTabs).
 */
export const SectionTabsBlock: Block = {
  slug: "sectionTabs",
  interfaceName: "SectionTabsBlock",
  labels: { singular: "Section: Tabs", plural: "Sections: Tabs" },
  fields: [
    ...sectionHeadingFields(),
    { name: "ariaLabel", type: "text", label: "Tab bar accessibility label" },
    {
      name: "tabs",
      type: "array",
      minRows: 1,
      labels: { singular: "Tab", plural: "Tabs" },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "layout",
          type: "select",
          defaultValue: "grid-3",
          options: [
            { label: "2 Columns", value: "grid-2" },
            { label: "3 Columns", value: "grid-3" },
            { label: "4 Columns", value: "grid-4" },
            { label: "Stacked", value: "stacked" },
          ],
        },
        ...sectionHeadingFields(),
        {
          name: "content",
          type: "blocks",
          blocks: cardBlocks,
          labels: { singular: "Card", plural: "Cards" },
        },
      ],
    },
    { name: "emptyMessage", type: "text", label: "Message shown when a tab is empty" },
    { name: "footerNote", type: "textarea", label: "Note shown under the tabs" },
  ],
};
