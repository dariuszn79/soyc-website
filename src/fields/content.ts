import type { Field } from "payload";

/**
 * The kicker / heading / body trio used across most SOYC sections. Returned as
 * an array so blocks can spread it: `fields: [...headingGroup(), ...]`.
 */
export const headingGroup = (
  opts: { kicker?: boolean; body?: boolean; bodyType?: "text" | "textarea" } = {},
): Field[] => {
  const { kicker = true, body = true, bodyType = "textarea" } = opts;
  const fields: Field[] = [];
  if (kicker) fields.push({ name: "kicker", type: "text" });
  fields.push({ name: "heading", type: "text", required: true });
  if (body) fields.push({ name: "body", type: bodyType } as Field);
  return fields;
};

/**
 * Image picker backed by the Media library (upload relationship) plus a
 * free-text alt override. Renderers should resolve the media doc to its URL.
 */
export const imageUploadField = (
  overrides: {
    name?: string;
    label?: string;
    altName?: string;
    required?: boolean;
  } = {},
): Field[] => [
  {
    name: overrides.name ?? "image",
    label: overrides.label ?? "Image",
    type: "upload",
    relationTo: "media",
    required: overrides.required ?? false,
  },
  {
    name: overrides.altName ?? "imageAlt",
    label: "Image alt text",
    type: "text",
    admin: {
      description: "Accessible description. Falls back to the asset's own alt text.",
    },
  },
];

/**
 * Image reference stored as a /public path string — used for fixed site
 * chrome (header/footer artwork) where the asset library is unnecessary.
 */
export const imagePathField = (
  overrides: { name?: string; label?: string; altName?: string } = {},
): Field[] => [
  {
    name: overrides.name ?? "imageSrc",
    label: overrides.label ?? "Image path",
    type: "text",
    admin: {
      description:
        "Path to an asset in /public (e.g. /images/home/cruises.png).",
    },
  },
  { name: overrides.altName ?? "imageAlt", label: "Image alt text", type: "text" },
];
