"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { understanding } from "@/content/tmd";
import s from "./home.module.css";

const [healthy, damaged] = understanding.joint.figures;
const STATES = [
  { id: "healthy", label: "Healthy", fig: healthy },
  { id: "damaged", label: "Damaged", fig: damaged },
] as const;

type StateId = (typeof STATES)[number]["id"];

/**
 * V3's hero visual and its one authored motion moment: Dr. Droter's healthy
 * and damaged TMJ illustrations as a single plate. "Damaged" wipes in from the
 * left, the way the disc slips forward; "Healthy" wipes it back. The caption
 * follows (and is announced). Reduced motion swaps instantly (aps.css).
 * `children` (the lead and the ways in) sit under the toggle in the side column.
 */
export default function JointPlates({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<StateId>("healthy");
  const active = STATES.find((x) => x.id === state)!;

  return (
    <div className={s.jp}>
      <div className={s.jpMat}>
        <div className={s.jpStage} data-state={state}>
          <Image
            src={healthy.src}
            alt={state === "healthy" ? healthy.alt : ""}
            aria-hidden={state === "healthy" ? undefined : true}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1000px) 56vw, 100vw"
            className={s.jpImg}
          />
          <Image
            src={damaged.src}
            alt={state === "damaged" ? damaged.alt : ""}
            aria-hidden={state === "damaged" ? undefined : true}
            fill
            loading="eager"
            sizes="(min-width: 1000px) 56vw, 100vw"
            className={`${s.jpImg} ${s.jpTop}`}
          />
        </div>
      </div>
      <div className={s.jpSide}>
        <div className={s.jpBar}>
          <div className="seg" role="group" aria-label="Show the joint">
            {STATES.map((x) => (
              <button key={x.id} type="button" className="seg-opt" aria-pressed={x.id === state} onClick={() => setState(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
          <p className={s.jpCap} aria-live="polite">
            {active.fig.caption}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
