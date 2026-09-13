import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import sharp from "sharp";

import { Pages } from "./collections/Pages";
import { Boats } from "./collections/Boats";
import { CruiseEvents } from "./collections/CruiseEvents";
import { Courses } from "./collections/Courses";
import { TrainingEvents } from "./collections/TrainingEvents";
import { Users } from "./collections/Users";
import { People } from "./collections/People";
import { Media } from "./collections/Media";

import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { FleetLocation } from "./globals/FleetLocation";
import { CruiseMap } from "./globals/CruiseMap";
import { SiteSettings } from "./globals/SiteSettings";

import { adminGroups } from "./lib/payload/adminGroups";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Collections/globals are ordered so that sidebar groups appear in a
// content-first order: Content & Pages → The Fleet → Cruises → Training →
// Members & Forms → Settings & Utility.
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: "— SOYC Admin" },
    components: {
      // Bold collection/global labels in the sidebar.
      providers: [{ path: "@/components/admin/AdminStyles" }],
    },
    livePreview: {
      collections: ["pages"],
    },
  },
  editor: lexicalEditor(),
  collections: [
    Pages,
    Boats,
    CruiseEvents,
    Courses,
    TrainingEvents,
    Users,
    People,
    Media,
  ],
  globals: [
    Header,
    Footer,
    FleetLocation,
    CruiseMap,
    SiteSettings,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: { rejectUnauthorized: false },
      // The DB is fronted by a session-mode pooler (max ~15 clients total).
      // Keep each process's pool small so dev workers + schema introspection
      // don't exhaust it.
      max: 4,
    },
  }),
  plugins: [
    formBuilderPlugin({
      fields: { payment: false },
      formOverrides: {
        admin: {
          group: adminGroups.members,
          description: "Form templates built with the visual form builder (e.g. the membership application).",
        },
        labels: { singular: "Form", plural: "Forms" },
      },
      formSubmissionOverrides: {
        admin: {
          group: adminGroups.members,
          description: "Entries received from website forms.",
        },
        labels: { singular: "Form Entry", plural: "Form Entries" },
      },
    }),
    // Nav groups render in first-occurrence order across the collections
    // array. The form builder appends forms/form-submissions last, which would
    // put "↪︎ Forms" after "↪︎ Settings" — move them ahead of `users` so the
    // groups read: … Forms → Settings.
    (config) => {
      const collections = config.collections ?? [];
      const moved = collections.filter((c) => c.slug === "forms" || c.slug === "form-submissions");
      const rest = collections.filter((c) => c.slug !== "forms" && c.slug !== "form-submissions");
      const idx = rest.findIndex((c) => c.slug === "users");
      rest.splice(idx === -1 ? rest.length : idx, 0, ...moved);
      return { ...config, collections: rest };
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  // sharp's published types drift slightly from Payload's SharpDependency type.
  sharp: sharp as never,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
