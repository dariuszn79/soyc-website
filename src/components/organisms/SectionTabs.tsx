import type { ReactNode } from "react";
import { SectionHeading } from "@/components/organisms/SectionHeading";
import { SectionTabsClient, type SectionTabData } from "./SectionTabsClient";
import { cardLayoutClass, cardSpan, renderCard } from "@/components/blocks/renderCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;

/**
 * SectionTabs — universal tabbed section on top of StickyTabs.
 *
 * Each tab shows an optional heading plus a grid of hand-picked card blocks.
 * Relational cards (cardBoat, cardCourse, cardPerson) pick their record
 * directly, so tab content is always authored in the CMS.
 */
async function resolveTabCards(tab: AnyObj, layout: string): Promise<ReactNode> {
  const cards: AnyObj[] = tab.content ?? [];
  const nodes: ReactNode[] = [];
  for (const [i, c] of cards.entries()) nodes.push(await renderCard(c, i));
  const spans = cards.map((c) => cardSpan(c, layout));

  return (
    <div className={cardLayoutClass(layout)}>
      {nodes.map((node, i) => (
        <div key={i} className={spans[i] ?? ""}>
          {node}
        </div>
      ))}
    </div>
  );
}

export async function SectionTabs({ block }: { block: AnyObj }) {
  // Resolve tabs sequentially — each may run a Payload query and the DB pool
  // is deliberately small (session-mode pooler).
  const tabs: SectionTabData[] = [];
  for (const [i, tab] of (block.tabs ?? []).entries()) {
    const cards = await resolveTabCards(tab as AnyObj, tab.layout ?? "grid-3");
    const h = tab.sectionHeading;
    const content =
      tab.showHeading && h?.heading ? (
        <div className="flex flex-col gap-spacing-md">
          <SectionHeading kicker={h.kicker} heading={h.heading} body={h.body} />
          {cards}
        </div>
      ) : (
        cards
      );
    tabs.push({ value: String(i), label: tab.label ?? "", content });
  }

  return (
    <SectionTabsClient
      tabs={tabs}
      ariaLabel={block.ariaLabel ?? "Section tabs"}
      emptyMessage={block.emptyMessage ?? ""}
      footerNote={block.footerNote ?? ""}
    />
  );
}
