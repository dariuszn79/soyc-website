import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("community");

export default function CommunityPage() {
  return <PageView slug="community" />;
}
