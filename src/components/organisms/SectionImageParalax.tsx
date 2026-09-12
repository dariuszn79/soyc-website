"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardLrg } from "@/components/molecules/CardLrg";
import { ParallaxImage } from "@/components/atoms/ParallaxImage";

/**
 * SectionSideImage — full-bleed row pairing a 3:2 photo with a CardLrg overlay.
 *
 * Matches Figma node 6:216.
 *
 * Layout:
 *  • Image fills 75 % of the section width at a 3:2 aspect ratio, anchored
 *    to the side opposite the card.
 *  • CardLrg (560 px wide) is absolutely overlaid on the other side,
 *    vertically centred within the image height.
 *  • On mobile the elements stack: image on top, card below.
 *
 * Parallax (GSAP ScrollTrigger, scrub: true):
 *  • Image — ±40 px vertical drift (faster plane, handled inside ParallaxImage)
 *  • Card  — ±20 px vertical drift (slower plane, handled here)
 *    The speed difference makes the two elements feel spatially separated.
 *
 * Props:
 *  kicker   — small all-caps eyebrow label
 *  heading  — italic serif headline (supports \n line breaks)
 *  body     — body copy (supports \n line breaks)
 *  cta      — call-to-action link
 *  image    — image src path
 *  imageAlt — alt text
 *  align    — "right" card right / image left (default) | "left" reversed
 *  variant  — "secondary" dark-blue card (default) | "tertiary" white card
 */

interface Cta {
  label: string;
  href: string;
}

interface SectionImageParalaxProps {
  kicker: string;
  heading: string;
  body: string;
  cta: Cta;
  image: string;
  imageAlt?: string;
  align?: "right" | "left";
  variant?: "secondary" | "tertiary";
  figmaLayout?: boolean;
}

export function SectionImageParalax({
  kicker,
  heading,
  body,
  cta,
  image,
  imageAlt = "",
  align = "right",
  variant = "secondary",
  figmaLayout = false,
}: SectionImageParalaxProps) {
  const cardOnRight = align === "right";

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── Card parallax (GSAP) ──────────────────────────────────────────────
  // The card (foreground) travels MORE than the image (background) so it
  // appears spatially closer to the viewer — the classic depth rule:
  // nearer objects move faster across the frame.
  //   Image  : ±40 px  (background, slower)
  //   Card   : ±60 px  (foreground, faster → feels in front)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        cardRef.current,
        { y: 120 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    media.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        cardRef.current,
        { y: 24 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // No overflow-hidden on the section: the card's ±20 px drift must not
      // be clipped. The image clips itself inside ParallaxImage's container.
      className={`relative flex flex-col lg:block ${figmaLayout ? "lg:h-[663px]" : ""}`}
    >
      {/* ── Image ─────────────────────────────────────────────────────────
          Anchored to the side opposite the card.
          ParallaxImage owns its own GSAP ScrollTrigger instance.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className={`flex w-full ${
          cardOnRight ? "lg:justify-start" : "lg:justify-end"
        }`}
      >
        <ParallaxImage
          url={image}
          alt={imageAlt}
          aspectRatio={figmaLayout ? "1024/663" : "3/2"}
          width="100%"
          strength={80}
          className={figmaLayout ? "lg:!w-[77.58%]" : "lg:!w-[75%]"}
        />
      </div>

      {/* ── Card ──────────────────────────────────────────────────────────
          Mobile : normal flow below the image, full width.
          Desktop: absolutely overlaid, vertically centred, 560 px wide,
                   inset 72 px from the section edge.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className={`lg:absolute lg:inset-0 lg:flex lg:items-center ${
          figmaLayout ? "" : "lg:px-spacing-section-x"
        } ${
          cardOnRight ? "lg:justify-end" : "lg:justify-start"
        }`}
      >
        <div
          ref={cardRef}
          className={`w-full lg:w-[560px] ${figmaLayout ? "lg:h-[663px]" : ""}`}
        >
          <CardLrg
            kicker={kicker}
            heading={heading}
            body={<span className="whitespace-pre-line">{body}</span>}
            variant={variant}
            cta={cta}
            figmaLayout={figmaLayout}
          />
        </div>
      </div>
    </section>
  );
}
