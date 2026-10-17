import Image from "next/image";
import Link from "next/link";
import { airwayBite, applianceGuide, brand, doctor, education } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { siteConditions } from "@/content/sites";
import { conditionGuides, type ConditionGuide } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { href, routes, type SiteId } from "@/components/site/links";
import Loop from "@/components/site/Loop";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead } from "@/components/site/Section";
import s from "./aps-home.module.css";

/*
 * APSleep.com home: sleep and airway, for patients and dentists.
 *
 * Dr. Droter on the Oct 14 call: "the lead in I don't want is the airway
 * bite. I want some solutions for the patients." His running order: "landing
 * page, have something about me here, sleep-related problems here, airway
 * problems. And then we need to sort patients and doctors."
 *
 *   mist   his 2021 headline, the patient/dentist sort, and the four sleep
 *          problems, each with the appliances from his products chart
 *   night  airway problems: his narration over the airway animation (the
 *          page's one authored motion)
 *   white  Dr. Droter, then For patients | For dentists
 *   footer (mist)
 *
 * Every sentence is his: apsleep.com (2021), drdroter.com, his narration, his
 * products chart and slide, his words on the call. Interface copy is limited
 * to short labels. The Airway Bite is one plain row for dentists; its product
 * material lives on /airway-bite. Each panel has three rows, so the two
 * panels come out the same height.
 */

/** His 2021 APSleep.com headline, set as the h1 (no closing full stop). */
const tagline = brand.tagline.replace(/\.$/, "");

/** His apsleep.com/about paragraph (2021), sentence by sentence. */
const founder = doctor.founderStory.split(/(?<=\.)\s+/);
/** "Common problems he observed were fatigue, not waking rested, clenching of teeth, and sleep grinding of teeth." */
const observed = founder.find((x) => x.startsWith("Common problems")) ?? founder[1];
/** "In 2021 he formed ArrowPath Sleep so patients and dentists could have access to what he has found to be so effective." */
const formed = founder.find((x) => x.startsWith("In 2021")) ?? founder[founder.length - 1];

/** His narration over the airway animation, the first two sentences of it. */
const narration = `${airwayBite.airwayStory[0].body} ${airwayBite.airwayStory[1].body}`;

/** His seminar-links entry for the lab: "Living Tree Dental Lab ArrowPath Sleep orthotics". */
const labMakes = "ArrowPath Sleep orthotics";

/* ── What helps, per sleep problem ───────────────────────────────────── */

/**
 * Condition slug → the appliances that address it: every item in the groups
 * of his products chart ("Are you wearing the correct night guard?") whose
 * `conditions` include that slug. The same rule as the conditions pages and
 * the appliances page, so all three show the same appliances.
 */
const appliancesFor = (slug: string) =>
  applianceGuide.groups.filter((g) => g.conditions.includes(slug)).flatMap((g) => g.items.map((i) => i.name));

/** The APS-named appliances on his chart, for the dentists' row. */
const apsNames = applianceGuide.groups.flatMap((g) => g.items.map((i) => i.name)).filter((n) => n.startsWith("APS "));

/** His chart's indications (Clenching, Grinding, Grinding + Airway, Airway), for the patients' row. */
const indications = applianceGuide.groups.map((g) => g.indication);

/** The sleep problems APSleep carries, in the site's order. */
const problems = siteConditions.apsleep
  .map((slug) => conditionGuides.find((g) => g.slug === slug))
  .filter((g): g is ConditionGuide => Boolean(g));

/* ── Pieces ──────────────────────────────────────────────────────────── */

/** A row's second line: one of his sentences, or a set of names (set inline, dot-separated). */
type Row = { title: string; line?: string | string[]; href: string; external?: boolean };

