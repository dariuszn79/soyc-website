"use client";

import { useState } from "react";
import { componentLabels } from "@/data/component-labels";

/**
 * SectionGallery — full-width photo carousel used on the Community page.
 *
 * Figma: 773px tall image with left/right arrow buttons (red-bordered, white bg)
 * and pagination dots (active slide is an elongated red pill, rest are white
 * circles). Slides crossfade; arrows wrap around; dots jump to a slide.
 */

export interface GallerySlide {
  src: string;
  alt: string;
}

interface SectionGalleryProps {
  images: GallerySlide[];
  overlaySrc?: string;
  previousIcon?: string;
  nextIcon?: string;
}

export function SectionGallery({
  images,
  overlaySrc,
  previousIcon = componentLabels.gallery.previousIcon,
  nextIcon = componentLabels.gallery.nextIcon,
}: SectionGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const active = Math.min(index, total - 1);
  const go = (direction: -1 | 1) => setIndex((i) => (i + direction + total) % total);

  if (total === 0) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden">
        {/* Slides — stacked, crossfading */}
        {images.map((image, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${image.src}-${i}`}
            src={image.src}
            alt={i === active ? image.alt : ""}
            aria-hidden={i !== active}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

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
            onClick={() => go(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-tertiary-100 sm:h-14 sm:w-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previousIcon} alt="" className="h-full w-full rotate-180" />
          </button>
          <button
            type="button"
            aria-label={componentLabels.gallery.next}
            onClick={() => go(1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-tertiary-100 sm:h-[60px] sm:w-[60px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextIcon} alt="" className="h-full w-full" />
          </button>
        </div>

        {/* Pagination dots — active slide gets the elongated red pill */}
        <div className="absolute bottom-[49px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setIndex(i)}
              className={i === active ? "h-2 w-4 bg-brand-primary-100" : "h-2 w-2 bg-brand-tertiary-100"}
            />
          ))}
        </div>
    </div>
  );
}
