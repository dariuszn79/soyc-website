import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { CardLrg } from "@/components/molecules/CardLrg";
import { RichText } from "@/components/molecules/RichText";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { CruiseEventCarousel } from "@/components/organisms/CruiseEventCarousel";
import { FleetLocation } from "@/components/organisms/FleetLocation";

import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { cruiseEvents } from "@/data/cruises";
import pageJson from "@/data/json/pages/cruises.json";
import type { CruisesPageContent } from "@/data/page-types";

const content = pageJson as unknown as CruisesPageContent;
export const metadata: Metadata = content.metadata;

function SectionKicker({ label = "Our Home" }: { label?: string }) {
  return (
    <div className="flex flex-col gap-spacing-xs">
      <Overline />
      <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
        {label}
      </p>
    </div>
  );
}

export default function CruisesPage() {
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

      <div className="px-4 pb-24 sm:px-spacing-md">
        <section className="mx-auto grid w-full max-w-[1440px] gap-spacing-md py-spacing-md lg:grid-cols-2">
          {content.cruiseTypes.map((cruiseType) => (
            <div key={cruiseType.heading} className="lg:h-[414px]">
              <CardLrg
                kicker={cruiseType.kicker}
                heading={cruiseType.heading}
                figmaLayout
                body={<RichText blocks={cruiseType.blocks} />}
              />
            </div>
          ))}
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <SectionHeading
            kicker={<SectionKicker label={content.upcoming.kicker} />}
            heading={content.upcoming.heading}
            body={content.upcoming.body}
            as="h2"
          />

          <div className="mt-14">
            <CruiseEventCarousel events={cruiseEvents} />
          </div>
        </section>

        <div className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <FleetLocation flush />
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
