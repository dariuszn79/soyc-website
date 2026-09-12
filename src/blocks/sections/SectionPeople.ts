import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** CardPerson grid sourced from the People collection, filtered by group. */
export const SectionPeopleBlock: Block = {
  slug: "sectionPeople",
  interfaceName: "SectionPeopleBlock",
  labels: { singular: "Section: People", plural: "Sections: People" },
  fields: [
    ...sectionHeadingFields(),
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
