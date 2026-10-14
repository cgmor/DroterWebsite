import { versions, type VersionId } from "@/content/versions";

export type { VersionId };

/** Site paths, relative to a version root. Use with `href(v, routes.x)`. */
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
 * Version-relative link.
 *   href("v1")                       → "/v1"
 *   href("v1", "/airway-bite")       → "/v1/airway-bite"
 *   href("v2", "airway-bite#steps")  → "/v2/airway-bite#steps"
 *   href("v3", "#tutorial")          → "/v3#tutorial"
 * Absolute URLs (http…, mailto:, tel:) pass through untouched.
 */
export function href(v: VersionId, path: string = "/"): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path === "" || path === "/") return `/${v}`;
  if (path.startsWith("#") || path.startsWith("?")) return `/${v}${path}`;
  return `/${v}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isVersion(value: string): value is VersionId {
  return versions.some((x) => x.id === value);
}

/** Primary navigation, in the order the contract fixes. */
export const NAV = [
  { label: "Airway Bite", path: routes.airwayBite },
  { label: "Appliances", path: routes.appliances },
  { label: "Understanding TMD", path: routes.understanding },
  { label: "Conditions", path: routes.conditions },
  { label: "Library", path: routes.library },
  { label: "About", path: routes.about },
] as const;



/** `tel:` link for a printed phone number. */
export const tel = (phone: string) => `tel:+1${phone.replace(/[^0-9]/g, "")}`;
