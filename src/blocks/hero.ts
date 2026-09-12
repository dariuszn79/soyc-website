import type { Block } from "payload";
import { ctaField } from "../fields/cta";
import { imagePathField } from "../fields/content";

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
    ...imagePathField({ name: "backgroundImage", altName: "backgroundAlt", label: "Background image path" }),
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
      labels: { singular: "Action", plural: "Actions" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "external", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};

/** Standard page hero → components/molecules/SectionHeading.tsx / HeroImage */
export const HeroBasicBlock: Block = {
  slug: "heroBasic",
  interfaceName: "HeroBasicBlock",
  labels: { singular: "Hero (Standard)", plural: "Heroes (Standard)" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    ...imagePathField(),
    ctaField({ required: false }),
  ],
};
