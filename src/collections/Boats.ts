import type { CollectionConfig } from "payload";
import { imagePathField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

const specGroup = (name: string, label: string) => ({
  name,
  label,
  type: "array" as const,
  fields: [
    { name: "label", type: "text" as const, required: true },
    { name: "value", type: "text" as const, required: true },
  ],
});

export const Boats: CollectionConfig = {
  slug: "boats",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "model", "year", "_status"],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "model", type: "text" },
    { name: "year", type: "text" },
    { name: "description", type: "textarea" },
    ...imagePathField({ name: "photo", label: "Photo path", altName: "photoAlt" }),
    specGroup("specsLeft", "Specifications (left column)"),
    specGroup("specsRight", "Specifications (right column)"),
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
