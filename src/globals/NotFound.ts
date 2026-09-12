import type { GlobalConfig } from "payload";
import { ctaField } from "../fields/cta";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const NotFound: GlobalConfig = {
  slug: "page-not-found",
  label: "404 Page",
  access: { read: () => true },
  fields: [
    { name: "label", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    ctaField({ name: "action", label: "Action", required: false }),
  ],
  hooks: { afterChange: [revalidateFrontend] },
};
