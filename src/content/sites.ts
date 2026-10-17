/**
 * The two sites built from this codebase (Dr. Droter, after the Oct 14 call:
 * two separate websites, same format). drdroter.com is his practice and is
 * pain-focused; APSleep.com is airway and sleep, for patients and dentists.
 * Shared by routing, the review index and the review bar.
 */
export const sites = [
  {
    id: "apsleep",
    name: "ArrowPath Sleep",
    domain: "APSleep.com",
    focus: "Airway and sleep",
    idea: "Sleep and airway problems first, with the appliance for each. The Airway Bite sits on its own page for dentists.",
  },
  {
    id: "droter",
    name: "John R. Droter, DDS",
    domain: "drdroter.com",
    focus: "TMD and facial pain",
    idea: "His practice: TMD and facial pain, the common conditions, patient resources and new-patient information.",
  },
] as const;

export type SiteId = (typeof sites)[number]["id"];

/** The pages each site carries, in nav order. Pages not listed 404 on that site. */
export const sitePages: Record<SiteId, readonly { slug: string; label: string }[]> = {
  apsleep: [
    { slug: "", label: "Home" },
    { slug: "conditions", label: "Sleep problems" },
    { slug: "appliances", label: "Appliances" },
    { slug: "airway-bite", label: "Airway Bite" },
    { slug: "library", label: "For dentists" },
    { slug: "about", label: "About" },
  ],
  droter: [
    { slug: "", label: "Home" },
    { slug: "understanding-tmd", label: "Understanding TMD" },
    { slug: "conditions", label: "Conditions" },
    { slug: "library", label: "Resources" },
    { slug: "about", label: "About" },
  ],
};

export function siteHas(site: SiteId, slug: string): boolean {
  return sitePages[site].some((p) => p.slug === slug);
}

/**
 * Which condition guides (slugs in tmd.ts `conditionGuides`) each site carries,
 * in display order. The practice keeps the nine from the old site ("On my
 * practice site, yes"), then his drdroter.com pages; APSleep carries the sleep
 * set he named on the call ("I clench at night. Sleep bruxism.").
 */
export const siteConditions: Record<SiteId, readonly string[]> = {
  droter: [
    "clenching",
    "sleep-grinding",
    "occlusal-muscle-disharmony",
    "osteoarthritis",
    "sprain-discal-ligament",
    "acute-closed-lock",
    "anterior-open-bite",
    "sleep-breathing-disorders",
    "neck-pain",
    "limited-jaw-opening",
    "clicking-jaw",
    "uncomfortable-bite",
    "daily-fatigue",
  ],
  apsleep: ["clenching", "sleep-grinding", "sleep-breathing-disorders", "daily-fatigue"],
};

/** The practice's first nine, shown on its home page. */
export const practiceNine = siteConditions.droter.slice(0, 9);
