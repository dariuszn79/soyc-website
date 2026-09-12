/**
 * Sidebar grouping for the Payload admin dashboard. Entities sharing a group
 * appear under a single collapsible section, ordered by first occurrence in
 * the `collections` / `globals` arrays in payload.config.ts.
 */
export const adminGroups = {
  content: "↪︎ Content & Pages",
  fleet: "↪︎ The Fleet",
  cruises: "↪︎ Cruises",
  training: "↪︎ Training",
  members: "↪︎ Members & Forms",
  settings: "↪︎ Settings & Utility",
} as const;
