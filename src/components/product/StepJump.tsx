import type { CSSProperties } from "react";
import { airwayBite } from "@/content/aps";
import s from "./product.module.css";

/**
 * "Jump to step": the nine IFU steps grouped by phase, each a link to the
 * chairside player's `#step-n` anchor. On phones it sticks under the site
 * header; place it as a direct child of a wrapper that ends where the
 * protocol begins, so the player's own jump bar takes over from there.
 * From 1024px it is a static index row with the phase names.
 */
export default function StepJump({ className, id = "jump" }: { className?: string; id?: string }) {
  return (
    <nav className={[s.jump, className].filter(Boolean).join(" ")} aria-label="Jump to step" id={id}>
      <div className={`wrap ${s.jumpInner}`}>
        <p className={s.jumpLabel} aria-hidden="true">
          <span className={s.labelLong}>Jump to step</span>
          <span className={s.labelShort}>Step</span>
        </p>
        <ol className={s.phases}>
          {airwayBite.phases.map((ph) => (
            <li key={ph.id} className={s.phase} style={{ "--n": ph.steps.length } as CSSProperties}>
              <span className={s.phaseTitle}>{ph.title}</span>
              <ol className={s.steps}>
                {ph.steps.map((st) => (
                  <li key={st.n}>
                    <a href={`#step-${st.n}`} className={s.chip} aria-label={`Step ${st.n}, ${st.title}`}>
                      {st.n}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
