import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { href, routes, type SiteId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section, SectionHead } from "@/components/site/Section";
import { airwayBite, applianceGuide, education } from "@/content/aps";
import { sitePages } from "@/content/sites";
import { applianceGroups, lab, practiceSteps, type ApplianceGroup, type PracticeCard, type SiteTarget } from "@/content/solutions";
import s from "./NextSteps.module.css";

type Props = {
  v: SiteId;
  /** The condition this follows; omitted on the index (the general next step). */
  slug?: string;
  /** Band. Mist on a condition page (white related cards follow), white on the index (the mist footer follows). */
  tone?: "mist" | "white";
  /** Drop the top padding when it follows a section of the same tone. */
  flush?: "top";
};

/** The site's own nav label for the appliances page. */
const APPLIANCES_LABEL = sitePages.apsleep.find((p) => p.slug === "appliances")?.label ?? "Appliances";

/**
 * "What to do next": a centred opening in his words, then the way on for the
 * site. APSleep.com: his products chart filtered to the problem (each row to
 * its anchor on /apsleep/appliances), then the lab, sorted for patients and
 * dentists. drdroter.com: his own next steps where he has them, then New
 * Patient Information. No links between the two sites.
 */
export default function NextSteps({ v, slug, tone = "mist", flush }: Props) {
  return (
    <Section tone={tone} space="md" flush={flush} labelledBy="next-title" id="next">
      <SectionHead
        id="next-title"
        layout="center"
        className={s.head}
        title="What to do next"
        lead={education.patientsLine}
        actions={
          v === "apsleep" && !slug ? (
            <Link href={href(v, routes.appliances)} className="lnk">
              {APPLIANCES_LABEL}
              <ArrowRight size={16} className="lnk-icon" />
            </Link>
          ) : undefined
        }
      />
      {v === "apsleep" ? <SleepSteps v={v} groups={slug ? applianceGroups(slug) : []} /> : <PracticeSteps v={v} slug={slug} tone={tone} />}
    </Section>
  );
}

/* ── APSleep.com ─────────────────────────────────────────────────────────── */

/**
 * His products chart, cut to this problem's rows: the same hairline matrix as
 * /apsleep/appliances (global `ag-*` styles), in a card the width of the
 * column. Under it, the lab for each audience as two matching cards.
 */
function SleepSteps({ v, groups }: { v: SiteId; groups: ApplianceGroup[] }) {
  const labLink = (
    <a href={lab.url} target="_blank" rel="noopener" aria-label={`${lab.domain} (opens in a new tab)`} className={`lnk ${s.cardLink}`}>
      {lab.domain}
      <ArrowUpRight size={16} className="lnk-icon" />
    </a>
  );

  return (
    <div className={s.stack}>
      {groups.length > 0 && (
        <section className={s.chart} aria-labelledby="chart-title">
          <h3 className={s.chartTitle} id="chart-title">
            {applianceGuide.title}
          </h3>
          <ChartRows v={v} groups={groups} />
        </section>
      )}

      <ul className={s.grid} data-width={groups.length > 0 ? "wide" : "narrow"}>
        <li className={s.card}>
          <h3 className={s.title}>For patients</h3>
          <div className={s.content}>
            <p className={s.labName}>{lab.name}</p>
            <p className={s.body}>{lab.patientNote}</p>
            {labLink}
          </div>
        </li>
        <li className={s.card}>
          <h3 className={s.title}>For dentists</h3>
          <div className={s.content}>
            <p className={s.labName}>{lab.name}</p>
            <p className={s.body}>{lab.line}</p>
            {labLink}
          </div>
        </li>
      </ul>
    </div>
  );
}

