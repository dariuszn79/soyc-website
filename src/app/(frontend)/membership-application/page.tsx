import type { Metadata } from "next";
import { MembershipApplicationForm } from "@/components/organisms/MembershipApplicationForm";
import pageJson from "@/data/json/pages/membership-application.json";
import type { MembershipApplicationContent } from "@/data/types/membership-application";

const content = pageJson as unknown as MembershipApplicationContent;
export const metadata: Metadata = content.metadata;

export default function MembershipApplicationPage() {
  return (
    <main className="w-full bg-brand-tertiary-100 px-4 py-12 sm:px-6 lg:-mt-3 lg:px-8 lg:py-12">
      <MembershipApplicationForm content={content} />
    </main>
  );
}