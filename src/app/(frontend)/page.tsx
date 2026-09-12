import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("home");

export default function HomePage() {
  return <PageView slug="home" />;
}
