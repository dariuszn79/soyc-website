"use client";

import { useState, type ReactNode } from "react";
import { StickyTabs } from "@/components/molecules/StickyTabs";

export interface SectionTabData {
  value: string;
  label: string;
  /** Server-rendered cards for this tab. */
  content: ReactNode;
}

interface SectionTabsClientProps {
  tabs: SectionTabData[];
  ariaLabel: string;
  emptyMessage?: string;
  footerNote?: string;
}

/**
 * Client half of SectionTabs — owns the active-tab state and renders the
 * tab bar plus the server-rendered content of the active tab.
 */
export function SectionTabsClient({
  tabs,
  ariaLabel,
  emptyMessage,
  footerNote,
}: SectionTabsClientProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? "0");
  const active = tabs.find((t) => t.value === activeTab) ?? tabs[0];

  return (
    <div className="flex flex-col gap-spacing-md bg-brand-tertiary-100 pb-spacing-md pt-[60px]">
      <StickyTabs
        tabs={tabs.map(({ value, label }) => ({ value, label }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ariaLabel={ariaLabel}
      >
        {active?.content ?? (
          <p className="border border-brand-rule p-spacing-md font-gill text-[18px] leading-[24px] text-brand-ink">
            {emptyMessage}
          </p>
        )}
        {footerNote && (
          <p className="px-spacing-md text-center font-gill text-[16px] font-semibold leading-[19px] text-brand-secondary-100">
            {footerNote}
          </p>
        )}
      </StickyTabs>
    </div>
  );
}
