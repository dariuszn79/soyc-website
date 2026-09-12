import type { CollectionConfig } from "payload";
import { imageUploadField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const CruiseEvents: CollectionConfig = {
  slug: "cruise-events",
  labels: { singular: "Cruise Event", plural: "Cruise Events" },
  admin: {
    group: adminGroups.cruises,
    useAsTitle: "title",
    defaultColumns: ["title", "dates", "yacht", "order"],
    description: "Upcoming club trips and cruise logs.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dates", type: "text" },
    { name: "yacht", type: "text" },
    { name: "model", type: "text" },
    { name: "skipper", type: "text" },
    ...imageUploadField({ name: "imageSrc", label: "Photo", altName: "imageAlt" }),
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
