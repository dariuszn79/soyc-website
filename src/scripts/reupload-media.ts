import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Re-uploads every media doc's file through the active storage adapter.
 * Use when the DB knows the docs but the storage backend (e.g. a fresh
 * Supabase bucket) is missing the files.
 * Run with: pnpm payload run src/scripts/reupload-media.ts
 */

const PUBLIC = path.resolve(process.cwd(), "public");

// Docs whose filenames no longer match their source asset (created under an
// old name, then suffixed on a later seed).
const OVERRIDES: Record<string, string> = {
  "event-5.png": "figmaAssets/cruises/event-1.png",
  "event-6.png": "figmaAssets/cruises/event-2.png",
  "event-7.png": "figmaAssets/cruises/event-3.png",
  "event-8.png": "figmaAssets/cruises/event-4.png",
};

// Filenames may have a Payload-added "-N" suffix — strip it to find the
// original asset under public/.
const sourceFor = (filename: string) => {
  if (OVERRIDES[filename]) {
    const p = path.join(PUBLIC, OVERRIDES[filename]);
    return fs.existsSync(p) ? p : null;
  }
  const ext = path.extname(filename);
  const base = filename.slice(0, -ext.length).replace(/-\d+$/, "") + ext;
  const stack = [PUBLIC];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(p);
      else if (entry.name === filename || entry.name === base) return p;
    }
  }
  return null;
};

const main = async () => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "media", limit: 500, depth: 0 });
  for (const doc of docs) {
    const src = doc.filename ? sourceFor(doc.filename) : null;
    if (!src) {
      console.warn(`no source file for ${doc.filename} — skipped`);
      continue;
    }
    await payload.update({
      collection: "media",
      id: doc.id,
      data: {},
      filePath: src,
    });
    console.log(`uploaded ${doc.filename}`);
  }
  console.log("done");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
