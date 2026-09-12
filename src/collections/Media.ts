import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { adminGroups } from "../lib/payload/adminGroups";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Asset", plural: "Asset Library" },
  admin: {
    group: adminGroups.settings,
    description: "Images, documents, and SVGs used across the site.",
  },
  access: { read: () => true },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [{ name: "alt", type: "text", label: "Alt text / description" }],
  timestamps: true,
};
