import { revalidatePath } from "next/cache";

/**
 * Revalidate the frontend when CMS content changes. Content is threaded through
 * the root layout (site settings, nav) and pages, so revalidating the root
 * layout path is the simplest correct invalidation. Guarded so seed scripts can
 * opt out via `context.disableRevalidate`.
 */
export const revalidateFrontend = (args: {
  doc?: unknown;
  req?: { context?: { disableRevalidate?: boolean } };
  context?: { disableRevalidate?: boolean };
}) => {
  const disabled =
    args?.req?.context?.disableRevalidate || args?.context?.disableRevalidate;
  if (!disabled) {
    try {
      revalidatePath("/", "layout");
    } catch {
      // revalidatePath is a no-op outside the Next.js request/render context
      // (e.g. when seeding); ignore.
    }
  }
  return args?.doc;
};
