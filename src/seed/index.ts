import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Seed script: migrates the bundled JSON content into Payload — globals,
 * content collections, and the Pages collection (decomposed into layout
 * blocks). Idempotent: clears existing docs then recreates. Run with:
 *   pnpm seed
 */

const DATA = path.resolve(process.cwd(), "src/data/json");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const read = (p: string): any => JSON.parse(fs.readFileSync(path.join(DATA, p), "utf8"));

// ── JSON sources ────────────────────────────────────────────────────────
const site = read("site.json");
const navigation = read("navigation.json");
const labels = read("components/labels.json");
const fleetLocation = read("components/fleet-location.json");
const cruiseMap = read("components/cruise-map.json");
const notFound = read("pages/not-found.json");
const fleet = read("fleet.json");
const people = read("people.json");
const courses = read("courses.json");
const cruises = read("cruises.json");
const home = read("pages/home.json");
const theClub = read("pages/the-club.json");
const fleetPage = read("pages/fleet.json");
const training = read("pages/training.json");
const cruisesPage = read("pages/cruises.json");
const community = read("pages/community.json");
const members = read("pages/members.json");
const join = read("pages/join.json");
const membership = read("pages/membership-application.json");

// ── Block builders ───────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cta = (c?: AnyObj): any =>
  c ? { label: c.label ?? "", href: c.href ?? "", external: c.external ?? false } : {};

const richTextToBlocks = (blocks: AnyObj[]) =>
  (blocks ?? []).map((b) => {
    if (b.type === "paragraph") return { blockType: "paragraph", text: b.text };
    if (b.type === "list" || b.type === "orderedList")
      return {
        blockType: b.type,
        variant: b.variant ?? "spaced",
        items: (b.items as string[]).map((item) => ({ item })),
      };
    return { blockType: "break" };
  });

const heroHome = (h: AnyObj) => ({
  blockType: "heroHome",
  kicker: h.kicker,
  heading: h.heading,
  coordinates: h.coordinates,
  backgroundImage: h.backgroundImage,
  backgroundAlt: h.backgroundAlt,
  stats: h.stats,
  actions: h.actions,
});

const heroBasic = (h: AnyObj) => ({
  blockType: "heroBasic",
  heading: h.heading,
  body: h.body,
  imageSrc: h.imageSrc,
  imageAlt: h.imageAlt,
  cta: cta(h.cta as AnyObj),
});

const sectionImageSide = (s: AnyObj) => ({
  blockType: "sectionImageSide",
  kicker: s.kicker,
  heading: s.heading,
  body: s.body,
  cta: cta(s.cta as AnyObj),
  image: s.image,
  imageAlt: s.imageAlt,
  align: s.align ?? "right",
  variant: s.variant ?? "secondary",
});

const ctaBand = (c: AnyObj) => ({
  blockType: "sectionBackgroundImage",
  kicker: c.kicker,
  heading: c.heading,
  body: c.body,
  ctaLabel: c.label,
  ctaHref: c.href,
  imageSrc: c.imageSrc,
});

const cardGrid = (cards: AnyObj[]) => ({
  blockType: "cardGrid",
  cards: cards.map((c) => ({
    kicker: c.kicker,
    heading: c.heading,
    body: c.body,
    cta: cta(c.cta as AnyObj),
  })),
});

const singleCard = (c: AnyObj) => ({
  blockType: "cardGrid",
  cards: [{ kicker: c.kicker, heading: c.heading, body: c.body, cta: cta(c.cta as AnyObj) }],
});

const richTextCards = (cardsIn: AnyObj[]) => ({
  blockType: "richTextCards",
  cards: cardsIn.map((c) => ({
    kicker: c.kicker,
    heading: c.heading,
    blocks: richTextToBlocks(c.blocks as AnyObj[]),
  })),
});

const peopleSection = (s: AnyObj, group: string) => ({
  blockType: "peopleSection",
  kicker: s.kicker,
  heading: s.heading,
  body: s.body,
  group,
});

const paragraphsSection = (s: AnyObj) => ({
  blockType: "paragraphsSection",
  kicker: s.kicker,
  heading: s.heading,
  paragraphs: ((s.paragraphs as string[]) ?? []).map((text) => ({ text })),
  cta: cta(s.cta as AnyObj),
});

const coursesTabs = (t: AnyObj) => ({
  blockType: "coursesTabs",
  ariaLabel: t.ariaLabel,
  emptyMessage: t.emptyMessage,
  rateNote: t.rateNote,
});

const upcomingCourses = (s: AnyObj) => ({
  blockType: "upcomingCourses",
  kicker: s.kicker,
  heading: s.heading,
  body: s.body,
});

const cruiseCarousel = (s: AnyObj) => ({
  blockType: "cruiseCarousel",
  kicker: s.kicker,
  heading: s.heading,
  body: s.body,
});

const gallery = (g: AnyObj) => ({
  blockType: "gallery",
  kicker: g.kicker,
  heading: g.heading,
  body: g.body,
  src: g.src,
  overlaySrc: g.overlaySrc,
  alt: g.alt,
  totalSlides: g.totalSlides,
});

const simpleContent = (p: AnyObj) => ({
  blockType: "simpleContent",
  label: p.label,
  heading: p.heading,
  body: p.body,
  actions: p.actions,
});

const joinTabs = (j: AnyObj) => ({
  blockType: "joinTabs",
  ariaLabel: j.ariaLabel,
  tabs: j.tabs,
  panels: j.panels,
});

const membershipForm = (m: AnyObj) => ({ blockType: "membershipForm", form: m.form });

