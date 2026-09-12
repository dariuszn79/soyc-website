import type { Block } from "payload";
import { headingGroup } from "../fields/content";

/**
 * People grid (committee / instructors / skippers). Sourced from the `people`
 * collection at render time, filtered by `group`.
 * → SectionHeading + CardPerson grid.
 */
export const PeopleSectionBlock: Block = {
  slug: "peopleSection",
  interfaceName: "PeopleSectionBlock",
  labels: { singular: "Section: People", plural: "Sections: People" },
  fields: [
    ...headingGroup(),
    {
      name: "group",
      type: "select",
      required: true,
      defaultValue: "board",
      options: [
        { label: "Board / Committee", value: "board" },
        { label: "Training instructors", value: "instructors" },
        { label: "Community skippers", value: "skippers" },
      ],
    },
  ],
};
