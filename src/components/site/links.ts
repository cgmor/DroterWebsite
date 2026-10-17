import { sitePages, sites, siteHas, type SiteId } from "@/content/sites";

export type { SiteId };
export { siteHas };

/** Site paths, relative to a site root. Use with `href(v, routes.x)`; `v` is the site id throughout. */
export const routes = {
  home: "/",
  airwayBite: "/airway-bite",
  appliances: "/appliances",
  understanding: "/understanding-tmd",
  conditions: "/conditions",
  condition: (slug: string) => `/conditions/${slug}`,
  library: "/library",
  about: "/about",
} as const;

/**
 * Site-relative link.
 *   href("apsleep")                       → "/apsleep"
 *   href("apsleep", "/airway-bite")       → "/apsleep/airway-bite"
 *   href("apsleep", "airway-bite#steps")  → "/apsleep/airway-bite#steps"
 *   href("droter", "#conditions")         → "/droter#conditions"
 * Absolute URLs (http…, mailto:, tel:) pass through untouched.
 */
export function href(v: SiteId, path: string = "/"): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path === "" || path === "/") return `/${v}`;
  if (path.startsWith("#") || path.startsWith("?")) return `/${v}${path}`;
  return `/${v}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isSite(value: string): value is SiteId {
  return sites.some((x) => x.id === value);
}

/** Primary navigation for each site: every page it carries except home. */
export const NAV: Record<SiteId, { label: string; path: string }[]> = Object.fromEntries(
  sites.map((s) => [s.id, sitePages[s.id].filter((p) => p.slug).map((p) => ({ label: p.label, path: `/${p.slug}` }))]),
) as Record<SiteId, { label: string; path: string }[]>;


/** `tel:` link for a printed phone number. */
export const tel = (phone: string) => `tel:+1${phone.replace(/[^0-9]/g, "")}`;
