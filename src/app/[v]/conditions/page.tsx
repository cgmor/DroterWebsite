import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryId, guidesByCategory } from "@/components/education/categories";
import ConditionCard, { ConditionGrid } from "@/components/education/ConditionCard";
import { ArrowRight } from "@/components/site/icons";
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section, SectionHead } from "@/components/site/Section";
import { education } from "@/content/aps";
import { conditionGuides, understanding } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Common conditions",
  description: education.conditionsIntro,
};

export default async function ConditionsPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  const groups = guidesByCategory();

  return (
    <>
      {/* ── The index: a centred opening, then every guide as an even grid of
            plain cards, in the same order as the home page. ───────────── */}
      <Section tone="mist" space="md" labelledBy="conditions-title">
        <SectionHead
          as="h1"
          id="conditions-title"
          layout="center"
          className={s.head}
          title={education.conditionsHeading}
          lead={education.conditionsIntro}
        />

        <ConditionGrid>
          {conditionGuides.map((g) => (
            <ConditionCard key={g.slug} guide={g} href={href(v, routes.condition(g.slug))} />
          ))}
          <li className={s.more}>
            <h2 className={s.moreTitle}>
              <Link href={href(v, routes.understanding)} className={s.moreLink}>
                Understanding TMD
                <ArrowRight size={18} className={s.moreArrow} />
              </Link>
            </h2>
            <p className={s.moreBody}>{understanding.intro}</p>
            <p className={s.moreFoot}>
              For dentists:{" "}
              <Link href={href(v, routes.library)} className={s.inline}>
                Library
              </Link>
            </p>
          </li>
        </ConditionGrid>
      </Section>

      {/* ── His classification, as a compact ruled index (the anchors that
            /understanding-tmd links to). ─────────────────────────────────── */}
      <Section space="md" labelledBy="categories-title">
        <SectionHead
          id="categories-title"
          layout="center"
          className={s.head}
          title="By category"
          lead={understanding.definition.paragraphs[1]}
        />
        <ol className={s.cats}>
          {groups.map((c) => {
            const id = categoryId(c.name);
            return (
              <li key={c.name} id={id} className={s.cat}>
                <h3 className={s.catName}>{c.name}</h3>
                <ul className={s.catGuides}>
                  {c.guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={href(v, routes.condition(g.slug))} className={s.catLink}>
                        {g.title}
                        <ArrowRight size={16} className={s.catArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ── Close ─────────────────────────────────────────────────────────── */}
      <Section space="md" flush="top" labelledBy="practice-title">
        <p className={s.patientsLine}>{education.patientsLine}</p>
        <PracticePanel />
      </Section>
    </>
  );
}
