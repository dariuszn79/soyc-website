"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ParallaxImage — an image that drifts vertically as it scrolls through
 * the viewport, creating a classic parallax depth effect.
 *
 * The visible frame is always the requested aspect ratio; the underlying
 * image is scaled up by ~15 % to give a travel buffer so edges never show.
 *
 * Powered by GSAP ScrollTrigger (scrub: true).
 *
 * Props:
 *  url         — image src
 *  alt         — alt text
 *  aspectRatio — CSS aspect-ratio string, e.g. "3/2" or "16/9" (default "3/2")
 *  width       — CSS width of the outer container (default "100%")
 *  className   — extra classes on the outer container
 *  strength    — total pixel travel top-to-bottom of viewport crossing
 *                (default 80 → image moves ±40 px)
 */

interface ParallaxImageProps {
  url: string;
  alt: string;
  aspectRatio?: string;
  width?: string;
  className?: string;
  strength?: number;
}

export function ParallaxImage({
  url,
  alt,
  aspectRatio = "3/2",
  width = "100%",
  className = "",
  strength = 80,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const half = strength / 2;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { y: half },
        {
          y: -half,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",  // animation starts as section enters viewport from below
            end: "bottom top",    // animation ends as section exits viewport at top
            scrub: true,          // tie progress directly to scroll position
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden shrink-0 ${className}`}
      style={{ aspectRatio, width }}
    >
      {/*
        scale-[1.15] makes the image ~15 % larger than its container so the
        ±40 px vertical travel never reveals the background at the edges.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={url}
        alt={alt}
        className="h-full w-full scale-[1.15] object-cover"
      />
    </div>
  );
}
