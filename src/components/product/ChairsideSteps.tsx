"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "@/components/site/icons";
import { useReducedMotion } from "@/components/site/motion";
import SpecRows from "@/components/site/SpecRows";
import { pauseOtherTutorials, timecode } from "@/components/site/TutorialPlayer";
import { airwayBite } from "@/content/aps";
import m from "./chairside.module.css";

/*
 * The nine IFU steps under his four phase headings. Each phase pairs its
 * animation still with its steps; playing a step turns that still into the
 * tutorial itself, in place, from the step's chapter to the end of the phase,
 * so a dentist at the chair never has to scroll away from the step to watch it.
 * The still is the clean crop (above the burned-in caption bar), and the clip
 * is cropped the same way, so the frame simply starts to move.
 */

const CHAPTERS = airwayBite.videoChapters;
const ALL_STEPS = airwayBite.phases.flatMap((p) => p.steps.map((s) => s.n));
const chapterFor = (n: number) => CHAPTERS.find((c) => (c.ifuSteps as readonly number[]).includes(n));

const PHASES = airwayBite.phases.map((ph) => {
  const chapters = ph.steps.map((s) => chapterFor(s.n)).filter((c) => c !== undefined);
  const first = ph.steps[0].n;
  const last = ph.steps[ph.steps.length - 1].n;
  return {
    ...ph,
    first,
    last,
    start: Math.min(...chapters.map((c) => c.start)),
    end: Math.max(...chapters.map((c) => c.end)),
    still: chapterFor(first)?.still,
  };
});

type Phase = (typeof PHASES)[number];
/** The phase whose clip is mounted, and where to start it (`nonce` re-seeks on a repeat press). */
type Active = { phase: string; from: number; nonce: number };

function Clip({ phase, active, onTime }: { phase: Phase; active: Active; onTime: (t: number) => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Seek to the chosen step and play, once the clip knows its length.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const go = () => {
      v.currentTime = active.from + 0.04; // land past the cut, on the chapter's first frame
      onTime(v.currentTime);
      v.play()?.catch(() => {});
    };
    if (v.readyState >= 1) go();
    else v.addEventListener("loadedmetadata", go, { once: true });
    return () => v.removeEventListener("loadedmetadata", go);
  }, [active.from, active.nonce, onTime]);

  // Stop at the end of the phase rather than running on into the next one.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let prev = v.currentTime;
    const onUpdate = () => {
      const t = v.currentTime;
      if (!v.paused && prev < phase.end && t >= phase.end) v.pause();
      prev = t;
      onTime(t);
    };
    const onPlay = () => pauseOtherTutorials(v);
    v.addEventListener("timeupdate", onUpdate);
    v.addEventListener("seeked", onUpdate);
    v.addEventListener("play", onPlay);
    return () => {
      v.removeEventListener("timeupdate", onUpdate);
      v.removeEventListener("seeked", onUpdate);
      v.removeEventListener("play", onPlay);
    };
  }, [phase.end, onTime]);

  return (
    <video
      ref={ref}
      className={m.clip}
      controls
      playsInline
      preload="auto"
      poster={phase.still}
      data-tutorial=""
      aria-label={`Tutorial, steps ${phase.first}–${phase.last}: ${phase.title}`}
    >
      <source src={airwayBite.video.src720} type="video/mp4" />
    </video>
  );
}

