import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChairsideSteps from "@/components/product/ChairsideSteps";
import StepJump from "@/components/product/StepJump";
import AirwayBiteInDetail from "@/components/site/AirwayBiteInDetail";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import HowFarForward from "@/components/site/HowFarForward";
import { ArrowRight } from "@/components/site/icons";
import { href, isSite, siteHas, routes } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import { kitItems } from "@/components/site/specs";
import TutorialPlayer from "@/components/site/TutorialPlayer";
import { airwayBite, applianceGuide, brand, distributor } from "@/content/aps";
import s from "./page.module.css";

export const metadata: Metadata = {
  /* The site template adds "| ArrowPath Sleep", so the short name avoids saying the brand twice. */
  title: airwayBite.shortName,
  description: `${airwayBite.purpose} ${airwayBite.summary}`,
};

const mad = applianceGuide.groups.find((g) => g.indication === "Airway")!.items[0];
const [kitPhoto] = airwayBite.photos;
const [kitUse, kitMade] = airwayBite.kit.notes;

/** Keep a hyphenated product name on one line ("Blu-Mousse"), so a centred lead never breaks inside it. */
function keepTogether(text: string, phrase: string) {
  const i = text.indexOf(phrase);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className={s.nowrap}>{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

/*
 * The Airway Bite page (the kit's QR target; dentists first). Dr. Droter asked
 * for "as many photos as we can have" and for the pictures and video higher up,
 * so the order is: the product, the tutorial and the real photos with his
 * instruction slides, the nine chairside steps, how far forward, the device in
 * detail, the kit and its advantages, and the order block last.
 */
export default async function AirwayBitePage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isSite(v) || !siteHas(v, "airway-bite")) notFound();

  return (
    <>
      <section className={`tone-porcelain ${s.top}`} aria-labelledby="top-title" id="top">
        <div className={`wrap ${s.topGrid}`}>
          <div className={s.topCopy}>
            <h1 className={`t-h1 ${s.topTitle}`} id="top-title">
              <span className="t-quiet">{brand.name}</span> {airwayBite.shortName}
            </h1>
            <p className={`t-lead ${s.topLead}`}>{airwayBite.summary}</p>
            <div className={s.topActions}>
              <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
              <ButtonLink
                href={airwayBite.pdf.href}
                variant="secondary"
                icon="download"
                target="_blank"
                rel="noopener"
                aria-label="One-page protocol (PDF), opens in a new tab"
              >
                One-page protocol (PDF)
              </ButtonLink>
            </div>
            <div className={s.topLinks}>
              <ButtonLink href="#tutorial" variant="quiet" icon="play">
                Watch the tutorial
              </ButtonLink>
              <ButtonLink href="#steps" variant="quiet" icon="down">
                Chairside steps
              </ButtonLink>
            </div>
          </div>

          {/* Desktop: the device render. Phones: a real photograph of the kit (so the photo strip below starts at the try-in there). */}
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
          <div className={s.topPhoto}>
            <Image
              src={kitPhoto.src}
              alt={kitPhoto.alt}
              width={1920}
              height={1080}
              loading="eager"
              sizes="(min-width: 760px) 1px, 100vw"
              quality={90}
              className={s.topPhotoImg}
            />
          </div>
        </div>
      </section>

      {/* The tutorial, then the real photographs in procedure order, then his four instruction slides. */}
      <Section tone="mist" id="see" labelledBy="see-title" className={s.see}>
        <SectionHead id="see-title" title="See it chairside" lead={airwayBite.purpose} layout="center" />
        <TutorialPlayer />

        <ul className={s.photos} aria-label="Chairside photographs">
          {airwayBite.photos.map((p) => (
            <li key={p.src} className={s.photo}>
              <Figure
                src={p.src}
                alt={p.alt}
                width={1920}
                height={1080}
                caption={p.caption}
                variant="inline"
                sizes="(min-width: 1000px) 380px, (min-width: 760px) 46vw, 82vw"
              />
            </li>
          ))}
        </ul>

        <div className={s.slidesHead}>
          <h3 className={s.slidesTitle}>{airwayBite.pdf.label}</h3>
          <ButtonLink
            href={airwayBite.pdf.href}
            variant="secondary"
            size="sm"
            icon="download"
            target="_blank"
            rel="noopener"
            aria-label="Download the printable instructions (PDF), opens in a new tab"
          >
            Download PDF
          </ButtonLink>
        </div>
        <ul className={s.slides} aria-label="Dr. Droter’s instruction slides">
          {airwayBite.phases.map((ph) => (
            <li key={ph.id} className={s.slide}>
              <Figure
                src={ph.image}
                alt={ph.imageAlt}
                width={1600}
                height={800}
                caption={ph.title}
                sizes="(min-width: 1000px) 560px, (min-width: 640px) 46vw, 82vw"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* The chairside protocol: what to have ready, the map of the nine steps, then each phase. */}
      <Section id="steps" labelledBy="steps-title">
        <SectionHead id="steps-title" title="Instructions for use" lead={airwayBite.prerequisite} layout="center" />

        <div className={s.before}>
          <div className={s.kitStill}>
            <Image
              src="/aps/stills/kit-clean.webp"
              alt={`The ${airwayBite.kitName} laid out: a pencil, the Airway Bite and the APS card ruler.`}
              fill
              sizes="(min-width: 900px) 560px, (min-width: 640px) 100vw, 150vw"
              quality={90}
              className={s.kitImg}
            />
          </div>
          <section aria-labelledby="kit-title">
            <h3 className={s.colTitle} id="kit-title">
              In the kit
            </h3>
            <ul className={s.list}>
              {kitItems.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
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
        </div>

        <StepJump contained className={s.map} />
        <div className={s.chairside}>
          <ChairsideSteps />
        </div>
      </Section>

      {/* His narration question, and his measure-and-mark line as its intro. */}
      <HowFarForward lead={airwayBite.summaryLong[0]} />

      {/* The device itself; his anterior-stop slide line introduces it. No order button here:
          the order band closes the page two sections below. */}
      <AirwayBiteInDetail lead={keepTogether(airwayBite.phases[0].caption, "Blu-Mousse")} showOrder={false} />

      {/* The kit's name and label line, then his advantages, in the order he gave them. */}
      <Section labelledBy="adv-title">
        <SectionHead id="adv-title" title={airwayBite.kitName} lead={`${kitUse}. ${kitMade}.`} layout="center" />
        <div className={s.advGrid}>
          <div className={s.advStill}>
            <Image
              src="/aps/stills/done-clean.webp"
              alt="Front view of the Airway Bite in place between the upper and lower front teeth."
              fill
              sizes="(min-width: 1000px) 830px, (min-width: 640px) 100vw, 176vw"
              quality={90}
              className={s.advImg}
            />
          </div>
          {/* Each row is his sentence; a second line only where he gave one. */}
          <ul className={s.advList}>
            {airwayBite.advantages.map((a) => (
              <li className={s.advRow} key={a.title}>
                <p className={s.advTitle}>{a.title}</p>
                {a.body && <p className={s.advBody}>{a.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* The order close opens like every other section: centred heading, his kit label line and the
          one action; then the device itself. */}
      <Section tone="night" id="order" labelledBy="order-title">
        <SectionHead
          id="order-title"
          /* Keep the distributor's name on one line: "Order from: / Great Lakes Dental". */
          title={distributor.note.replace(distributor.name, distributor.name.replace(/ /g, "\u00a0"))}
          /* His label line; each "(1)" stays with its item when the centred lead wraps. */
          lead={airwayBite.kit.line.replace(/\(1\) /g, "(1)\u00a0")}
          actions={<ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>}
          layout="center"
        />
        <div className={s.orderMedia}>
          <Image
            src="/aps/renders/device-airway-bite-side.png"
            alt={`The ${airwayBite.name}, side view`}
            width={2000}
            height={2000}
            sizes="(min-width: 640px) 650px, 112vw"
            quality={90}
            className={s.orderRender}
          />
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
