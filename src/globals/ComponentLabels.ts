import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const ComponentLabels: GlobalConfig = {
  slug: "component-labels",
  label: "Component Labels",
  admin: {
    group: adminGroups.settings,
    description: "Reusable UI text fragments and micro-copy (button labels, card labels).",
  },
  access: { read: () => true },
  fields: [
    {
      name: "cardBoat",
      type: "group",
      fields: [
        { name: "kicker", type: "text" },
        { name: "built", type: "text" },
        { name: "specifications", type: "text" },
      ],
    },
    {
      name: "cardCourse",
      type: "group",
      fields: [
        { name: "from", type: "text" },
        { name: "till", type: "text" },
        { name: "notes", type: "text" },
      ],
    },
    {
      name: "cardEvent",
      type: "group",
      fields: [{ name: "skipper", type: "text" }],
    },
    {
      name: "cruiseCarousel",
      type: "group",
      fields: [
        { name: "previous", type: "text" },
        { name: "next", type: "text" },
        { name: "arrowSrc", type: "text" },
      ],
    },
    {
      name: "gallery",
      type: "group",
      fields: [
        { name: "previous", type: "text" },
        { name: "next", type: "text" },
        { name: "previousIcon", type: "text" },
        { name: "nextIcon", type: "text" },
      ],
    },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
