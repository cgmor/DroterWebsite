import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import ReviewBar from "@/components/review/ReviewBar";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { isVersion } from "@/components/site/links";
import { airwayBite, brand, doctor } from "@/content/aps";
import { versions } from "@/content/versions";
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
  return versions.map((v) => ({ v: v.id }));
}

export const metadata: Metadata = {
  title: {
    default: `${brand.name}: the ${airwayBite.shortName} and ${doctor.shortName}’s TMD education`,
    template: `%s | ${brand.name}`,
  },
  /* His own words: the 2021 apsleep.com line and his advantages email. */
  description: `${brand.tagline} ${airwayBite.summary}`,
  applicationName: brand.name,
};

export default async function VersionLayout({ children, params }: { children: React.ReactNode; params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

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
