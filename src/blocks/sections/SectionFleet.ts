import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** All boats from the Boats collection, rendered as alternating
 * SectionImageSide rows. */
export const SectionFleetBlock: Block = {
  slug: "sectionFleet",
  interfaceName: "SectionFleetBlock",
  labels: { singular: "Section: Fleet List", plural: "Sections: Fleet List" },
  fields: [...sectionHeadingFields()],
};
