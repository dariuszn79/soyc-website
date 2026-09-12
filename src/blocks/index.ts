import type { Block } from "payload";
import { HeroHomeBlock, HeroBasicBlock } from "./hero";
import {
  SectionImageSideBlock,
  SectionBackgroundImageBlock,
  SectionHeadingBlock,
  SimpleContentBlock,
} from "./sections";
import { CardGridBlock, RichTextCardsBlock } from "./cards";
import { PeopleSectionBlock } from "./people";
import {
  ParagraphsSectionBlock,
  UpcomingCoursesBlock,
  CoursesTabsBlock,
  CruiseCarouselBlock,
  FleetLocationBlock,
  FleetListBlock,
  GalleryBlock,
} from "./collectionsSections";
import { JoinTabsBlock } from "./join";
import { MembershipFormBlock } from "./membership";

/** All blocks available in the Pages `layout` builder. */
export const layoutBlocks: Block[] = [
  HeroHomeBlock,
  HeroBasicBlock,
  SectionImageSideBlock,
  SectionBackgroundImageBlock,
  SectionHeadingBlock,
  SimpleContentBlock,
  CardGridBlock,
  RichTextCardsBlock,
  PeopleSectionBlock,
  ParagraphsSectionBlock,
  UpcomingCoursesBlock,
  CoursesTabsBlock,
  CruiseCarouselBlock,
  FleetLocationBlock,
  FleetListBlock,
  GalleryBlock,
  JoinTabsBlock,
  MembershipFormBlock,
];
