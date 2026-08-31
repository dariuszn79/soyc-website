---
name: Sticky header scroll animation
description: Why the animated header shell must not change document geometry during ScrollTrigger updates.
---

Keep the sticky layout anchor at a constant height and animate an absolutely positioned visible header shell inside it.

**Why:** Animating the sticky element's own height changes document geometry, which feeds reverse scroll updates back into ScrollTrigger and can leave GSAP between compact and restored states.

**How to apply:** For future header animation changes, preserve the fixed sticky anchor, animate only the inner shell and logo, and make scroll-state transitions idempotent so repeated updates do not restart active tweens.