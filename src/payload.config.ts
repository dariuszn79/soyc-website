import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { s3Storage } from "@payloadcms/storage-s3";
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
    // Schema push does a full drizzle introspection ("Pulling schema…") on
    // every Payload init — over a remote DB that's tens of seconds and it
    // runs per dev worker/recompile, hanging everything. Only enable when
    // the schema actually changed: PAYLOAD_DB_PUSH=true pnpm dev (once).
    push: process.env.PAYLOAD_DB_PUSH === "true",
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: { rejectUnauthorized: false },
      // Supabase's Supavisor: use the transaction pooler (port 6543) — session
      // mode (5432) caps at ~15 clients shared by every lambda and dev server.
      // Keep the per-process pool tiny on serverless regardless.
      max: Number(process.env.DB_POOL_MAX ?? (process.env.VERCEL ? 2 : 5)),
      idleTimeoutMillis: 3000,
      // Fail fast when the pooler is saturated — the default is an infinite
      // wait, which turns a full pool into requests that hang until the
      // function's maxDuration (300s on Vercel) kills them.
      connectionTimeoutMillis: 8000,
    },
  }),
  plugins: [
    // Media uploads go to Supabase Storage (S3-compatible) when its env vars
    // are set; otherwise local disk. Needed on Vercel's read-only filesystem.
    ...(process.env.SUPABASE_S3_ENDPOINT
      ? [
          s3Storage({
            collections: {
              media: {
                // Supabase serves public objects from
                // /object/public/<bucket>/<key>, not the S3 endpoint path the
                // adapter would otherwise build.
                generateFileURL: ({ filename, prefix }) =>
                  [
                    process.env.SUPABASE_S3_PUBLIC_URL,
                    prefix,
                    encodeURIComponent(filename),
                  ]
                    .filter(Boolean)
                    .join("/"),
              },
            },
            bucket: process.env.SUPABASE_S3_BUCKET || "media",
            acl: "public-read",
            config: {
              endpoint: process.env.SUPABASE_S3_ENDPOINT,
              region: process.env.SUPABASE_S3_REGION || "eu-west-2",
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || "",
              },
            },
          }),
        ]
      : []),
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
