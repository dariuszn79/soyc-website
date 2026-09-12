import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";
import { getPayloadClient } from "@/lib/payload/client";

/**
 * Catch-all for CMS pages. Every route except "/" (home) is resolved from the
 * Pages collection, so admins can publish brand-new pages — including nested
 * paths like /events/regatta — without code changes.
 */
type Args = { params: Promise<{ slug: string[] }> };

const toSlug = (segments: string[]) => segments.join("/");

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params;
  return pageMetadata(toSlug(slug));
};

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pages",
      limit: 500,
      select: { slug: true },
    });
    return docs
      .map((d) => (d as { slug?: string }).slug)
      .filter((s): s is string => Boolean(s) && s !== "home")
      .map((s) => ({ slug: s.split("/") }));
  } catch {
    // DB unreachable at build time — pages still render dynamically.
    return [];
  }
}

export default async function DynamicPage({ params }: Args) {
  const { slug } = await params;
  return <PageView slug={toSlug(slug)} />;
}
