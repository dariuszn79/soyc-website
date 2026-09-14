import type { Block } from "payload";
import { CardLrgBlock } from "./CardLrg";
import { CardMedBlock } from "./CardMed";
import { CardWideBlock } from "./CardWide";
import { CardEventBlock } from "./CardEvent";
import { CardCourseBlock } from "./CardCourse";
import { CardBoatBlock } from "./CardBoat";
import { CardPersonBlock } from "./CardPerson";
import { FeeItemBlock } from "./FeeItem";
import { FeeGroupBlock } from "./FeeGroup";
import { RichTextBlockDef } from "./RichText";

/**
 * Card-level blocks. These are only available nested inside card-hosting
 * sections (SectionCards, SectionTabs) — never at the page level.
 */
export const cardBlocks: Block[] = [
  CardLrgBlock,
  CardMedBlock,
  CardWideBlock,
  CardEventBlock,
  CardCourseBlock,
  CardBoatBlock,
  CardPersonBlock,
  FeeItemBlock,
  FeeGroupBlock,
  RichTextBlockDef,
];
