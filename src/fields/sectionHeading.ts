import type { Field } from "payload";

/**
 * Optional section heading — every section can (but doesn't have to) show a
 * SectionHeading (kicker + heading + body) above its content. Spread into a
 * block's fields: `fields: [...sectionHeadingFields(), ...]`.
 *
 * Renders `components/organisms/SectionHeading.tsx` when `showHeading` is on.
 */
export const sectionHeadingFields = (): Field[] => [
  {
    name: "showHeading",
    label: "Show heading above this section",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "sectionHeading",
    label: "Section heading",
    type: "group",
    admin: {
      condition: (_data, siblingData) => Boolean(siblingData?.showHeading),
    },
    fields: [
      { name: "kicker", type: "text" },
      { name: "heading", type: "text", required: true },
      { name: "body", type: "textarea" },
    ],
  },
];
