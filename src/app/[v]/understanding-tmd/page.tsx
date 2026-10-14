import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Faq from "@/components/education/Faq";
import Notice from "@/components/education/Notice";
import OnThisPage from "@/components/education/OnThisPage";
import { categoryId } from "@/components/education/categories";
import { ButtonLink } from "@/components/site/Button";
import Disclosure from "@/components/site/Disclosure";
import Figure from "@/components/site/Figure";
import { ArrowRight } from "@/components/site/icons";
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import Reveal from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import SignsChecklist from "@/components/site/SignsChecklist";
import { doctor, education } from "@/content/aps";
import { conditionGuides, understanding as u } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: u.title,
  description: u.intro,
};

/** Wrap “quoted” words so the thesis can lean on them by weight alone. */
function quoted(line: string, cls: string): ReactNode[] {
  return line.split(/(“[^”]+”)/).map((part, i) =>
    part.startsWith("“") ? (
      <em key={i} className={cls}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}

/** His sentence with its figure set in place by weight (never repeated in front of it). */
function figureInPlace(sentence: string, figure: string, cls: string): ReactNode {
  const at = sentence.indexOf(figure);
  if (at < 0) return sentence;
  return (
    <>
      {sentence.slice(0, at)}
      <span className={cls}>{figure}</span>
      {sentence.slice(at + figure.length)}
    </>
  );
}

/** Set "may or may not" in the logic lines apart, by weight. */
function mayOrMayNot(line: string, cls: string): ReactNode[] {
  return line.split(/(may or may not)/).map((part, i) =>
    part === "may or may not" ? (
      <strong key={i} className={cls}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const CONTENTS = [
  { id: "the-tmj", label: u.joint.heading },
  { id: "signs", label: u.signs.heading },
  { id: "not-one-disease", label: u.definition.heading },
  { id: "the-numbers", label: u.evidence.heading },
  { id: "types-of-pain", label: u.pain.heading },
  { id: "relief", label: u.approaches.heading },
  { id: "hot-cold-hot", label: u.hotColdHot.heading },
  { id: "questions", label: "Common questions" },
  { id: "children", label: u.children.heading },
];

export default async function UnderstandingTmdPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  const d = u.definition;
  const p = u.pain;
  const a = u.approaches;
  const h = u.hotColdHot;
  const guided = new Set(conditionGuides.map((g) => g.category));
  const [slideCauses, slideTherapies, slideMatch] = a.figures;

  return (
    <>
      {/* ── Masthead + thesis ─────────────────────────────────────────── */}
      <div className={`wrap ${s.mast}`}>
        <div className={s.mastGrid}>
          <h1 className={`t-h1 ${s.title}`}>{u.title}</h1>
          <p className={s.intro}>{u.intro}</p>
        </div>

        <figure className={s.thesis}>
          <blockquote className={s.thesisQuote}>
            <p className={s.thesisLine}>{quoted(u.thesis.line, s.thesisEm)}</p>
          </blockquote>
          <figcaption className={s.thesisBy}>
            <Image src={doctor.headshot} alt="" width={1991} height={2416} sizes="52px" quality={90} className={s.thesisPortrait} />
            <span className={s.thesisName}>{u.thesis.attribution}</span>
          </figcaption>
        </figure>
      </div>

      {/* ── The document ──────────────────────────────────────────────── */}
      <div className={`wrap ${s.doc}`}>
        <OnThisPage items={CONTENTS} />

        <div className={s.body}>
          {/* What is the TMJ? */}
          <section className={s.sec} id="the-tmj" aria-labelledby="the-tmj-title">
            <h2 className={`t-h2 ${s.h2}`} id="the-tmj-title">
              {u.joint.heading}
            </h2>
            <div className={s.split}>
              <div className={s.copy}>
                <p className={s.lede}>{u.joint.paragraphs[0]}</p>
                <p>{u.joint.paragraphs[1]}</p>
              </div>
              <div className={s.selfCheck}>
                <p className={s.selfCheckText}>{u.joint.selfCheck}</p>
              </div>
            </div>
            <Reveal className={s.pair}>
              {u.joint.figures.map((f) => (
                <Figure key={f.src} {...f} sizes="(min-width: 1100px) 500px, (min-width: 700px) 50vw, 100vw" />
              ))}
            </Reveal>
          </section>

          {/* Signs and symptoms */}
          <section className={s.sec} id="signs" aria-labelledby="signs-title">
            <h2 className={`t-h2 ${s.h2}`} id="signs-title">
              {u.signs.heading}
            </h2>
            <div className={s.panel}>
              <SignsChecklist showHeading={false} id="signs-check" />
            </div>
            <p className={s.keyLine}>{u.signs.headacheStat}</p>
          </section>

          {/* TMD is not one disease */}
          <section className={s.sec} id="not-one-disease" aria-labelledby="not-one-disease-title">
            <h2 className={`t-h2 ${s.h2}`} id="not-one-disease-title">
              {d.heading}
            </h2>
            <p className={s.lede}>{d.paragraphs[1]}</p>

            {/* The counts as a short passage: number and words in one sentence, the number by weight and colour. */}
            <div className={s.counts}>
              {d.counts.map((c) => (
                <p key={c.value}>
                  <span className={s.countValue}>{c.value}</span> {c.label}.
                </p>
              ))}
            </div>

            <div className={s.catGrid}>
              <div>
                <h3 className={s.h3}>The seven categories</h3>
                <ol className={s.cats}>
                  {d.categories.map((c, i) => (
                    <li key={c.name} className={s.cat}>
                      <span className={`num ${s.catN}`} aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className={s.catBody}>
                        {guided.has(c.name) ? (
                          <Link href={href(v, `${routes.conditions}#${categoryId(c.name)}`)} className={s.catLink}>
                            {c.name}
                            <ArrowRight size={16} className={s.catArrow} />
                          </Link>
                        ) : (
                          <span className={s.catName}>{c.name}</span>
                        )}
                        {c.note && <span className={s.catNote}>{c.note}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <Figure {...d.figure} sizes="(min-width: 1100px) 560px, 100vw" />
            </div>

            <Disclosure className={s.dsc}>
              <div className={`prose ${s.full}`}>
                {/* His About TMD page, in his order. */}
                <p>{d.paragraphs[0]}</p>
                <p>{d.adaCriteria.lead}</p>
                <ul>
                  {d.adaCriteria.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <p>{d.paragraphs[2]}</p>
                <ul className={s.logic}>
                  {d.logic.map((l) => (
                    <li key={l}>{mayOrMayNot(l, s.logicEm)}</li>
                  ))}
                </ul>
              </div>
            </Disclosure>
          </section>

          {/* What the numbers show */}
          <section className={s.sec} id="the-numbers" aria-labelledby="the-numbers-title">
            <h2 className={`t-h2 ${s.h2}`} id="the-numbers-title">
              {u.evidence.heading}
            </h2>
            {/* Each line is his sentence, its number set by weight where it falls, at the sentence's own size. */}
            <ul className={s.ledger}>
              {u.evidence.items.map((it) => (
                <li key={it.label} className={s.ledgerRow}>
                  {figureInPlace(it.label, it.value, s.ledgerValue)}
                </li>
              ))}
            </ul>
            <Notice kind="note" className={s.caveat}>
              {u.evidence.caveat}
            </Notice>
          </section>

          {/* Three types of facial pain */}
          <section className={s.sec} id="types-of-pain" aria-labelledby="types-of-pain-title">
            <h2 className={`t-h2 ${s.h2}`} id="types-of-pain-title">
              {p.heading}
            </h2>
            <div className={s.painGrid}>
              <div>
                <p className={s.lede}>{p.lead}</p>
                <dl className={s.types}>
                  {p.types.map((t) => (
                    <div key={t.name} className={s.type}>
                      <dt className={s.typeName}>{t.name}</dt>
                      <dd className={s.typeBody}>{t.body}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.overlay}>{p.overlay}</p>
              </div>
              <Figure {...p.figure} sizes="(min-width: 1100px) 520px, 100vw" />
            </div>

            <p className={s.keyLine}>{p.beliefs.emphasis}</p>

            <Disclosure className={s.dsc}>
              <div className={`prose ${s.full}`}>
                <h3>{p.beliefs.heading}</h3>
                {p.beliefs.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </Disclosure>
          </section>

          {/* Approaches to relief */}
          <section className={s.sec} id="relief" aria-labelledby="relief-title">
            <h2 className={`t-h2 ${s.h2}`} id="relief-title">
              {a.heading}
            </h2>
            <div className={s.reliefIntro}>
              <p className={s.lede}>{a.lead}</p>
              <Figure {...slideMatch} sizes="(min-width: 1100px) 560px, 100vw" />
            </div>

            <div className={s.groups}>
              {a.groups.map((g) => (
                <div key={g.name} className={s.group}>
                  <h3 className={s.groupName}>{g.name}</h3>
                  <ul className={s.groupItems}>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Reveal className={s.pair}>
              <Figure {...slideCauses} sizes="(min-width: 1100px) 500px, (min-width: 700px) 50vw, 100vw" />
              <Figure {...slideTherapies} sizes="(min-width: 1100px) 500px, (min-width: 700px) 50vw, 100vw" />
            </Reveal>
          </section>

          {/* Hot, cold, hot */}
          <section className={s.sec} id="hot-cold-hot" aria-labelledby="hot-cold-hot-title">
            <div className={s.handout}>
              <div className={s.handoutHead}>
                <h2 className={`t-h2 ${s.h2} ${s.handoutTitle}`} id="hot-cold-hot-title">
                  {h.heading}
                </h2>
                <p className={s.lede}>{h.purpose}</p>
                <ButtonLink href={h.pdf.href} variant="secondary" icon="download" className={s.handoutPdf}>
                  {h.pdf.label}
                </ButtonLink>
              </div>
              <ol className={s.steps}>
                {h.steps.map((st, i) => (
                  <li key={st} className={s.step}>
                    <span className={`num ${s.stepN}`} aria-hidden="true">
                      {i + 1}
                    </span>
                    <p className={s.stepText}>{st}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Common questions */}
          <section className={s.sec} id="questions" aria-labelledby="questions-title">
            <div className={s.faqGrid}>
              <h2 className={`t-h2 ${s.h2}`} id="questions-title">
                Common questions
              </h2>
              <Faq items={u.faq} />
            </div>
          </section>

          {/* Children and facial development */}
          <section className={s.sec} id="children" aria-labelledby="children-title">
            <h2 className={`t-h2 ${s.h2}`} id="children-title">
              {u.children.heading}
            </h2>
            <div className={s.split}>
              <div className={s.copy}>
                <p className={s.lede}>{u.children.paragraphs[0]}</p>
                <p>{u.children.paragraphs[1]}</p>
              </div>
              <div>
                <h3 className={s.h3}>Signs and Symptoms in children</h3>
                <ul className={s.ruled}>
                  {u.children.signs.map((sign) => (
                    <li key={sign}>{sign}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.keyLine}>{u.children.adult}</p>
          </section>
        </div>
      </div>

      {/* ── Close: the next step and the practice ─────────────────────── */}
      <Section labelledBy="next-title" className={s.close}>
        <div className={s.closeHead}>
          <h2 className={`t-h2 ${s.closeTitle}`} id="next-title">
            {education.conditionsHeading}
          </h2>
          <div className={s.closeAside}>
            <p className={s.closeLine}>{education.patientsLine}</p>
            <div className="actions">
              <ButtonLink href={href(v, routes.conditions)}>Find your condition</ButtonLink>
              <ButtonLink href={href(v, routes.library)} variant="secondary">
                Lectures and literature
              </ButtonLink>
            </div>
          </div>
        </div>
        <PracticePanel />
      </Section>
    </>
  );
}