/** A ruled list of links; the whole row is the link. */
function Rows({ rows }: { rows: Row[] }) {
  return (
    <ul className={s.rows}>
      {rows.map((r) => {
        const Arrow = r.external ? ArrowUpRight : ArrowRight;
        const label = (
          <>
            {r.title}
            {r.external && <span className="sr-only"> (opens in a new tab)</span>}
          </>
        );
        return (
          <li key={r.title} className={s.row}>
            {r.external ? (
              <a href={r.href} target="_blank" rel="noopener" className={s.rowLink}>
                {label}
              </a>
            ) : (
              <Link href={r.href} className={s.rowLink}>
                {label}
              </Link>
            )}
            {typeof r.line === "string" && <p className={s.rowLine}>{r.line}</p>}
            {Array.isArray(r.line) && (
              <ul className={`${s.rowLine} ${s.names}`}>
                {r.line.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            )}
            <Arrow size={18} className={s.rowArrow} />
          </li>
        );
      })}
    </ul>
  );
}

/* ── Home ────────────────────────────────────────────────────────────── */

/** APSleep.com home (sleep and airway). */
export default function HomeAps({ v }: { v: SiteId }) {
  return (
    <>
      {/* His headline, the sort, and the sleep problems with what helps. */}
      <section className={`tone-mist ${s.hero}`} id="top" aria-labelledby="top-title">
        <div className="wrap">
          <header className={s.heroHead}>
            <h1 id="top-title" className={`t-display ${s.heroTitle}`}>
              {tagline}
            </h1>
            <p className={`t-lead ${s.heroLead}`}>{education.patientsLine}</p>
            <div className={`actions ${s.heroActions}`}>
              <ButtonLink href="#sleep-problems" icon="down">
                For patients
              </ButtonLink>
              <ButtonLink href="#dentists" variant="secondary" icon="down">
                For dentists
              </ButtonLink>
            </div>
          </header>

          <h2 id="problems-title" className="sr-only">
            Sleep problems
          </h2>
          <ul className={s.problems} id="sleep-problems" aria-labelledby="problems-title">
            {problems.map((g) => {
              const helps = appliancesFor(g.slug);
              return (
                <li key={g.slug} className={s.problem}>
                  <div className={s.problemHead}>
                    <h3 className={s.problemTitle}>
                      <Link href={href(v, routes.condition(g.slug))} className={s.problemLink}>
                        {g.title}
                      </Link>
                    </h3>
                    <p className={s.problemSays}>“{g.plainName}”</p>
                  </div>
                  {helps.length > 0 ? (
                    <dl className={s.helps}>
                      <dt className={s.helpsLabel}>Appliances</dt>
                      {helps.map((name) => (
                        <dd key={name} className={s.helpsName}>
                          {name}
                        </dd>
                      ))}
                    </dl>
                  ) : (
                    <span />
                  )}
                  <ArrowRight size={18} className={s.problemArrow} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Airway problems: his narration over the airway animation. */}
      <Section tone="night" labelledBy="airway-title" id="airway">
        <SectionHead id="airway-title" layout="center" title="Airway problems" lead={narration} className={s.airwayHead} />
        <div className={s.airwayMedia}>
          <Loop
            name="airwayOpening"
            alt="Animation from Dr. Droter’s tutorial: during sleep the airway behind the tongue is narrow; as the lower jaw moves forward, it opens."
            className={s.airwayLoop}
            sizes="(min-width: 800px) 960px, 140vw"
          />
        </div>
        <div className={`actions ${s.airwayActions}`}>
          <ButtonLink href={href(v, routes.condition("sleep-breathing-disorders"))} variant="quiet">
            Sleep Breathing Disorders
          </ButtonLink>
          <ButtonLink href={href(v, routes.appliances)} variant="quiet">
            The appliances
          </ButtonLink>
        </div>
      </Section>

      {/* Dr. Droter, then the sort: "so patients and dentists could have access…" */}
      <Section labelledBy="droter-title" id="dr-droter">
        <header className={`shead shead-center ${s.droterHead}`}>
          <div className={s.portrait}>
            <Image
              src={doctor.headshot}
              alt={doctor.headshotAlt}
              fill
              sizes="(min-width: 640px) 220px, 168px"
              quality={90}
              className={s.portraitImg}
            />
          </div>
          <div className={s.byline}>
            <h2 id="droter-title" className="t-h2 shead-title">
              {doctor.name}
            </h2>
            {/* The PRODUCT.md credit line (an interface label). */}
            <p className={s.cred}>
              <span className={s.credPart}>{doctor.affiliation}</span>
              <span className={s.credSep}> · </span>
              <span className={s.credPart}>{doctor.title}</span>
            </p>
          </div>
          <div className="shead-aside">
            <p className="t-lead shead-lead">{formed}</p>
            <div className="actions">
              <ButtonLink href={href(v, routes.about)} variant="quiet">
                About {doctor.shortName}
              </ButtonLink>
            </div>
          </div>
        </header>

        <Reveal className={s.sort}>
          <section className={s.panel} id="patients" aria-labelledby="patients-title">
            <h3 id="patients-title" className={`t-h3 ${s.panelTitle}`}>
              For patients
            </h3>
            <Rows
              rows={[
                { title: "Sleep problems", line: observed, href: href(v, routes.conditions) },
                { title: applianceGuide.title, line: indications, href: href(v, routes.appliances) },
                { title: livingTree.name, line: livingTree.patientNote, href: livingTree.url, external: true },
              ]}
            />
          </section>

          <section className={s.panel} id="dentists" aria-labelledby="dentists-title">
            <h3 id="dentists-title" className={`t-h3 ${s.panelTitle}`}>
              For dentists
            </h3>
            <Rows
              rows={[
                { title: "Appliances", line: apsNames, href: href(v, routes.appliances) },
                { title: airwayBite.shortName, line: airwayBite.purpose, href: href(v, routes.airwayBite) },
                { title: livingTree.name, line: labMakes, href: livingTree.url, external: true },
              ]}
            />
          </section>
        </Reveal>
      </Section>
    </>
  );
}
