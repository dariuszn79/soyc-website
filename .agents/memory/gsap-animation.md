---
name: GSAP animation preference
description: User prefers GSAP (not Framer Motion) as the animation library across the whole app.
---

## Rule
Use GSAP (with ScrollTrigger for scroll-driven effects) for all animations. Do not use Framer Motion.

**Why:** User explicitly requested GSAP over Framer Motion as the preferred library for the whole app.

**How to apply:**
- Register plugin inside useEffect: `gsap.registerPlugin(ScrollTrigger)`
- Scope with `gsap.context(() => { ... }, containerRef)` and `return () => ctx.revert()` for cleanup
- Scroll parallax pattern: `gsap.fromTo(target, { y: start }, { y: end, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } })`
- Components using GSAP must be `"use client"` (Next.js App Router)
- gsap is installed in `artifacts/figma-design`
