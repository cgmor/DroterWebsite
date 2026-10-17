import type { LibraryEntry } from "@/components/education/LibraryIndex";
import type { Resource } from "@/content/tmd";

/** tmd.ts resource → library row. Its meta carries the format ("… · PDF"); split it out. */
export function fromResource(r: Resource): LibraryEntry {
  const parts = (r.meta ?? "").split(" · ").filter(Boolean);
  const format = parts.includes("PDF") || (r.href && /\.pdf$/i.test(r.href)) ? "PDF" : "Link";
  const meta = parts.filter((p) => p !== "PDF" && p !== r.kind).join(" · ") || undefined;
  return {
    key: `tmd:${r.title}`,
    title: r.title,
    description: r.description,
    kind: r.kind,
    format,
    meta,
    href: r.href,
    external: !!r.href,
    status: r.href ? "available" : "coming-soon",
    audience: r.audience,
  };
}