// ── Page layouts ───────────────────────────────────────────────────────
const pages = [
  {
    slug: "home",
    title: "Home",
    meta: home.metadata,
    layout: [
      heroHome(home.hero),
      ...home.sections.map(sectionImageSide),
      ctaBand(home.finalCta),
    ],
  },
  {
    slug: "the-club",
    title: "The Club",
    meta: theClub.metadata,
    layout: [
      heroBasic(theClub.hero),
      cardGrid(theClub.cards),
      peopleSection(theClub.committee, "board"),
      { blockType: "fleetLocation", flush: true },
      ctaBand(theClub.cta),
    ],
  },
  {
    slug: "fleet",
    title: "Fleet",
    meta: fleetPage.metadata,
    layout: [
      heroBasic(fleetPage.hero),
      { blockType: "fleetList" },
      { blockType: "fleetLocation", flush: false },
      ctaBand(fleetPage.cta),
    ],
  },
  {
    slug: "training",
    title: "Training",
    meta: training.metadata,
    layout: [
      heroBasic(training.hero),
      paragraphsSection(training.practicalCourses),
      coursesTabs(training.courseTabs),
      upcomingCourses(training.upcomingCourses),
      peopleSection(training.instructors, "instructors"),
      singleCard(training.shorebased),
      ctaBand(training.cta),
    ],
  },
  {
    slug: "cruises",
    title: "Cruises",
    meta: cruisesPage.metadata,
    layout: [
      heroBasic(cruisesPage.hero),
      richTextCards(cruisesPage.cruiseTypes),
      cruiseCarousel(cruisesPage.upcoming),
      { blockType: "fleetLocation", flush: true },
      ctaBand(cruisesPage.cta),
    ],
  },
  {
    slug: "community",
    title: "Community",
    meta: community.metadata,
    layout: [
      heroBasic(community.hero),
      gallery(community.gallery),
      peopleSection(community.skippers, "skippers"),
      ctaBand(community.cta),
    ],
  },
  {
    slug: "members",
    title: "Members Area",
    meta: members.metadata,
    layout: [simpleContent(members)],
  },
  {
    slug: "join",
    title: "Join Us",
    meta: join.metadata,
    layout: [heroBasic(join.hero), joinTabs(join)],
  },
  {
    slug: "membership-application",
    title: "Membership Application",
    meta: membership.metadata,
    layout: [membershipForm(membership)],
  },
];

// ── Run ────────────────────────────────────────────────────────────────
const payload = await getPayload({ config });
const ctx = { disableRevalidate: true };

console.log("Seeding globals…");
await payload.updateGlobal({ slug: "site-settings", data: site, context: ctx });
await payload.updateGlobal({ slug: "navigation", data: navigation, context: ctx });
await payload.updateGlobal({ slug: "component-labels", data: labels, context: ctx });
await payload.updateGlobal({ slug: "fleet-location", data: fleetLocation, context: ctx });
await payload.updateGlobal({ slug: "cruise-map", data: cruiseMap, context: ctx });
await payload.updateGlobal({
  slug: "page-not-found",
  data: { label: notFound.label, heading: notFound.heading, body: notFound.body, action: cta(notFound.action) },
  context: ctx,
});

async function clear(collection: string) {
  await payload.delete({ collection: collection as never, where: { id: { exists: true } }, context: ctx });
}

console.log("Seeding boats…");
await clear("boats");
for (let i = 0; i < fleet.length; i++) {
  await payload.create({ collection: "boats", data: { ...fleet[i], order: i, _status: "published" }, context: ctx });
}

console.log("Seeding people…");
await clear("people");
const peopleGroups: Array<[string, string]> = [
  ["boardMembers", "board"],
  ["trainingInstructors", "instructors"],
  ["communitySkippers", "skippers"],
];
for (const [key, group] of peopleGroups) {
  const arr = people[key] as AnyObj[];
  for (let i = 0; i < arr.length; i++) {
    await payload.create({ collection: "people", data: { ...arr[i], group, order: i, _status: "published" } as never, context: ctx });
  }
}

console.log("Seeding courses…");
await clear("courses");
let courseOrder = 0;
for (const tab of Object.keys(courses.coursesByTab)) {
  for (const c of courses.coursesByTab[tab] as AnyObj[]) {
    await payload.create({
      collection: "courses",
      data: {
        title: c.title,
        tab,
        level: c.level,
        desc: c.desc,
        items: ((c.items as string[]) ?? []).map((item) => ({ item })),
        prices: c.prices,
        notes: c.notes,
        order: courseOrder++,
        _status: "published",
      } as never,
      context: ctx,
    });
  }
}

console.log("Seeding training events…");
await clear("training-events");
for (let i = 0; i < courses.upcomingTrainingCourses.length; i++) {
  await payload.create({
    collection: "training-events",
    data: { ...courses.upcomingTrainingCourses[i], order: i, _status: "published" },
    context: ctx,
  });
}

console.log("Seeding cruise events…");
await clear("cruise-events");
for (let i = 0; i < cruises.length; i++) {
  await payload.create({ collection: "cruise-events", data: { ...cruises[i], order: i, _status: "published" }, context: ctx });
}

console.log("Seeding pages…");
await clear("pages");
for (const p of pages) {
  await payload.create({ collection: "pages", data: { ...p, _status: "published" } as never, context: ctx });
}

console.log("Seeding admin user…");
const email = process.env.SEED_EMAIL || "admin@soyc.co.uk";
const password = process.env.SEED_PASSWORD || "ChangeMe123!";
const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
if (!existing.docs.length) {
  await payload.create({ collection: "users", data: { email, password, name: "SOYC Admin" } });
  console.log(`Created admin user: ${email} / ${password}`);
} else {
  console.log(`Admin user already exists: ${email}`);
}

console.log("Seed complete.");
process.exit(0);
