import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("fleet");

export default function FleetPage() {
  return <PageView slug="fleet" />;
}
