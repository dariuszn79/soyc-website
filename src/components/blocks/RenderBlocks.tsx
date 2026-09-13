import { Kicker } from "@/components/atoms/Kicker";
import { Overline } from "@/components/atoms/Overline";
import { SectionHeader } from "@/components/organisms/SectionHeader";
import { SectionHeading } from "@/components/organisms/SectionHeading";
import { SectionImageParalax } from "@/components/organisms/SectionImageParalax";
import { SectionImageSide } from "@/components/organisms/SectionImageSide";
import { SectionBackgroundImage } from "@/components/organisms/SectionBackgroundImage";
import { SectionCenter } from "@/components/organisms/SectionCenter";
import { SectionGallery } from "@/components/organisms/SectionGallery";
import { SectionFleetLocation } from "@/components/organisms/SectionFleetLocation";
import { SectionTabs } from "@/components/organisms/SectionTabs";
import { SectionContent } from "@/components/organisms/SectionContent";
import { NauticalMap } from "@/components/organisms/NauticalMap";
import { HeroHome } from "@/components/organisms/HeroHome";
import { CruiseEventCarousel } from "@/components/organisms/CruiseEventCarousel";
import { MembershipApplicationForm } from "@/components/organisms/MembershipApplicationForm";
import { FormEmbed } from "@/components/organisms/FormEmbed";
import { CardPerson } from "@/components/molecules/CardPerson";
import { CardEvent } from "@/components/molecules/CardEvent";

import { cardLayoutClass, cardSpan, renderCard } from "./renderCard";
import {
  toBoat,
  toCta,
  toEventCard,
  toMediaAlt,
  toMediaSrc,
  toPerson,
} from "@/lib/payload/transform";
import {
  getBoats,
  getCruiseEvents,
  getFleetLocation,
  getPeople,
  getTrainingEvents,
} from "@/lib/payload/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any;

