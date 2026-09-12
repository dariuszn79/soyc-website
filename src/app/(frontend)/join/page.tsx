import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("join");

export default function JoinPage() {
  return <PageView slug="join" />;
}
