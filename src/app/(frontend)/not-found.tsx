import Link from "next/link";
import { getNotFound } from "@/lib/payload/queries";

export default async function NotFound() {
  const content = await getNotFound();
  const action = content.action ?? { href: "/", label: "Back to home" };

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
          href={action.href ?? "/"}
          className="h-auto rounded-none bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button font-normal leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
        >
          {action.label}
        </Link>
      </div>
    </main>
  );
}
