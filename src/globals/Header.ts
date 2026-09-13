import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

/**
 * Header — logo, nav labels and the two action buttons. The navigation items
 * themselves are generated from Pages (each page's Navigation sidebar group).
 */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  admin: {
    group: adminGroups.content,
    description:
      "Logo and header buttons. Navigation links are created automatically from pages marked “Show in header” on each page.",
  },
  access: { read: () => true },
  fields: [
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
    {
      name: "logoAlt",
      type: "text",
      label: "Logo alt text",
      admin: {
        description:
          "Accessible description. Falls back to the asset's own alt text.",
      },
    },
    { name: "logoHref", type: "text", label: "Logo link", defaultValue: "/" },
    {
      name: "headerJoinLabel",
      type: "text",
      label: "Join button label",
    },
    {
      name: "joinHref",
      type: "text",
      label: "Join button link",
      defaultValue: "/join",
    },
    {
      name: "membersLabel",
      type: "text",
      label: "Members button label",
    },
    {
      name: "membersHref",
      type: "text",
      label: "Members button link",
      defaultValue: "/members-area",
    },
    { name: "primaryNavLabel", type: "text", label: "Nav aria-label (desktop)" },
    { name: "mobileNavLabel", type: "text", label: "Nav aria-label (mobile)" },
    { name: "openNavLabel", type: "text", label: "Open menu aria-label" },
    { name: "closeNavLabel", type: "text", label: "Close menu aria-label" },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
