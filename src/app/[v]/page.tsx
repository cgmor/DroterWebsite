import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand, doctor } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { HomeAps, HomePractice } from "@/components/home/Homes";
import { isSite, type SiteId } from "@/components/site/links";

/**
 * The two home pages: APSleep.com (sleep and airway) and drdroter.com (TMD
 * and facial pain). The compositions live in src/components/home.
 */

/** Descriptions are his own sentences (apsleep.com 2021; drdroter.com). */
const META: Record<SiteId, Metadata> = {
  apsleep: {
    title: { absolute: `ArrowPath Sleep | APSleep.com` },
    description: brand.tagline,
  },
  droter: {
    title: { absolute: `${doctor.name} | TMD and facial pain` },
    description: `${doctor.pullQuote} ${understanding.intro}`,
  },
};

type Props = { params: Promise<{ v: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { v } = await params;
  return isSite(v) ? META[v] : {};
}

export default async function Home({ params }: Props) {
  const { v } = await params;
  if (!isSite(v)) notFound();

  return v === "droter" ? <HomePractice v={v} /> : <HomeAps v={v} />;
}
