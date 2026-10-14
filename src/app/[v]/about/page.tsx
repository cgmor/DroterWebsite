import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import ResourceList from "@/components/product/ResourceList";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Prose, Section, SectionHead } from "@/components/site/Section";
import { doctor } from "@/content/aps";
import { lectures, literature, understanding } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: doctor.shortName,
  description: `${doctor.founderStory.split(". ")[0]}.`,
};

/** "John R. Droter, DDS": the name holds together; it may break only before the degree. */
const [nameMain, degree] = doctor.name.split(", ");
const nameNoBreak = nameMain.replace(/ /g, "\u00a0");

/** The facts as one typeset passage: each label is his whole sentence; its figure is set in place, by weight. */
const facts = doctor.facts.map((f) => {
  const at = f.label.indexOf(f.value);
  return at < 0
    ? { key: f.label, before: f.label, value: "", after: "" }
    : { key: f.label, before: f.label.slice(0, at), value: f.value, after: f.label.slice(at + f.value.length) };
});

/** "Past staff, Anne Arundel Medical Center (Annapolis) — rounds with orthopedic surgeons" → main + detail. */
const teaching = doctor.teaching.map((t) => {
  const [main, detail] = t.split(" — ");
  return { main, detail };
});

const beliefs = understanding.pain.beliefs;

export default async function AboutPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  return (
    <>
      <section className={s.open} aria-labelledby="about-title">
        <div className={`wrap ${s.openGrid}`}>
          <div className={s.portrait}>
            <Image
              src={doctor.headshot}
              alt={doctor.headshotAlt}
              width={1991}
              height={2416}
              sizes="(min-width: 640px) 380px, 300px"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className={s.portraitImg}
            />
          </div>
          <div className={s.openCopy}>
            <h1 className={s.name} id="about-title">
              {nameNoBreak}, <span className={s.degree}>{degree}</span>
            </h1>
            <p className={s.story}>{doctor.founderStory}</p>
          </div>
        </div>
      </section>

      <Section as="div" className={s.quoteSec}>
        <figure className={s.quote}>
          <blockquote>
            <p>
              <span className={s.hang}>“</span>
              {doctor.pullQuote}”
            </p>
          </blockquote>
          <figcaption className={s.quoteBy}>{doctor.name}</figcaption>
        </figure>
      </Section>

      <Section labelledBy="bio-title" flush="top">
        <div className={s.bioGrid}>
          <h2 className={`t-h2 ${s.bioTitle}`} id="bio-title">
            About Dr. Droter
          </h2>
          <Prose className={s.bio}>
            {doctor.bio.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Prose>
        </div>
      </Section>

      <Section tone="mist" space="md" as="div">
        {/* One passage; each number sits in its sentence at the passage's size, as on the home. */}
        <p className={s.facts}>
          {facts.map((f, i) => (
            <Fragment key={f.key}>
              {i > 0 && " "}
              {f.before}
              {f.value && <span className={s.factVal}>{f.value}</span>}
              {f.after}
            </Fragment>
          ))}
        </p>
      </Section>

      <Section as="div">
        <div className={s.cv}>
          <section aria-labelledby="training-title">
            <h2 className={`t-h3 ${s.cvTitle}`} id="training-title">
              Training
            </h2>
            <ul className={s.rows}>
              {doctor.training.map((t) => (
                <li key={t.place}>
                  <span className={s.rowMain}>{t.place}</span>
                  <span className={s.rowDetail}>{t.detail}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="teaching-title">
            <h2 className={`t-h3 ${s.cvTitle}`} id="teaching-title">
              Teaching
            </h2>
            <ul className={s.rows}>
              {teaching.map((t) => (
                <li key={t.main}>
                  <span className={s.rowMain}>{t.main}</span>
                  {t.detail && <span className={s.rowDetail}>{t.detail}</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="approach-title">
        <div className={s.approach}>
          <div className={s.approachText}>
            <h2 className="t-h2" id="approach-title">
              {beliefs.heading}
            </h2>
            <figure className={s.ownWords}>
              <blockquote>
                {beliefs.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </blockquote>
              <figcaption className={s.ownWordsBy}>{doctor.name}</figcaption>
            </figure>
          </div>
          <div className={s.approachFig}>
            <Figure {...understanding.pain.figure} sizes="(min-width: 1000px) 46vw, 100vw" />
          </div>
        </div>
        <p className={s.emphasis}>{beliefs.emphasis}</p>
      </Section>

      <Section labelledBy="lit-title">
        <SectionHead
          id="lit-title"
          title="Lectures and literature"
          layout="split"
          actions={
            <ButtonLink href={href(v, routes.library)} variant="quiet">
              The full library
            </ButtonLink>
          }
        />
        <div className={s.lit}>
          <section aria-labelledby="lectures-title">
            <h3 className={s.litTitle} id="lectures-title">
              Lectures
            </h3>
            <ResourceList items={lectures} />
          </section>
          <section aria-labelledby="literature-title">
            <h3 className={s.litTitle} id="literature-title">
              Medical Literature
            </h3>
            <ResourceList items={literature} />
          </section>
        </div>
      </Section>

      <Section space="md" flush="top" as="div">
        <PracticePanel portrait={false} />
      </Section>
    </>
  );
}
