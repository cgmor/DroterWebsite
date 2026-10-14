import Image from "next/image";
import Link from "next/link";
import { airwayBite, distributor, doctor } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight } from "@/components/site/icons";
import { href, routes, type VersionId } from "@/components/site/links";
import { SpecStrip } from "@/components/site/SpecRows";
import { airwaySpecStrip } from "@/components/site/specs";
import { facultyLine } from "./AboutDroter";
import DeviceStage from "./DeviceStage";
import JointPlates from "./JointPlates";
import s from "./home.module.css";

/** Dr. Droter's own line (drdroter.com/about-dr-droter). */
const thesisLine = doctor.pullQuote;

/* ── V1 ──────────────────────────────────────────────────────────────── */

/**
 * V1 first viewport: the device on porcelain, contained in the right column
 * (about 44% of the content width, at most 560px), the headline and the
 * order route on the left, and the millimetre row along the bottom.
 */
export function DeviceHero() {
  return (
    <section className={`hero tone-porcelain ${s.dh}`} id="top" aria-labelledby="top-title">
      <div className={`wrap ${s.dhGrid}`}>
        <div className={s.dhCopy}>
          <h1 id="top-title" className={`t-display ${s.dhTitle}`}>
            {airwayBite.shortName}
          </h1>
          <p className={`t-lead ${s.dhLead}`}>{airwayBite.summary}</p>
          <div className={`actions ${s.dhActions}`}>
            <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            <ButtonLink href="#tutorial" variant="secondary" icon="play">
              Watch the tutorial
            </ButtonLink>
          </div>
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
 * V2 first viewport: a modest framed portrait of Dr. Droter (at most 380px
 * wide) beside his thesis as the h1, his name and credit line, and in the
 * same view, the Airway Bite as his chairside technique.
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
                {facultyLine && <p className={s.cred}>{facultyLine}</p>}
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
                  sizes="170px"
                  quality={90}
                  className={s.abThumbImg}
                />
              </div>
              <div className={s.abBody}>
                <h2 id="ab-card-title" className={s.abTitle}>
                  {airwayBite.shortName}
                </h2>
                <p className={s.abLine}>{airwayBite.airwayStory[2].title}</p>
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
              sizes="(min-width: 1000px) 380px, 220px"
              quality={90}
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
 * V3 first viewport: the healthy and damaged joint under his heading "The
 * Many Causes of Facial Pain" (drdroter.com/facial-pain), with the two ways
 * in: patients to the conditions, dentists to the Airway Bite.
 */
export function JointHero({ v }: { v: VersionId }) {
  return (
    <section className={`tone-porcelain ${s.jh}`} id="top" aria-labelledby="top-title">
      <div className="wrap">
        <h1 id="top-title" className={`t-display ${s.jhTitle}`}>
          The Many Causes of Facial Pain
        </h1>
        <JointPlates>
          <div>
            <p className={`t-lead ${s.jhLead}`}>{understanding.intro}</p>
            <nav className={s.entries} aria-label="Start here">
              <Link href={href(v, routes.conditions)} className={s.entry}>
                <span>
                  <span className={s.entryWho}>For patients:</span> Find your condition
                </span>
                <ArrowRight size={22} />
              </Link>
              <Link href={href(v, routes.airwayBite)} className={s.entry}>
                <span>
                  <span className={s.entryWho}>For dentists:</span> See the {airwayBite.shortName}
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
