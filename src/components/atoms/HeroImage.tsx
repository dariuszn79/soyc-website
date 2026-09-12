/**
 * HeroImage — the right-side diagonal clip-path hero image used on every inner page.
 *
 * Figma: full-width section with the photo anchored to the right edge, angled
 * left via clip-path polygon. Left side is white (page background shows through).
 */

interface HeroImageProps {
  src: string;
  alt: string;
  /** Height of the containing section. Defaults to "455px". */
  height?: string;
  objectPosition?: string;
}

export function HeroImage({
  src,
  alt,
  height = "455px",
  objectPosition = "center",
}: HeroImageProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-brand-tertiary-100"
      style={{ height }}
      aria-hidden="true"
    >
      <div
        className="absolute right-0 top-0 h-full"
        style={{
          width: "calc(50% + 70px)",
          clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
    </section>
  );
}
