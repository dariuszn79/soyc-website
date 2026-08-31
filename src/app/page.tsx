import type { Metadata } from "next";
import { HeroHome } from "@/components/organisms/HeroHome";
import { HomeContent } from "@/components/organisms/HomeContent";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import homeJson from "@/data/json/pages/home.json";
import type { HomePageContent } from "@/data/page-types";

const content = homeJson as unknown as HomePageContent;

export const metadata: Metadata = content.metadata;

export default function HomePage() {
  return (
    <main className="flex w-full flex-col overflow-hidden bg-brand-tertiary-100">
      <HeroHome content={content.hero} />
      <div className="px-4 pb-24 sm:px-spacing-md">
        <HomeContent content={content.sections} />
        <div className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <SectionBackgroundImage
            kicker={content.finalCta.kicker}
            heading={content.finalCta.heading}
            body={content.finalCta.body}
            ctaLabel={content.finalCta.label}
            ctaHref={content.finalCta.href}
            imageSrc={content.finalCta.imageSrc}
          />
        </div>
      </div>
    </main>
  );
}
