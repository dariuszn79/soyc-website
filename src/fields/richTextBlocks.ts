import type { Field } from "payload";

/**
 * Blocks field mirroring the existing `RichTextBlock` union
 * (paragraph | list | orderedList | break) consumed by
 * src/components/molecules/RichText.tsx. Stored as Payload blocks; an adapter
 * (src/lib/payload/transform.ts) maps these back to the shape RichText expects.
 */
export const richTextBlocksField = (name = "blocks"): Field => ({
  name,
  label: "Rich text",
  type: "blocks",
  blocks: [
    {
      slug: "paragraph",
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    {
      slug: "list",
      labels: { singular: "Bulleted list", plural: "Bulleted lists" },
      fields: [
        {
          name: "variant",
          type: "select",
          defaultValue: "spaced",
          options: [
            { label: "Spaced", value: "spaced" },
            { label: "Compact", value: "compact" },
          ],
        },
        {
          name: "items",
          type: "array",
          minRows: 1,
          fields: [{ name: "item", type: "text", required: true }],
        },
      ],
    },
    {
      slug: "orderedList",
      labels: { singular: "Numbered list", plural: "Numbered lists" },
      fields: [
        {
          name: "variant",
          type: "select",
          defaultValue: "spaced",
          options: [
            { label: "Spaced", value: "spaced" },
            { label: "Compact", value: "compact" },
          ],
        },
        {
          name: "items",
          type: "array",
          minRows: 1,
          fields: [{ name: "item", type: "text", required: true }],
        },
      ],
    },
    {
      slug: "break",
      labels: { singular: "Break", plural: "Breaks" },
      fields: [],
    },
  ],
});
