import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { airwayBite, doctor, education } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { HomeV1, HomeV2, HomeV3 } from "@/components/home/Homes";
import { isVersion, type VersionId } from "@/components/site/links";

/**
 * The three home pages under review. One world, three compositions:
 * V1 leads with the Airway Bite, V2 with Dr. Droter, V3 with TMD education.
 * The compositions live in src/components/home.
 */

const META: Record<VersionId, Metadata> = {
  v1: {
    title: { absolute: `ArrowPath Sleep ${airwayBite.shortName} | APSleep.com` },
    description: `${airwayBite.summary} ${airwayBite.advantages[0].title}, single patient use. With ${doctor.shortName}’s education on TMD and facial pain.`,
  },
  v2: {
    title: { absolute: `${doctor.name}, ArrowPath Sleep | APSleep.com` },
    description: `${education.keyMessages[0]} ${doctor.name}, ${doctor.affiliation}: his diagnostic approach to facial pain, his lectures and literature, and the ${airwayBite.shortName}.`,
  },
  v3: {
    title: { absolute: `TMD, facial pain and the ${airwayBite.shortName} | ArrowPath Sleep (APSleep.com)` },
    description: understanding.intro,
  },
};

type Props = { params: Promise<{ v: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { v } = await params;
  return isVersion(v) ? META[v] : {};
}

export default async function Home({ params }: Props) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  if (v === "v2") return <HomeV2 v={v} />;
  if (v === "v3") return <HomeV3 v={v} />;
  return <HomeV1 v={v} />;
}
