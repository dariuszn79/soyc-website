import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
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
    { name: "coordinates", type: "text" },
    { name: "location", type: "text" },
    { name: "contactHeading", type: "text" },
    { name: "email", type: "text" },
    { name: "facebookLabel", type: "text" },
    { name: "facebookUrl", type: "text" },
    { name: "logoAlt", type: "text" },
    { name: "copyright", type: "text" },
    { name: "registration", type: "text" },
    { name: "headerJoinLabel", type: "text" },
    { name: "membersLabel", type: "text" },
    { name: "primaryNavLabel", type: "text" },
    { name: "mobileNavLabel", type: "text" },
    { name: "openNavLabel", type: "text" },
    { name: "closeNavLabel", type: "text" },
    { name: "logoHref", type: "text" },
    { name: "logoSrc", type: "text" },
    { name: "footerBackgroundSrc", type: "text" },
    { name: "footerCompassSrc", type: "text" },
    { name: "footerLogoSrc", type: "text" },
    { name: "siteFooterBackgroundSrc", type: "text" },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
