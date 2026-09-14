import type { Block } from "payload";

/**
 * Standalone text heading — kicker + heading + body, no image
 * (Figma node 73:16903). → components/organisms/SectionHeading.tsx
 */
export const SectionHeadingBlock: Block = {
  slug: "sectionHeading",
  interfaceName: "SectionHeadingBlock",
  labels: { singular: "Section: Heading", plural: "Sections: Heading" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "as",
      type: "select",
      defaultValue: "h2",
      options: ["h1", "h2", "h3"].map((v) => ({ label: v, value: v })),
    },
  ],
};
