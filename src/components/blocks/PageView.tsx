import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/payload/queries";
import { RenderBlocks } from "./RenderBlocks";

export async function PageView({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();

  const variant = slug === "home" ? "home" : "default";

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden bg-brand-tertiary-100">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <RenderBlocks blocks={(page.pageSections as any) ?? []} variant={variant} />
    </main>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  return {
    title: page?.meta?.title ?? undefined,
    description: page?.meta?.description ?? undefined,
  };
}
