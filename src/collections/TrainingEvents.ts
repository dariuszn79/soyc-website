import type { CollectionConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const TrainingEvents: CollectionConfig = {
  slug: "training-events",
  labels: { singular: "Training Event", plural: "Training Events" },
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
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
