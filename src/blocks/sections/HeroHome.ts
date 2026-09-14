import type { Block } from "payload";
import { imageUploadField } from "../../fields/content";

/** Home page hero → components/organisms/HeroHome.tsx */
export const HeroHomeBlock: Block = {
  slug: "heroHome",
  interfaceName: "HeroHomeBlock",
  labels: { singular: "Hero (Home)", plural: "Heroes (Home)" },
  fields: [
    { name: "kicker", type: "text" },
    {
      name: "heading",
      type: "textarea",
      required: true,
      admin: { description: "Use line breaks for multi-line headings." },
    },
    { name: "coordinates", type: "text" },
    ...imageUploadField({ name: "backgroundImage", altName: "backgroundAlt", label: "Background image" }),
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "actions",
      type: "array",
      maxRows: 2,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
