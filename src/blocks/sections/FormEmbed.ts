import type { Block } from "payload";
import { sectionHeadingFields } from "../../fields/sectionHeading";

/** Embeds a form built in the form-builder plugin (Members & Forms → Forms).
 * → components/organisms/FormEmbed.tsx */
export const FormEmbedBlock: Block = {
  slug: "formEmbed",
  interfaceName: "FormEmbedBlock",
  labels: { singular: "Section: Embedded Form", plural: "Sections: Embedded Form" },
  fields: [
    ...sectionHeadingFields(),
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
      label: "Form",
    },
  ],
};
