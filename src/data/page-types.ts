import type { CTA, RichTextBlock, Section } from "./content-types";

export interface PageMetadata {
  title: string;
  description: string;
}

export interface PageHero {
  kicker?: string;
  heading: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  cta?: CTA;
}

export interface BasicPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  cta?: CTA & { body: string; imageSrc: string };
}

export interface HomePageContent {
  metadata: PageMetadata;
  hero: {
    kicker: string;
    heading: string;
    stats: Array<{ value: string; label: string }>;
    coordinates: string;
    backgroundImage: string;
    backgroundAlt: string;
    actions: CTA[];
  };
  sections: Section[];
  finalCta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface ClubPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  aboutAriaLabel: string;
  cards: Array<{ kicker: string; heading: string; body: string; cta: CTA }>;
  committee: { kicker: string; heading: string; body: string };
  cta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface FleetPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  cta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface TrainingPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  practicalCourses: { kicker: string; heading: string; paragraphs: string[] };
  upcomingCourses: { kicker: string; heading: string; body: string };
  instructors: { kicker: string; heading: string; body: string };
  shorebased: { kicker: string; heading: string; body: string; cta: CTA };
  courseTabs: { ariaLabel: string; emptyMessage: string; rateNote: string };
  cta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface CruisesPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  cruiseTypes: Array<{
    kicker: string;
    heading: string;
    blocks: RichTextBlock[];
  }>;
  upcoming: { kicker: string; heading: string; body: string };
  location: { kicker: string; heading: string; body: string };
  cta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface CommunityPageContent {
  metadata: PageMetadata;
  hero: PageHero;
  gallery: {
    kicker: string;
    heading: string;
    body: string;
    src: string;
    overlaySrc: string;
    alt: string;
    totalSlides: number;
  };
  skippers: { kicker: string; heading: string; body: string };
  cta: CTA & { kicker: string; heading: string; body: string; imageSrc: string };
}

export interface MembersPageContent {
  metadata: PageMetadata;
  label: string;
  heading: string;
  body: string;
  actions: CTA[];
}

export interface NotFoundPageContent {
  label: string;
  heading: string;
  body: string;
  action: CTA;
}

export interface SiteContent {
  metadata: PageMetadata;
  coordinates: string;
  location: string;
  contactHeading: string;
  email: string;
  facebookLabel: string;
  facebookUrl: string;
  logoAlt: string;
  copyright: string;
  registration: string;
  headerJoinLabel: string;
  membersLabel: string;
  /** Optional href overrides (Header/Footer globals). */
  joinHref?: string;
  membersHref?: string;
  /** Non-page footer links (Footer global). */
  extraLinks?: Array<{ label: string; href: string }>;
  primaryNavLabel: string;
  mobileNavLabel: string;
  openNavLabel: string;
  closeNavLabel: string;
  logoHref: string;
  logoSrc: string;
  footerBackgroundSrc: string;
  footerCompassSrc: string;
  footerLogoSrc: string;
  siteFooterBackgroundSrc: string;
}

export interface ComponentLabelsContent {
  cardBoat: { kicker: string; built: string; specifications: string };
  cardCourse: { from: string; till: string; notes: string };
  cardEvent: { skipper: string };
  cruiseCarousel: { previous: string; next: string; arrowSrc: string };
  gallery: {
    previous: string;
    next: string;
    previousIcon: string;
    nextIcon: string;
  };
}

export interface FleetLocationContent {
  heading: string;
  body: string;
  mapAriaLabel: string;
  mapSrc: string;
  logoSrc: string;
  concordeMarkerSrc: string;
  speedbirdMarkerSrc: string;
  concordeLabel: string;
  speedbirdLabel: string;
}

export interface CruiseMapContent {
  mapSrc: string;
  mapAlt: string;
  logoSrc: string;
  speedbirdMarkerSrc: string;
  speedbirdMarkerAlt: string;
  concordeMarkerSrc: string;
  concordeMarkerAlt: string;
  concordeLabel: string;
  speedbirdLabel: string;
}
