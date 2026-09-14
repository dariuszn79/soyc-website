import type { Block } from "payload";

/** Centred label/heading/body + action buttons (members area, error pages).
 * → components/organisms/SectionContent.tsx */
export const SectionContentBlock: Block = {
  slug: "sectionContent",
  interfaceName: "SectionContentBlock",
  labels: { singular: "Section: Simple Content", plural: "Sections: Simple Content" },
  fields: [
    { name: "label", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "actions",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "external", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
