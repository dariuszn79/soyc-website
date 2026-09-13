import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";
import { adminGroups } from "../lib/payload/adminGroups";

/**
 * Seed script: migrates the bundled JSON content into Payload — globals,
 * content collections, media assets, and the Pages collection (decomposed
 * into section blocks). Idempotent: clears existing docs then recreates.
 * Run with: pnpm seed
 */

const DATA = path.resolve(process.cwd(), "src/data/json");
const PUBLIC = path.resolve(process.cwd(), "public");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const read = (p: string): any => JSON.parse(fs.readFileSync(path.join(DATA, p), "utf8"));

// ── JSON sources ────────────────────────────────────────────────────────
const site = read("site.json");
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

const payload = await getPayload({ config });
const ctx = { disableRevalidate: true };

/** Upload a /public asset into the Media library (once per unique path) and
 * return its document id. Keeps block/collection `upload` fields wired to
 * real media docs. */
const mediaCache = new Map<string, number>();
async function mediaId(srcPath?: string | null, alt?: string): Promise<number | null> {
  if (!srcPath) return null;
  const abs = path.join(PUBLIC, srcPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    console.warn(`  ⚠ missing asset, skipped: ${srcPath}`);
    return null;
  }
  const cached = mediaCache.get(srcPath);
  if (cached) return cached;
  const filename = path.basename(srcPath);
  const found = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  // Always pass filePath so the active storage adapter (local disk / S3)
  // actually receives the file — reusing the doc alone leaves remote
  // storage empty when seeding a fresh bucket.
  // NOTE: a fresh context object is required per call — the cloud-storage
  // plugin stashes the processed file on req.context (_payloadCloudStorage),
  // so sharing `ctx` across ops makes every upload after the first a no-op.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = found.docs[0]
    ? await payload.update({
        collection: "media",
        id: found.docs[0].id,
        data: { alt: alt ?? filename },
        filePath: abs,
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: "media",
        data: { alt: alt ?? filename },
        filePath: abs,
        context: { disableRevalidate: true },
      });
  mediaCache.set(srcPath, doc.id as number);
  return doc.id as number;
}

const cta = (c?: AnyObj): AnyObj =>
  c ? { label: c.label ?? "", href: c.href ?? "", external: c.external ?? false } : {};

/** showHeading + sectionHeading group — the optional heading toggle on
 * section blocks. Pass a { kicker, heading, body } JSON section, or nothing. */
const heading = (h?: { kicker?: string; heading?: string; body?: string } | null): AnyObj =>
  h?.heading
    ? {
        showHeading: true,
        sectionHeading: { kicker: h.kicker ?? "", heading: h.heading, body: h.body ?? "" },
      }
    : { showHeading: false };

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

/** CardLrg/CardMed `body` accepts rich-text blocks; a plain string becomes a
 * single paragraph block. */
const toBodyBlocks = (body: AnyObj) =>
  Array.isArray(body) ? richTextToBlocks(body) : body ? [{ blockType: "paragraph", text: body }] : [];

const para = (text: string) => ({ blockType: "paragraph", text });

// ── Section builders ─────────────────────────────────────────────────────
const heroHome = async (h: AnyObj) => ({
  blockType: "heroHome",
  kicker: h.kicker,
  heading: h.heading,
  coordinates: h.coordinates,
  backgroundImage: await mediaId(h.backgroundImage, h.backgroundAlt),
  backgroundAlt: h.backgroundAlt,
  stats: h.stats,
  actions: h.actions,
});

const sectionHeader = async (h: AnyObj) => ({
  blockType: "sectionHeader",
  heading: h.heading,
  body: h.body,
  image: await mediaId(h.imageSrc, h.imageAlt),
  imageAlt: h.imageAlt,
  cta: cta(h.cta as AnyObj),
});

const sectionImageParalax = async (s: AnyObj) => ({
  blockType: "sectionImageParalax",
  showHeading: false,
  kicker: s.kicker,
  heading: s.heading,
  body: s.body,
  cta: cta(s.cta as AnyObj),
  image: await mediaId(s.image, s.imageAlt),
  imageAlt: s.imageAlt,
  align: s.align ?? "right",
  variant: s.variant ?? "secondary",
});

