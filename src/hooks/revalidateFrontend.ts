import { revalidatePath } from "next/cache";

/**
 * Revalidate the frontend when CMS content changes. Content is threaded through
 * the root layout (site settings, nav) and pages, so revalidating the root
 * layout path is the simplest correct invalidation. Guarded so seed scripts can
 * opt out via `context.disableRevalidate`.
 */
type Status = { _status?: string | null } | undefined;

export const revalidateFrontend = (args: {
  doc?: unknown;
  previousDoc?: unknown;
  req?: { context?: { disableRevalidate?: boolean } };
  context?: { disableRevalidate?: boolean };
}) => {
  const disabled =
    args?.req?.context?.disableRevalidate || args?.context?.disableRevalidate;
  // Draft autosaves (every ~1s while editing) never reach the frontend, which
  // only reads published versions — skip them so the site cache isn't purged
  // on every keystroke. Still revalidate when a doc is published, or when a
  // previously published doc changes status (unpublish).
  const status = (args?.doc as Status)?._status;
  const prevStatus = (args?.previousDoc as Status)?._status;
  const draftOnly = status === "draft" && prevStatus !== "published";
  if (!disabled && !draftOnly) {
    try {
      revalidatePath("/", "layout");
    } catch {
      // revalidatePath is a no-op outside the Next.js request/render context
      // (e.g. when seeding); ignore.
    }
  }
  return args?.doc;
};
