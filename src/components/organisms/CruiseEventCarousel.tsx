"use client";

import { useRef } from "react";
import { CardEvent, type CruiseEvent } from "@/components/molecules/CardEvent";
import { componentLabels } from "@/data/component-labels";

interface CruiseEventCarouselProps {
  events: CruiseEvent[];
}

export function CruiseEventCarousel({ events }: CruiseEventCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;

    if (!track || !card) return;

    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: "smooth",
    });
  };

  return (
    <div className="flex w-full flex-col gap-spacing-md">
      <div className="flex items-center justify-end gap-[10px]">
        <button
          type="button"
          aria-label={componentLabels.cruiseCarousel.previous}
          onClick={() => move(-1)}
          className="h-14 w-14 shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={componentLabels.cruiseCarousel.arrowSrc}
            alt=""
            className="h-full w-full rotate-180"
          />
        </button>
        <button
          type="button"
          aria-label={componentLabels.cruiseCarousel.next}
          onClick={() => move(1)}
          className="h-[60px] w-[60px] shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={componentLabels.cruiseCarousel.arrowSrc} alt="" className="h-full w-full" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex w-full gap-spacing-sm overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {events.map((event, index) => (
          <CardEvent key={`${event.title}-${index}`} {...event} />
        ))}
      </div>
    </div>
  );
}