const ctaBand = async (c: AnyObj) => ({
  blockType: "sectionBackgroundImage",
  kicker: c.kicker,
  heading: c.heading,
  body: c.body,
  ctaLabel: c.label,
  ctaHref: c.href,
  image: await mediaId(c.imageSrc),
});

// ── Card builders ────────────────────────────────────────────────────────
const cardLrg = (c: AnyObj, variant = "tertiary") => ({
  blockType: "cardLrg",
  kicker: c.kicker,
  heading: c.heading,
  body: toBodyBlocks(c.body ?? c.blocks),
  cta: cta(c.cta as AnyObj),
  variant,
});

const cardMed = (c: AnyObj) => ({
  blockType: "cardMed",
  heading: c.heading,
  body: toBodyBlocks(c.body ?? c.paragraphs ?? []),
});

const feeItem = (f: AnyObj) => ({
  blockType: "feeItem",
  heading: f.heading,
  price: f.price,
  unit: f.unit,
  description: f.description,
});

// ── Section builders (cards & collections) ───────────────────────────────
const sectionCards = (cards: AnyObj[], opts: AnyObj = {}) => ({
  blockType: "sectionCards",
  ...heading(opts.heading),
  columns: opts.columns ?? "2",
  cards,
});

const sectionPeople = (s: AnyObj, group: string) => ({
  blockType: "sectionPeople",
  ...heading(s),
  group,
});

const sectionParagraphs = (s: AnyObj) => ({
  blockType: "sectionParagraphs",
  kicker: s.kicker,
  heading: s.heading,
  paragraphs: ((s.paragraphs as string[]) ?? []).map((text) => ({ text })),
  cta: cta(s.cta as AnyObj),
});

/** Course doc ids grouped by tab key — populated while seeding courses,
 * read when building the training page's sectionTabs cardCourse blocks. */
const courseIdsByTab: Record<string, number[]> = {};

const coursesTabs = (t: AnyObj) => ({
  blockType: "sectionTabs",
  ariaLabel: t.ariaLabel,
  emptyMessage: t.emptyMessage,
  footerNote: t.rateNote,
  tabs: (courses.courseTabs as AnyObj[]).map((tab) => ({
    label: tab.label,
    layout: "grid-2",
    content: (courseIdsByTab[tab.value as string] ?? []).map((id) => ({
      blockType: "cardCourse",
      course: id,
    })),
  })),
});

const sectionEvents = (s: AnyObj, source: string, display: string) => ({
  blockType: "sectionEvents",
  ...heading(s),
  source,
  display,
});

const sectionGallery = async (g: AnyObj) => ({
  blockType: "sectionGallery",
  ...heading(g),
  image: await mediaId(g.src, g.alt),
  alt: g.alt,
  overlayImage: await mediaId(g.overlaySrc),
  totalSlides: g.totalSlides,
});

const sectionContent = (p: AnyObj) => ({
  blockType: "sectionContent",
  label: p.label,
  heading: p.heading,
  body: p.body,
  actions: p.actions,
});