export default function ChairsideSteps() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Active | null>(null);
  const [time, setTime] = useState(0);
  const [inView, setInView] = useState<number | null>(null);
  const reduced = useReducedMotion();

  // The step being read: the last one whose top has passed 45% of the viewport (drives the phone jump bar).
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let found: number | null = null;
      for (const el of els) if (el.getBoundingClientRect().top < line) found = Number(el.dataset.step);
      if (els[els.length - 1].getBoundingClientRect().bottom < 0) found = null;
      setInView(found);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const play = (phase: Phase, from: number) => {
    setTime(from);
    setActive({ phase: phase.id, from, nonce: Date.now() });
    // A lower step's button can sit below its clip (phones): bring the clip into view.
    const frame = document.getElementById(`clip-${phase.id}`);
    if (frame) {
      const r = frame.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(frame).scrollMarginTop) || 0;
      if (r.top < top - 2 || r.bottom > window.innerHeight + 2) frame.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  // Steps whose chapter the active clip is showing (only within its own phase, so a clip
  // stopped at the phase's last frame never marks the next phase's first step).
  const activePhase = active ? PHASES.find((p) => p.id === active.phase) : undefined;
  const current = activePhase && time < activePhase.end ? CHAPTERS.find((c) => time >= c.start && time < c.end) : undefined;
  const playing: readonly number[] = current?.ifuSteps ?? [];

  return (
    <div className={m.root} ref={listRef}>
      <nav className="jumpbar" aria-label="Jump to step">
        <span className="jumpbar-label" aria-hidden="true">
          Step
        </span>
        <ol className="jumpbar-list">
          {ALL_STEPS.map((n) => (
            <li key={n}>
              <a
                href={`#step-${n}`}
                className="jumpbar-chip num"
                aria-current={inView === n ? "step" : undefined}
                data-playing={playing.includes(n) || undefined}
              >
                <span className="sr-only">Step </span>
                {n}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={m.phases}>
        {PHASES.map((ph) => {
          const isActive = active?.phase === ph.id;
          return (
            <section className={m.phase} key={ph.id} id={`phase-${ph.id}`} aria-labelledby={`ph-${ph.id}`}>
              <div className={m.head}>
                <h3 className={m.title} id={`ph-${ph.id}`}>
                  {ph.title}
                </h3>
                <span className={`${m.range} num`}>
                  Steps {ph.first}–{ph.last}
                </span>
              </div>

              <div className={m.visual}>
                <div className={m.frame} id={`clip-${ph.id}`}>
                  {isActive && active ? (
                    <Clip phase={ph} active={active} onTime={setTime} />
                  ) : (
                    ph.still && (
                      <button
                        type="button"
                        className={m.poster}
                        onClick={() => play(ph, ph.start)}
                        aria-label={`Play steps ${ph.first}–${ph.last} from the tutorial, ${timecode(ph.start)}`}
                      >
                        <Image src={ph.still} alt="" fill sizes="(min-width: 900px) 680px, 100vw" quality={90} className={m.still} />
                        <span className={m.posterPlay} aria-hidden="true">
                          <Play size={14} />
                          <span className="mono">{timecode(ph.start)}</span>
                        </span>
                      </button>
                    )
                  )}
                </div>
                <p className={m.caption}>{ph.caption}</p>
              </div>

              <div className={m.stepsCol}>
                <ol className="steps">
                  {ph.steps.map((s) => {
                    const ch = chapterFor(s.n);
                    return (
                      <li
                        key={s.n}
                        id={`step-${s.n}`}
                        data-step={s.n}
                        className="step"
                        data-playing={(isActive && playing.includes(s.n)) || undefined}
                      >
                        <h4 className="step-h">
                          <button
                            type="button"
                            className="step-btn"
                            onClick={() => ch && play(ph, ch.start)}
                            aria-label={`Step ${s.n}, ${s.title}. Play from ${ch ? timecode(ch.start) : "the start"}`}
                          >
                            <span className="step-n num">{s.n}</span>
                            <span className="step-title">{s.title}</span>
                            {ch && (
                              <span className="step-play" aria-hidden="true">
                                <Play size={12} />
                                <span className="mono">{timecode(ch.start)}</span>
                              </span>
                            )}
                          </button>
                        </h4>
                        <p className="step-body">{s.body}</p>
                      </li>
                    );
                  })}
                </ol>
                {ph.id === "fit" && <SpecRows className={m.occ} rows={airwayBite.occlusion.map((o) => ({ label: o.label, value: o.body }))} />}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
