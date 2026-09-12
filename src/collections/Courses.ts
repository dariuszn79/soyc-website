import type { CollectionConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "All Levels", value: "All Levels" },
];

const priceFields = [
  { name: "from", type: "text" as const },
  { name: "til", type: "text" as const },
  { name: "amount", type: "text" as const },
  { name: "duration", type: "text" as const },
];

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    group: adminGroups.training,
    useAsTitle: "title",
    defaultColumns: ["title", "level", "tab", "order"],
    description: "Course curriculum (e.g. Competent Crew, Day Skipper).",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "tab",
      type: "select",
      required: true,
      admin: { position: "sidebar", description: "Which level tab this course appears under." },
      options: levelOptions,
    },
    { name: "level", type: "select", options: levelOptions },
    { name: "desc", type: "textarea" },
    {
      name: "items",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "prices",
      type: "array",
      minRows: 0,
      maxRows: 2,
      fields: priceFields,
    },
    { name: "notes", type: "textarea" },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
