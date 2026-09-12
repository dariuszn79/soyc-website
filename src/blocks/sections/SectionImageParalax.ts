import type { Block } from "payload";
import { ctaField } from "../../fields/cta";
import { imageUploadField } from "../../fields/content";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** Photo with parallax + overlapping CardLrg
 * → components/organisms/SectionImageParalax.tsx */
export const SectionImageParalaxBlock: Block = {
  slug: "sectionImageParalax",
  interfaceName: "SectionImageParalaxBlock",
  labels: { singular: "Section: Image Parallax", plural: "Sections: Image Parallax" },
  fields: [
    ...sectionHeadingFields(),
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    ctaField({ required: false }),
    ...imageUploadField(),
    {
      name: "align",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Card right / image left", value: "right" },
        { label: "Card left / image right", value: "left" },
      ],
    },
    {
      name: "variant",
      type: "select",
      defaultValue: "secondary",
      options: [
        { label: "Secondary (dark blue card)", value: "secondary" },
        { label: "Tertiary (white card)", value: "tertiary" },
      ],
    },
  ],
};
