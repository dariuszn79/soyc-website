import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** CardEvent list sourced from a collection — grid or horizontal carousel. */
export const SectionEventsBlock: Block = {
  slug: "sectionEvents",
  interfaceName: "SectionEventsBlock",
  labels: { singular: "Section: Events", plural: "Sections: Events" },
  fields: [
    ...sectionHeadingFields(),
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "training-events",
      options: [
        { label: "Training dates", value: "training-events" },
        { label: "Cruise events", value: "cruise-events" },
      ],
    },
    {
      name: "display",
      type: "select",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Horizontal carousel", value: "carousel" },
      ],
    },
  ],
};
