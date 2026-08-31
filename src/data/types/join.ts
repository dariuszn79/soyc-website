export type JoinTab = "Membership" | "Fees" | "Tester Day" | "What do you need";

export interface JoinLink {
  label: string;
  href: string;
}

export interface JoinFee {
  heading: string;
  price: string;
  unit: string;
  description: string;
}

export interface JoinCard {
  heading: string;
  paragraphs: string[];
}

export interface JoinPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    heading: string;
    body: string;
    imageSrc: string;
    imageAlt: string;
    cta: JoinLink;
  };
  tabs: Array<{ value: JoinTab; label: string }>;
  ariaLabel: string;
  panels: {
    membership: {
      intro: string;
      cards: [
        JoinCard,
        JoinCard & { list: string[] },
        JoinCard,
      ];
    };
    fees: {
      intro: {
        kicker: string;
        headingLines: string[];
        body: string;
      };
      membership: {
        heading: string;
        body: string;
        note: string;
        fees: JoinFee[];
      };
      dailySailing: {
        heading: string;
        body: string;
        note: string;
        fees: JoinFee[];
      };
    };
    testerDay: {
      intro: {
        kicker: string;
        headingLines: string[];
        body: string;
      };
      expect: JoinCard;
      practical: {
        heading: string;
        details: Array<{ key: string; value: string }>;
      };
      booking: {
        heading: string;
        intro: string;
        email: JoinLink;
        firstStepBeforeEmail: string;
        firstStepAfterEmail: string;
        remainingSteps: string[];
      };
    };
    gear: {
      intro: {
        kicker: string;
        heading: string;
        body: string;
      };
      cards: JoinCard[];
    };
  };
}