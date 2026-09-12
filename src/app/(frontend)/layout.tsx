import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/organisms/Footer";
import { siteContent } from "@/data/site";

export const metadata: Metadata = siteContent.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts — Baskerville + Gill Sans via TypeKit */}
        <link rel="stylesheet" href="https://use.typekit.net/zah8qcj.css" />
      </head>
      <body className="antialiased">
        {/* Header is rendered once here so it is identical across every page */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
