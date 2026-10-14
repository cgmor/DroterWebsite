import Image from "next/image";
import Link from "next/link";
import { airwayBite, applianceGuide, distributor, doctor } from "@/content/aps";
import ApplianceGuide from "@/components/site/ApplianceGuide";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight, Play } from "@/components/site/icons";
import { href, routes, type VersionId } from "@/components/site/links";
import Loop from "@/components/site/Loop";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import TutorialPlayer from "@/components/site/TutorialPlayer";
import DeviceRender from "./DeviceRender";
import s from "./home.module.css";

const tutorialTitle = "Every step, from try-in to bite scan";
const narrated = `Narrated by ${doctor.shortName}, ${airwayBite.video.durationLabel}.`;
/** "2 min 15 s" → "02:15", for the play chip. */
const runtime = airwayBite.video.durationLabel.replace(/^(\d+) min (\d+) s$/, (_, m: string, sec: string) => `${m.padStart(2, "0")}:${sec.padStart(2, "0")}`);

/** V1: the advantages as a hairline sheet beside the device in use (step 6, tapping into position). */
export function Advantages({ v }: { v: VersionId }) {
  return (
    <Section labelledBy="adv-title">
      <div className={s.advGrid}>
        <div className={s.advAside}>
          <div className={s.advMedia}>
            <Image
              src="/aps/stills/step-06-tap-into-position-clean.webp"
              alt="The Airway Bite seated on the upper front teeth while the patient taps the lower teeth into the forward position."
              fill
              sizes="(min-width: 1000px) 40vw, 100vw"
              className={s.advImg}
            />
          </div>
        </div>
        <div className={s.advCopy}>
          <h2 id="adv-title" className="t-h1">
            Made for the chair.
          </h2>
          <p className={`t-lead ${s.advLead}`}>
            {airwayBite.kit.line}
          </p>
          <dl className={s.advList}>
            {airwayBite.advantages.map((a) => (
              <div key={a.title} className={s.advRow}>
                <dt>{a.title}</dt>
                <dd>{a.body}</dd>
              </div>
            ))}
          </dl>
          <div className={s.after}>
            <ButtonLink href={href(v, `${routes.airwayBite}#steps`)} variant="quiet">
              The nine chairside steps
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** V1: the full tutorial with its chapter list (the hero's "Watch the tutorial" lands here). */
export function TutorialSection({ v, tone = "mist" }: { v: VersionId; tone?: Tone }) {
  return (
    <Section tone={tone} labelledBy="tut-title">
      <SectionHead
        id="tut-title"
        title={tutorialTitle}
        lead={`${narrated} Choose a chapter to jump straight to it.`}
        layout="split"
        actions={
          <ButtonLink href={href(v, `${routes.airwayBite}#steps`)} variant="quiet">
            Open the chairside steps
          </ButtonLink>
        }
      />
      <TutorialPlayer />
    </Section>
  );
}

/** V2: a teaser for the tutorial and the four phases of the protocol, each a link into /airway-bite. */
export function TutorialTeaser({ v, tone = "white" }: { v: VersionId; tone?: Tone }) {
  return (
    <Section tone={tone} labelledBy="tt-title">
      <div className={s.tt}>
        <Link href={href(v, `${routes.airwayBite}#tutorial`)} className={s.ttMedia} aria-label={`Watch the tutorial, ${airwayBite.video.durationLabel}`}>
          <Image
            src={airwayBite.video.poster}
            alt=""
            fill
            sizes="(min-width: 1000px) 58vw, 100vw"
            className={s.ttImg}
          />
          <span className={s.ttPlay} aria-hidden="true">
            <Play size={16} />
            Watch the tutorial
            <span className={`mono ${s.ttTime}`}>{runtime}</span>
          </span>
        </Link>
        <div>
          <h2 id="tt-title" className="t-h2">
            {tutorialTitle}
          </h2>
          <p className={`t-lead ${s.ttLead}`}>{narrated} The protocol runs in four phases.</p>
          <ol className={s.phases}>
            {airwayBite.phases.map((p, i) => {
              const first = p.steps[0].n;
              const last = p.steps[p.steps.length - 1].n;
              return (
                <li key={p.id} className={s.phase}>
                  <span className={`num ${s.phaseN}`}>{i + 1}</span>
                  <Link href={href(v, `${routes.airwayBite}#phase-${p.id}`)} className={`${s.rowLink} ${s.phaseTitle}`}>
                    {p.title}
                  </Link>
                  <span className={`num ${s.phaseSteps}`}>
                    Steps {first}–{last}
                  </span>
                  <ArrowRight size={18} className={s.rowArrow} />
                </li>
              );
            })}
          </ol>
          <div className={`actions ${s.ttActions}`}>
            <ButtonLink href={href(v, `${routes.airwayBite}#steps`)} variant="secondary">
              Open the chairside steps
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * V2: the turn from his diagnosis to his device, on night. The device in
 * profile at product scale (the side render, lit by its own studio light and
 * grounded by a shadow taken from its silhouette), his own framing of the
 * job, and the airway loop.
 */
export function AirwayBridge({ v }: { v: VersionId }) {
  return (
    <Section tone="night" labelledBy="br-title">
      <div className={s.brHead}>
        <div className={s.brCopy}>
          <h2 id="br-title" className="t-h1">
            {airwayBite.name}
          </h2>
          <p className={`t-lead ${s.brLead}`}>{airwayBite.summary}</p>
        </div>
        <div className={s.brDevice}>
          <DeviceRender
            view="side"
            alt={`The ${airwayBite.name} in profile: the anterior stop rising from the base.`}
            sizes="(min-width: 1000px) 76vw, 122vw"
            className={s.nightRender}
          />
        </div>
        <figure className={s.brQuote}>
          <blockquote>
            <p>“{airwayBite.purpose}”</p>
          </blockquote>
          <figcaption>{doctor.name}</figcaption>
        </figure>
      </div>
      <div className={s.brMedia}>
        <Loop
          name="airwayOpening"
          alt="Animation from the tutorial: a cross-section of the airway opening as the lower jaw moves forward."
          className={s.brLoop}
          sizes="(min-width: 1400px) 1320px, 100vw"
        />
      </div>
      <div className={`actions ${s.brActions}`}>
        <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
        <ButtonLink href={href(v, routes.airwayBite)} variant="secondary">
          How it works chairside
        </ButtonLink>
      </div>
    </Section>
  );
}

/**
 * V3: the Airway Bite band that starts within the first scroll, on night: the
 * device at product scale (the three-quarter render, grounded by a shadow
 * taken from its silhouette), then the order route.
 */
export function AirwayBand({ v }: { v: VersionId }) {
  return (
    <Section tone="night" space="md" labelledBy="band-title">
      <div className={s.band}>
        <div className={s.bandMedia}>
          <DeviceRender
            view="three-quarter"
            alt={`The ${airwayBite.name}, three-quarter view: the anterior stop rising from the base.`}
            sizes="(min-width: 1000px) 82vw, 132vw"
            className={s.nightRender}
          />
        </div>
        <div className={s.bandCopy}>
          <h2 id="band-title" className="t-h1">
            The {airwayBite.shortName}, for dentists
          </h2>
          <p className={`t-lead ${s.bandLead}`}>{airwayBite.summary}</p>
          <p className={s.bandUse}>
            {airwayBite.advantages[0].title}. {airwayBite.advantages[1].body}
          </p>
          <div className={`actions ${s.bandActions}`}>
            <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            <ButtonLink href={href(v, routes.airwayBite)} variant="secondary">
              How it works chairside
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** The appliance guide, framed with its own heading and a link to /appliances. */
export function AppliancesBlock({ v, tone = "white" }: { v: VersionId; tone?: Tone }) {
  return (
    <Section tone={tone} labelledBy="ag-title" id="appliances">
      <SectionHead
        id="ag-title"
        title={applianceGuide.title}
        lead={applianceGuide.intro}
        layout="split"
        actions={
          <ButtonLink href={href(v, routes.appliances)} variant="quiet">
            The APS appliances
          </ButtonLink>
        }
      />
      <Reveal>
        <ApplianceGuide v={v} />
      </Reveal>
    </Section>
  );
}
