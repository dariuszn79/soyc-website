import type { CollectionConfig } from "payload";
import { imagePathField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const People: CollectionConfig = {
  slug: "people",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "group", "order"],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "title", type: "text" },
    { name: "dept", type: "text" },
    { name: "email", type: "text" },
    ...imagePathField({ name: "photo", label: "Photo path", altName: "photoAlt" }),
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
