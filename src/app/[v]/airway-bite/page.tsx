import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StepJump from "@/components/product/StepJump";
import AirwayBiteInDetail from "@/components/site/AirwayBiteInDetail";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { ArrowRight } from "@/components/site/icons";
import { href, isVersion, routes } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import SpecRows from "@/components/site/SpecRows";
import { kitItems } from "@/components/site/specs";
import TutorialPlayer from "@/components/site/TutorialPlayer";
import { airwayBite, applianceGuide, brand, distributor } from "@/content/aps";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: airwayBite.name,
  description: `${airwayBite.purpose} ${airwayBite.summary}`,
};

const kitNotes = airwayBite.kit.notes.map((n) => n.replace("Single Patient Use Only", "Single patient use only"));
const mad = applianceGuide.groups.find((g) => g.indication === "Airway")!.items[0];
/** His slide heading over the Class 2 / Class 3 rows ("To Accommodate Different Occlusions"). */
const fit = airwayBite.phases.find((ph) => ph.id === "fit")!;

export default async function AirwayBitePage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  return (
    <>
      {/* The jump bar sticks (on phones) through this wrapper, then hands over to the player's own. */}
      <div className={s.lead}>
        <section className={`tone-porcelain ${s.top}`} aria-labelledby="top-title" id="top">
          <div className={`wrap ${s.topGrid}`}>
            <div className={s.topCopy}>
              <h1 className={`t-h1 ${s.topTitle}`} id="top-title">
                <span className="t-quiet">{brand.name}</span> {airwayBite.shortName}
              </h1>
              <p className={`t-lead ${s.topLead}`}>{airwayBite.summary}</p>
              <div className={s.topActions}>
                <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
                <ButtonLink href={airwayBite.pdf.href} variant="secondary" icon="download" target="_blank" rel="noopener">
                  One-page protocol (PDF)
                  <span className="sr-only"> (opens in a new tab)</span>
                </ButtonLink>
                <ButtonLink href="#tutorial" variant="quiet" icon="play" className={s.topWatch}>
                  Watch the tutorial
                </ButtonLink>
              </div>
            </div>
            <div className={s.topMedia}>
              <Image
                src="/aps/renders/device-airway-bite-three-quarter.png"
                alt={`The ${airwayBite.name}, three-quarter view`}
                width={2000}
                height={2000}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 760px) 520px, 1px"
                quality={90}
                className={s.topRender}
              />
            </div>
          </div>
        </section>

        <StepJump />

        <Section tone="mist" space="md" id="before" labelledBy="before-title">
          <div className={s.beforeHead}>
            <h2 className="t-h2" id="before-title">
              Before you begin
            </h2>
            <p className={s.prereq}>{airwayBite.prerequisite}</p>
          </div>

          <div className={s.beforeGrid}>
            <section aria-labelledby="kit-title">
              <h3 className={s.colTitle} id="kit-title">
                In the kit
              </h3>
              <div className={s.kitBody}>
                <div className={s.kitStill}>
                  <Image
                    src="/aps/stills/kit-clean.webp"
                    alt={`The ${airwayBite.kitName} laid out: a pencil, the Airway Bite and the APS card ruler.`}
                    fill
                    sizes="(min-width: 900px) 560px, 70vw"
                    quality={90}
                    className={s.kitImg}
                  />
                </div>
                <div>
                  <ul className={s.list}>
                    {kitItems.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                  <p className={s.colNote}>{kitNotes.join(" · ")}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="need-title">
              <h3 className={s.colTitle} id="need-title">
                You will need
              </h3>
              <ul className={s.list}>
                {airwayBite.youWillNeed.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="occ-title">
              <h3 className={s.colTitle} id="occ-title">
                {fit.title}
              </h3>
              <SpecRows className={s.occ} rows={airwayBite.occlusion.map((o) => ({ label: o.label, value: o.body }))} />
            </section>
          </div>
        </Section>
      </div>

      <Section id="protocol" labelledBy="protocol-title" className={s.protocol}>
        <SectionHead id="protocol-title" title="Instructions for use" layout="split" className={s.protocolHead} />
        <TutorialPlayer withSteps />
      </Section>

      <AirwayBiteInDetail />

      {/* The kit's name from its label over his purpose line; the advantages are his own list. */}
      <Section as="div">
        <section className={s.advGrid} aria-labelledby="adv-title">
          <header className={s.advHead}>
            <h2 className="t-h2" id="adv-title">
              {airwayBite.kitName}
            </h2>
            <p className={`t-lead ${s.advLead}`}>{airwayBite.purpose}</p>
            <div className={s.advStill}>
              <Image
                src="/aps/stills/done-clean.webp"
                alt="Front view of the Airway Bite in place between the upper and lower front teeth."
                width={1920}
                height={816}
                sizes="(min-width: 1000px) 560px, 100vw"
                quality={90}
                className={s.advImg}
              />
            </div>
          </header>
          {/* Each row is his sentence; a second line only where he gave one. */}
          <ul className={s.advList}>
            {airwayBite.advantages.map((a) => (
              <li className={s.advRow} key={a.title}>
                <p className={s.advTitle}>{a.title}</p>
                {a.body && <p className={s.advBody}>{a.body}</p>}
              </li>
            ))}
          </ul>
        </section>
      </Section>

      <Section tone="mist" labelledBy="ifu-title">
        <SectionHead
          id="ifu-title"
          title={airwayBite.pdf.label}
          layout="split"
          actions={
            <ButtonLink href={airwayBite.pdf.href} variant="secondary" icon="download" target="_blank" rel="noopener">
              One-page protocol (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          }
        />
        <ul className={`grid-2 ${s.ifu}`}>
          {airwayBite.phases.map((ph) => (
            <li key={ph.id}>
              <Figure
                src={ph.image}
                alt={ph.imageAlt}
                width={1600}
                height={800}
                caption={ph.title}
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="night" labelledBy="order-title" className={s.order}>
        <div className={s.orderGrid}>
          <div>
            <h2 className={`t-h2 ${s.orderTitle}`} id="order-title">
              {/* Keep the distributor's name on one line: "Order from: / Great Lakes Dental". */}
              {distributor.note.replace(distributor.name, distributor.name.replace(/ /g, "\u00a0"))}
            </h2>
            <p className={`t-lead ${s.orderLead}`}>{airwayBite.kit.line}</p>
            <div className={`actions ${s.orderActions}`}>
              <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            </div>
          </div>
          <div className={s.orderMedia}>
            <Image
              src="/aps/renders/device-airway-bite-side.png"
              alt={`The ${airwayBite.name}, side view`}
              width={2000}
              height={2000}
              sizes="(min-width: 900px) 620px, 120vw"
              quality={90}
              className={s.orderRender}
            />
          </div>
        </div>

        <div className={s.next}>
          <div>
            <p className={s.nextTitle}>
              <i className="airway-line" aria-hidden="true" />
              {mad.name}
            </p>
            <p className={s.nextDetail}>{mad.detail}</p>
          </div>
          <div className={s.nextBody}>
            <p>{airwayBite.summaryLong[1]}</p>
            <Link href={href(v, routes.appliances)} className="lnk">
              {applianceGuide.title}
              <ArrowRight size={16} className="lnk-icon" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
