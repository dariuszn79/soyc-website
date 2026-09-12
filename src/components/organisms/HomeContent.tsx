import { SectionImageParalax } from "@/components/organisms/SectionImageParalax";
import type { Section } from "@/data/content-types";

/**
 * HomeContent — the alternating SectionSideImage rows on the home page.
 *
 * Layout choices come from the Figma component instances.
 */
export function HomeContent({ content }: { content: Section[] }) {
  return (
    <section className="mx-auto mt-spacing-xl flex w-full max-w-[1440px] flex-col gap-spacing-section-gap overflow-hidden">
      {content.map((section) => (
        <SectionImageParalax
          key={section.kicker}
          kicker={section.kicker}
          heading={section.heading}
          body={section.body}
          cta={section.cta}
          image={section.image}
          imageAlt={section.imageAlt}
          variant={section.variant}
          align={section.align}
          figmaLayout
        />
      ))}
    </section>
  );
}
