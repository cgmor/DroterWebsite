/**
 * "What to do next" on each condition page, per site (Dr. Droter, Oct 14 call:
 * each condition leads to what to do). Nothing here is new writing: every line
 * is pulled from aps.ts, tmd.ts, labs.ts and resources.ts, so it stays his
 * text, verbatim, and stays in step with those files.
 *
 *  - APSleep.com: the rows of his products chart for each sleep problem (each
 *    links to its anchor on /apsleep/appliances), then the lab route: dentists
 *    order from Living Tree Dental Lab; "Patients would have to ask their
 *    dentist to use that lab." The chart's MAD row links to the Airway Bite,
 *    as it does on /apsleep/appliances ("The airway bite is kind of a thing a
 *    dentist can take in order").
 *    For clenching and sleep grinding it adds his supplement note in place
 *    (the handout itself is a drdroter.com page).
 *  - drdroter.com: his own next steps where he has them (the approach lists
 *    from his brochure, linked to the page on the same site that says more;
 *    for clenching and sleep grinding the guards in his chart's row, then
 *    Living Tree Dental Lab, "a specific guard from Nate"; his occlusal
 *    adjustment sentences for an uneven bite; his handouts as the resources),
 *    then his practice (New Patient Information) for every condition. No
 *    links to APSleep.com.
 */
import { applianceGuide } from "./aps";
import { livingTree } from "./labs";
import { hotColdHot, supplements } from "./resources";
import { conditionGuides, type ConditionGuide } from "./tmd";

/* ───────────────────────── APSleep: appliances + lab ───────────────────────── */

export type ApplianceGroup = {
  indication: string;
  /** Anchor on /apsleep/appliances (his chart row's id). */
  anchor: (typeof applianceGuide.groups)[number]["id"];
  items: { name: string; detail: string }[];
  note?: string;
};

/**
 * The rows of his products chart that answer a condition, in the chart's own
 * order. The single source is `applianceGuide.groups[].conditions` in aps.ts,
 * which /apsleep/appliances reads too: change a row's conditions there and the
 * home, /conditions and every condition page follow.
 */
export function applianceGroups(slug: string): ApplianceGroup[] {
  return applianceGuide.groups
    .filter((g) => g.conditions.includes(slug))
    .map((g) => ({ indication: g.indication, anchor: g.id, items: g.items, note: g.note }));
}

/** The appliance names for a condition, in the chart's order (for a card's foot line, or the home's "Appliances"). */
export function appliancesFor(slug: string): string[] {
  return applianceGroups(slug).flatMap((g) => g.items.map((i) => i.name));
}

/** The appliance names as one line ("APS Brux-PAS · Lower Hard CR Orthotic · APS Lat-Brux"), or undefined when there are none. */
export function applianceNames(slug: string): string | undefined {
  const names = appliancesFor(slug);
  return names.length ? names.join(" · ") : undefined;
}

/** The lab, for both audiences. */
export const lab = {
  name: livingTree.name,
  url: livingTree.url,
  /** The address as shown on a link. */
  domain: livingTree.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  /** His APS products slide (drdroter.com/seminar-links). */
  line: "3D Printed Orthotics",
  /** His words on the Oct 14 call. */
  patientNote: livingTree.patientNote,
};

/* ───────────────────────── drdroter.com: his next steps ───────────────────────── */

/** A page on the same site: a condition guide, or one of his handouts (/library/<slug>). */
export type SiteTarget = { condition: string } | { resource: string };

export type PracticeCard = {
  heading: string;
  /** A line under the heading (what the lab makes). */
  sub?: string;
  paragraphs?: string[];
  /** His list; an item links to the page on the same site that says more about it. */
  list?: { text: string; to?: SiteTarget }[];
  /** Named items with his line under each (a product on his handout, and his note for it). */
  items?: { name: string; detail: string }[];
  /** The way on: a page on the same site, or the lab's own site. */
  link?: { label: string; to?: SiteTarget; url?: string };
};