/** Outer wrapper shared by "body" (non-hero) sections. */
function BodyWrapper({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] ${first ? "" : "mt-[60px]"}`}>{children}</div>
  );
}

/** Optional SectionHeading above a section — driven by the `showHeading`
 * toggle + `sectionHeading` group every section block exposes. */
function SectionHeadingToggle({ block }: { block: Block }) {
  const h = block.sectionHeading;
  if (!block.showHeading || !h?.heading) return null;
  return (
    <SectionHeading
      kicker={<Kicker label={h.kicker} />}
      heading={h.heading}
      body={h.body}
      as="h2"
    />
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
            backgroundImage: toMediaSrc(block.backgroundImage),
            backgroundAlt: block.backgroundAlt || toMediaAlt(block.backgroundImage),
            actions: (block.actions ?? []).map((a: Block) => ({ label: a.label, href: a.href })),
          }}
        />
      );

    case "sectionHeader":
      return (
        <div key={index} className="flex w-full flex-col items-center px-4 sm:px-spacing-md">
          <SectionHeader
            kicker={<Overline />}
            heading={block.heading ?? ""}
            body={block.body}
            imageSrc={toMediaSrc(block.image) || undefined}
            imageAlt={block.imageAlt || toMediaAlt(block.image)}
            as="h1"
            compact
            cta={toCta(block.cta)}
          />
        </div>
      );

    case "sectionHeading":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeading
            kicker={<Kicker label={block.kicker} />}
            heading={block.heading ?? ""}
            body={block.body}
            as={(block.as as "h1" | "h2" | "h3") ?? "h2"}
          />
        </BodyWrapper>
      );

    case "sectionImageParalax":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <SectionImageParalax
            kicker={block.kicker ?? ""}
            heading={block.heading ?? ""}
            body={block.body ?? ""}
            cta={{ label: block.cta?.label ?? "", href: block.cta?.href ?? "#" }}
            image={toMediaSrc(block.image)}
            imageAlt={block.imageAlt || toMediaAlt(block.image)}
            align={block.align ?? "right"}
            variant={block.variant ?? "secondary"}
            figmaLayout
          />
        </BodyWrapper>
      );

    case "sectionImageSide": {
      const boat = block.boat && typeof block.boat === "object" ? toBoat(block.boat) : null;
      if (!boat) return null;
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <SectionImageSide boat={boat} imagePosition={block.imagePosition ?? "left"} />
        </BodyWrapper>
      );
    }

    case "sectionBackgroundImage":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionBackgroundImage
            kicker={block.kicker ?? ""}
            heading={block.heading ?? ""}
            body={block.body ?? ""}
            ctaLabel={block.ctaLabel ?? ""}
            ctaHref={block.ctaHref ?? "#"}
            imageSrc={toMediaSrc(block.image)}
          />
        </BodyWrapper>
      );

    case "sectionCenter":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionCenter
            heading={block.heading || undefined}
            body={block.body || undefined}
            ctaLabel={block.ctaLabel || undefined}
            ctaHref={block.ctaHref || undefined}
          />
        </BodyWrapper>
      );

    case "sectionGallery":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <div className="mt-[60px]">
            <SectionGallery
              images={((block.images ?? []) as Block[])
                .map((img) => ({
                  src: toMediaSrc(img.image),
                  alt: img.alt || toMediaAlt(img.image),
                }))
                .filter((img) => img.src)}
              overlaySrc={toMediaSrc(block.overlayImage) || undefined}
            />
          </div>
        </BodyWrapper>
      );

    case "sectionFleetLocation": {
      const [content, locBoats] = [await getFleetLocation(), await getBoats()];
      // Only boats with a valid 9-digit MMSI can be tracked — without at
      // least one, the whole section stays off the page.
      const vessels = locBoats
        .filter((b) => /^\d{9}$/.test((b.mmsi ?? "").trim()))
        .map((b) => ({ mmsi: b.mmsi!.trim(), name: b.name }));
      if (vessels.length === 0) return null;
      return (
        <BodyWrapper key={index} first={first}>
          <SectionFleetLocation
            flush={block.flush ?? false}
            content={content}
            vessels={vessels}
            mapboxToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ""}
          />
        </BodyWrapper>
      );
    }

    case "sectionFleet": {
      const boats = await getBoats();
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <div className="flex w-full flex-col gap-spacing-md">
            {boats.map((boat: Block, i: number) => (
              <SectionImageSide
                key={i}
                boat={toBoat(boat)}
                imagePosition={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </BodyWrapper>
      );
    }

    case "sectionPeople": {
      const group = block.group ?? "committee";
      const people = await getPeople(group);
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <div className="mt-[60px] grid grid-cols-1 gap-spacing-md md:grid-cols-2 xl:grid-cols-3">
            {people.map((person, i) => {
              const p = toPerson(person);
              return (
                <CardPerson
                  key={`${p.name}-${i}`}
                  {...p}
                  title={group === "committee" ? p.title : p.qualification ?? ""}
                  layout="club"
                />
              );
            })}
          </div>
        </BodyWrapper>
      );
    }

    case "sectionParagraphs":
      return (
        <BodyWrapper key={index} first={first}>
          <div className="flex max-w-[720px] flex-col gap-spacing-md">
            <Kicker label={block.kicker} />
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

    case "sectionEvents": {
      const events =
        block.source === "cruise-events" ? await getCruiseEvents() : await getTrainingEvents();
      const isCarousel = block.display === "carousel";
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <div className="mt-14">
            {isCarousel ? (
              <CruiseEventCarousel
                events={events.map((e: Block) => toEventCard(e)) as never}
              />
            ) : (
              <div className="flex flex-col gap-spacing-sm">
                {events.map((e: Block, i: number) => (
                  <CardEvent key={i} {...toEventCard(e)} variant="grid" />
                ))}
              </div>
            )}
          </div>
        </BodyWrapper>
      );
    }

    case "sectionCards": {
      const columns = block.columns === "3" ? "grid-3" : "grid-2";
      const cards: Block[] = block.cards ?? [];
      const nodes: React.ReactNode[] = [];
      for (const [i, c] of cards.entries()) nodes.push(await renderCard(c, i));
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <div className={`mt-[60px] ${cardLayoutClass(columns)}`}>
            {nodes.map((node, i) => (
              <div key={i} className={cardSpan(cards[i], columns)}>
                {node}
              </div>
            ))}
          </div>
        </BodyWrapper>
      );
    }

    case "sectionTabs":
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <SectionTabs block={block} />
        </BodyWrapper>
      );

    case "sectionContent":
      return (
        <SectionContent
          key={index}
          label={block.label}
          heading={block.heading ?? ""}
          body={block.body}
          actions={block.actions ?? []}
        />
      );

    case "membershipApplicationForm":
      return (
        <BodyWrapper key={index} first={first}>
          <MembershipApplicationForm content={{ form: block.form } as Block} />
        </BodyWrapper>
      );

    case "formEmbed": {
      const form = block.form && typeof block.form === "object" ? block.form : null;
      if (!form) return null;
      return (
        <BodyWrapper key={index} first={first}>
          <SectionHeadingToggle block={block} />
          <FormEmbed form={form} />
        </BodyWrapper>
      );
    }

    case "nauticalMap":
      return <NauticalMap key={index} />;

    default:
      return null;
  }
}

const HERO_TYPES = ["heroHome", "sectionHeader"];

export async function RenderBlocks({ blocks, variant = "default" }: { blocks: Block[]; variant?: "default" | "home" }) {
  const hero = (blocks ?? []).filter((b) => HERO_TYPES.includes(b.blockType));
  const body = (blocks ?? []).filter((b) => !HERO_TYPES.includes(b.blockType));
  const bodyPad = variant === "home" ? "px-4 pb-24 sm:px-spacing-md" : "px-4 pb-[60px] pt-12 sm:px-spacing-md";

  // Render sequentially: each section may run a Payload query, and the DB is
  // behind a small session-mode pooler — parallel queries would exhaust it.
  const rendered: React.ReactNode[] = [];
  for (const [i, b] of hero.entries()) rendered.push(await renderBlock(b, i, i === 0));
  const bodyNodes: React.ReactNode[] = [];
  for (const [i, b] of body.entries()) bodyNodes.push(await renderBlock(b, i, i === 0));

  return (
    <>
      {rendered}
      {bodyNodes.length > 0 && <div className={bodyPad}>{bodyNodes}</div>}
    </>
  );
}
