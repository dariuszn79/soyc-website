import type { Metadata } from "next";
import { Overline } from "@/components/atoms/Overline";
import { CardEvent } from "@/components/molecules/CardEvent";
import { CardLrg } from "@/components/molecules/CardLrg";
import { CardPerson } from "@/components/molecules/CardPerson";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { TabsCourses } from "@/components/organisms/TabsCourses";
import { upcomingTrainingCourses } from "@/data/courses";
import { trainingInstructors } from "@/data/people";
import pageJson from "@/data/json/pages/training.json";
import type { TrainingPageContent } from "@/data/page-types";

const content: TrainingPageContent = pageJson;
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

export default function TrainingPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-clip bg-brand-tertiary-100">
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
        <section className="mx-auto mt-[60px] w-full max-w-[1272px]">
          <SectionHeading
             kicker={<SectionKicker label={content.practicalCourses.kicker} />}
             heading={content.practicalCourses.heading}
            body={
              <>
                 {content.practicalCourses.paragraphs.map((paragraph, index) => (
                   <p key={paragraph} className={index > 0 ? "mt-spacing-md" : undefined}>
                     {paragraph.split("\n").map((line, lineIndex) => (
                       <span key={line}>
                         {line}
                         {lineIndex < paragraph.split("\n").length - 1 && <br />}
                       </span>
                     ))}
                   </p>
                 ))}
              </>
            }
            as="h2"
          />
          <TabsCourses content={content.courseTabs} />
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1272px]">
          <SectionHeading
             kicker={<SectionKicker label={content.upcomingCourses.kicker} />}
             heading={content.upcomingCourses.heading}
             body={content.upcomingCourses.body}
            as="h2"
          />

          <div className="mt-[60px] grid gap-spacing-md lg:grid-cols-2">
            {upcomingTrainingCourses.map((course) => (
              <CardEvent
                key={`${course.title}-${course.dates}`}
                {...course}
                variant="grid"
              />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1272px]">
          <SectionHeading
             kicker={<SectionKicker label={content.instructors.kicker} />}
             heading={content.instructors.heading}
             body={content.instructors.body}
            as="h2"
          />

          <div className="mt-[60px] grid gap-spacing-md lg:grid-cols-3">
            {trainingInstructors.map((person) => (
              <CardPerson key={person.name} {...person} layout="club" />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-[1272px]">
          <div className="max-w-[560px] lg:min-h-[568px]">
            <CardLrg
               kicker={content.shorebased.kicker}
               heading={content.shorebased.heading}
               body={content.shorebased.body}
               cta={content.shorebased.cta}
              figmaLayout
            />
          </div>
        </section>

        <div className="mx-auto mt-[60px] w-full max-w-[1272px]">
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
