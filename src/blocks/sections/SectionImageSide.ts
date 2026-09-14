import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** Single-boat row: yacht photo beside CardBoat
 * → components/organisms/SectionImageSide.tsx */
export const SectionImageSideBlock: Block = {
  slug: "sectionImageSide",
  interfaceName: "SectionImageSideBlock",
  labels: { singular: "Section: Boat + Image", plural: "Sections: Boat + Image" },
  fields: [
    ...sectionHeadingFields(),
    {
      name: "boat",
      type: "relationship",
      relationTo: "boats",
      required: true,
      label: "Boat",
    },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Image left", value: "left" },
        { label: "Image right", value: "right" },
      ],
    },
  ],
};
