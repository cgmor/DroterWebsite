import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryId } from "@/components/education/categories";
import GuideBody from "@/components/education/GuideBody";
import GuideList from "@/components/education/GuideList";
import { ArrowLeft } from "@/components/education/icons";
import Disclosure from "@/components/site/Disclosure";
import Figure from "@/components/site/Figure";
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section } from "@/components/site/Section";
import { doctor, education } from "@/content/aps";
import { conditionGuides } from "@/content/tmd";
import s from "./page.module.css";

type Params = Promise<{ v: string; slug: string }>;

export function generateStaticParams() {
  return conditionGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = conditionGuides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: g.title, description: g.summary };
}

export default async function ConditionPage({ params }: { params: Params }) {
  const { v, slug } = await params;
  if (!isVersion(v)) notFound();
  const g = conditionGuides.find((x) => x.slug === slug);
  if (!g) notFound();

  const sameCategory = conditionGuides.filter((x) => x.category === g.category && x.slug !== g.slug);
  const related = sameCategory.length ? sameCategory : conditionGuides.filter((x) => x.slug !== g.slug).slice(0, 4);

  const signs = (
    <section className={g.hero ? s.signs : s.signsAside} aria-labelledby="signs-title">
      <h2 className={s.signsTitle} id="signs-title">
        Signs
      </h2>
      <ul className={s.signsList}>
        {g.signs.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      {/* ── The simplified version ────────────────────────────────────── */}
      <div className={`wrap ${s.top}`}>
        <Link href={href(v, routes.conditions)} className={s.back}>
          <ArrowLeft size={16} className={s.backIcon} />
          All conditions
        </Link>

        <div className={s.mast}>
          <div className={s.mastCopy}>
            <h1 className={`t-h1 ${s.title}`}>{g.title}</h1>
            <p className={s.words}>“{g.plainName}”</p>
            <p className={s.summary}>{g.summary}</p>
            <div className={s.byline}>
              <Image src={doctor.headshot} alt="" width={1991} height={2416} sizes="44px" quality={90} className={s.bylinePortrait} />
              {/* Two items, not a sentence: his name, and the category as a link back to it. */}
              <div className={s.bylineText}>
                <span className={s.bylineName}>{doctor.name}</span>
                <span className={s.bylineMeta}>
                  <Link href={href(v, `${routes.conditions}#${categoryId(g.category)}`)} className={s.bylineCat}>
                    {g.category}
                  </Link>
                </span>
              </div>
            </div>
          </div>
          {g.hero ? (
            <div className={s.mastFig}>
              <Figure {...g.hero} sizes="(min-width: 1000px) 640px, 100vw" preload />
            </div>
          ) : (
            signs
          )}
        </div>

        {g.hero && signs}
      </div>

      {/* ── The complete version, one expand away ─────────────────────── */}
      <section className={`wrap ${s.fullSec}`} aria-labelledby="full-title">
        <Disclosure
          className={s.dsc}
          summary={
            <div className={s.fullHead}>
              <h2 className={`t-h2 ${s.fullTitle}`} id="full-title">
                The complete version
              </h2>
              <div className={s.fullAside}>
                <ol className={s.fullIndex}>
                  {g.full.map((sec) => (
                    <li key={sec.heading}>{sec.heading}</li>
                  ))}
                </ol>
              </div>
            </div>
          }
        >
          <GuideBody sections={g.full} as="h3" idPrefix={g.slug} />
        </Disclosure>
      </section>

      {/* ── Related guides ────────────────────────────────────────────── */}
      <Section space="md" labelledBy="related-title" className={s.related}>
        <div className={s.relatedGrid}>
          <h2 className={s.relatedTitle} id="related-title">
            {sameCategory.length ? g.category : "Other common conditions"}
          </h2>
          <GuideList guides={related} hrefFor={(sl) => href(v, routes.condition(sl))} />
        </div>
      </Section>

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <Section space="md" flush="top" labelledBy="practice-title">
        <p className={s.patientsLine}>{education.patientsLine}</p>
        <PracticePanel />
      </Section>
    </>
  );
}
