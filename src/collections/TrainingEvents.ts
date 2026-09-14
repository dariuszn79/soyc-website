import type { CollectionConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const TrainingEvents: CollectionConfig = {
  slug: "training-events",
  labels: { singular: "Training Date", plural: "Training Dates" },
  admin: {
    group: adminGroups.training,
    useAsTitle: "title",
    defaultColumns: ["title", "dates", "yacht", "order"],
    description: "Scheduled training calendar entries and course slots.",
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
