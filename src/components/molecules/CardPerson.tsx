import { Overline } from "@/components/atoms/Overline";
import type { Person } from "@/data/people";

/**
 * CardPerson — board / skipper / instructor card.
 *
 * Figma: bordered card with square photo on the left, then dept label,
 * name (Baskerville Regular 20px), title (Baskerville Italic 17px), email.
 */

interface CardPersonProps extends Person {
  layout?: "default" | "club";
}

export function CardPerson({
  dept,
  name,
  title,
  photo,
  email,
  qualification,
  layout = "default",
}: CardPersonProps) {
  if (layout === "club") {
    return (
      <article className="relative flex min-h-[176px] min-w-0 items-center border border-brand-rule-strong bg-brand-tertiary-100 p-spacing-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/person-card-mark.svg"
          alt=""
          className="absolute left-3 top-3 h-7 w-[29px]"
        />
        <div className="flex h-[128px] w-[112px] shrink-0 items-center px-spacing-xs py-spacing-sm sm:h-[144px] sm:w-[144px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={name} className="aspect-square w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-spacing-xxs p-spacing-sm">
          <h3 className="break-words font-baskerville text-[25px] italic leading-[1.05] text-brand-secondary-100 sm:text-[32px] sm:leading-[40px]">
            {name}
          </h3>
          {title && (
            <p className="font-gill text-[16px] leading-body text-[#333444] sm:text-[18px]">
              {title}
            </p>
          )}
          {qualification && (
            <p className="font-gill text-[13px] leading-body text-[#333444]/70 sm:text-[14px]">
              {qualification}
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="flex items-start gap-2 border border-brand-rule-strong bg-brand-tertiary-100 p-4">
      {/* Photo */}
      <div className="flex w-[156px] shrink-0 items-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} className="aspect-square w-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex w-[164px] shrink-0 flex-col gap-2 px-3 pb-3 pt-2">
        <Overline size="sm" />
        <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">{dept}</p>
        <div className="flex flex-col">
          <p className="font-baskerville text-person leading-heading text-brand-secondary-100">{name}</p>
          <p className="font-baskerville italic text-person-title leading-heading text-brand-secondary-100">{title}</p>
          {qualification && (
            <p className="font-gill text-caption leading-caption text-brand-secondary-100/70">{qualification}</p>
          )}
        </div>
        <div className="h-px w-full bg-brand-rule" />
        <p className="font-gill text-caption leading-caption text-brand-secondary-100">E: {email}</p>
      </div>
    </div>
  );
}
