import "server-only";
import { getPayloadClient } from "./client";

import { siteContent } from "@/data/site";
import { primaryNavItems, footerNavLinks } from "@/data/navigation";
import fleetLocationJson from "@/data/json/components/fleet-location.json";
import cruiseMapJson from "@/data/json/components/cruise-map.json";
import { fleet } from "@/data/fleet";
import { people as peopleSeed } from "@/data/people";
import { courseTabs, coursesByTab, upcomingTrainingCourses } from "@/data/courses";
import { cruiseEvents } from "@/data/cruises";

import type { Course, CourseTab, Person } from "@/data/content-types";
import type { Page } from "@/payload-types";
import { toBoat, toEventCard, toMediaAlt, toMediaSrc, toPerson } from "./transform";

/** Run a Payload query, falling back to bundled JSON if the DB is unreachable
 * (e.g. before DATABASE_URI is configured or the schema is seeded).
 *
 * In production the error is re-thrown instead: pages are statically cached,
 * so silently serving the seed JSON during a DB blip would bake stale content
 * into the cache until the next revalidation. Throwing makes Next keep the
 * last good page (ISR) rather than replace it. */
async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const building = process.env.NEXT_PHASE === "phase-production-build";
    if (process.env.NODE_ENV === "production" && process.env.DATABASE_URI && !building) throw err;
    return fallback;
  }
}

/** People groups selectable on the Section: People block → the boolean flag
 * on the Person document that marks membership of that group. */
export type PeopleGroup = "committee" | "instructors" | "skippers";
const peopleGroupFlag: Record<PeopleGroup, keyof Person> = {
  committee: "isCommittee",
  instructors: "isInstructor",
  skippers: "isClubSkipper",
};
const peopleFallback = (group: PeopleGroup): Person[] =>
  peopleSeed.filter((p) => p[peopleGroupFlag[group]]);

export const getSiteSettings = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return { ...siteContent, ...mergeGlobal(settings) };
  }, siteContent);

/**
 * Header content — the `header` global merged over the bundled site.json
 * fallback so the Header component keeps receiving its SiteContent shape.
 */
/** Merge a global doc over the site.json fallback, ignoring unset fields. */
const mergeGlobal = (doc: unknown) =>
  Object.fromEntries(
    Object.entries(doc as Record<string, unknown>).filter(([, v]) => v != null),
  );

export const getHeader = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const header = await payload.findGlobal({ slug: "header", depth: 1 });
    const merged = { ...siteContent, ...mergeGlobal(header) };
    // `logo` is a media upload — resolve it back to the `logoSrc` URL string
    // the SiteContent shape (and Header component) expects.
    merged.logoSrc = toMediaSrc(header.logo, siteContent.logoSrc);
    merged.logoAlt =
      header.logoAlt || toMediaAlt(header.logo) || siteContent.logoAlt;
    return merged;
  }, siteContent);

/**
 * Footer content — the `footer` global merged over site.json, plus the
 * page-driven + manual footer links via getNavigation().
 */
export const getFooter = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const footer = await payload.findGlobal({ slug: "footer", depth: 1 });
    const merged = { ...siteContent, ...mergeGlobal(footer) };
    // `footerLogo` is a media upload — resolve it back to the `footerLogoSrc`
    // URL string the SiteContent shape (and Footer component) expects.
    merged.footerLogoSrc = toMediaSrc(
      footer.footerLogo,
      siteContent.footerLogoSrc,
    );
    return merged;
  }, siteContent);

/**
 * Navigation is generated from Pages: each page's `nav.showIn` marks it for
 * the header and/or footer, `nav.navOrder` sorts, `nav.navLabel` overrides
 * the title. Footer extras (non-page links) come from the `footer` global.
 */
