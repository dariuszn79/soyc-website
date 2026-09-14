import { getPayload } from "payload";
import config from "@payload-config";

/** One-off: push the current schema to the DB without starting the dev server.
 * Run: PAYLOAD_DB_PUSH=true pnpm exec tsx --env-file=.env.local src/scripts/db-push.ts
 * (push only runs when PAYLOAD_DB_PUSH=true — see payload.config.ts) */

const main = async () => {
  if (process.env.PAYLOAD_DB_PUSH !== "true") {
    console.error("Set PAYLOAD_DB_PUSH=true — schema push is disabled otherwise.");
    process.exit(1);
  }
  await getPayload({ config });
  console.log("[db-push] schema pushed");
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
