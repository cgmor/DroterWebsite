import type { CSSProperties } from "react";
import { airwayBite } from "@/content/aps";
import m from "./stepmap.module.css";

/**
 * The protocol map: all nine IFU steps on one track, grouped under his four
 * phase headings, each stop a link to the chairside player's `#step-n`.
 * From 1024px it is a full map with the step names; below that a compact
 * numbered bar that sticks under the site header until the protocol begins
 * (place it as a direct child of a wrapper that ends there).
 */
export default function StepJump({ className, id = "jump" }: { className?: string; id?: string }) {
  return (
    <nav className={[m.map, className].filter(Boolean).join(" ")} aria-label="Protocol steps" id={id}>
      <div className={`wrap ${m.inner}`}>
        <ol className={m.phases}>
          {airwayBite.phases.map((ph) => (
            <li key={ph.id} className={m.phase} style={{ flexGrow: ph.steps.length, "--n": ph.steps.length } as CSSProperties}>
              <p className={m.phaseTitle}>{ph.title}</p>
              <ol className={m.steps}>
                {ph.steps.map((st) => (
                  <li key={st.n} className={m.step}>
                    <a href={`#step-${st.n}`} className={m.stop} aria-label={`Step ${st.n}, ${st.title}`}>
                      <span className={m.node}>{st.n}</span>
                      <span className={m.name}>{st.title}</span>
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
