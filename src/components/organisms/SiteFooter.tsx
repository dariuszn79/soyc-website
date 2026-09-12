import Link from "next/link";
import { IconMail } from "@/components/atoms/IconMail";
import { IconFacebook } from "@/components/atoms/IconFacebook";
import { footerNavLinks } from "@/data/navigation";
import { siteContent } from "@/data/site";

/**
 * SiteFooter — the shared footer used on every inner page.
 *
 * Figma: hamble-map background at 20% opacity; top row has contact details +
 * coordinates; bottom row has logo + footer nav links + join/members CTA buttons
 * + copyright text.
 */

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-brand-tertiary-100">
      {/* Map background */}
      <div className="absolute inset-0 opacity-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteContent.siteFooterBackgroundSrc}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Top: contact + coordinates */}
      <div className="relative flex w-full items-start justify-between px-spacing-card-x pb-spacing-lg pt-spacing-section-y">
        <address className="flex flex-col gap-spacing-sm not-italic">
          <h2 className="font-baskerville text-heading-xs italic text-brand-secondary-100">{siteContent.contactHeading}</h2>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${siteContent.email}`}
              className="flex items-center gap-2 font-gill text-body-sm text-brand-secondary-100 hover:underline"
            >
              <IconMail />
              {siteContent.email}
            </a>
            <a
              href={siteContent.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-gill text-body-sm text-brand-secondary-100 hover:underline"
            >
              <IconFacebook />
              {siteContent.facebookLabel}
            </a>
          </div>
        </address>

        {/* Coordinates */}
        <div className="flex flex-col items-end gap-1">
          <p className="font-baskerville text-heading-md leading-none text-brand-secondary-100">
            {siteContent.coordinates}
          </p>
          <p className="font-gill text-body-sm uppercase tracking-overline text-brand-secondary-100">
            {siteContent.location}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="relative mx-spacing-card-x h-px bg-brand-rule" />

      {/* Bottom: logo + nav + copyright */}
      <div className="relative flex w-full items-center gap-spacing-lg px-spacing-card-x py-spacing-md">
        {/* Logo */}
        <div className="shrink-0">
          <Link href={siteContent.logoHref}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteContent.logoSrc}
              alt={siteContent.logoAlt}
              className="h-[72px] w-[72px] object-contain"
            />
          </Link>
        </div>

        {/* Nav links + CTA buttons */}
        <div className="flex flex-1 items-center justify-center">
          {footerNavLinks.map((link, i) => (
            <span key={link.label} className="flex items-center">
              <Link
                href={link.href}
                  className="font-gill px-3 text-body-sm text-brand-secondary-100 hover:underline"
              >
                {link.label}
              </Link>
              {i < footerNavLinks.length - 1 && (
                <span className="font-gill text-body-sm text-brand-secondary-100/30">|</span>
              )}
            </span>
          ))}
          <span className="ml-3 flex items-center gap-2">
            <Link
              href={siteContent.joinHref ?? "/join"}
              className="bg-brand-primary-100 px-4 py-2 font-button text-body-sm text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
            >
              {siteContent.headerJoinLabel}
            </Link>
            <Link
              href={siteContent.membersHref ?? "/members-area"}
              className="bg-brand-secondary-100 px-4 py-2 font-button text-body-sm text-brand-tertiary-100 transition-colors hover:bg-brand-secondary-hover"
            >
              {siteContent.membersLabel}
            </Link>
          </span>
        </div>

        {/* Copyright */}
        <div className="shrink-0 text-right">
          <p className="font-gill text-caption text-brand-secondary-100">
            {siteContent.copyright}
          </p>
          <p className="font-gill text-caption text-brand-secondary-100/60">
            {siteContent.registration}
          </p>
        </div>
      </div>
    </footer>
  );
}
