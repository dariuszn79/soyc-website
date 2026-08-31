import type { Metadata } from "next";
import Link from "next/link";
import pageJson from "@/data/json/pages/members.json";
import type { MembersPageContent } from "@/data/page-types";

const content: MembersPageContent = pageJson;
export const metadata: Metadata = content.metadata;

export default function MembersPage() {
  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center bg-brand-tertiary-100 px-spacing-md py-spacing-section-y">
      <section className="flex max-w-2xl flex-col items-center gap-spacing-md text-center">
        <div className="h-1 w-spacing-overline-lg bg-brand-primary-100" />
        <p className="font-gill text-body-sm font-normal uppercase tracking-overline text-brand-secondary-100">
          {content.label}
        </p>
        <h1 className="font-baskerville text-5xl font-normal text-brand-secondary-100 sm:text-display">
          {content.heading}
        </h1>
        <p className="max-w-xl font-gill text-body leading-body text-brand-ink/70">
          {content.body}
        </p>
        <div className="flex flex-wrap justify-center gap-spacing-xs pt-spacing-xs">
          <Link
             href={content.actions[0].href}
            className="inline-flex items-center justify-center border border-brand-secondary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-secondary-100 transition-colors hover:bg-brand-secondary-100 hover:text-brand-tertiary-100"
          >
             {content.actions[0].label}
          </Link>
          <Link
             href={content.actions[1].href}
            className="inline-flex items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
          >
             {content.actions[1].label}
          </Link>
        </div>
      </section>
    </main>
  );
}