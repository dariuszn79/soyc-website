---
name: Bounded sticky tabs
description: Constraints for tab bars that stick below an animated header but release at their panel boundary.
---

Sticky tab sections must inherit the animated header offset and remain bounded by the active panel wrapper. Prefer native sticky whenever its release point is reachable.

**Why:** Overflow scroll containers break viewport stickiness. On short pages, native sticky may never reach its release point; switching directly to `position: absolute; bottom: 0` then teleports the tab to the section bottom.

**How to apply:** Use clipping that does not create a scroll container and keep the bar inside its panel wrapper. If the natural release is beyond maximum scroll, preserve the bar's current viewport top at handoff, then release it over the final scroll range so it moves one-for-one with content. Stabilize pinned tab changes after browser scroll anchoring settles.