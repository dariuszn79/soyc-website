import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: adminGroups.settings,
    description: "Default SEO metadata for the site.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "metadata",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
