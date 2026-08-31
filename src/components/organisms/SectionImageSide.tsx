import { CardBoat } from "@/components/molecules/CardBoat";
import type { Boat } from "@/data/fleet";

interface SectionImageSideProps {
  boat: Boat;
  imagePosition?: "left" | "right";
}

/**
 * Alternating Fleet row: a large 3:2 yacht image paired with CardBoat.
 * It stacks image-first on smaller screens so neither panel relies on a fixed width.
 */
export function SectionImageSide({ boat, imagePosition = "left" }: SectionImageSideProps) {
  const imageOrder = imagePosition === "right" ? "lg:order-2" : "lg:order-1";
  const cardOrder = imagePosition === "right" ? "lg:order-1" : "lg:order-2";

  return (
    <section className="flex w-full flex-col overflow-hidden bg-brand-tertiary-100 lg:h-[663px] lg:flex-row">
      <div
        className={`relative aspect-[4/3] min-h-0 w-full overflow-hidden lg:aspect-auto lg:h-[663px] lg:min-w-0 lg:flex-1 ${imageOrder}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={boat.photo}
          alt={boat.photoAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className={`w-full shrink-0 lg:w-[560px] ${cardOrder}`}>
        <CardBoat {...boat} />
      </div>
    </section>
  );
}