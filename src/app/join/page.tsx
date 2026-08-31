import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TabsJoinUs } from "@/components/organisms/TabsJoinUs";
import pageJson from "@/data/json/pages/join.json";
import type { JoinPageContent } from "@/data/types/join";

const content = pageJson as unknown as JoinPageContent;
export const metadata: Metadata = content.metadata;

export default function JoinPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-clip bg-brand-tertiary-100">
      <div className="px-4 sm:px-spacing-md flex-col flex items-center">
        <SectionHeading
          kicker={<Overline />}
          heading={content.hero.heading}
          body={content.hero.body}
          imageSrc={content.hero.imageSrc}
          imageAlt={content.hero.imageAlt}
          cta={content.hero.cta}
          as="h1"
          compact
        />
      </div>

      <div className="px-4 pb-[60px] pt-[60px] sm:px-spacing-md">
        <section id="membership" className="mx-auto w-full max-w-[1440px]">
          <TabsJoinUs content={content} />
        </section>
      </div>
    </main>
  );
}
