import type { CollectionConfig } from "payload";
import { imageUploadField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const People: CollectionConfig = {
  slug: "people",
  labels: { singular: "Person", plural: "People" },
  admin: {
    group: adminGroups.settings,
    useAsTitle: "name",
    defaultColumns: ["name", "title", "group", "order"],
    description: "Committee members, staff, and instructors shown on the site.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "title", type: "text" },
    { name: "dept", type: "text" },
    { name: "email", type: "text" },
    ...imageUploadField({ name: "photo", label: "Photo", altName: "photoAlt" }),
    {
      name: "group",
      type: "select",
      required: true,
      defaultValue: "board",
      admin: { position: "sidebar" },
      options: [
        { label: "Board / Committee", value: "board" },
        { label: "Training instructors", value: "instructors" },
        { label: "Community skippers", value: "skippers" },
      ],
    },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
