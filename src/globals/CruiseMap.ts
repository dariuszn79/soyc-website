import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

export const CruiseMap: GlobalConfig = {
  slug: "cruise-map",
  label: "Cruise Map",
  admin: {
    group: adminGroups.cruises,
    description: "Interactive route tracker map shown on the Cruises page.",
  },
  access: { read: () => true },
  fields: [
    { name: "mapSrc", type: "text" },
    { name: "mapAlt", type: "text" },
    { name: "logoSrc", type: "text" },
    { name: "speedbirdMarkerSrc", type: "text" },
    { name: "speedbirdMarkerAlt", type: "text" },
    { name: "concordeMarkerSrc", type: "text" },
    { name: "concordeMarkerAlt", type: "text" },
    { name: "concordeLabel", type: "text" },
    { name: "speedbirdLabel", type: "text" },
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
