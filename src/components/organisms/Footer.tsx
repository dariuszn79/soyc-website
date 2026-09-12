import { IconFacebook } from "@/components/atoms/IconFacebook";
import { IconMail } from "@/components/atoms/IconMail";
import { siteContent as siteContentDefault } from "@/data/site";
import type { SiteContent } from "@/data/page-types";

/**
 * Footer — the shared site-wide footer rendered by the root layout.
 *
 * Includes the nautical decorative background, contact details, location,
 * site navigation, actions, logo, and company information.
 */
export function Footer({ site }: { site?: SiteContent } = {}) {
  const siteContent = site ?? siteContentDefault;
  return (
    <footer className="relative w-full overflow-hidden bg-brand-secondary-100 px-6 py-10 text-text-light md:px-spacing-xl lg:h-[316px] lg:px-[60px] lg:py-spacing-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-18.67%] right-[-13.19%] top-[calc(50%+72px)] aspect-[1900/1080] -translate-y-1/2 opacity-[0.18]"
      >
        <div className="relative size-full -scale-x-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 size-full object-cover brightness-0 invert"
            alt=""
            src={siteContent.footerBackgroundSrc}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute left-[69.39%] top-[9.63%] h-[56.11%] w-[31.57%] brightness-0 invert"
            alt=""
            src={siteContent.footerCompassSrc}
          />
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-start gap-10 lg:flex-row lg:flex-wrap lg:gap-x-0 lg:gap-y-spacing-md">
        <div className="flex min-w-[280px] flex-col items-start gap-[22px] sm:min-w-[320px]">
          <div className="flex h-20 flex-col items-start gap-spacing-xs whitespace-nowrap">
            <p className="font-gill text-heading-sm font-semibold leading-[36px]">
              {siteContent.coordinates}
            </p>
            <p className="font-gill text-button font-medium leading-body">
              {siteContent.location}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-[118px] w-[116px] object-contain"
            alt={siteContent.logoAlt}
            src={siteContent.footerLogoSrc}
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-spacing-md lg:px-spacing-xl lg:items-end">
          <div className="flex w-full flex-col items-start justify-end lg:flex-row lg:items-center">
            <div className="flex min-w-[260px] flex-col items-start justify-center py-spacing-sm lg:min-w-[300px] lg:items-center lg:pr-spacing-sm">
              <h2 className="whitespace-nowrap font-baskerville text-[48px] italic leading-[1.08] lg:text-heading-xl lg:leading-[60px]">
                {siteContent.contactHeading}
              </h2>
            </div>

            <address className="flex flex-col items-start justify-center gap-spacing-xxs not-italic lg:h-[92px] lg:items-end">
              <div className="flex items-center gap-spacing-xs">
                <IconFacebook className="size-6 shrink-0" />
                <a
                  className="whitespace-nowrap font-gill text-body leading-normal underline"
                  href={siteContent.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {siteContent.facebookLabel}
                </a>
              </div>
              <div className="flex items-center gap-spacing-xs">
                <IconMail className="size-6 shrink-0" />
                <a
                  className="font-gill text-body leading-normal underline"
                  href={`mailto:${siteContent.email}`}
                >
                  {siteContent.email}
                </a>
              </div>
            </address>
          </div>

          <div className="flex w-full max-w-[420px] min-w-0 flex-col gap-spacing-md font-gill text-body leading-normal lg:min-w-[400px] lg:items-end lg:text-right">
            <p>{siteContent.copyright}</p>
            <p>{siteContent.registration}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}