import type { Block } from "payload";
import { ctaField } from "../fields/cta";
import { headingGroup, imagePathField } from "../fields/content";

/** Image-beside-text section → HomeContent / SectionImageSide */
export const SectionImageSideBlock: Block = {
  slug: "sectionImageSide",
  interfaceName: "SectionImageSideBlock",
  labels: { singular: "Section: Image + Text", plural: "Sections: Image + Text" },
  fields: [
    ...headingGroup(),
    ctaField({ required: false }),
    ...imagePathField({ name: "image", label: "Image path" }),
    {
      name: "align",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Image right", value: "right" },
        { label: "Image left", value: "left" },
      ],
    },
    {
      name: "variant",
      type: "select",
      defaultValue: "secondary",
      options: [
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
      ],
    },
  ],
};

/** Full-bleed CTA band → SectionBackgroundImage */
export const SectionBackgroundImageBlock: Block = {
  slug: "sectionBackgroundImage",
  interfaceName: "SectionBackgroundImageBlock",
  labels: { singular: "Section: CTA Band", plural: "Sections: CTA Band" },
  fields: [
    ...headingGroup(),
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    ...imagePathField({ name: "imageSrc", label: "Background image path" }),
  ],
};

/** Generic kicker/heading/body heading block → SectionHeading */
export const SectionHeadingBlock: Block = {
  slug: "sectionHeading",
  interfaceName: "SectionHeadingBlock",
  labels: { singular: "Section: Heading", plural: "Sections: Heading" },
  fields: [
    ...headingGroup(),
    {
      name: "as",
      type: "select",
      defaultValue: "h2",
      options: ["h1", "h2", "h3"].map((v) => ({ label: v, value: v })),
    },
  ],
};

/** Simple content block (members / not-found) → label, heading, body, actions */
export const SimpleContentBlock: Block = {
  slug: "simpleContent",
  interfaceName: "SimpleContentBlock",
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
