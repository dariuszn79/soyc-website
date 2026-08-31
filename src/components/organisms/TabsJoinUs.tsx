"use client";

import { useState } from "react";
import { CardMed } from "@/components/molecules/CardMed";
import { CardLrg } from "@/components/molecules/CardLrg";
import { FeeItem } from "@/components/molecules/FeeItem";
import { Overline } from "@/components/atoms/Overline";
import { StickyTabs } from "@/components/molecules/StickyTabs";
import type { JoinPageContent, JoinTab } from "@/data/types/join";

/**
 * TabsJoinUs — client component rendering the membership information tab selector
 * on the Join Us page.
 *
 * Figma tabs: Membership | Fees | Tester Day | What do you need
 *
 * Business logic (active tab state) lives here; all rendering delegates to
 * CardLrg, CardMed, and FeeItem molecules. The surrounding page owns the
 * section spacing, matching the TabsCourses composition.
 */

/* ─── Tab panel components ───────────────────────────────────────────── */

function TabMembership({ content }: { content: JoinPageContent["panels"]["membership"] }) {
  return (
    <div className="w-full bg-brand-tertiary-100">
      <div className="max-w-[640px] px-6 pt-[60px] sm:px-[60px]">
        <p className="font-gill text-[18px] leading-[24px] text-brand-ink sm:text-[24px] sm:leading-[32px]">
          {content.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <CardMed heading={content.cards[0].heading}>
          {content.cards[0].paragraphs[0]}
        </CardMed>
        <CardMed heading={content.cards[1].heading}>
          <p>{content.cards[1].paragraphs[0]}</p>
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-4">
            {content.cards[1].list.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p className="mt-3">
            {content.cards[1].paragraphs[1]}
          </p>
        </CardMed>
        <CardMed heading={content.cards[2].heading}>
          {content.cards[2].paragraphs[0]}
        </CardMed>
      </div>
    </div>
  );
}

function TabFees({ content }: { content: JoinPageContent["panels"]["fees"] }) {
  return (
    <div className="w-full">
      <div className="max-w-[560px] border-b border-brand-rule">
        <CardLrg
          kicker={content.intro.kicker}
          heading={
            <>
              {content.intro.headingLines[0]} <br />
              {content.intro.headingLines[1]}
            </>
          }
          body={content.intro.body}
        />
      </div>

      {/* Membership fees */}
      <div className="grid grid-cols-1 divide-y divide-brand-rule border-b border-brand-rule md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex flex-col gap-spacing-md px-spacing-md py-spacing-section-y lg:px-spacing-xl">
          <Overline size="md" />
          <div className="flex flex-col gap-spacing-sm">
            <p className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100">
              {content.membership.heading}
            </p>
            <p className="font-gill text-body leading-body text-brand-ink">
              {content.membership.body}
            </p>
            <p className="font-gill text-body-sm font-semibold leading-body text-brand-ink">
              {content.membership.note}
            </p>
          </div>
        </div>
        <div className="flex flex-col px-spacing-md py-spacing-compact md:col-span-2 lg:px-spacing-xl">
          {content.membership.fees.map((fee) => <FeeItem key={fee.heading} {...fee} />)}
        </div>
      </div>

      {/* Daily sailing fees */}
      <div className="grid grid-cols-1 divide-y divide-brand-rule md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex flex-col gap-spacing-md px-spacing-md py-spacing-section-y lg:px-spacing-xl">
          <Overline size="md" />
          <div className="flex flex-col gap-spacing-sm">
            <p className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100">
              {content.dailySailing.heading}
            </p>
            <p className="font-gill text-body leading-body text-brand-ink">
              {content.dailySailing.body}
            </p>
            <p className="font-gill text-body-sm font-semibold leading-body text-brand-ink">
              {content.dailySailing.note}
            </p>
          </div>
        </div>
        <div className="flex flex-col px-spacing-md py-spacing-compact md:col-span-2 lg:px-spacing-xl">
          {content.dailySailing.fees.map((fee) => <FeeItem key={fee.heading} {...fee} />)}
        </div>
      </div>
    </div>
  );
}

function TabTesterDay({ content }: { content: JoinPageContent["panels"]["testerDay"] }) {
  return (
    <div className="w-full">
      <div className="max-w-[560px] border-b border-brand-rule">
        <CardLrg
          kicker={content.intro.kicker}
          heading={
            <>
              {content.intro.headingLines[0]} <br />
              {content.intro.headingLines[1]}
            </>
          }
          body={content.intro.body}
        />
      </div>
      <div className="grid grid-cols-1 divide-y divide-brand-rule md:grid-cols-3 md:divide-x md:divide-y-0">
        <CardMed heading={content.expect.heading}>
          {content.expect.paragraphs[0]}
          <br />
          <br />
          {content.expect.paragraphs[1]}
        </CardMed>
        <CardMed heading={content.practical.heading}>
          <ul className="flex flex-col gap-2">
            {content.practical.details.map(({ key, value }) => (
              <li key={key} className="flex items-start gap-2">
                <span className="mt-1 shrink-0 text-brand-primary-100">•</span>
                <span><strong>{key}:</strong> {value}</span>
              </li>
            ))}
          </ul>
        </CardMed>
        <CardMed heading={content.booking.heading}>
          <p>{content.booking.intro}</p>
          <ol className="mt-3 flex list-decimal list-inside flex-col gap-2">
            <li>
              {content.booking.firstStepBeforeEmail}{" "}
                <a href={content.booking.email.href} className="text-brand-secondary-100 underline">
                {content.booking.email.label}
              </a>{" "}
              {content.booking.firstStepAfterEmail}
            </li>
            {content.booking.remainingSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </CardMed>
      </div>
    </div>
  );
}

function TabGear({ content }: { content: JoinPageContent["panels"]["gear"] }) {
  return (
    <div className="w-full">
      <div className="max-w-[560px] border-b border-brand-rule">
        <CardLrg
          kicker={content.intro.kicker}
          heading={content.intro.heading}
          body={content.intro.body}
        />
      </div>
      <div className="grid grid-cols-1 divide-y divide-brand-rule md:grid-cols-3 md:divide-x md:divide-y-0">
        <CardMed heading={content.cards[0].heading}>
          {content.cards[0].paragraphs.map((paragraph, index) => (
            <span key={paragraph}>{index > 0 && <><br /><br /></>}{paragraph}</span>
          ))}
        </CardMed>
        <CardMed heading={content.cards[1].heading}>
          {content.cards[1].paragraphs[0]}
        </CardMed>
        <CardMed heading={content.cards[2].heading}>
          {content.cards[2].paragraphs[0]}
        </CardMed>
      </div>
    </div>
  );
}

/* ─── TabsJoinUs ─────────────────────────────────────────────────────── */

export function TabsJoinUs({ content }: { content: JoinPageContent }) {
  const [activeTab, setActiveTab] = useState<JoinTab>("Membership");

  return (
    <StickyTabs<JoinTab>
      tabs={content.tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      ariaLabel={content.ariaLabel}
    >
      {/* Tab content */}
      {activeTab === "Membership" && <TabMembership content={content.panels.membership} />}
      {activeTab === "Fees" && <TabFees content={content.panels.fees} />}
      {activeTab === "Tester Day" && <TabTesterDay content={content.panels.testerDay} />}
      {activeTab === "What do you need" && <TabGear content={content.panels.gear} />}
    </StickyTabs>
  );
}
