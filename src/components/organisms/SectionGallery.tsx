import { componentLabels } from "@/data/component-labels";

/**
 * SectionGallery — full-width photo carousel (static presentation) used on the
 * Community page.
 *
 * Figma: 773px tall image with left/right arrow buttons (red-bordered, white bg)
 * and 10 pagination dots (first dot is an active red pill, rest are white circles).
 */

interface SectionGalleryProps {
  src: string;
  alt: string;
  overlaySrc?: string;
  previousIcon?: string;
  nextIcon?: string;
  /** Number of pagination dots. Defaults to 10. */
  totalSlides?: number;
}

export function SectionGallery({
  src,
  alt,
  overlaySrc,
  previousIcon = componentLabels.gallery.previousIcon,
  nextIcon = componentLabels.gallery.nextIcon,
  totalSlides = 10,
}: SectionGalleryProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />

        {overlaySrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={overlaySrc}
            alt=""
            className="absolute bottom-[-1px] left-0 h-[180px] w-full object-cover object-top"
          />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/60 to-transparent" />
        )}

        {/* Navigation arrows */}
        <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 sm:px-6">
          <button
            type="button"
            aria-label={componentLabels.gallery.previous}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-tertiary-100 sm:h-14 sm:w-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previousIcon} alt="" className="h-full w-full rotate-180" />
          </button>
          <button
            type="button"
            aria-label={componentLabels.gallery.next}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-tertiary-100 sm:h-[60px] sm:w-[60px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextIcon} alt="" className="h-full w-full" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-[49px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
          {/* Active dot — elongated red pill */}
          <div className="h-2 w-4 bg-brand-primary-100" />
          {/* Inactive dots */}
          {Array.from({ length: totalSlides - 1 }).map((_, i) => (
            <div key={i} className="h-2 w-2 bg-brand-tertiary-100" />
          ))}
        </div>
    </div>
  );
}
