import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("training");

export default function TrainingPage() {
  return <PageView slug="training" />;
}