/** Rows of his chart (indication, appliance, description, note); the MAD row links to the Airway Bite, as on /apsleep/appliances. */
function ChartRows({ v, groups }: { v: SiteId; groups: ApplianceGroup[] }) {
  return (
    <div className={`ag-table ${s.chartTable}`} role="table" aria-labelledby="chart-title">
      <div className="ag-head" role="rowgroup">
        <div className="ag-row" role="row">
          <span role="columnheader">Indication</span>
          <span role="columnheader">Appliance</span>
          <span role="columnheader">Description</span>
          <span role="columnheader">Note</span>
        </div>
      </div>
      {groups.map((g) => {
        const airway = g.indication.includes("Airway");
        return (
          <div className="ag-group" role="rowgroup" key={g.anchor} data-airway={airway || undefined}>
            {g.items.map((item, i) => (
              <div className="ag-row" role="row" key={item.name}>
                <span role={i === 0 ? "rowheader" : "cell"} className="ag-ind">
                  {i === 0 && (
                    <>
                      {airway && <i className="airway-line" aria-hidden="true" />}
                      <Link href={href(v, `${routes.appliances}#${g.anchor}`)} className={s.indLink}>
                        {g.indication}
                        <ArrowRight size={18} className={s.indArrow} />
                      </Link>
                    </>
                  )}
                </span>
                <span role="cell" className="ag-name">
                  {item.name}
                </span>
                <span role="cell" className="ag-detail">
                  {item.detail}
                </span>
                <span role="cell" className="ag-note">
                  {i === 0 && g.note}
                  {i === 0 && g.anchor === "airway" && (
                    <Link href={href(v, routes.airwayBite)} className="lnk">
                      {airwayBite.shortName}
                      <ArrowRight size={16} className="lnk-icon" />
                    </Link>
                  )}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ── drdroter.com ────────────────────────────────────────────────────────── */

const pathTo = (to: SiteTarget) => ("condition" in to ? routes.condition(to.condition) : `${routes.library}/${to.resource}`);

/**
 * His next steps as plain cards in one even row (one card sits centred on the
 * reading measure), then New Patient Information.
 */
function PracticeSteps({ v, slug, tone }: { v: SiteId; slug?: string; tone: "mist" | "white" }) {
  const steps = (slug && practiceSteps[slug]) || [];

  return (
    <div className={s.stack}>
      {steps.length > 0 && (
        <ul className={s.steps} data-count={steps.length}>
          {steps.map((c) => (
            <li key={c.heading} className={s.card}>
              <StepCard v={v} c={c} />
            </li>
          ))}
        </ul>
      )}
      {/* The panel takes the band's surface, like the cards above it. */}
      <PracticePanel surface={tone === "mist" ? "white" : "mist"} id="new-patients" />
    </div>
  );
}

function StepCard({ v, c }: { v: SiteId; c: PracticeCard }) {
  return (
    <>
      <h3 className={s.title}>{c.heading}</h3>
      <div className={s.content}>
        {c.sub && <p className={s.labName}>{c.sub}</p>}
        {c.paragraphs?.map((p) => (
          <p key={p} className={s.body}>
            {p}
          </p>
        ))}
        {c.list && (
          <ul className={s.stepList}>
            {c.list.map((item) => (
              <li key={item.text}>
                {item.to ? (
                  <Link href={href(v, pathTo(item.to))} className={s.itemLink}>
                    {item.text}
                    <ArrowRight size={16} className={s.itemArrow} />
                  </Link>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        )}
        {c.items && (
          <ul className={s.items}>
            {c.items.map((i) => (
              <li key={`${i.name}:${i.detail}`}>
                <span className={s.itemName}>{i.name}</span>
                <span className={s.itemDetail}>{i.detail}</span>
              </li>
            ))}
          </ul>
        )}
        {c.link?.to && (
          <Link href={href(v, pathTo(c.link.to))} className={`lnk ${s.cardLink}`}>
            {c.link.label}
            <ArrowRight size={16} className="lnk-icon" />
          </Link>
        )}
        {c.link?.url && (
          <a href={c.link.url} target="_blank" rel="noopener" aria-label={`${c.link.label} (opens in a new tab)`} className={`lnk ${s.cardLink}`}>
            {c.link.label}
            <ArrowUpRight size={16} className="lnk-icon" />
          </a>
        )}
      </div>
    </>
  );
}
