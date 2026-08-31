---
name: Next static build workflow
description: How to safely validate the Figma-design Next app when its development and export output share a directory.
---

Run the production build before an intentional restart of the web workflow, then perform preview/browser checks only after the workflow is serving again.

**Why:** The app’s custom Next output directory is shared by static export and development. A production build can replace the dev manifest and temporarily make the preview return 502/manifest errors even though the build succeeded.

**How to apply:** Sequence validation as build/type-check → restart the managed web workflow → inspect logs and run browser checks. Do not treat the temporary preview error during that transition as a source-code regression.