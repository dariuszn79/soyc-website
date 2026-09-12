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
    ...imageUploadField({ name: "image", altName: "alt", label: "Gallery photo", required: true }),
    ...imageUploadField({ name: "overlayImage", altName: "overlayAlt", label: "Overlay graphic (optional)" }),
    {
      name: "totalSlides",
      type: "number",
      defaultValue: 10,
      label: "Pagination dots",
    },
  ],
};
