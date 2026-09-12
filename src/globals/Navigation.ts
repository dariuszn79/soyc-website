import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: { read: () => true },
  fields: [
    {
      name: "primaryNavItems",
      label: "Primary navigation",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "divider", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "footerNavLinks",
      label: "Footer navigation",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