/** The join page's four tabs rebuilt as SectionTabs manual cards. */
const joinTabs = (j: AnyObj) => {
  const p = j.panels;
  const listBlock = (items: string[]) => ({
    blockType: "list",
    variant: "compact",
    items: items.map((item) => ({ item })),
  });
  return {
    blockType: "sectionTabs",
    ariaLabel: j.ariaLabel,
    tabs: [
      {
        label: "Membership",
        layout: "grid-3",
        showTabSubheading: true,
        subheading: p.membership.intro,
        content: [
          ...p.membership.cards.map((c: AnyObj) => ({
            blockType: "cardMed",
            heading: c.heading,
            body: [
              ...(c.paragraphs as string[]).map((t) => para(t)),
              ...(c.list ? [listBlock(c.list as string[])] : []),
            ],
          })),
        ],
      },
      {
        label: "Fees",
        layout: "stacked",
        showTabSubheading: true,
        subheading: p.fees.intro.body,
        content: [
          {
            blockType: "feeGroup",
            heading: p.fees.membership.heading,
            body: p.fees.membership.body,
            note: p.fees.membership.note,
            fees: (p.fees.membership.fees as AnyObj[]).map(feeItem),
          },
          {
            blockType: "feeGroup",
            heading: p.fees.dailySailing.heading,
            body: p.fees.dailySailing.body,
            note: p.fees.dailySailing.note,
            fees: (p.fees.dailySailing.fees as AnyObj[]).map(feeItem),
          },
        ],
      },
      {
        label: "Tester Day",
        layout: "grid-3",
        showTabSubheading: true,
        subheading: p.testerDay.intro.body,
        content: [
          {
            blockType: "cardMed",
            heading: p.testerDay.expect.heading,
            body: (p.testerDay.expect.paragraphs as string[]).map((t) => para(t)),
          },
          {
            blockType: "cardMed",
            heading: p.testerDay.practical.heading,
            body: [
              listBlock(
                (p.testerDay.practical.details as AnyObj[]).map(
                  (d) => `${d.key}: ${d.value}`,
                ),
              ),
            ],
          },
          {
            blockType: "cardMed",
            heading: p.testerDay.booking.heading,
            body: [
              para(
                `${p.testerDay.booking.intro} ${p.testerDay.booking.firstStepBeforeEmail} ${p.testerDay.booking.email.label} ${p.testerDay.booking.firstStepAfterEmail}`,
              ),
              {
                blockType: "orderedList",
                variant: "compact",
                items: (p.testerDay.booking.remainingSteps as string[]).map((s) => ({
                  item: s,
                })),
              },
            ],
          },
        ],
      },
      {
        label: "What do you need",
        layout: "grid-3",
        showTabSubheading: true,
        subheading: p.gear.intro.body,
        content: [
          ...(p.gear.cards as AnyObj[]).map(cardMed),
        ],
      },
    ],
  };
};

// ── Page layouts ───────────────────────────────────────────────────────
/** nav: [showIn, navOrder, divider] */
type NavSpec = { showIn?: string[]; navOrder?: number; divider?: boolean };
const nav = (n: NavSpec) => ({ nav: n });

