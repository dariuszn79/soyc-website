import type { CollectionConfig } from "payload";
import { imagePathField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const CruiseEvents: CollectionConfig = {
  slug: "cruise-events",
  labels: { singular: "Cruise Event", plural: "Cruise Events" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "dates", "yacht", "order"],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dates", type: "text" },
    { name: "yacht", type: "text" },
    { name: "model", type: "text" },
    { name: "skipper", type: "text" },
    ...imagePathField({ name: "imageSrc", label: "Image path", altName: "imageAlt" }),
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
