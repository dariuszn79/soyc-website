import Link from "next/link";
import { Overline } from "@/components/atoms/Overline";

interface SectionBackgroundImageProps {
  kicker: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
}

export function SectionBackgroundImage({
  kicker,
  heading,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
}: SectionBackgroundImageProps) {
  return (
    <section
      id="fleet-join"
      className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-brand-primary-100 lg:h-[663px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-secondary-100/30" aria-hidden="true" />

      <div className="relative z-10 mx-spacing-md flex min-h-[540px] w-full max-w-[560px] flex-col items-center justify-center gap-spacing-lg bg-brand-secondary-100/75 p-spacing-md text-center text-text-light sm:p-spacing-xl lg:mx-0 lg:min-h-[663px]">
        <div className="flex flex-col items-center gap-spacing-md">
          <div className="flex flex-col items-center gap-spacing-xs">
            <Overline />
            <p className="font-gill text-[14px] uppercase leading-[14px]">{kicker}</p>
          </div>
          <div className="flex flex-col gap-spacing-md">
            <h2 className="font-baskerville text-heading-md italic leading-heading sm:text-heading-xl">
              {heading}
            </h2>
            <p className="font-gill text-[18px] leading-[1.35] sm:text-[24px] sm:leading-[32px]">
              {body}
            </p>
          </div>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex min-h-[48px] items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}