import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("members");

export default function MembersPage() {
  return <PageView slug="members" />;
}
