import type { Field } from "payload";

/**
 * Reusable call-to-action link group. Mirrors the existing `CTA` type
 * ({ label, href, external? }) from src/data/content-types.ts so the seed and
 * frontend components keep working unchanged.
 */
export const ctaField = (
  overrides: { name?: string; label?: string; required?: boolean } = {},
): Field => ({
  name: overrides.name ?? "cta",
  label: overrides.label ?? "Call to action",
  type: "group",
  fields: [
    { name: "label", type: "text", required: overrides.required ?? false },
    { name: "href", type: "text", required: overrides.required ?? false },
    {
      name: "external",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Open in a new tab / treat as an external link." },
    },
  ],
});
