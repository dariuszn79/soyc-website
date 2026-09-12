import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/organisms/Footer";
import { getHeader, getFooter, getSiteSettings, getNavigation } from "@/lib/payload/queries";
import { LivePreviewListener } from "@/components/LivePreviewListener";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return site.metadata;
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [header, footer, nav] = await Promise.all([
    getHeader(),
    getFooter(),
    getNavigation(),
  ]);

  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts — Baskerville + Gill Sans via TypeKit */}
        <link rel="stylesheet" href="https://use.typekit.net/zah8qcj.css" />
      </head>
      <body className="antialiased">
        {/* Header is rendered once here so it is identical across every page */}
        <Header site={header} nav={nav.primaryNavItems as never} />
        {children}
        <Footer site={footer} />
        <LivePreviewListener />
      </body>
    </html>
  );
}