const guide = (slug: string) => conditionGuides.find((g) => g.slug === slug);
const sentences = (p: string) => p.split(/(?<=\.)\s+/);

/**
 * Where an item of his approach lists says more on drdroter.com: the occlusal
 * adjustment on his Uncomfortable Bite page, magnesium and vitamin C on his
 * supplement handout. Matched on the item's own words (case aside), so a
 * longer item that only starts the same way is left unlinked.
 */
const itemTargets: [RegExp, SiteTarget][] = [
  [/^occlusal adjust(ment)?$/i, { condition: "uncomfortable-bite" }],
  [/^magnesium and vitamin c\b/i, { resource: supplements.slug }],
];

/** His brochure's approach list for a guide, under the guide's own heading, each item linked where the site says more. */
function approach(slug: string): PracticeCard | undefined {
  const sec = guide(slug)?.full.find((s) => s.heading === "Approach" && s.list?.length);
  if (!sec?.list) return undefined;
  return {
    heading: sec.heading,
    list: sec.list.map((text) => ({ text, to: itemTargets.find(([re]) => re.test(text))?.[1] })),
  };
}

/**
 * His occlusal adjustment point (drdroter.com/uncomfortable-bite-occlusion,
 * verbatim): the adjustment itself, and the dentist who analyses the bite with
 * mounted study models "and or a Tek Scan".
 */
function occlusalAdjustment(): PracticeCard | undefined {
  const ub = guide("uncomfortable-bite");
  const sec = ub?.full.find((s) => s.heading.startsWith("Occlusal Adjustment"));
  const fix = sec?.paragraphs?.flatMap(sentences).find((s) => s.startsWith("Most uneven bites"));
  const tekScan = ub?.full.flatMap((s) => s.paragraphs ?? []).find((p) => p.includes("Tek Scan"));
  const paragraphs = [fix, tekScan].filter((p): p is string => Boolean(p));
  return sec && paragraphs.length ? { heading: sec.heading, paragraphs } : undefined;
}

/**
 * The lab that makes the guard he named for sleep grinding ("a specific guard
 * from Nate… Living Tree Dental"). Which guard is an open question for him, so
 * none is named here.
 */
const labCard: PracticeCard = {
  heading: lab.name,
  sub: lab.line,
  paragraphs: [lab.patientNote],
  link: { label: lab.domain, url: lab.url },
};

/**
 * His supplement handout, for clenching and sleep grinding: the product whose
 * note names them ("Take 1000mg before sleep if grind or clench teeth."), under
 * his heading for the handout ("Vitamin Supplements") and his link text for it.
 */
const supplementCard: PracticeCard = {
  heading: supplements.label,
  items: supplements.groups
    .flatMap((g) => g.products)
    .flatMap((p) => p.notes.filter((n) => /clench|grind/i.test(n)).map((detail) => ({ name: p.name, detail }))),
  link: { label: supplements.title, to: { resource: supplements.slug } },
};

/**
 * The guards to try ("a link going from clenching… leading you to different
 * guards you can try"): one row of his products chart, under the chart's own
 * question, each appliance with his line for it (aps.ts `applianceGuide`). The
 * row's note is left off: its source (the 2021 apsleep.com products page) is
 * not in his corpus, and the approach list beside it already gives his words
 * for it ("D-PAS night guard (if inhibition)"). On drdroter.com it links
 * nowhere, as the chart's page is on the other site.
 */
function guardsCard(id: (typeof applianceGuide.groups)[number]["id"]): PracticeCard | undefined {
  const g = applianceGuide.groups.find((x) => x.id === id);
  if (!g) return undefined;
  return {
    heading: applianceGuide.title,
    items: g.items.filter((i) => i.detail).map((i) => ({ name: i.name, detail: i.detail })),
  };
}

