import { getPayload } from "payload";
import config from "@payload-config";

/** One-off: set Concorde's MMSI directly via the local API.
 * Run: PAYLOAD_DB_PUSH=true pnpm exec tsx --env-file=.env.local src/scripts/set-mmsi.ts */

const main = async () => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "boats",
    where: { name: { equals: "Concorde" } },
    limit: 1,
  });
  if (!docs[0]) throw new Error("Concorde boat not found");
  const doc = await payload.update({
    collection: "boats",
    id: docs[0].id,
    data: { mmsi: "261010051" },
  });
  console.log("updated:", doc.id, doc.name, doc.mmsi);
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
