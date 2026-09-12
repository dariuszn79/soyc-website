import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import sharp from "sharp";

import { Pages } from "./collections/Pages";
import { Boats } from "./collections/Boats";
import { People } from "./collections/People";
import { Courses } from "./collections/Courses";
import { TrainingEvents } from "./collections/TrainingEvents";
import { CruiseEvents } from "./collections/CruiseEvents";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

import { SiteSettings } from "./globals/SiteSettings";
import { Navigation } from "./globals/Navigation";
import { ComponentLabels } from "./globals/ComponentLabels";
import { FleetLocation } from "./globals/FleetLocation";
import { CruiseMap } from "./globals/CruiseMap";
import { NotFound } from "./globals/NotFound";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: "— SOYC Admin" },
    livePreview: {
      collections: ["pages"],
    },
  },
  editor: lexicalEditor(),
  collections: [
    Pages,
    Boats,
    People,
    Courses,
    TrainingEvents,
    CruiseEvents,
    Media,
    Users,
  ],
  globals: [
    SiteSettings,
    Navigation,
    ComponentLabels,
    FleetLocation,
    CruiseMap,
    NotFound,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: { rejectUnauthorized: false },
    },
  }),
  plugins: [
    formBuilderPlugin({
      fields: { payment: false },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  // sharp's published types drift slightly from Payload's SharpDependency type.
  sharp: sharp as never,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
