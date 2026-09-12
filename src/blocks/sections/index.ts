import type { Block } from "payload";
import { HeroHomeBlock } from "./HeroHome";
import { SectionHeaderBlock } from "./SectionHeader";
import { SectionHeadingBlock } from "./SectionHeading";
import { SectionImageParalaxBlock } from "./SectionImageParalax";
import { SectionImageSideBlock } from "./SectionImageSide";
import { SectionBackgroundImageBlock } from "./SectionBackgroundImage";
import { SectionCenterBlock } from "./SectionCenter";
import { SectionGalleryBlock } from "./SectionGallery";
import { SectionFleetLocationBlock } from "./SectionFleetLocation";
import { SectionFleetBlock } from "./SectionFleet";
import { SectionPeopleBlock } from "./SectionPeople";
import { SectionParagraphsBlock } from "./SectionParagraphs";
import { SectionEventsBlock } from "./SectionEvents";
import { SectionCardsBlock } from "./SectionCards";
import { SectionTabsBlock } from "./SectionTabs";
import { SectionContentBlock } from "./SectionContent";
import { MembershipApplicationFormBlock } from "./MembershipApplicationForm";
import { FormEmbedBlock } from "./FormEmbed";
import { NauticalMapBlock } from "./NauticalMap";

/**
 * Section-level blocks — the only blocks selectable in the Pages
 * `pageSections` builder. Each block slug matches its component name.
 */
export const pageBlocks: Block[] = [
  HeroHomeBlock,
  SectionHeaderBlock,
  SectionHeadingBlock,
  SectionImageParalaxBlock,
  SectionImageSideBlock,
  SectionBackgroundImageBlock,
  SectionCenterBlock,
  SectionGalleryBlock,
  SectionFleetLocationBlock,
  SectionFleetBlock,
  SectionPeopleBlock,
  SectionParagraphsBlock,
  SectionEventsBlock,
  SectionCardsBlock,
  SectionTabsBlock,
  SectionContentBlock,
  MembershipApplicationFormBlock,
  FormEmbedBlock,
  NauticalMapBlock,
];
