import type { Block } from "payload";

/**
 * Membership application form → components/organisms/MembershipApplicationForm.tsx.
 * The form's label/copy config is deeply nested, so it is stored as a
 * structured JSON field matching `MembershipApplicationContent.form`.
 * Submissions are handled by the form-builder plugin.
 * Follow-up: break the form config into first-class fields.
 */
export const MembershipFormBlock: Block = {
  slug: "membershipForm",
  interfaceName: "MembershipFormBlock",
  labels: { singular: "Section: Membership Form", plural: "Sections: Membership Form" },
  fields: [
    {
      name: "form",
      type: "json",
      required: true,
      admin: {
        description:
          "Labels and copy for the membership application form (matches MembershipApplicationContent.form).",
      },
    },
  ],
};
