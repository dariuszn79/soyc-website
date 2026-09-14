import type { Block } from "payload";

/** Centred red CTA band ("Thinking of joining?") — content fields optional,
 * the component has built-in defaults.
 * → components/organisms/SectionCenter.tsx */
export const SectionCenterBlock: Block = {
  slug: "sectionCenter",
  interfaceName: "SectionCenterBlock",
  labels: { singular: "Section: Centered CTA", plural: "Sections: Centered CTA" },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "ctaLabel", type: "text", label: "Button label" },
    { name: "ctaHref", type: "text", label: "Button link" },
  ],
};
