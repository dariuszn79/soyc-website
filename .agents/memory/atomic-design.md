---
name: Atomic Design structure — figma-design artifact
description: How components are organised in artifacts/figma-design and why.
---

## Structure

```
artifacts/figma-design/src/
  data/               — shared data (navigation, people, courses, fleet)
  components/
    atoms/            — Overline, IconMail, IconFacebook
    molecules/        — CardLrg, CardMed, CardWide, CardPerson, CardCourse,
                        CardBoat, FeeItem, SpecList, SectionHeading
    organisms/        — Header-less page sections: HeroImage, HeroHome,
                        SectionCenter, SectionPrograms, SectionGallery,
                        NauticalMap, SiteFooter, HomeFooter,
                        TabsCourses, TabsJoinUs
    layout/           — Header (site-wide nav, rendered in root layout)
    ui/               — shadcn primitives (unchanged)
```

## Key decisions

**Why:** User explicitly asked for Atomic Design methodology with Figma component names, Header in layout/, separation of UI from business logic, and no more duplicated code.

**How to apply:**
- Header lives in `components/layout/Header.tsx` and is imported by `app/layout.tsx` — do NOT add `<Header />` to individual pages.
- SiteFooter is used on all inner pages. HomeFooter is used only on the home page (different design).
- Shared data (board members, nav links, courses, fleet specs) live in `src/data/`; never duplicate them in pages.
- SectionCenter ("Thinking of joining?") defaults cover all inner pages; pass ctaHref="#membership" for the Join page variant.
- Organisms are client components only when they manage interactivity (TabsCourses, TabsJoinUs); everything else is server-renderable.
