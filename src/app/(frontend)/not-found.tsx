import Link from "next/link";
import { getPage } from "@/lib/payload/queries";
import notFoundJson from "@/data/json/pages/not-found.json";

/**
 * Renders the "page-not-found" Pages record (a sectionContent block). Admins
 * can edit its text from Pages; the record is protected from deletion.
 */
export default async function NotFound() {
  const page = await getPage("page-not-found");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const block = (page?.pageSections as any[])?.find((b) => b.blockType === "sectionContent");

  const content = {
    label: block?.label ?? notFoundJson.label,
    heading: block?.heading ?? notFoundJson.heading,
    body: block?.body ?? notFoundJson.body,
    action: block?.actions?.[0] ?? { href: notFoundJson.action.href, label: notFoundJson.action.label },
  };

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
          href={content.action.href ?? "/"}
          className="h-auto rounded-none bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button font-normal leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
        >
          {content.action.label}
        </Link>
      </div>
    </main>
  );
}
