import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const FleetLocation: GlobalConfig = {
  slug: "fleet-location",
  label: "Fleet Location",
  admin: {
    group: adminGroups.fleet,
    description: "The fleet's base location / home port map.",
  },
  access: { read: () => true },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "mapAriaLabel", type: "text" },
    { name: "mapSrc", type: "text" },
    { name: "logoSrc", type: "text" },
    { name: "concordeMarkerSrc", type: "text" },
    { name: "speedbirdMarkerSrc", type: "text" },
    { name: "concordeLabel", type: "text" },
    { name: "speedbirdLabel", type: "text" },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
