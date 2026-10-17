import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import AnteriorStopModel from "@/components/product/AnteriorStopModel";
import ApplianceGuide from "@/components/site/ApplianceGuide";
import { ButtonLink } from "@/components/site/Button";
import { ArrowDown, ArrowRight } from "@/components/site/icons";
import { href, isSite, routes, siteHas, type SiteId } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import { airwayBite, applianceGuide, distributor } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { siteConditions } from "@/content/sites";
import { conditionGuides } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Appliances, by indication",
  description:
    "The APS appliances by indication: clenching, grinding, grinding with airway, and airway. Dentists order them from Living Tree Dental Lab.",
};

type Group = (typeof applianceGuide.groups)[number];
type Item = Group["items"][number];

const group = (id: Group["id"]) => applianceGuide.groups.find((g) => g.id === id)!;
const clenching = group("clenching");
const grinding = group("grinding");
const grindingAirway = group("grinding-airway");
const airway = group("airway");
const tempStop = clenching.items.find((i) => i.name === "APS Temp Anterior Stop")!;
/** His narration over the airway animation: the leads of the two airway indications. */
const [whileYouSleep, jawForward] = airwayBite.airwayStory;

type Thumb = { src: string; alt: string; width: number; height: number; fit?: "contain" };

/**
 * Photographs of each appliance: crops of his APS products slide
 * (drdroter.com/seminar-links) and his Airway Bite instruction slide 4, and the
 * studio render of the Temp Anterior Stop model. Provenance in
 * public/aps/appliances/README-provenance.txt. Shown at 160px or less, so every
 * crop is at least 2× its painted size.
 */
const THUMBS: Record<string, Thumb> = {
  "APS D-PAS": {
    src: "/aps/appliances/d-pas.webp",
    alt: "The APS D-PAS, a clear palatal appliance.",
    width: 508,
    height: 339,
  },
  "APS Temp Anterior Stop": {
    src: "/aps/appliances/temp-anterior-stop.webp",
    alt: "Studio render of the APS Temp Anterior Stop.",
    width: 1482,
    height: 964,
  },
  "APS Brux-PAS": {
    src: "/aps/appliances/brux-pas.webp",
    alt: "The APS Brux-PAS in place in the mouth.",
    width: 381,
    height: 249,
  },
  "Lower Hard CR Orthotic": {
    src: "/aps/appliances/lower-hard-cr-orthotic.webp",
    alt: "The Lower Hard CR Orthotic, a clear full-coverage lower appliance.",
    width: 510,
    height: 320,
  },
  MAD: {
    src: "/aps/appliances/mad.webp",
    alt: "A final mandibular advancement device.",
    width: 306,
    height: 198,
    fit: "contain",
  },
};
const airwayBiteThumb: Thumb = {
  src: "/aps/appliances/airway-bite-in-mouth.webp",
  alt: "The Airway Bite in place, the jaw held stable in forward position.",
  width: 331,
  height: 248,
};

function ThumbImage({ t }: { t: Thumb }) {
  return (
    <div className={s.thumb} data-fit={t.fit}>
      <Image src={t.src} alt={t.alt} width={t.width} height={t.height} sizes="(min-width: 720px) 160px, 112px" quality={90} />
    </div>
  );
}

/** One appliance as a plain card: its photograph, name and his one line. */
function ApplianceCard({ item }: { item: Item }) {
  const thumb = THUMBS[item.name];
  return (
    <li className={s.card}>
      {thumb && <ThumbImage t={thumb} />}
      <div className={s.cardBody}>
        <h3 className={s.cardTitle}>{item.name}</h3>
        {item.detail && <p className={s.cardLine}>{item.detail}</p>}
        {item.more && <p className={s.cardMore}>{item.more}</p>}
      </div>
    </li>
  );
}

/** The Airway Bite records the bite the MAD is built on; the whole card opens its page. */
function AirwayBiteCard({ v }: { v: SiteId }) {
  return (
    <li className={`${s.card} ${s.linkCard}`}>
      <ThumbImage t={airwayBiteThumb} />
      <div className={s.cardBody}>
        <h3 className={s.cardTitle}>
          <Link href={href(v, routes.airwayBite)} className={s.cardLink}>
            {airwayBite.name}
          </Link>
        </h3>
        <p className={s.cardLine}>{airwayBite.purpose}</p>
        <p className={s.cardFoot}>
          <span>{distributor.note}</span>
          <ArrowRight size={18} className={s.cardArrow} />
        </p>
      </div>
    </li>
  );
}

