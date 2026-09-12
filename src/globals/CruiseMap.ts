import type { GlobalConfig } from "payload";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const CruiseMap: GlobalConfig = {
  slug: "cruise-map",
  label: "Cruise Map",
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
