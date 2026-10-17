import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import ReviewBar from "@/components/review/ReviewBar";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { isSite } from "@/components/site/links";
import { brand, doctor } from "@/content/aps";
import { sites } from "@/content/sites";
import "./aps.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return sites.map((s) => ({ v: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ v: string }> }): Promise<Metadata> {
  const { v } = await params;
  if (v === "droter") {
    return {
      title: { default: `${doctor.name}: TMD and facial pain`, template: `%s | ${doctor.name}` },
      /* His own words (drdroter.com). */
      description: doctor.pullQuote,
      applicationName: doctor.name,
    };
  }
  return {
    title: { default: `${brand.name}: sleep and airway`, template: `%s | ${brand.name}` },
    /* His own words: the 2021 apsleep.com line. */
    description: brand.tagline,
    applicationName: brand.name,
  };
}

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isSite(v)) notFound();

  return (
    <div className={`aps ${geist.variable} ${geistMono.variable}`}>
      <ReviewBar current={v} />
      <Header v={v} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer v={v} />
    </div>
  );
}
