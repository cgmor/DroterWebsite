import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnteriorStopModel from "@/components/product/AnteriorStopModel";
import ApplianceGuide from "@/components/site/ApplianceGuide";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { href, isVersion, routes } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import { airwayBite, applianceGuide, distributor } from "@/content/aps";
import { conditionGuides, literature, understanding } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Appliances, by indication",
  description: `${applianceGuide.intro} ${applianceGuide.subtitle}`,
};

const group = (indication: string) => applianceGuide.groups.find((g) => g.indication === indication)!;
const clenching = group("Clenching");
const grinding = group("Grinding");
const grindingAirway = group("Grinding + Airway");
const airway = group("Airway");

const clenchGuide = conditionGuides.find((g) => g.slug === "clenching");
const grindGuide = conditionGuides.find((g) => g.slug === "sleep-grinding");
const grindFaq = understanding.faq.find((f) => f.q.startsWith("I grind my teeth"));
const wornDentition = literature.find((r) => r.title.startsWith("The worn dentition"));
const tempStop = clenching.items.find((i) => i.name === "APS Temp Anterior Stop")!;
const capture = airwayBite.phases.find((p) => p.id === "capture")!;
const [whileYouSleep, jawForward, howFar] = airwayBite.airwayStory;

const INDEX = [
  { id: "clenching", label: clenching.indication },
  { id: "grinding", label: grinding.indication },
  { id: "grinding-airway", label: grindingAirway.indication },
  { id: "airway", label: airway.indication },
];

