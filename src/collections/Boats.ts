import type { CollectionConfig } from "payload";
import { imageUploadField } from "../fields/content";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

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
    group: adminGroups.fleet,
    useAsTitle: "name",
    defaultColumns: ["name", "model", "year", "_status"],
    description: "Vessel fleet profiles shown on the Fleet page.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "model", type: "text" },
    { name: "year", type: "text" },
    { name: "description", type: "textarea" },
    ...imageUploadField({ name: "photo", label: "Photo", altName: "photoAlt" }),
    specGroup("specsLeft", "Specifications (left column)"),
    specGroup("specsRight", "Specifications (right column)"),
    {
      name: "mmsi",
      type: "text",
      label: "MMSI number",
      admin: {
        position: "sidebar",
        description: "AIS transponder number — enables live position tracking on map cards.",
      },
    },
    {
      name: "mmsiWarning",
      type: "ui",
      admin: {
        position: "sidebar",
        components: { Field: "@/components/admin/MmsiWarning" },
      },
    },
    {
      name: "lastPosition",
      type: "group",
      label: "Last AIS position",
      admin: {
        description: "Auto-populated by the AIS tracker — no need to edit.",
        position: "sidebar",
      },
      fields: [
        { name: "lat", type: "number" },
        { name: "lon", type: "number" },
        { name: "sog", type: "number", label: "SOG (kn)" },
        { name: "cog", type: "number", label: "COG (°)" },
        { name: "reportedAt", type: "text", label: "Reported at (ISO)" },
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
