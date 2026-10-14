import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryId, guidesByCategory } from "@/components/education/categories";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight } from "@/components/site/icons";
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section } from "@/components/site/Section";
import { airwayBite, education } from "@/content/aps";
import { conditionGuides, understanding, type ConditionGuide } from "@/content/tmd";
import type { VersionId } from "@/content/versions";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Common conditions",
  description: education.conditionsIntro,
};

export default async function ConditionsPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  const groups = guidesByCategory();
  const notes = new Map(understanding.definition.categories.map((c) => [c.name, c.note]));

  return (
    <>
      {/* ── Masthead: the heading, and the patient's own words as the index ── */}
      <div className={`wrap ${s.mast}`}>
        <div className={s.mastCopy}>
          <h1 className={`t-h1 ${s.title}`}>{education.conditionsHeading}</h1>
          <p className={s.intro}>{education.conditionsIntro}</p>
        </div>

        <nav className={s.finder} aria-labelledby="finder-title">
          <h2 className={s.finderTitle} id="finder-title">
            In your own words
          </h2>
          <ul className={s.finderList}>
            {conditionGuides.map((g) => (
              <li key={g.slug}>
                <Link href={href(v, routes.condition(g.slug))} className={s.finderLink}>
                  <span className={s.finderWords}>“{g.plainName}”</span>
                  <span className={s.finderClinical}>{g.title}</span>
                  <ArrowRight size={18} className={s.finderArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── The atlas: guides grouped by Dr. Droter's categories ──────────── */}
      <div className={`wrap ${s.atlas}`}>
        {groups.map((c) => {
          const id = categoryId(c.name);
          const note = notes.get(c.name);
          return (
            <section key={c.name} id={id} className={s.cat} aria-labelledby={`${id}-title`}>
              <header className={s.catHead}>
                <h2 className={s.catTitle} id={`${id}-title`}>
                  {c.name}
                </h2>
                {note && <p className={s.catNote}>{note}</p>}
              </header>
              <ol className={s.entries}>
                {c.guides.map((g) => (
                  <Entry key={g.slug} g={g} v={v} />
                ))}
              </ol>
            </section>
          );
        })}
      </div>

      {/* ── For dentists ──────────────────────────────────────────────────── */}
      <div className="wrap">
        <div className={s.dentists}>
          <p className={s.dentistsLine}>Dentists</p>
          <div className={s.dentistsLinks}>
            <ButtonLink href={href(v, routes.library)} variant="quiet">
              Library
            </ButtonLink>
            <ButtonLink href={href(v, routes.airwayBite)} variant="quiet">
              {airwayBite.shortName}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* ── Close ─────────────────────────────────────────────────────────── */}
      <Section space="md" flush="top" labelledBy="practice-title">
        <p className={s.patientsLine}>{education.patientsLine}</p>
        <PracticePanel />
      </Section>
    </>
  );
}

function Entry({ g, v }: { g: ConditionGuide; v: VersionId }) {
  const wide = g.hero ? Math.abs(g.hero.width / g.hero.height - 2) < 0.05 : false;
  const signs = g.signs.slice(0, 3);

  return (
    <li className={s.entry} data-media={g.hero ? true : undefined}>
      <div className={s.entryText}>
        <h3 className={s.entryWords}>
          <Link href={href(v, routes.condition(g.slug))} className={s.entryLink}>
            “{g.plainName}”
          </Link>
        </h3>
        <p className={s.entryClinical}>{g.title}</p>
        <p className={s.entrySummary}>{g.summary}</p>
        <ul className={s.entrySigns} aria-label={`Signs of ${g.title.toLowerCase()}`}>
          {signs.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
        <span className={s.entryGo} aria-hidden="true">
          Read the guide
          <ArrowRight size={16} className={s.entryArrow} />
        </span>
      </div>
      {g.hero && (
        <div className={`${s.entryMedia} ${wide ? s.mediaSlide : s.mediaPlate}`}>
          <Image src={g.hero.src} alt={g.hero.alt} fill sizes="(min-width: 700px) 340px, 100vw" quality={90} className={s.entryImg} />
        </div>
      )}
    </li>
  );
}
