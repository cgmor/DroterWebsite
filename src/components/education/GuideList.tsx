import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import type { ConditionGuide } from "@/content/tmd";
import s from "./education.module.css";

type Props = {
  guides: ConditionGuide[];
  /** Builds the version-relative link for a guide. */
  hrefFor: (slug: string) => string;
  as?: "h3" | "h4";
};

/** Compact ruled list of condition guides: the patient's words, then the clinical name. */
export default function GuideList({ guides, hrefFor, as: H = "h3" }: Props) {
  return (
    <ul className={s.gl}>
      {guides.map((g) => (
        <li key={g.slug} className={s.glItem}>
          <H className={s.glTitle}>
            <Link href={hrefFor(g.slug)} className={s.glLink}>
              “{g.plainName}”
            </Link>
          </H>
          <p className={s.glClinical}>{g.title}</p>
          <ArrowRight size={18} className={s.glArrow} />
        </li>
      ))}
    </ul>
  );
}
