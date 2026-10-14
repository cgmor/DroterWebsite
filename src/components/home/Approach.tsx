import { doctor } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { href, routes, type VersionId } from "@/components/site/links";
import { Section } from "@/components/site/Section";
import { Figured } from "./Education";
import s from "./home.module.css";

const pain = understanding.pain;
const evidence = understanding.evidence;

/**
 * V2: his diagnostic approach in three movements. The three types of pain
 * beside his lecture slide; the palpation emphasis, large and quiet; then
 * what the numbers show: his sentences, each figure emphasised where it stands.
 */
export default function Approach({ v }: { v: VersionId }) {
  return (
    <>
      <Section labelledBy="approach-title" id="approach">
        <div className={s.daGrid}>
          <div>
            <h2 id="approach-title" className="t-h2">
              {pain.heading}
            </h2>
            <p className={`t-lead ${s.daLead}`}>{pain.lead}</p>
            <dl className={s.daTypes}>
              {pain.types.map((t) => (
                <div key={t.name}>
                  <dt>{t.name}</dt>
                  <dd>{t.body}</dd>
                </div>
              ))}
            </dl>
            <p className={s.daOverlay}>{pain.overlay}</p>
          </div>
          <Figure {...pain.figure} sizes="(min-width: 1000px) 720px, 100vw" />
        </div>
      </Section>

      <Section tone="mist" as="div">
        <figure className={s.emph}>
          <blockquote>
            <p className={s.emphText}>{pain.beliefs.emphasis}</p>
          </blockquote>
          <div className={s.emphFoot}>
            <figcaption className={s.emphCap}>{doctor.name}</figcaption>
            <p className={s.emphBody}>{pain.beliefs.paragraphs[0]}</p>
          </div>
        </figure>
      </Section>

      <Section labelledBy="ev-title">
        <div className={s.evGrid}>
          <h2 id="ev-title" className="t-h2">
            {evidence.heading}
          </h2>
          <div className={s.evPassage}>
            {evidence.items.map((it, i) => (
              <p key={i} className={s.evItem}>
                <Figured value={it.value} label={it.label} className={`num ${s.evNum}`} />
              </p>
            ))}
            <p className={s.evCaveat}>{evidence.caveat}</p>
            <div>
              <ButtonLink href={href(v, routes.understanding)} variant="quiet">
                {understanding.title}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
