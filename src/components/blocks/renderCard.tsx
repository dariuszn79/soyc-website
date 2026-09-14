import type { ReactNode } from "react";
import { CardLrg } from "@/components/molecules/CardLrg";
import { CardMed } from "@/components/molecules/CardMed";
import { CardWide } from "@/components/molecules/CardWide";
import { CardEvent } from "@/components/molecules/CardEvent";
import { CardCourse } from "@/components/molecules/CardCourse";
import { CardBoat } from "@/components/molecules/CardBoat";
import { CardPerson } from "@/components/molecules/CardPerson";
import { FeeItem } from "@/components/molecules/FeeItem";
import { RichText } from "@/components/molecules/RichText";
import {
  toBoat,
  toCta,
  toEventCard,
  toMediaAlt,
  toMediaSrc,
  toPerson,
  toRichTextBlocks,
} from "@/lib/payload/transform";
import type { Course } from "@/data/content-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CardBlock = any;

/**
 * Shared renderer for card-level blocks (the `cardBlocks` set). Used by
 * SectionCards and SectionTabs — and any future card host — so a card block
 * always maps to the component of the same name.
 */
export async function renderCard(card: CardBlock, key: number | string): Promise<ReactNode> {
  switch (card.blockType) {
    case "cardLrg":
      return (
        <CardLrg
          key={key}
          kicker={card.kicker ?? ""}
          heading={card.heading ?? ""}
          body={<RichText blocks={toRichTextBlocks(card.body)} />}
          cta={toCta(card.cta)}
          variant={card.variant ?? "tertiary"}
          figmaLayout
          bordered={card.bordered ?? false}
        />
      );
    case "cardMed":
      return (
        <CardMed key={key} heading={card.heading ?? ""}>
          <RichText blocks={toRichTextBlocks(card.body)} />
        </CardMed>
      );
    case "cardWide":
      return <CardWide key={key} label={card.label ?? ""} heading={card.heading ?? ""} />;
    case "cardEvent":
      return (
        <CardEvent
          key={key}
          title={card.title ?? ""}
          dates={card.dates ?? ""}
          yacht={card.yacht ?? ""}
          model={card.model ?? ""}
          skipper={card.skipper ?? ""}
          imageSrc={toMediaSrc(card.image) || undefined}
          imageAlt={card.imageAlt || toMediaAlt(card.image)}
          variant="grid"
        />
      );
    case "cardCourse": {
      const course = card.course;
      if (!course || typeof course !== "object") return null;
      return (
        <CardCourse
          key={key}
          title={course.title ?? ""}
          desc={course.desc ?? ""}
          prices={(course.prices ?? []) as Course["prices"]}
          notes={course.notes ?? ""}
          items={((course.items ?? []) as Array<{ item?: string }>).map((i) => i.item ?? "")}
          level={course.level ?? course.tab ?? ""}
        />
      );
    }
    case "cardBoat": {
      if (!card.boat || typeof card.boat !== "object") return null;
      return <CardBoat key={key} {...toBoat(card.boat)} />;
    }
    case "cardPerson": {
      if (!card.person || typeof card.person !== "object") return null;
      return (
        <CardPerson key={key} {...toPerson(card.person)} layout={card.layout ?? "club"} />
      );
    }
    case "feeItem":
      return (
        <FeeItem
          key={key}
          heading={card.heading ?? ""}
          price={card.price ?? ""}
          unit={card.unit ?? ""}
          description={card.description ?? ""}
        />
      );
    case "feeGroup":
      return (
        <div
          key={key}
          className="grid grid-cols-1 gap-8 border-t border-brand-rule py-spacing-xxs lg:grid-cols-[1fr_2fr] lg:gap-[46px]"
        >
          <div className="flex max-w-[480px] flex-col gap-spacing-md p-6 sm:p-[56px] sm:pl-0">
            <h3 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100">
              {card.heading}
            </h3>
            {card.body && (
              <p className="font-gill text-[18px] leading-[24px] text-brand-ink">
                {card.body}
              </p>
            )}
            {card.note && (
              <p className="font-gill text-[14px] leading-[16px] text-brand-secondary-100">
                {card.note}
              </p>
            )}
          </div>
          <div className="flex flex-col divide-y divide-brand-rule border-b border-brand-rule">
            {((card.fees ?? []) as CardBlock[]).map((f, i) => (
              <FeeItem
                key={i}
                heading={f.heading ?? ""}
                price={f.price ?? ""}
                unit={f.unit ?? ""}
                description={f.description ?? ""}
              />
            ))}
          </div>
        </div>
      );
    case "richText":
      return (
        <div
          key={key}
          className={
            card.size === "lead"
              ? "font-gill max-w-[720px] text-[20px] leading-[28px] text-brand-ink sm:text-[24px] sm:leading-[32px]"
              : "font-gill text-body leading-body text-brand-ink"
          }
        >
          <RichText blocks={toRichTextBlocks(card.body)} />
        </div>
      );
    default:
      return null;
  }
}

/** Card types that always span the full grid width. */
const FULL_WIDTH_TYPES = new Set(["feeItem", "feeGroup", "richText", "cardWide"]);

/**
 * Grid span for a card inside a card-hosting layout. `fullWidth` on the card
 * (or an inherently full-width card type) spans all columns.
 */
export function cardSpan(card: CardBlock, _columns: string): string {
  if (card?.fullWidth || FULL_WIDTH_TYPES.has(card?.blockType)) {
    return "col-span-full";
  }
  return "";
}

/** Grid/stack wrapper class for a card list layout value. */
export function cardLayoutClass(layout: string): string {
  switch (layout) {
    case "grid-2":
    case "2":
      return "grid items-stretch gap-spacing-md lg:grid-cols-2";
    case "grid-3":
    case "3":
      return "grid items-stretch gap-spacing-md md:grid-cols-2 lg:grid-cols-3";
    case "grid-4":
    case "4":
      return "grid items-stretch gap-spacing-md md:grid-cols-2 lg:grid-cols-4";
    default:
      return "flex flex-col gap-spacing-sm";
  }
}
