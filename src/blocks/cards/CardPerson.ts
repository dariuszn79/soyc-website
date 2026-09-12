import type { Block } from "payload";

/** Person card — picks a person from the People collection.
 * → components/molecules/CardPerson.tsx */
export const CardPersonBlock: Block = {
  slug: "cardPerson",
  interfaceName: "CardPersonBlock",
  labels: { singular: "Card: Person", plural: "Cards: Person" },
  fields: [
    {
      name: "person",
      type: "relationship",
      relationTo: "people",
      required: true,
      label: "Person",
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "club",
      options: [
        { label: "Club", value: "club" },
        { label: "Default", value: "default" },
      ],
    },
  ],
};
