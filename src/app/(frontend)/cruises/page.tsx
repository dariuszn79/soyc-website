import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("cruises");

export default function CruisesPage() {
  return <PageView slug="cruises" />;
}