/**
 * APSleep.com's resources step for clenching and sleep grinding: the same
 * products as drdroter.com's supplement card (his note naming grinding and
 * clenching), shown in place, with no link to the other site.
 */
export function sleepSupplements(slug: string): PracticeCard | undefined {
  if (slug !== "clenching" && slug !== "sleep-grinding") return undefined;
  return supplementCard.items?.length ? { heading: supplementCard.heading, items: supplementCard.items } : undefined;
}

/** His Hot, Cold, Hot handout, for sore neck muscles: its title, his line for it, his heading word on it. */
const hotColdHotCard: PracticeCard = {
  heading: hotColdHot.title,
  paragraphs: [hotColdHot.line],
  link: { label: hotColdHot.label, to: { resource: hotColdHot.slug } },
};

const adjustment = occlusalAdjustment();

const cards = (...list: (PracticeCard | undefined)[]) => list.filter((c): c is PracticeCard => Boolean(c));

/** Keyed by condition slug. Conditions not listed lead to his practice alone. */
export const practiceSteps: Record<string, PracticeCard[]> = {
  clenching: cards(approach("clenching"), guardsCard("clenching"), labCard, supplementCard),
  "sleep-grinding": cards(approach("sleep-grinding"), guardsCard("grinding"), labCard, supplementCard),
  "occlusal-muscle-disharmony": cards(
    adjustment && { ...adjustment, link: { label: guide("uncomfortable-bite")?.title ?? "", to: { condition: "uncomfortable-bite" } } },
  ),
  "uncomfortable-bite": cards(adjustment),
  "neck-pain": cards(hotColdHotCard),
};

/* ───────────────────────── Related conditions ───────────────────────── */

/**
 * The guides shown under "Related conditions" where his own pages connect
 * them (a navigation choice, no text): an uneven bite with the muscles it
 * tires, the bite changes and the neck ("If your teeth are hitting unevenly…
 * this can cause pain and dysfunction in the head and neck area"); his three
 * causes of anterior open bite (TMJ bone loss, tongue bracing a damaged
 * neck); neck splinting with the TMJ and the bite. Guides not listed (and any gap) fall back to the same category, then
 * the site's order. Only guides the site carries are shown.
 */
const relatedPicks: Record<string, string[]> = {
  clenching: ["sleep-grinding", "occlusal-muscle-disharmony", "uncomfortable-bite"],
  "sleep-grinding": ["clenching", "uncomfortable-bite", "sleep-breathing-disorders"],
  "occlusal-muscle-disharmony": ["uncomfortable-bite", "anterior-open-bite", "neck-pain"],
  "uncomfortable-bite": ["occlusal-muscle-disharmony", "anterior-open-bite", "neck-pain"],
  "anterior-open-bite": ["uncomfortable-bite", "osteoarthritis", "neck-pain"],
  "neck-pain": ["anterior-open-bite", "uncomfortable-bite", "clicking-jaw"],
  "sleep-breathing-disorders": ["daily-fatigue", "sleep-grinding", "clenching"],
  "daily-fatigue": ["sleep-breathing-disorders", "clenching", "sleep-grinding"],
};

/** Three related guides from a site's list (one even row). */
export function relatedGuides(siteGuides: ConditionGuide[], g: ConditionGuide, count = 3): ConditionGuide[] {
  const others = siteGuides.filter((x) => x.slug !== g.slug);
  const at = siteGuides.findIndex((x) => x.slug === g.slug);
  const picks = (relatedPicks[g.slug] ?? []).map((slug) => others.find((x) => x.slug === slug));
  const same = others.filter((x) => x.category === g.category);
  const after = [...siteGuides.slice(at + 1), ...siteGuides.slice(0, at)];
  const out: ConditionGuide[] = [];
  for (const x of [...picks, ...same, ...after]) {
    if (out.length === count) break;
    if (x && x.slug !== g.slug && !out.some((o) => o.slug === x.slug)) out.push(x);
  }
  return out;
}
