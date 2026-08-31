"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

export interface StickyTabOption<T extends string> {
  value: T;
  label: string;
}

interface StickyTabsProps<T extends string> {
  tabs: readonly StickyTabOption<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}

/**
 * Shared, bounded tab layout used by the course and membership sections.
 *
 * The tab strip is sticky relative to the browser viewport, while this wrapper
 * remains its containing block. That means the strip naturally releases when
 * the final tab panel scrolls out of view.
 */
export function StickyTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  children,
  ariaLabel,
  className = "",
}: StickyTabsProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pinnedTopRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pinnedTopRef.current === null) return;

    const restoreFrame = window.requestAnimationFrame(() => {
      const bar = barRef.current;

      if (!bar) return;

      const headerOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-offset"),
        ) || pinnedTopRef.current || 0;
      const currentTop = bar.getBoundingClientRect().top;
      const delta = currentTop - headerOffset;

      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, behavior: "instant" });
      }

      pinnedTopRef.current = null;
    });

    return () => window.cancelAnimationFrame(restoreFrame);
  }, [activeTab]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const bar = barRef.current;

    if (!wrapper || !bar) return;

    const stickBar = () => {
      gsap.set(wrapper, { paddingTop: 0 });
      gsap.set(bar, { clearProps: "position,top,bottom" });
    };

    const needsShortPageRelease = () => {
      const headerOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-offset"),
        ) || 0;
      const wrapperBottom = wrapper.getBoundingClientRect().bottom + window.scrollY;
      const barHeight = bar.getBoundingClientRect().height;
      const naturalReleaseY = wrapperBottom - headerOffset - barHeight;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      return naturalReleaseY > maxScrollY + 1;
    };

    const getShortPageReleaseStart = () => {
      const headerOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-offset"),
        ) || 0;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const barHeight = bar.getBoundingClientRect().height;
      const stickyStartY = wrapperTop - headerOffset;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const finalScrollRange = headerOffset + barHeight;

      return Math.max(stickyStartY + barHeight, maxScrollY - finalScrollRange);
    };

    const releaseBar = () => {
      if (!needsShortPageRelease()) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();

      gsap.set(wrapper, { paddingTop: barRect.height });
      gsap.set(bar, {
        position: "absolute",
        top: barRect.top - wrapperRect.top,
        bottom: "auto",
      });
    };

    const boundary = ScrollTrigger.create({
      trigger: wrapper,
      start: () => getShortPageReleaseStart(),
      end: "max",
      onEnter: releaseBar,
      onLeaveBack: stickBar,
      onRefresh: (self) => {
        if (!needsShortPageRelease() || self.progress === 0) {
          stickBar();
        }
      },
    });

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      boundary.kill();
      gsap.set(wrapper, { clearProps: "paddingTop" });
      gsap.set(bar, { clearProps: "position,top,bottom" });
    };
  }, [activeTab]);

  const handleTabChange = (tab: T) => {
    const bar = barRef.current;

    if (bar && getComputedStyle(bar).position === "sticky") {
      const currentTop = bar.getBoundingClientRect().top;
      const headerOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-offset"),
        ) || 0;

      if (Math.abs(currentTop - headerOffset) <= 2) {
        pinnedTopRef.current = currentTop;
      }
    }

    onTabChange(tab);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative flex w-full flex-col ${className}`}
      style={{ overflowAnchor: "none" }}
    >
      <div
        ref={barRef}
        className="sticky top-[var(--header-offset,112px)] z-30 flex w-full items-center bg-brand-tertiary-100"
      >
        <div className="w-full overflow-x-auto border-b border-brand-secondary-100/15">
          <div className="flex min-w-max items-center" role="tablist" aria-label={ariaLabel}>
            {tabs.map((tab, index) => (
              <span key={tab.value} className="flex items-center">
                {index > 0 && (
                  <span className="h-3 w-px bg-brand-secondary-100" aria-hidden="true" />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={[
                    "min-h-[48px] whitespace-nowrap border-b-2 px-spacing-md py-spacing-xs font-gill text-button leading-button tracking-button transition-colors",
                    activeTab === tab.value
                      ? "border-brand-primary-100 text-brand-primary-100"
                      : "border-transparent text-brand-secondary-100 hover:text-brand-primary-100",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}