async function buildPages() {
  return [
    {
      slug: "home",
      title: "Home",
      meta: home.metadata,
      ...nav({ showIn: ["header"], navOrder: 1, divider: true }),
      pageSections: [
        await heroHome(home.hero),
        ...(await Promise.all(home.sections.map(sectionImageParalax))),
        await ctaBand(home.finalCta),
      ],
    },
    {
      slug: "the-club",
      title: "The Club",
      meta: theClub.metadata,
      ...nav({ showIn: ["header", "footer"], navOrder: 2, divider: true }),
      pageSections: [
        await sectionHeader(theClub.hero),
        sectionCards(theClub.cards.map((c: AnyObj) => cardLrg(c)), { columns: "2" }),
        sectionPeople(theClub.committee, "committee"),
        { blockType: "sectionFleetLocation", flush: true },
        await ctaBand(theClub.cta),
      ],
    },
    {
      slug: "fleet",
      title: "Fleet",
      meta: fleetPage.metadata,
      ...nav({ showIn: ["header", "footer"], navOrder: 4, divider: true }),
      pageSections: [
        await sectionHeader(fleetPage.hero),
        { blockType: "sectionFleet" },
        { blockType: "sectionFleetLocation", flush: false },
        await ctaBand(fleetPage.cta),
      ],
    },
    {
      slug: "training",
      title: "Training",
      meta: training.metadata,
      ...nav({ showIn: ["header", "footer"], navOrder: 6, divider: false }),
      pageSections: [
        await sectionHeader(training.hero),
        sectionParagraphs(training.practicalCourses),
        coursesTabs(training.courseTabs),
        sectionEvents(training.upcomingCourses, "training-events", "grid"),
        sectionPeople(training.instructors, "instructors"),
        sectionCards([cardLrg(training.shorebased)], { columns: "2" }),
        await ctaBand(training.cta),
      ],
    },
    {
      slug: "cruises",
      title: "Cruises",
      meta: cruisesPage.metadata,
      ...nav({ showIn: ["header"], navOrder: 5, divider: true }),
      pageSections: [
        await sectionHeader(cruisesPage.hero),
        sectionCards(cruisesPage.cruiseTypes.map((c: AnyObj) => cardLrg(c)), { columns: "2" }),
        sectionEvents(cruisesPage.upcoming, "cruise-events", "carousel"),
        { blockType: "sectionFleetLocation", flush: true },
        await ctaBand(cruisesPage.cta),
      ],
    },
    {
      slug: "community",
      title: "Community",
      meta: community.metadata,
      ...nav({ showIn: ["header", "footer"], navOrder: 3, divider: true }),
      pageSections: [
        await sectionHeader(community.hero),
        await sectionGallery(community.gallery),
        sectionPeople(community.skippers, "skippers"),
        await ctaBand(community.cta),
      ],
    },
    {
      slug: "members-area",
      title: "Members Area Login",
      meta: members.metadata,
      pageSections: [sectionContent(members)],
    },
    {
      slug: "join",
      title: "Join Us",
      meta: join.metadata,
      pageSections: [await sectionHeader(join.hero), joinTabs(join)],
    },
    {
      slug: "membership-application",
      title: "Membership Application",
      meta: membership.metadata,
      pageSections: [{ blockType: "membershipApplicationForm", form: membership.form }],
    },
    {
      slug: "page-not-found",
      title: "Page Not Found",
      meta: {
        title: "Page Not Found | Speedbird Offshore Sailing Club",
        description: "The page you are looking for could not be found.",
      },
      pageSections: [
        {
          blockType: "sectionContent",
          label: notFound.label,
          heading: notFound.heading,
          body: notFound.body,
          actions: [{ label: notFound.action.label, href: notFound.action.href }],
        },
      ],
    },
  ];
}

// ── Run ────────────────────────────────────────────────────────────────

console.log("Seeding globals…");
await payload.updateGlobal({
  slug: "site-settings",
  data: { metadata: site.metadata },
  context: ctx,
});
await payload.updateGlobal({
  slug: "header",
  data: {
    logoSrc: site.logoSrc,
    logoAlt: site.logoAlt,
    logoHref: site.logoHref,
    headerJoinLabel: site.headerJoinLabel,
    joinHref: "/join",
    membersLabel: site.membersLabel,
    membersHref: "/members-area",
    primaryNavLabel: site.primaryNavLabel,
    mobileNavLabel: site.mobileNavLabel,
    openNavLabel: site.openNavLabel,
    closeNavLabel: site.closeNavLabel,
  },
  context: ctx,
});
await payload.updateGlobal({
  slug: "footer",
  data: {
    contactHeading: site.contactHeading,
    email: site.email,
    facebookLabel: site.facebookLabel,
    facebookUrl: site.facebookUrl,
    coordinates: site.coordinates,
    location: site.location,
    copyright: site.copyright,
    registration: site.registration,
    footerLogoSrc: site.footerLogoSrc,
    footerBackgroundSrc: site.footerBackgroundSrc,
    footerCompassSrc: site.footerCompassSrc,
    siteFooterBackgroundSrc: site.siteFooterBackgroundSrc,
    extraLinks: [
      { label: "Sitemap", href: "/" },
      { label: "Privacy", href: "/" },
      { label: "Cookies", href: "/" },
    ],
  },
  context: ctx,
});
await payload.updateGlobal({ slug: "fleet-location", data: fleetLocation, context: ctx });
await payload.updateGlobal({ slug: "cruise-map", data: cruiseMap, context: ctx });

async function clear(collection: string) {
  await payload.delete({ collection: collection as never, where: { id: { exists: true } }, context: ctx });
}

console.log("Seeding boats…");
await clear("boats");
for (let i = 0; i < fleet.length; i++) {
  const b = fleet[i];
  await payload.create({
    collection: "boats",
    data: {
      name: b.name,
      model: b.model,
      year: b.year,
      description: b.description,
      photo: await mediaId(b.photo, b.photoAlt),
      photoAlt: b.photoAlt,
      specsLeft: b.specsLeft,
      specsRight: b.specsRight,
      mmsi: b.mmsi,
      order: i,
      _status: "published",
    } as never,
    context: ctx,
  });
}

