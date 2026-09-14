import type { Block } from "payload";
import { imageUploadField } from "../../fields/content";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** Full-width photo carousel display → components/organisms/SectionGallery.tsx */
export const SectionGalleryBlock: Block = {
  slug: "sectionGallery",
  interfaceName: "SectionGalleryBlock",
  labels: { singular: "Section: Gallery", plural: "Sections: Gallery" },
  fields: [
    ...sectionHeadingFields(),
    {
      name: "images",
      label: "Gallery photos",
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        ...imageUploadField({ name: "image", altName: "alt", label: "Photo", required: true }),
      ],
    },
    ...imageUploadField({ name: "overlayImage", altName: "overlayAlt", label: "Overlay graphic (optional)" }),
  ],
};
