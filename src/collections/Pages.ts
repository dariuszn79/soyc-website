import type { Access, CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";
import { revalidateFrontend } from "../hooks/revalidateFrontend";
import { adminGroups } from "../lib/payload/adminGroups";

/**
 * Pages that are part of the site's fixed routing and must not be deleted
 * (Members Area login, the 404 page). `members-area` is additionally locked
 * against edits — its structure is controlled by code. Seed/local-API
 * operations use `overrideAccess` and are unaffected.
 */
const DELETE_PROTECTED_SLUGS = ["members-area", "page-not-found"];
const UPDATE_PROTECTED_SLUGS = ["members-area"];
const deleteablePagesOnly: Access = () => ({
  slug: { not_equals: DELETE_PROTECTED_SLUGS },
});
const editablePagesOnly: Access = () => ({
  slug: { not_equals: UPDATE_PROTECTED_SLUGS },
});

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: adminGroups.content,
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    preview: (doc) => {
      const slug = doc.slug === 'home' ? '' : doc.slug;
      return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/${slug}`;
    },
    livePreview: {
      url: ({ data }) => {
        const slug = data.slug === 'home' ? '' : data.slug;
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/${slug}`;
      },
    },
  },
  access: {
    read: () => true,
    update: editablePagesOnly,
    delete: deleteablePagesOnly,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1200, // Auto-save every 1.2s for live preview
      },
    },
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Page Title" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "URL Slug",
      admin: {
        position: "sidebar",
        description: 'e.g. "the-club", "fleet", "join". Use "home" for the homepage (route "/").',
      },
    },
    {
      name: "pageSections",
      label: "Page Layout Sections",
      labels: { singular: "Section", plural: "Sections" },
      type: "blocks",
      blocks: pageBlocks,
      admin: {
        description: "Compose the page by adding, reordering and editing sections.",
      },
    },
    {
      name: "nav",
      label: "Navigation",
      type: "group",
      admin: {
        position: "sidebar",
        description: "Add this page to the header and/or footer menus.",
      },
      fields: [
        {
          name: "showIn",
          label: "Show in",
          type: "select",
          hasMany: true,
          options: [
            { label: "Header navigation", value: "header" },
            { label: "Footer links", value: "footer" },
          ],
        },
        {
          name: "navLabel",
          type: "text",
          label: "Navigation label",
          admin: { description: "Defaults to the page title." },
        },
        {
          name: "navOrder",
          type: "number",
          label: "Navigation order",
          admin: { description: "Lower numbers appear first." },
        },
        {
          name: "divider",
          type: "checkbox",
          label: "Separator after item",
          admin: { description: "Show the | separator after this item in the header." },
        },
      ],
    },
    {
      name: "meta",
      label: "SEO / Metadata",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
