export interface CTA {
  label: string;
  href: string;
  external?: boolean;
}

export interface RichTextParagraph {
  type: "paragraph";
  text: string;
}

export interface RichTextList {
  type: "list" | "orderedList";
  items: string[];
  variant?: "spaced" | "compact";
}

export interface RichTextBreak {
  type: "break";
}

export type RichTextBlock = RichTextParagraph | RichTextList | RichTextBreak;

export interface Person {
  dept: string;
  name: string;
  title: string;
  photo: string;
  email: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Boat {
  name: string;
  model: string;
  year: string;
  description: string;
  photo: string;
  photoAlt: string;
  specsLeft: SpecItem[];
  specsRight: SpecItem[];
}

export interface CoursePrice {
  from: string;
  til: string;
  amount: string;
  duration: string;
}

export interface Course {
  level: string;
  title: string;
  desc: string;
  items: string[];
  prices: [CoursePrice, CoursePrice];
  notes: string;
}

export type CourseTab = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface TrainingEvent {
  title: string;
  dates: string;
  yacht: string;
  model: string;
  skipper: string;
}

export interface CruiseEvent {
  title: string;
  dates: string;
  yacht: string;
  model: string;
  skipper: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Section {
  kicker: string;
  heading: string;
  body: string;
  cta: CTA;
  image: string;
  imageAlt: string;
  align: "right" | "left";
  variant: "secondary" | "tertiary";
}

export interface NavItem {
  label: string;
  href: string;
  divider?: boolean;
}