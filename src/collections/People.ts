import type { CollectionConfig, Field } from "payload";
import { imageUploadField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

/** People section groups a person can belong to (multiple allowed). */
const groupFlags = [
  { name: "isCommittee", label: "Committee" },
  { name: "isClubSkipper", label: "Club Skipper" },
  { name: "isInstructor", label: "Instructor" },
] as const;

export const People: CollectionConfig = {
  slug: "people",
  labels: { singular: "Person", plural: "People" },
  admin: {
    group: adminGroups.settings,
    useAsTitle: "name",
    defaultColumns: ["name", "title", "qualification", "order"],
    description:
      "Committee members, club skippers, and instructors shown on the site. A person can appear in several groups.",
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
      name: "qualification",
      type: "select",
      admin: { position: "sidebar" },
      options: [
        "RYA Day Skipper",
        "RYA Coastal Skipper",
        "RYA Yachtmaster Coastal",
        "RYA Yachtmaster Offshore",
        "RYA Yachtmaster Ocean",
      ],
    },
    ...groupFlags.map(
      (g): Field => ({
        name: g.name,
        label: g.label,
        type: "checkbox",
        defaultValue: false,
        admin: { position: "sidebar" },
      }),
    ),
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (ascending)." },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
