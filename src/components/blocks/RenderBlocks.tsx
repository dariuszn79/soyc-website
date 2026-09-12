import { Overline } from "@/components/atoms/Overline";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { CardLrg } from "@/components/molecules/CardLrg";
import { CardPerson } from "@/components/molecules/CardPerson";
import { CardEvent } from "@/components/molecules/CardEvent";
import { RichText } from "@/components/molecules/RichText";
import { HeroHome } from "@/components/organisms/HeroHome";
import { SectionSideImage } from "@/components/organisms/SectionSideImage";
import { SectionImageSide } from "@/components/organisms/SectionImageSide";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { SectionGallery } from "@/components/organisms/SectionGallery";
import { CruiseEventCarousel } from "@/components/organisms/CruiseEventCarousel";
import { FleetLocation } from "@/components/organisms/FleetLocation";
import { TabsCourses } from "@/components/organisms/TabsCourses";
import { TabsJoinUs } from "@/components/organisms/TabsJoinUs";
import { MembershipApplicationForm } from "@/components/organisms/MembershipApplicationForm";

import { SectionKicker } from "./SectionKicker";
import { toRichTextBlocks, toCta } from "@/lib/payload/transform";
import { getBoats } from "@/lib/payload/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any;

/** Outer wrapper shared by "body" (non-hero) sections. */
function BodyWrapper({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] ${first ? "" : "mt-[60px]"}`}>{children}</div>
  );
}

export async function renderBlock(block: Block, index: number, first: boolean) {
  switch (block.blockType) {
    case "heroHome":
      return (
        <HeroHome
          key={index}
          content={{
            kicker: block.kicker ?? "",
            heading: block.heading ?? "",
            stats: (block.stats ?? []).map((s: Block) => ({ value: s.value, label: s.label })),
            coordinates: block.coordinates ?? "",
            backgroundImage: block.backgroundImage ?? "",
            backgroundAlt: block.backgroundAlt ?? "",
            actions: (block.actions ?? []).map((a: Block) => ({ label: a.label, href: a.href })),
          }}
        />
      );

    case "heroBasic":
      return (
        <div key={index} className="flex w-full flex-col items-center px-4 sm:px-spacing-md">
          <SectionHeading
            kicker={<Overline />}
            heading={block.heading ?? ""}
            body={block.body}
            imageSrc={block.imageSrc || undefined}
            imageAlt={block.imageAlt || undefined}
            as="h1"
            compact
            cta={toCta(block.cta)}
          />
        </div>
      );

    case "sectionImageSide":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionSideImage
            kicker={block.kicker ?? ""}
            heading={block.heading ?? ""}
            body={block.body ?? ""}
            cta={{ label: block.cta?.label ?? "", href: block.cta?.href ?? "#" }}
            image={block.image ?? ""}
            imageAlt={block.imageAlt ?? ""}
            align={block.align ?? "right"}
            variant={block.variant ?? "secondary"}
            figmaLayout
          />
        </BodyWrapper>
      );

    case "sectionBackgroundImage":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionBackgroundImage
            kicker={block.kicker ?? ""}
            heading={block.heading ?? ""}
            body={block.body ?? ""}
            ctaLabel={block.ctaLabel ?? ""}
            ctaHref={block.ctaHref ?? "#"}
            imageSrc={block.imageSrc ?? ""}
          />
        </BodyWrapper>
      );

    case "sectionHeading":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<SectionKicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as={(block.as as "h1" | "h2") ?? "h2"}
          />
        </BodyWrapper>
      );

    case "simpleContent":
      return (
        <div key={index} className="mx-auto flex min-h-[60vh] w-full max-w-[720px] flex-col items-center justify-center gap-spacing-md px-4 py-24 text-center sm:px-spacing-md">
          {block.label && (
            <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
              {block.label}
            </p>
          )}
          <h1 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
            {block.heading}
          </h1>
          {block.body && (
            <p className="font-gill text-body leading-body text-brand-ink lg:text-body-lg">
              {block.body}
            </p>
          )}
          <div className="mt-spacing-md flex flex-wrap items-center justify-center gap-4">
            {(block.actions ?? []).map((a: Block, i: number) => (
              <a
                key={i}
                href={a.href}
                className={
                  i === 0
                    ? "inline-flex items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
                    : "inline-flex items-center justify-center border border-brand-secondary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-secondary-100 transition-colors hover:bg-brand-secondary-100/10"
                }
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      );

    case "cardGrid":
      return (
        <BodyWrapper key={index} first={first}>
          <section className="grid w-full grid-cols-1 gap-spacing-md lg:grid-cols-[repeat(2,minmax(0,560px))] lg:justify-between">
            {(block.cards ?? []).map((card: Block, i: number) => (
              <div key={i} className="min-h-0 lg:min-h-[578px]">
                <CardLrg
                  kicker={card.kicker ?? ""}
                  heading={card.heading ?? ""}
                  body={<span className="whitespace-pre-line">{card.body}</span>}
                  cta={toCta(card.cta)}
                  figmaLayout
                />
              </div>
            ))}
          </section>
        </BodyWrapper>
      );

    case "richTextCards":
      return (
        <BodyWrapper key={index} first={first}>
          <section className="grid w-full gap-spacing-md py-spacing-md lg:grid-cols-2">
            {(block.cards ?? []).map((card: Block, i: number) => (
              <div key={i} className="lg:h-[414px]">
                <CardLrg
                  kicker={card.kicker ?? ""}
                  heading={card.heading ?? ""}
                  figmaLayout
                  body={<RichText blocks={toRichTextBlocks(card.blocks)} />}
                />
              </div>
            ))}
          </section>
        </BodyWrapper>
      );

    case "peopleSection": {
      const { getPeople } = await import("@/lib/payload/queries");
      const people = await getPeople(block.group ?? "board");
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<SectionKicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as="h2"
          />
          <div className="mt-[60px] grid grid-cols-1 gap-spacing-md md:grid-cols-2 xl:grid-cols-3">
            {people.map((person, i) => (
              <CardPerson key={`${person.name}-${i}`} {...person} layout="club" />
            ))}
          </div>
        </BodyWrapper>
      );
    }

    case "paragraphsSection":
      return (
        <BodyWrapper key={index} first={first}>
          <div className="flex max-w-[720px] flex-col gap-spacing-md">
            <SectionKicker label={block.kicker} />
            <h2 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
              {block.heading}
            </h2>
            {(block.paragraphs ?? []).map((p: Block, i: number) => (
              <p
                key={i}
                className="whitespace-pre-line font-gill text-[18px] leading-[1.4] text-brand-ink sm:text-[24px] sm:leading-[32px]"
              >
                {p.text}
              </p>
            ))}
            {toCta(block.cta) && (
              <a
                href={block.cta.href}
                target={block.cta.external ? "_blank" : undefined}
                rel={block.cta.external ? "noopener noreferrer" : undefined}
                className="inline-flex w-fit items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
              >
                {block.cta.label}
              </a>
            )}
          </div>
        </BodyWrapper>
      );

    case "upcomingCourses": {
      const { getTrainingEvents } = await import("@/lib/payload/queries");
      const events = await getTrainingEvents();
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<SectionKicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as="h2"
          />
          <div className="mt-14 flex flex-col gap-spacing-sm">
            {events.map((e: Block, i: number) => (
              <CardEvent
                key={i}
                title={e.title}
                dates={e.dates}
                yacht={e.yacht}
                model={e.model}
                skipper={e.skipper}
                variant="grid"
              />
            ))}
          </div>
        </BodyWrapper>
      );
    }

    case "coursesTabs": {
      const { getCourses } = await import("@/lib/payload/queries");
      const { courseTabs, coursesByTab } = await getCourses();
      return (
        <BodyWrapper key={index} first={first}>
          <TabsCourses
            content={{
              ariaLabel: block.ariaLabel ?? "",
              emptyMessage: block.emptyMessage ?? "",
              rateNote: block.rateNote ?? "",
            }}
            courseTabs={courseTabs}
            coursesByTab={coursesByTab}
          />
        </BodyWrapper>
      );
    }

    case "cruiseCarousel": {
      const { getCruiseEvents } = await import("@/lib/payload/queries");
      const events = await getCruiseEvents();
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<SectionKicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as="h2"
          />
          <div className="mt-14">
            <CruiseEventCarousel events={events as Block} />
          </div>
        </BodyWrapper>
      );
    }

    case "fleetLocation":
      return (
        <BodyWrapper key={index} first={first}>
          <FleetLocation flush={block.flush ?? false} />
        </BodyWrapper>
      );

    case "fleetList": {
      const boats = await getBoats();
      return (
        <BodyWrapper key={index} first={first}>
          <div className="flex w-full flex-col gap-spacing-md">
            {boats.map((boat: Block, i: number) => (
              <SectionImageSide
                key={i}
                boat={boat}
                imagePosition={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </BodyWrapper>
      );
    }

    case "gallery":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<SectionKicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as="h2"
          />
          <div className="mt-[60px]">
            <SectionGallery
              src={block.src ?? ""}
              overlaySrc={block.overlaySrc || undefined}
              alt={block.alt ?? ""}
              totalSlides={block.totalSlides ?? 10}
            />
          </div>
        </BodyWrapper>
      );

    case "joinTabs":
      return (
        <BodyWrapper key={index} first={first}>
          <TabsJoinUs
            content={
              {
                ariaLabel: block.ariaLabel ?? "",
                tabs: block.tabs ?? [],
                panels: block.panels,
              } as Block
            }
          />
        </BodyWrapper>
      );

    case "membershipForm":
      return (
        <BodyWrapper key={index} first={first}>
          <MembershipApplicationForm content={{ form: block.form } as Block} />
        </BodyWrapper>
      );

    default:
      return null;
  }
}

export async function RenderBlocks({ blocks, variant = "default" }: { blocks: Block[]; variant?: "default" | "home" }) {
  const hero = (blocks ?? []).filter((b) => b.blockType === "heroHome" || b.blockType === "heroBasic");
  const body = (blocks ?? []).filter((b) => b.blockType !== "heroHome" && b.blockType !== "heroBasic");
  const bodyPad = variant === "home" ? "px-4 pb-24 sm:px-spacing-md" : "px-4 pb-[60px] pt-12 sm:px-spacing-md";

  return (
    <>
      {await Promise.all(hero.map((b, i) => renderBlock(b, i, i === 0)))}
      {body.length > 0 && (
        <div className={bodyPad}>{await Promise.all(body.map((b, i) => renderBlock(b, i, i === 0)))}</div>
      )}
    </>
  );
}
