import type { Metadata } from "next";
import { PageView, pageMetadata } from "@/components/blocks/PageView";

/**
 * Catch-all for admin-created pages. Fixed routes (e.g. /fleet, /join) take
 * precedence; any other single-segment slug is resolved from the Pages
 * collection so the admin can publish brand-new pages without code changes.
 */
type Args = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params;
  return pageMetadata(slug);
};

export default async function DynamicPage({ params }: Args) {
  const { slug } = await params;
  return <PageView slug={slug} />;
}
