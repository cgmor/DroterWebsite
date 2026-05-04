import { notFound } from "next/navigation";
import { conditions, conditionSlugs } from "@/data/conditions";
import ConditionLayout from "@/components/ConditionLayout";
import { conditionDiagrams } from "@/components/diagrams";

export function generateStaticParams() {
  return conditionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = conditions[slug];
  if (!condition) return {};

  return {
    title: `${condition.title} — Dr. John R. Droter, DDS`,
    description: condition.heroDescription,
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = conditions[slug];

  if (!condition) {
    notFound();
  }

  const diagram = conditionDiagrams[slug] ?? null;

  return <ConditionLayout condition={{ ...condition, diagram }} />;
}
