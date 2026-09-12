import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("the-club");

export default function TheClubPage() {
  return <PageView slug="the-club" />;
}