/** Back to the sleep problems this indication answers, and down to ordering. */
function Answers({ v, g }: { v: SiteId; g: Group }) {
  const guides = g.conditions
    .filter((slug) => siteConditions[v].includes(slug))
    .map((slug) => conditionGuides.find((c) => c.slug === slug))
    .filter((c) => c !== undefined);
  return (
    <div className={s.answers}>
      {guides.length > 0 && (
        <div className={s.answerGroup}>
          <span className={s.answerLabel}>{guides.length > 1 ? "Sleep problems" : "Sleep problem"}</span>
          {guides.map((c) => (
            <Link key={c.slug} href={href(v, routes.condition(c.slug))} className="lnk">
              {c.title}
              <ArrowRight size={16} className="lnk-icon" />
            </Link>
          ))}
        </div>
      )}
      <a href="#ordering" className={`lnk ${s.toOrder}`}>
        Where to order
        <ArrowDown size={16} className="lnk-icon" />
      </a>
    </div>
  );
}

/**
 * One indication: a centred heading and his line, then the picture beside its
 * appliances (or, with no picture, the appliances as an even pair, or one card
 * on the same measure), then the links back to the sleep problem. His chart's
 * note for the indication closes the card stack as its last row. `id` is the
 * anchor other pages link to.
 */
function Indication({
  v,
  g,
  lead = g.lead,
  media,
  extra,
}: {
  v: SiteId;
  g: Group;
  lead?: string;
  media?: ReactNode;
  extra?: ReactNode;
}) {
  const count = g.items.length + (extra ? 1 : 0);
  const layout = media ? s.cards : `${s.cards} ${count > 1 ? s.cardsPair : s.cardsSolo}`;
  return (
    <section id={g.id} aria-labelledby={`${g.id}-title`} className={s.ind}>
      <SectionHead id={`${g.id}-title`} title={g.indication} lead={lead} layout="center" />
      <div className={media ? s.indGrid : undefined}>
        {media && <div className={s.media}>{media}</div>}
        <div className={s.stack}>
          <ul className={layout}>
            {g.items.map((item) => (
              <ApplianceCard key={item.name} item={item} />
            ))}
            {extra}
          </ul>
          {g.note && (
            <p className={s.note}>
              <span className={s.noteLabel}>Note</span>
              <span>{g.note}</span>
            </p>
          )}
        </div>
      </div>
      <Answers v={v} g={g} />
    </section>
  );
}

/** A frame from his tutorial animation (1920×816 on porcelain). */
function Still({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={s.still}>
      <Image src={src} alt={alt} width={1920} height={816} sizes="(min-width: 1000px) 680px, 100vw" quality={90} className={s.stillImg} />
    </div>
  );
}

export default async function AppliancesPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isSite(v) || !siteHas(v, "appliances")) notFound();

  return (
    <>
      {/* His chart, with the four indications as the way in. */}
      <Section labelledBy="appl-title" className={s.intro}>
        <SectionHead
          as="h1"
          id="appl-title"
          title={applianceGuide.title}
          layout="center"
          actions={
            <nav aria-label="Indications on this page" className={s.index}>
              <ul>
                {applianceGuide.groups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className={s.indexLink}>
                      {g.indication}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          }
        />
        <ApplianceGuide v={v} showOrder={false} linkTo="section" />
      </Section>

      <Section tone="porcelain" as="div">
        <Indication
          v={v}
          g={clenching}
          media={
            <div className={s.modelCrop}>
              <AnteriorStopModel name={tempStop.name} />
            </div>
          }
        />
      </Section>

      <Section as="div">
        <Indication v={v} g={grinding} />
      </Section>

      {/* The airway indications share the night field. Lat-Brux has no photograph
          or description in his chart yet, so its indication is the short one: his
          line, the appliance, the way back. The airway still is shown once, below. */}
      <Section tone="night" as="div">
        <Indication v={v} g={grindingAirway} lead={whileYouSleep.body} />
        <Indication
          v={v}
          g={airway}
          lead={jawForward.body.replace(/^But if/, "If")}
          media={
            <Still
              src="/aps/stills/intro-airway-open-clean.webp"
              alt="The same cross-section with the lower jaw held forward: the tongue comes forward with it and the airway behind it is open."
            />
          }
          extra={siteHas(v, "airway-bite") ? <AirwayBiteCard v={v} /> : undefined}
        />
      </Section>

      {/* Ordering, sorted: dentists order from the lab; patients ask their dentist. */}
      <Section id="ordering" labelledBy="order-title" className={s.close}>
        <SectionHead id="order-title" title={livingTree.name} lead="ArrowPath Sleep Orthotics" layout="center" />
        <ul className={s.sort}>
          <li className={s.sortCard}>
            <h3 className={s.cardTitle}>Dentists</h3>
            <ButtonLink href={livingTree.url}>Order from {livingTree.name}</ButtonLink>
          </li>
          <li className={s.sortCard}>
            <h3 className={s.cardTitle}>Patients</h3>
            <p className={s.sortLine}>{livingTree.patientNote}</p>
          </li>
        </ul>
      </Section>
    </>
  );
}
