import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionGallery } from "@/components/organisms/SectionGallery";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { CardPerson } from "@/components/molecules/CardPerson";
import { communitySkippers } from "@/data/people";
import pageJson from "@/data/json/pages/community.json";
import type { CommunityPageContent } from "@/data/page-types";

const content: CommunityPageContent = pageJson;
export const metadata: Metadata = content.metadata;

function SectionKicker({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-spacing-xs">
      <Overline />
      <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
        {label}
      </p>
    </div>
  );
}

export default function CommunityPage() {
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

      <div className="px-4 pb-[60px] pt-12 sm:px-spacing-md">
        <section className="mx-auto w-full max-w-[1440px]">
          <SectionHeading
            kicker={<SectionKicker label={content.gallery.kicker} />}
            heading={content.gallery.heading}
            body={content.gallery.body}
            as="h2"
          />

          <div className="mt-[60px]">
            <SectionGallery
              src={content.gallery.src}
              overlaySrc={content.gallery.overlaySrc}
              alt={content.gallery.alt}
              totalSlides={content.gallery.totalSlides}
            />
          </div>
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1440px]">
          <SectionHeading
            kicker={<SectionKicker label={content.skippers.kicker} />}
            heading={content.skippers.heading}
            body={content.skippers.body}
            as="h2"
          />

          <div className="mt-[60px] grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {communitySkippers.map((person, index) => (
              <CardPerson
                key={`${person.name}-${index}`}
                {...person}
                layout="club"
              />
            ))}
          </div>
        </section>

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
