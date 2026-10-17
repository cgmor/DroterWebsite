import ApsLogo from "@/components/shared/ApsLogo";
import { doctor } from "@/content/aps";
import type { SiteId } from "./links";

/**
 * The brand in the header and footer. APSleep.com carries the ArrowPath mark;
 * drdroter.com is his name, set in the surrounding type (his practice has no
 * mark of its own on file).
 */
export default function SiteMark({ v, className }: { v: SiteId; className?: string }) {
  if (v === "apsleep") return <ApsLogo variant="wordmark" className={className} />;
  return <span className={className}>{doctor.name}</span>;
}
