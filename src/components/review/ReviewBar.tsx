import Link from "next/link";
import { versions, type VersionId } from "@/content/versions";
import AiHighlight from "./AiHighlight";

/**
 * Slim bar pinned above every design version so Dr. Droter can tell which
 * version he is looking at and jump between them. Also carries the
 * "Highlight AI text" switch (see AiHighlight). Removed at launch.
 */
export default function ReviewBar({ current }: { current: VersionId }) {
  const active = versions.find((v) => v.id === current)!;

  return (
    <div
      data-provenance-skip=""
      className="relative z-[60] w-full bg-[#111418] text-[12px] leading-none text-white/70"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="truncate hover:text-white">
          <span className="text-white/45">
            Draft<span className="hidden sm:inline"> for review</span> ·{" "}
          </span>
          <span className="text-white">
            <span className="sm:hidden">V{active.number}</span>
            <span className="hidden sm:inline">
              Version {active.number} — {active.name}
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <AiHighlight />
          <nav aria-label="Design versions" className="flex shrink-0 items-center gap-1">
            {versions.map((v) => (
              <Link
                key={v.id}
                href={`/${v.id}`}
                aria-current={v.id === current ? "page" : undefined}
                className={
                  v.id === current
                    ? "rounded-full bg-white px-2.5 py-1 font-medium text-[#111418]"
                    : "rounded-full px-2.5 py-1 hover:bg-white/10 hover:text-white"
                }
              >
                <span className="sm:hidden">{v.number}</span>
                <span className="hidden sm:inline">
                  {v.number} · {v.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
