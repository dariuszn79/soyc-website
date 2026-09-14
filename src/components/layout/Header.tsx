"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { NavItem } from "@/components/atoms/NavItem";
import { primaryNavItems as primaryNavItemsDefault } from "@/data/navigation";
import { siteContent as siteContentDefault } from "@/data/site";
import type { SiteContent } from "@/data/page-types";
import type { NavItem as NavItemType } from "@/data/content-types";

function normalizePath(path: string) {
  return path === "/" ? path : path.replace(/\/$/, "");
}

/**
 * Header — the site-wide navigation header, identical across every page.
 *
 * Figma: white bar with the Speedbird logo on the left, primary nav links with
 * pipe separators in the centre-right, and "Join us" (red) + "Members area"
 * (blue) action buttons on the far right.
 *
 * Lives in components/layout/ and is rendered once by the root layout so every
 * page gets the same header automatically.
 */

export function Header({
  site,
  nav,
}: {
  site?: SiteContent;
  nav?: NavItemType[];
} = {}) {
  const siteContent = site ?? siteContentDefault;
  const primaryNavItems = nav ?? primaryNavItemsDefault;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    const logo = logoRef.current;
    const root = document.documentElement;

    if (!header || !logo) return;

    let isCompact = false;

    const animateHeader = (compact: boolean) => {
      if (compact === isCompact) return;
      isCompact = compact;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      gsap.to(header, {
        height: compact ? (isDesktop ? 112 : 80) : isDesktop ? 160 : 112,
        paddingTop: compact ? 12 : isDesktop ? 24 : 16,
        paddingBottom: compact ? 12 : isDesktop ? 24 : 16,
        borderColor: compact ? "rgba(38 46 188,0.15)" : "rgb(255 255 255)",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(root, {
        "--header-offset": `${compact ? (isDesktop ? 112 : 80) : isDesktop ? 160 : 112}px`,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(logo, {
        scale: compact ? (isDesktop ? 0.72 : 0.7) : 1,
        transform: compact ? isDesktop ? "translateY(-20px)" : "translateY(-16px)" : "translateY(0)",
        duration: 0.35,
        ease: "power2.out",
        transformOrigin: "left center",
        overwrite: "auto",
      });
    };

    const scrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 24) {
          animateHeader(true);
        } else if (self.direction === -1 || self.scroll() <= 24) {
          animateHeader(false);
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      gsap.killTweensOf([header, logo, root]);
    };
  }, []);

  return (
    <div className="pointer-events-none sticky top-0 z-40 h-28 w-full lg:h-40">
      <header
        ref={headerRef}
        className="pointer-events-auto absolute inset-x-0 top-0 flex h-28 w-full items-center justify-between border border-white bg-brand-tertiary-100 px-6 py-4 will-change-[height,padding,border-color] lg:h-40 lg:items-start lg:px-spacing-xl lg:py-spacing-md"
      >
        <Link
          ref={logoRef}
          href={siteContent.logoHref}
          className="relative size-20 shrink-0 will-change-transform lg:size-28"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 size-full object-contain"
            alt={siteContent.logoAlt}
            src={siteContent.logoSrc}
          />
        </Link>

        <nav
          className="ml-8 hidden w-[951px] max-w-full flex-wrap items-center gap-spacing-xxs overflow-x-auto pt-spacing-xs lg:flex"
          aria-label={siteContent.primaryNavLabel}
        >
          {primaryNavItems.map((item) => {
            const isActive =
              normalizePath(pathname ?? "/") === normalizePath(item.href);
            return (
              <div key={item.label} className="flex min-h-12 items-center">
                <NavItem
                  href={item.href}
                  label={item.label}
                  isActive={isActive}
                />
                {item.divider && (
                  <span
                    className="h-3 w-px shrink-0 bg-brand-secondary-100"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}

          <Link
            href={siteContent.joinHref ?? "/join"}
            className="flex h-12 items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button font-medium leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-100/90"
          >
            {siteContent.headerJoinLabel}
          </Link>
          <Link
            href={siteContent.membersHref ?? "/members-area"}
            className="flex h-12 items-center justify-center bg-brand-secondary-100 px-spacing-md py-spacing-xs font-button text-button font-medium leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-secondary-100/90"
          >
            {siteContent.membersLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-12 place-items-center text-text-secondary lg:hidden"
          aria-label={
            mobileOpen ? siteContent.closeNavLabel : siteContent.openNavLabel
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-navigation"
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
        >
          {mobileOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </button>

        {mobileOpen && (
          <nav
            id="mobile-primary-navigation"
            className="absolute inset-x-0 top-full flex flex-col border-b border-brand-border bg-brand-tertiary-100 px-6 py-spacing-md shadow-lg lg:hidden"
            aria-label={siteContent.mobileNavLabel}
          >
            {primaryNavItems.map((item) => {
              const isActive =
                normalizePath(pathname ?? "/") === normalizePath(item.href);
              return (
                <NavItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  isActive={isActive}
                  mobile
                  onClick={() => setMobileOpen(false)}
                />
              );
            })}
            <div className="mt-spacing-md grid grid-cols-2 gap-spacing-xxs">
              <Link
                href={siteContent.joinHref ?? "/join"}
                className="flex h-12 items-center justify-center bg-brand-primary-100 px-spacing-xs font-button text-button font-medium leading-button tracking-button text-brand-tertiary-100"
                onClick={() => setMobileOpen(false)}
              >
                {siteContent.headerJoinLabel}
              </Link>
              <Link
                href={siteContent.membersHref ?? "/members-area"}
                className="flex h-12 items-center justify-center bg-brand-secondary-100 px-spacing-xs font-button text-button font-medium leading-button tracking-button text-brand-tertiary-100"
                onClick={() => setMobileOpen(false)}
              >
                {siteContent.membersLabel}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
