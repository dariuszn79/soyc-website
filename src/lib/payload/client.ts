import "server-only";
import { getPayload as getPayloadInstance } from "payload";
import config from "@payload-config";

/**
 * Cached Payload local-API instance for use in server components / route
 * handlers. Never import this from a client component.
 */
export const getPayloadClient = async () => getPayloadInstance({ config });
