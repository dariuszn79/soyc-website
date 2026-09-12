import type { Block } from "payload";

/**
 * Join-us tabbed content → components/organisms/TabsJoinUs.tsx.
 * The panels payload is deeply nested (membership / fees / tester day / gear),
 * so it is stored as a structured JSON field that matches `JoinPageContent`.
 * Follow-up: break panels into first-class fields for finer-grained editing.
 */
export const JoinTabsBlock: Block = {
  slug: "joinTabs",
  interfaceName: "JoinTabsBlock",
  labels: { singular: "Section: Join Tabs", plural: "Sections: Join Tabs" },
  fields: [
    { name: "ariaLabel", type: "text" },
    {
      name: "tabs",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "panels",
      type: "json",
      required: true,
      admin: {
        description:
          "Structured content for the four join tabs (membership, fees, testerDay, gear).",
      },
    },
  ],
};
