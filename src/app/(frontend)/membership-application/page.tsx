import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata("membership-application");

export default function MembershipApplicationPage() {
  return <PageView slug="membership-application" />;
}
