/**
 * SectionContent — centred label/heading/body with action buttons.
 * Used for simple content pages (members area, error pages).
 */

interface SectionContentAction {
  label: string;
  href: string;
  external?: boolean;
}

interface SectionContentProps {
  label?: string;
  heading: string;
  body?: string;
  actions?: SectionContentAction[];
}

export function SectionContent({ label, heading, body, actions = [] }: SectionContentProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-[720px] flex-col items-center justify-center gap-spacing-md px-4 py-24 text-center sm:px-spacing-md">
      {label && (
        <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
          {label}
        </p>
      )}
      <h1 className="font-baskerville text-heading-md italic leading-heading text-brand-secondary-100 sm:text-heading-xl">
        {heading}
      </h1>
      {body && (
        <p className="font-gill text-body leading-body text-brand-ink lg:text-body-lg">
          {body}
        </p>
      )}
      <div className="mt-spacing-md flex flex-wrap items-center justify-center gap-4">
        {actions.map((a, i) => (
          <a
            key={i}
            href={a.href}
            target={a.external ? "_blank" : undefined}
            rel={a.external ? "noopener noreferrer" : undefined}
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
}
