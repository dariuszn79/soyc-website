import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FleetLocation } from "@/components/organisms/FleetLocation";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { SectionImageSide } from "@/components/organisms/SectionImageSide";
import { fleet } from "@/data/fleet";
import pageJson from "@/data/json/pages/fleet.json";
import type { FleetPageContent } from "@/data/page-types";

const content: FleetPageContent = pageJson;
export const metadata: Metadata = content.metadata;

export default function FleetPage() {
  const [speedbird, concorde] = fleet;

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden bg-brand-tertiary-100">
      <div className="px-4 sm:px-spacing-md flex-col flex items-center">
        <SectionHeading
          kicker={<Overline />}
          heading={content.hero.heading}
          body={content.hero.body}
          imageSrc={content.hero.imageSrc}
          imageAlt={content.hero.imageAlt}
          as="h1"
          compact
        />
      </div>

      <div className="px-4 pb-[60px] pt-[60px] sm:px-spacing-md">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-spacing-md">
          <SectionImageSide boat={speedbird} />
          <SectionImageSide boat={concorde} imagePosition="right" />
          <FleetLocation />
        </div>

        <div className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <SectionBackgroundImage
            kicker={content.cta.kicker}
            heading={content.cta.heading}
            body={content.cta.body}
            ctaLabel={content.cta.label}
            ctaHref={content.cta.href}
            imageSrc={content.cta.imageSrc}
          />
        </div>
      </div>
    </main>
  );
}