console.log("Seeding people…");
await clear("people");
for (let i = 0; i < people.people.length; i++) {
  const p = people.people[i] as AnyObj;
  await payload.create({
    collection: "people",
    data: {
      name: p.name,
      title: p.title,
      dept: p.dept,
      email: p.email,
      photo: await mediaId(p.photo, p.name),
      qualification: p.qualification,
      isCommittee: p.isCommittee ?? false,
      isClubSkipper: p.isClubSkipper ?? false,
      isInstructor: p.isInstructor ?? false,
      order: i,
      _status: "published",
    } as never,
    context: ctx,
  });
}

console.log("Seeding courses…");
await clear("courses");
let courseOrder = 0;
for (const tab of Object.keys(courses.coursesByTab)) {
  for (const c of courses.coursesByTab[tab] as AnyObj[]) {
    const doc = await payload.create({
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
    (courseIdsByTab[tab] ??= []).push(doc.id);
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
  const e = cruises[i];
  await payload.create({
    collection: "cruise-events",
    data: {
      title: e.title,
      dates: e.dates,
      yacht: e.yacht,
      model: e.model,
      skipper: e.skipper,
      imageSrc: await mediaId(e.imageSrc, e.imageAlt),
      imageAlt: e.imageAlt,
      order: i,
      _status: "published",
    } as never,
    context: ctx,
  });
}

console.log("Seeding pages…");
await clear("pages");
// Document locks reference page ids that no longer exist after reseeding —
// clear the internal lock table so stale rows can't violate its FKs.
try {
  await clear("payload-locked-documents");
} catch {
  /* collection may not exist yet */
}
for (const p of await buildPages()) {
  await payload.create({ collection: "pages", data: { ...p, _status: "published" } as never, context: ctx });
}

console.log("Seeding admin user…");

// Collapse all admin nav groups by default for a seeded user (stored
// per-user in payload-preferences under the "nav" key).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedNavPreferences(user: any) {
  const navGroups = Object.fromEntries(
    Object.values(adminGroups).map((g) => [g, { open: false }]),
  );
  const prefs = await payload.find({
    collection: "payload-preferences" as never,
    where: { key: { equals: "nav" } },
    limit: 100,
  });
  const pref = (prefs.docs as AnyObj[]).find(
    (d) => d?.user?.relationTo === "users" && d?.user?.value === user.id,
  );
  // The `user` field is populated by a beforeValidate hook from req.user, so
  // the user doc must be passed as `user` rather than inside `data`.
  const prefData = { key: "nav", value: { open: true, groups: navGroups } };
  if (pref) {
    await payload.update({ collection: "payload-preferences" as never, id: pref.id, user, data: prefData as never, context: ctx });
  } else {
    await payload.create({ collection: "payload-preferences" as never, user, data: prefData as never, context: ctx });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedUser(email: string, password: string, name: string): Promise<any> {
  const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
  const user = existing.docs[0] ??
    (await payload.create({ collection: "users", data: { email, password, name } }));
  console.log(existing.docs[0] ? `Admin user already exists: ${email}` : `Created admin user: ${email} / ${password}`);
  await seedNavPreferences(user);
  return user;
}

await seedUser(
  process.env.SEED_EMAIL || "admin@soyc.co.uk",
  process.env.SEED_PASSWORD || "ChangeMe123!",
  "SOYC Admin",
);

// Optional: seed the current developer's own login via env vars so it
// survives reseeds. Set these in .env.local — never commit credentials.
if (process.env.SEED_USER_EMAIL && process.env.SEED_USER_PASSWORD) {
  await seedUser(
    process.env.SEED_USER_EMAIL,
    process.env.SEED_USER_PASSWORD,
    process.env.SEED_USER_NAME || "Admin",
  );
}

console.log("Seed complete.");
process.exit(0);
