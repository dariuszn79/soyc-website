import "server-only";
import { getPayloadClient } from "./client";

import { siteContent } from "@/data/site";
import { primaryNavItems, footerNavLinks } from "@/data/navigation";
import { componentLabels } from "@/data/component-labels";
import fleetLocationJson from "@/data/json/components/fleet-location.json";
import cruiseMapJson from "@/data/json/components/cruise-map.json";
import notFoundJson from "@/data/json/pages/not-found.json";
import { fleet } from "@/data/fleet";
import { boardMembers, trainingInstructors, communitySkippers } from "@/data/people";
import { courseTabs, coursesByTab, upcomingTrainingCourses } from "@/data/courses";
import { cruiseEvents } from "@/data/cruises";

import type { Course, CourseTab, Person } from "@/data/content-types";
import type { Page } from "@/payload-types";

/** Run a Payload query, falling back to bundled JSON if the DB is unreachable
 * (e.g. before DATABASE_URI is configured or the schema is seeded). */
async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const peopleFallback: Record<string, Person[]> = {
  board: boardMembers,
  instructors: trainingInstructors,
  skippers: communitySkippers,
};

export const getSiteSettings = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "site-settings" })) as typeof siteContent;
  }, siteContent);

export const getNavigation = () =>
  withFallback(
    async () => {
      const payload = await getPayloadClient();
      const nav = await payload.findGlobal({ slug: "navigation" });
      return {
        primaryNavItems: nav.primaryNavItems ?? primaryNavItems,
        footerNavLinks: nav.footerNavLinks ?? footerNavLinks,
      };
    },
    { primaryNavItems, footerNavLinks },
  );

export const getComponentLabels = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "component-labels" })) as typeof componentLabels;
  }, componentLabels);

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

export const getNotFound = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "page-not-found" })) as typeof notFoundJson;
  }, notFoundJson);

export const getPage = (slug: string): Promise<Page | null> =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });
    return (docs[0] as Page) ?? null;
  }, null);

export const getBoats = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({ collection: "boats", sort: "order", limit: 100 });
    return docs.length ? docs : fleet;
  }, fleet);

export const getPeople = (group: "board" | "instructors" | "skippers") =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "people",
      where: { group: { equals: group } },
      sort: "order",
      limit: 200,
    });
    return docs.length ? (docs as unknown as Person[]) : peopleFallback[group];
  }, peopleFallback[group]);

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
    return docs.length ? docs : upcomingTrainingCourses;
  }, upcomingTrainingCourses);

export const getCruiseEvents = () =>
  withFallback(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "cruise-events",
      sort: "order",
      limit: 100,
    });
    return docs.length ? docs : cruiseEvents;
  }, cruiseEvents);