/** Appliance name over its one-line description, as hairline rows. */
function Items({ items }: { items: { name: string; detail: string }[] }) {
  return (
    <ul className={s.items}>
      {items.map((i) => (
        <li key={i.name}>
          <span className={s.itemName}>{i.name}</span>
          <span className={s.itemDetail}>{i.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AppliancesPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  return (
    <>
      <Section labelledBy="appl-title" className={s.intro}>
        <SectionHead
          as="h1"
          id="appl-title"
          title={applianceGuide.title}
          lead={applianceGuide.intro}
          layout="split"
          actions={
            <>
              <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            </>
          }
        />
        <div className={s.matrixHead}>
          <p className={s.subtitle}>{applianceGuide.subtitle}</p>
          <nav aria-label="Indications on this page" className={s.index}>
            <ul>
              {INDEX.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`} className={s.indexLink}>
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ApplianceGuide v={v} showOrder={false} />
      </Section>

      {/* Clenching: the one appliance with a 3D model. */}
      <Section tone="porcelain" id="clenching" labelledBy="clenching-title">
        <div className={s.clenchGrid}>
          <div className={s.clenchModel}>
            <AnteriorStopModel name={tempStop.name} />
          </div>
          <div className={s.clenchCopy}>
            <h2 className="t-h1" id="clenching-title">
              {clenching.indication}
            </h2>
            {clenchGuide?.full[0]?.paragraphs?.[0] && <p className={`t-lead ${s.pattern}`}>{clenchGuide.full[0].paragraphs[0]}</p>}
            <Items items={clenching.items} />
            {clenching.note && <p className={`note ${s.indNote}`}>{clenching.note}</p>}
            {clenchGuide && (
              <Link href={href(v, routes.condition(clenchGuide.slug))} className={`lnk ${s.guideLink}`}>
                The patient guide: {clenchGuide.title.toLowerCase()}
                <ArrowRight size={16} className="lnk-icon" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Grinding: typographic; the pattern, the two appliances and his answer on stress. */}
      <Section id="grinding" labelledBy="grinding-title">
        <div className={s.grindGrid}>
          <header>
            <h2 className="t-h1" id="grinding-title">
              {grinding.indication}
            </h2>
            {grindGuide?.full[0]?.paragraphs?.[0] && <p className={`t-lead ${s.pattern}`}>{grindGuide.full[0].paragraphs[0]}</p>}
          </header>
          <div className={s.grindBody}>
            <Items items={grinding.items} />
            {grindFaq && (
              <div className={s.qa}>
                <h3 className={s.qaQ}>{grindFaq.q}</h3>
                <p className={s.qaA}>{grindFaq.a}</p>
              </div>
            )}
            <div className={s.grindLinks}>
              {wornDentition?.href && (
                <a href={wornDentition.href} target="_blank" rel="noopener" className="lnk">
                  Reading: {wornDentition.title.split(" — ")[0]}
                  <ArrowUpRight size={16} className="lnk-icon" />
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              )}
              {grindGuide && (
                <Link href={href(v, routes.condition(grindGuide.slug))} className="lnk">
                  The patient guide: {grindGuide.title.toLowerCase()}
                  <ArrowRight size={16} className="lnk-icon" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* The airway indications share the night field. */}
      <Section tone="night" as="div" className={s.night}>
        <section id="grinding-airway" aria-labelledby="ga-title" className={s.gaGrid}>
          <div className={s.gaCopy}>
            <h2 className={`t-h1 ${s.airTitle}`} id="ga-title">
              <i className="airway-line" aria-hidden="true" />
              {grindingAirway.indication}
            </h2>
            <Items items={grindingAirway.items} />
          </div>
          <figure className={s.still}>
            <div className={s.stillFrame}>
              <Image
                src="/aps/stills/intro-airway-narrow-clean.webp"
                alt="Cross-section of the head during sleep: the tongue and lower jaw sit back and the airway behind them is narrow."
                width={1920}
                height={816}
                sizes="(min-width: 900px) 50vw, 100vw"
                className={s.stillImg}
              />
            </div>
            <figcaption className={s.stillCap}>
              <span className={s.stillCapTitle}>{whileYouSleep.title}.</span> {whileYouSleep.body}
            </figcaption>
          </figure>
        </section>

        <section id="airway" aria-labelledby="airway-title" className={s.airway}>
          <div className={s.airHead}>
            <h2 className={`t-h1 ${s.airTitle}`} id="airway-title">
              <i className="airway-line" aria-hidden="true" />
              {airway.indication}
            </h2>
            <div className={s.airHeadBody}>
              <Items items={airway.items} />
            </div>
          </div>

          <figure className={`${s.still} ${s.stillWide}`}>
            <div className={s.stillFrame}>
              <Image
                src="/aps/stills/intro-airway-open-clean.webp"
                alt="The same cross-section with the lower jaw held forward: the tongue comes forward with it and the airway behind it is open."
                width={1920}
                height={816}
                sizes="(min-width: 1320px) 1320px, 100vw"
                className={s.stillImg}
              />
            </div>
            <figcaption className={s.stillCap}>
              <span className={s.stillCapTitle}>{jawForward.title}.</span> {jawForward.body} <span className={s.stillCapTitle}>{howFar.title}</span>{" "}
              {howFar.body}
            </figcaption>
          </figure>

          <div className={s.relation}>
            <h3 className={s.relTitle}>{airwayBite.summary}</h3>
            <div className={s.relGrid}>
              <figure className={s.relDevice}>
                <div className={s.relDeviceField}>
                  <Image
                    src="/aps/renders/device-airway-bite-three-quarter.png"
                    alt={`The ${airwayBite.name}, three-quarter view`}
                    width={2000}
                    height={2000}
                    sizes="(min-width: 900px) 34vw, 90vw"
                    className={s.relRender}
                  />
                </div>
                <figcaption className={s.stillCap}>The {airwayBite.shortName}: the registration, taken chairside.</figcaption>
              </figure>
              <Figure
                src={capture.image}
                alt={capture.imageAlt}
                width={1600}
                height={800}
                caption={`From the instructions for use: ${capture.title.toLowerCase()}.`}
                sizes="(min-width: 900px) 56vw, 100vw"
                className={s.relFig}
              />
            </div>
            <div className={s.relFoot}>
              <p>{airwayBite.summaryLong[1]}</p>
              <ButtonLink href={href(v, routes.airwayBite)} variant="secondary" icon="arrow">
                The {airwayBite.shortName} protocol
              </ButtonLink>
            </div>
          </div>
        </section>
      </Section>

      <Section space="md" labelledBy="order-title" className={s.close}>
        <div className={s.closeGrid}>
          <h2 className="t-h2" id="order-title">
            {distributor.note}
          </h2>
          <div className={s.closeActions}>
            <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            <ButtonLink href={href(v, routes.airwayBite)} variant="quiet">
              The {airwayBite.shortName}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
