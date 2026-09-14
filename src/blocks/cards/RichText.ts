import type { Block } from "payload";
import { richTextBlocksField } from "../../fields/richTextBlocks";

/** Freeform rich text (paragraphs, lists) inside a tab or card grid —
 * no card chrome. → components/molecules/RichText.tsx */
export const RichTextBlockDef: Block = {
  slug: "richText",
  interfaceName: "RichTextContentBlock",
  labels: { singular: "Rich Text", plural: "Rich Text" },
  fields: [
    richTextBlocksField("body"),
    {
      name: "size",
      type: "select",
      defaultValue: "default",
      label: "Text size",
      options: [
        { label: "Default", value: "default" },
        { label: "Lead (large intro text)", value: "lead" },
      ],
    },
  ],
};
