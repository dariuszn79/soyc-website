import type { Block } from "payload";

/** Yacht spec card — picks a vessel from the Boats collection.
 * → components/molecules/CardBoat.tsx */
export const CardBoatBlock: Block = {
  slug: "cardBoat",
  interfaceName: "CardBoatBlock",
  labels: { singular: "Card: Boat", plural: "Cards: Boat" },
  fields: [
    {
      name: "boat",
      type: "relationship",
      relationTo: "boats",
      required: true,
      label: "Boat",
    },
  ],
};
