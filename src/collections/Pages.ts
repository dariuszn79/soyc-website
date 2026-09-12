import type { CollectionConfig } from "payload";
import { layoutBlocks } from "../blocks";
import { revalidateFrontend } from "../hooks/revalidateFrontend";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
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
  access: { read: () => true },
  versions: {
    drafts: {
      autosave: {
        interval: 1200, // Auto-save every 1.2s for live preview
      },
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: 'URL slug. Use "home" for the homepage (route "/").',
      },
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
    {
      name: "layout",
      label: "Page sections",
      type: "blocks",
      blocks: layoutBlocks,
      admin: {
        description: "Compose the page by adding, reordering and editing sections.",
      },
    },
  ],
  hooks: { afterChange: [revalidateFrontend], afterDelete: [revalidateFrontend] },
  timestamps: true,
};
