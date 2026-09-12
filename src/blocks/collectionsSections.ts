import type { Block } from "payload";
import { ctaField } from "../fields/cta";
import { headingGroup } from "../fields/content";

/** Kicker/heading + paragraph list (+ optional CTA). Covers practical courses,
 * shorebased courses, and similar copy-only sections. */
export const ParagraphsSectionBlock: Block = {
  slug: "paragraphsSection",
  interfaceName: "ParagraphsSectionBlock",
  labels: { singular: "Section: Paragraphs", plural: "Sections: Paragraphs" },
  fields: [
    { name: "kicker", type: "text" },
    { name: "heading", type: "text", required: true },
    {
      name: "paragraphs",
      type: "array",
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    ctaField({ required: false }),
  ],
};

/** Upcoming training courses list. Sourced from the `courses` collection
 * (upcomingTrainingCourses). → SectionHeading + CardEvent list. */
export const UpcomingCoursesBlock: Block = {
  slug: "upcomingCourses",
  interfaceName: "UpcomingCoursesBlock",
  labels: { singular: "Section: Upcoming Courses", plural: "Sections: Upcoming Courses" },
  fields: [...headingGroup()],
};

/** Training course level tabs. Sourced from the `courses` collection. → TabsCourses */
export const CoursesTabsBlock: Block = {
  slug: "coursesTabs",
  interfaceName: "CoursesTabsBlock",
  labels: { singular: "Section: Course Tabs", plural: "Sections: Course Tabs" },
  fields: [
    { name: "ariaLabel", type: "text" },
    { name: "emptyMessage", type: "text" },
    { name: "rateNote", type: "textarea" },
  ],
};

/** Upcoming cruises carousel. Sourced from the `cruise-events` collection.
 * → SectionHeading + CruiseEventCarousel */
export const CruiseCarouselBlock: Block = {
  slug: "cruiseCarousel",
  interfaceName: "CruiseCarouselBlock",
  labels: { singular: "Section: Cruise Carousel", plural: "Sections: Cruise Carousel" },
  fields: [...headingGroup()],
};

/** Fleet location map → FleetLocation (content from the fleet-location global). */
export const FleetLocationBlock: Block = {
  slug: "fleetLocation",
  interfaceName: "FleetLocationBlock",
  labels: { singular: "Section: Fleet Location", plural: "Sections: Fleet Location" },
  fields: [
    {
      name: "flush",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Remove outer padding (used on the cruises page)." },
    },
  ],
};

/** Fleet boats list. Sourced from the `boats` collection. → SectionImageSide per boat. */
export const FleetListBlock: Block = {
  slug: "fleetList",
  interfaceName: "FleetListBlock",
  labels: { singular: "Section: Fleet List", plural: "Sections: Fleet List" },
  fields: [
    { name: "heading", type: "text" },
  ],
};

/** Members gallery → SectionGallery */
export const GalleryBlock: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
  labels: { singular: "Section: Gallery", plural: "Sections: Gallery" },
  fields: [
    ...headingGroup(),
    { name: "src", type: "text" },
    { name: "overlaySrc", type: "text" },
    { name: "alt", type: "text" },
    { name: "totalSlides", type: "number", defaultValue: 10 },
  ],
};
