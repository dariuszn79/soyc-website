import type { CollectionConfig } from "payload";
import { adminGroups } from "../lib/payload/adminGroups";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "Access / Role", plural: "Access & Roles" },
  admin: {
    group: adminGroups.settings,
    useAsTitle: "email",
    defaultColumns: ["name", "email"],
    description: "Club members and admin staff login accounts.",
  },
  fields: [{ name: "name", type: "text" }],
  timestamps: true,
};
