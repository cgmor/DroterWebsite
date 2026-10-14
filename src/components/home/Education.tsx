import type { ReactNode } from "react";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import Disclosure from "@/components/site/Disclosure";
import Figure from "@/components/site/Figure";
import { href, routes, type VersionId } from "@/components/site/links";
import { Prose, Section } from "@/components/site/Section";
import s from "./home.module.css";

const def = understanding.definition;
/** "TMDs: what are the choices? (190 diagnoses, 7 categories)", from his lecture. */
const choicesSlide = understanding.approaches.figures[0];

/**
 * A figure and its sentence. When the sentence already contains the figure
 * (his whole sentence, e.g. "The majority of patients (70%) …"), the figure is
 * emphasised where it stands and never printed twice; otherwise it leads.
 */
export function Figured({ value, label, className }: { value: string; label: string; className: string }): ReactNode {
  const at = label.indexOf(value);
  if (at >= 0) {
    return (
      <>
        {label.slice(0, at)}
        <span className={className}>{value}</span>
        {label.slice(at + value.length)}
      </>
    );
  }
  return (
    <>
      <span className={className}>{value}</span> {label}
      {/[.!?]$/.test(label) ? "" : "."}
    </>
  );
}

/** 40 / 190+ / 7, set as three lines of a passage rather than stat tiles. */
export function CountsPassage({ className }: { className?: string }) {
  return (
    <div className={[s.counts, className].filter(Boolean).join(" ")}>
      {def.counts.map((c) => (
        <p key={c.value}>
          <Figured value={c.value} label={c.label} className={`num ${s.countNum}`} />
        </p>
      ))}
    </div>
  );
}

/** “Telling a patient that he or she has ‘TMJ’…”, attributed. */
export function Thesis() {
  return (
    <figure className={s.thesis}>
      <blockquote>
        <p className={s.thesisLine}>{understanding.thesis.line}</p>
      </blockquote>
      <figcaption className={s.thesisCap}>{understanding.thesis.attribution}</figcaption>
    </figure>
  );
}

/**
 * V1's turn from the device to the diagnosis: his heading "TMD and Facial
 * Pain" (drdroter.com/about-tmd), his thesis, then the counts beside his own
 * "190 diagnoses, 7 categories" slide.
 */
export function DiagnosisTurn({ v }: { v: VersionId }) {
  return (
    <Section labelledBy="turn-title">
      <div className={s.turnTop}>
        <h2 id="turn-title" className={`t-h2 ${s.turnTitle}`}>
          TMD and Facial Pain
        </h2>
        <Thesis />
      </div>
      <div className={s.turnBody}>
        <div>
          <CountsPassage />
          <div className={s.after}>
            <ButtonLink href={href(v, routes.understanding)} variant="quiet">
              {understanding.title}
            </ButtonLink>
          </div>
        </div>
        <Figure {...choicesSlide} caption="From Dr. Droter’s TMD lecture." />
      </div>
    </Section>
  );
}

/**
 * V3's "TMD is not one disease": the definition, the counts, the seven
 * categories beside the 40-diseases slide, and the full version one expand away.
 */
export function NotOneDisease({ v }: { v: VersionId }) {
  return (
    <Section labelledBy="nod-title">
      <div className={s.nodTop}>
        <div>
          <h2 id="nod-title" className="t-h2">
            {def.heading}
          </h2>
          <p className={`t-lead ${s.nodLead}`}>{def.paragraphs[1]}</p>
        </div>
        <CountsPassage />
      </div>

      <div className={s.nodCats}>
        <Figure {...def.figure} />
        <div>
          <h3 className={`t-h4 ${s.catsTitle}`} id="nod-cats">
            The seven categories
          </h3>
          <ol className={s.cats} aria-labelledby="nod-cats">
            {def.categories.map((c) => (
              <li key={c.name} className={s.cat}>
                <span>
                  <span className={s.catName}>{c.name}</span>
                  {c.note && <span className={s.catNote}>{c.note}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={s.nodMore}>
        <Prose>
          <Disclosure>
            <p>{def.paragraphs[0]}</p>
            <p>{def.adaCriteria.lead}</p>
            <ul>
              {def.adaCriteria.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <ul>
              {def.logic.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Disclosure>
        </Prose>
        <div className={s.after}>
          <ButtonLink href={href(v, routes.understanding)} variant="quiet">
            {understanding.title}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
