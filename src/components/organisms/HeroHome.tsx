import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { HomePageContent } from "@/data/page-types";

/**
 * HeroHome — the full-page hero section used exclusively on the home page.
 *
 * Figma: 1008px section with a large diagonal SVG background, club tagline,
 * CTA buttons, a statistics bar, and a coordinates footer strip.
 *
 * The site Header is rendered by the root layout; this organism owns only the
 * hero content below it.
 */

export function HeroHome({ content }: { content: HomePageContent["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-brand-tertiary-100 lg:h-[876px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="absolute inset-0 hidden h-full w-full object-cover object-left-top lg:block"
        alt=""
        src={content.backgroundImage}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col lg:pt-[81px]">
        <div className="flex w-full max-w-[580px] flex-col items-start justify-center gap-spacing-lg bg-brand-tertiary-100 p-spacing-md sm:p-10 lg:h-[481px] lg:p-[60px]">
          <SectionHeading
            kicker={
              <div className="flex w-full flex-col items-start gap-2 text-[20px] sm:text-[24px]">
                <p className="font-gill leading-[26px] text-brand-primary-100">
                   {content.kicker.split("|")[0]}
                </p>
                <p className="font-baskerville leading-normal text-brand-secondary-100">
                   {content.kicker.split("|")[1]}
                </p>
              </div>
            }
             heading={content.heading}
            as="h1"
          />

          <div className="flex items-center gap-6">
            <Button
              asChild
              className="h-auto rounded-none bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button font-normal leading-button tracking-button text-brand-tertiary-100 hover:bg-brand-primary-hover"
            >
              <Link href={content.actions[0].href}>{content.actions[0].label}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-none border-brand-secondary-100 bg-transparent px-spacing-md py-spacing-xs font-button text-button font-normal leading-button tracking-button text-brand-secondary-100 hover:bg-transparent hover:text-brand-secondary-100"
            >
              <Link href={content.actions[1].href}>{content.actions[1].label}</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[1442/895] w-full overflow-hidden lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.backgroundImage}
            alt={content.backgroundAlt}
            className="h-full w-full object-contain"
          />
        </div>

        <dl className="grid w-full grid-cols-2 bg-brand-tertiary-100 px-spacing-md py-[18px] sm:px-12 lg:h-[126px] lg:grid-cols-4 lg:px-24">
             {content.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative flex min-h-[104px] items-center justify-center py-3 lg:min-h-0 lg:py-0 ${
                index % 2 === 0
                  ? "border-r border-brand-secondary-100/25 lg:border-r-0"
                  : ""
              } ${index < 2 ? "border-b border-brand-secondary-100/25 lg:border-b-0" : ""}`}
            >
              <div className="flex flex-col items-center">
                <dt className="order-2 font-gill text-[18px] leading-[22px] text-brand-secondary-100 sm:text-[24px] sm:leading-[26px]">
                  {stat.label}
                </dt>
                <dd className="order-1 font-baskerville text-[48px] leading-[52px] text-brand-primary-100 sm:text-display sm:leading-display">
                  {stat.value}
                </dd>
              </div>
              {index < content.stats.length - 1 && (
                <span
                  className="absolute right-0 hidden h-[90px] w-px bg-brand-secondary-100/25 lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </dl>

        <div className="mt-6 flex min-h-[59px] w-full items-center justify-start bg-brand-tertiary-100 px-spacing-md py-spacing-xs sm:justify-end sm:px-spacing-xl lg:mt-12">
          <p className="font-gill text-[16px] leading-[24px] text-brand-secondary-100 sm:text-button">
             {content.coordinates}
          </p>
        </div>
      </div>
    </section>
  );
}
