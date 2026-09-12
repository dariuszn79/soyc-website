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
 * Image reference. To keep the current design byte-identical we store image
 * paths as text pointing at existing /public assets. A `media` upload
 * relationship can be layered on later without breaking these.
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
        "Path to an asset in /public (e.g. /figmaAssets/home/cruises.png).",
    },
  },
  { name: overrides.altName ?? "imageAlt", label: "Image alt text", type: "text" },
];
