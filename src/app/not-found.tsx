import Link from "next/link";
import pageJson from "@/data/json/pages/not-found.json";
import type { NotFoundPageContent } from "@/data/page-types";

const content: NotFoundPageContent = pageJson;

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-spacing-lg bg-brand-tertiary-100 px-spacing-md">
      <div className="flex flex-col items-center gap-spacing-md text-center">
        <div className="h-1 w-spacing-overline-lg bg-brand-primary-100" />
        <p className="font-gill text-body-sm font-normal uppercase tracking-overline text-brand-secondary-100">
          {content.label}
        </p>
        <h1 className="font-baskerville text-5xl font-normal text-brand-secondary-100">
          {content.heading}
        </h1>
        <p className="font-gill max-w-md text-button text-brand-ink/60">
          {content.body}
        </p>
        <Link
          href={content.action.href}
          className="h-auto rounded-none bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button font-normal leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
        >
          {content.action.label}
        </Link>
      </div>
    </main>
  );
}
