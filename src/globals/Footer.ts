import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

/**
 * Footer — contact details, coordinates, artwork and extra links. Links to
 * pages come from Pages (each page's Navigation sidebar group); extraLinks
 * covers non-page items such as Sitemap or Privacy.
 */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: adminGroups.content,
    description:
      "Contact details, artwork and extra links. Page links come from pages marked “Show in footer”.",
  },
  access: { read: () => true },
  fields: [
    { name: "contactHeading", type: "text" },
    { name: "email", type: "text" },
    { name: "facebookLabel", type: "text" },
    { name: "facebookUrl", type: "text" },
    { name: "coordinates", type: "text" },
    { name: "location", type: "text" },
    { name: "copyright", type: "text" },
    { name: "registration", type: "text" },
    { name: "footerLogoSrc", type: "text", label: "Footer logo path" },
    { name: "footerBackgroundSrc", type: "text", label: "Footer background path" },
    { name: "footerCompassSrc", type: "text", label: "Compass graphic path" },
    { name: "siteFooterBackgroundSrc", type: "text", label: "Inner-footer map path" },
    {
      name: "extraLinks",
      label: "Extra footer links (non-page)",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
