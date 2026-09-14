import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** CardPerson grid sourced from the People collection, filtered by group flag. */
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
      defaultValue: "committee",
      options: [
        { label: "Committee", value: "committee" },
        { label: "Instructors", value: "instructors" },
        { label: "Club Skippers", value: "skippers" },
      ],
    },
  ],
};
