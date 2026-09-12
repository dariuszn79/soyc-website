import type { Block } from "payload";

/** Fleet home-port map — content comes from the Fleet Location global.
 * → components/organisms/SectionFleetLocation.tsx */
export const SectionFleetLocationBlock: Block = {
  slug: "sectionFleetLocation",
  interfaceName: "SectionFleetLocationBlock",
  labels: { singular: "Section: Fleet Location", plural: "Sections: Fleet Location" },
  fields: [
    {
      name: "flush",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Remove outer padding (edge-to-edge)." },
    },
  ],
};
