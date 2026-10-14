import Image from "next/image";
import Link from "next/link";
import { airwayBite, distributor, doctor, education } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight } from "@/components/site/icons";
import { href, routes, type VersionId } from "@/components/site/links";
import { SpecStrip } from "@/components/site/SpecRows";
import { airwaySpecStrip } from "@/components/site/specs";
import DeviceStage from "./DeviceStage";
import JointPlates from "./JointPlates";
import s from "./home.module.css";

/** "The Airway Bite records …" → "Records …", under the product-name headline. */
const productLine = airwayBite.summary.replace(/^The Airway Bite records/, "Records");

/**
 * The hero's running line: the chairside time and the starting target, in
 * body type (they are not millimetres, so they stay out of the spec row).
 *  - "About five minutes, chairside": advantages[0].title.
 *  - "roughly 50% of total movement is typically a good place to start": step 5.
 */
const startTarget = airwayBite.phases
  .flatMap((p) => p.steps)
  .find((st) => st.n === 5)
  ?.body.match(/roughly 50% of total movement is typically a good place to start/)?.[0];
const chairsideLine = [`${airwayBite.advantages[0].title}.`, startTarget && `For the target jaw position, ${startTarget}.`]
  .filter(Boolean)
  .join(" ");

/** "TMJ is not a diagnosis — it’s a joint." → "TMJ is not a diagnosis. It’s a joint." */
const thesisLine = education.keyMessages[0].replace(" — it’s", ". It’s");

/* ── V1 ──────────────────────────────────────────────────────────────── */

/**
 * V1 first viewport: the device at Eight Sleep product scale on porcelain
 * (about two thirds of the hero's width on desktop, bleeding off the right
 * edge and the bottom), the headline and the order route over its empty
 * upper left, and the millimetre row along the bottom.
 */
export function DeviceHero() {
  return (
    <section className={`hero hero-tall tone-porcelain ${s.dh}`} id="top" aria-labelledby="top-title">
      <div className={`wrap ${s.dhGrid}`}>
        <div className={s.dhCopy}>
          <h1 id="top-title" className={`t-display ${s.dhTitle}`}>
            {airwayBite.shortName}
          </h1>
          <p className={`t-lead ${s.dhLead}`}>{productLine}</p>
          <div className={`actions ${s.dhActions}`}>
            <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            <ButtonLink href="#tutorial" variant="secondary" icon="play">
              Watch the tutorial
            </ButtonLink>
          </div>
          <p className={s.dhNote}>{chairsideLine}</p>
        </div>
        <div className={s.dhMedia}>
          <DeviceStage />
        </div>
        <SpecStrip items={airwaySpecStrip} className={s.dhStrip} />
      </div>
    </section>
  );
}

/* ── V2 ──────────────────────────────────────────────────────────────── */

/**
 * V2 first viewport: Dr. Droter at near full height, his grey backdrop
 * dissolving into porcelain; his thesis as the h1, his name and credit line,
 * and in the same view, the Airway Bite as his chairside technique.
 */
export function PortraitHero({ v }: { v: VersionId }) {
  return (
    <section className={`tone-porcelain ${s.ph}`} id="top" aria-labelledby="top-title">
      <div className="wrap">
        <div className={s.phGrid}>
          <div className={s.phCopy}>
            <div className={s.stack}>
              <h1 id="top-title" className={`t-display ${s.phTitle}`}>
                {thesisLine}
              </h1>
              <div className={s.phByline}>
                <p className={s.phName}>{doctor.name}</p>
                <p className={s.cred}>
                  {doctor.affiliation} · {doctor.title}
                </p>
              </div>
              <div className="actions">
                <ButtonLink href="#approach" variant="secondary" icon="down">
                  His diagnostic approach
                </ButtonLink>
                <ButtonLink href={href(v, routes.about)} variant="quiet">
                  About {doctor.shortName}
                </ButtonLink>
              </div>
            </div>

            <aside className={s.abCard} aria-labelledby="ab-card-title">
              <div className={s.abThumb}>
                <Image
                  src="/aps/renders/device-airway-bite-three-quarter.png"
                  alt=""
                  fill
                  sizes="124px"
                  className={s.abThumbImg}
                />
              </div>
              <div className={s.abBody}>
                <h2 id="ab-card-title" className={s.abTitle}>
                  {airwayBite.shortName}
                </h2>
                <p className={s.abLine}>His chairside technique for recording the airway position.</p>
              </div>
              <div className={`actions ${s.abActions}`}>
                <ButtonLink href={distributor.url} size="sm">
                  {distributor.cta}
                </ButtonLink>
                <ButtonLink href={href(v, routes.airwayBite)} variant="quiet" size="sm">
                  See the technique
                </ButtonLink>
              </div>
            </aside>
          </div>

          <div className={s.phMedia}>
            <Image
              src={doctor.headshot}
              alt={doctor.headshotAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1000px) 52vw, 100vw"
              className={s.phImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── V3 ──────────────────────────────────────────────────────────────── */

/**
 * V3 first viewport: the healthy and damaged joint under "Facial pain has
 * more than 190 causes.", with the two ways in: patients to the conditions,
 * dentists to the Airway Bite.
 */
export function JointHero({ v }: { v: VersionId }) {
  return (
    <section className={`tone-porcelain ${s.jh}`} id="top" aria-labelledby="top-title">
      <div className="wrap">
        <h1 id="top-title" className={`t-display ${s.jhTitle}`}>
          Facial pain has more than 190 causes.
        </h1>
        <JointPlates>
          <div>
            <p className={`t-lead ${s.jhLead}`}>{understanding.intro}</p>
            <nav className={s.entries} aria-label="Start here">
              <Link href={href(v, routes.conditions)} className={s.entry}>
                <span>
                  <span className={s.entryWho}>For patients:</span> find your condition
                </span>
                <ArrowRight size={22} />
              </Link>
              <Link href={href(v, routes.airwayBite)} className={s.entry}>
                <span>
                  <span className={s.entryWho}>For dentists:</span> the {airwayBite.shortName}
                </span>
                <ArrowRight size={22} />
              </Link>
            </nav>
          </div>
        </JointPlates>
      </div>
    </section>
  );
}
