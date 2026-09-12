import { getPayload } from "payload";
import config from "@payload-config";
const payload = await getPayload({ config });
const { docs } = await payload.find({ collection: "users", limit: 50 });
console.log(docs.map((u) => ({ id: u.id, email: u.email, name: (u as { name?: string }).name, createdAt: u.createdAt })));
process.exit(0);
