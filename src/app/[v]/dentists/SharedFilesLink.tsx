import { ArrowRight } from "@/components/site/icons";
import type { AreaSite } from "@/lib/dentists/config";
import { areaPath } from "@/lib/dentists/config";
import s from "./shared-link.module.css";

/**
 * The one line that points to the dentist sharing area from a site's
 * resources page: "Shared files for dentists · Password required". A plain
 * link (no prefetch) to this site's own area.
 */
export default function SharedFilesLink({ v, className }: { v: AreaSite; className?: string }) {
  return (
    <div className={[s.row, className].filter(Boolean).join(" ")}>
      <a href={areaPath.files(v)} className={`lnk ${s.link}`}>
        <LockIcon />
        Shared files for dentists
        <ArrowRight size={16} className="lnk-icon" />
      </a>
      <span className={s.note}>Password required</span>
    </div>
  );
}

/** A padlock on the icon set's 20-unit grid, 1.5 stroke. */
function LockIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={s.lock}>
      <rect x="4" y="8.75" width="12" height="8.5" rx="1.75" />
      <path d="M6.75 8.75V6.5a3.25 3.25 0 0 1 6.5 0v2.25" />
    </svg>
  );
}