export const getNavigation = () =>
  withFallback(
    async () => {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({ collection: "pages", limit: 200 });
      const pages = docs as Page[];

      const inNav = (p: Page, area: string) =>
        (((p.nav as Record<string, unknown> | undefined)?.showIn as string[] | undefined) ?? []).includes(area);
      const byOrder = (a: Page, b: Page) =>
        (((a.nav as Record<string, unknown> | undefined)?.navOrder as number) ?? 999) -
        (((b.nav as Record<string, unknown> | undefined)?.navOrder as number) ?? 999);
      const toItem = (p: Page) => ({
        label: ((p.nav as Record<string, unknown> | undefined)?.navLabel as string) || p.title,
        href: p.slug === "home" ? "/" : `/${p.slug}`,
        divider: ((p.nav as Record<string, unknown> | undefined)?.divider as boolean) ?? false,
      });

      const headerItems = pages.filter((p) => inNav(p, "header")).sort(byOrder).map(toItem);
      const footerPageLinks = pages
        .filter((p) => inNav(p, "footer"))
        .sort(byOrder)
        .map((p) => ({ label: toItem(p).label, href: toItem(p).href }));

      const footer = await getFooter();
      const extra = ((footer.extraLinks as Array<{ label: string; href: string }> | undefined) ?? []).map(
        (l) => ({ label: l.label, href: l.href }),
      );

      return {
        primaryNavItems: headerItems.length ? headerItems : primaryNavItems,
        footerNavLinks: [...footerPageLinks, ...extra].length
          ? [...footerPageLinks, ...extra]
          : footerNavLinks,
      };
    },
    { primaryNavItems, footerNavLinks },
  );

export const getFleetLocation = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "fleet-location" })) as typeof fleetLocationJson;
  }, fleetLocationJson);

export const getCruiseMap = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "cruise-map" })) as typeof cruiseMapJson;
  }, cruiseMapJson);

export const getPage = (slug: string): Promise<Page | null> =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      depth: 3,
      limit: 1,
    });
    return (docs[0] as Page) ?? null;
  }, null);

export const getBoats = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({ collection: "boats", sort: "order", limit: 100, depth: 2 });
    return docs.length ? docs.map(toBoat) : fleet;
  }, fleet);

export const getPeople = (group: PeopleGroup) =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "people",
      where: { [peopleGroupFlag[group]]: { equals: true } },
      sort: "order",
      limit: 200,
      depth: 2,
    });
    return docs.length ? (docs.map(toPerson) as Person[]) : peopleFallback(group);
  }, peopleFallback(group));

export const getCourses = (): Promise<{
  courseTabs: typeof courseTabs;
  coursesByTab: Record<CourseTab, Course[]>;
}> =>
  withFallback(
    async () => {
      const payload = await getPayloadClient();
      const { docs } = await payload.find({ collection: "courses", sort: "order", limit: 200 });
      if (!docs.length) return { courseTabs, coursesByTab };
      const grouped: Record<CourseTab, Course[]> = {
        Beginner: [],
        Intermediate: [],
        Advanced: [],
        "All Levels": [],
      };
      for (const c of docs as unknown as Array<Record<string, unknown>>) {
        const tab = ((c.tab as string) ?? "All Levels") as CourseTab;
        (grouped[tab] ??= []).push({
          level: (c.level as string) ?? tab,
          title: c.title as string,
          desc: (c.desc as string) ?? "",
          items: ((c.items as Array<{ item?: string }>) ?? []).map((i) => i.item ?? ""),
          prices: (c.prices as Course["prices"]) ?? ([] as unknown as Course["prices"]),
          notes: (c.notes as string) ?? "",
        });
      }
      return { courseTabs, coursesByTab: grouped };
    },
    { courseTabs, coursesByTab },
  );

export const getTrainingEvents = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "training-events",
      sort: "order",
      limit: 100,
    });
    return docs.length ? docs.map(toEventCard) : upcomingTrainingCourses;
  }, upcomingTrainingCourses);

export const getCruiseEvents = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "cruise-events",
      sort: "order",
      limit: 100,
      depth: 2,
    });
    return docs.length ? docs.map(toEventCard) : cruiseEvents;
  }, cruiseEvents);
