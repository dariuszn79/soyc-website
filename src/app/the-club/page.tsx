import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { CardLrg } from "@/components/molecules/CardLrg";
import { CardPerson } from "@/components/molecules/CardPerson";
import { FleetLocation } from "@/components/organisms/FleetLocation";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { boardMembers } from "@/data/people";
import pageJson from "@/data/json/pages/the-club.json";
import type { ClubPageContent } from "@/data/page-types";

const content: ClubPageContent = pageJson;
export const metadata: Metadata = content.metadata;

export default function TheClubPage() {
  return (
    <main className="flex min-h-screen w-full flex-col align-center overflow-hidden bg-brand-tertiary-100">
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

      <div className="px-4 pb-[60px] pt-12 sm:px-spacing-md">
        <section
          aria-label={content.aboutAriaLabel}
          className="mx-auto grid w-full max-w-[1272px] grid-cols-1 gap-spacing-md lg:grid-cols-[repeat(2,minmax(0,560px))] lg:justify-between lg:gap-y-0"
        >
          {content.cards.map((card) => (
            <div key={card.kicker} className="min-h-0 lg:min-h-[578px]">
              <CardLrg {...card} cta={card.cta} figmaLayout />
            </div>
          ))}
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <div className="flex max-w-[720px] flex-col gap-spacing-md">
            <div className="flex flex-col gap-spacing-xs">
              <Overline />
              <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
                {content.committee.kicker}
              </p>
            </div>
            <div className="flex flex-col gap-spacing-md">
              <h2 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
                {content.committee.heading}
              </h2>
              <p className="font-gill text-[18px] leading-[1.4] text-brand-ink sm:text-[24px] sm:leading-[32px]">
                {content.committee.body}
              </p>
            </div>
          </div>

          <div className="mt-[60px] grid grid-cols-1 gap-spacing-md md:grid-cols-2 xl:grid-cols-3">
            {boardMembers.map((person) => (
              <CardPerson key={person.name} {...person} layout="club" />
            ))}
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
