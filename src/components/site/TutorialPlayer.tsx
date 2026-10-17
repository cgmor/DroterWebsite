"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { airwayBite } from "@/content/aps";
import Figure from "./Figure";
import { Play } from "./icons";
import { useReducedMotion } from "./motion";
import SpecRows from "./SpecRows";

const CHAPTERS = airwayBite.videoChapters;
const FALLBACK_DURATION = 135; // "2 min 15 s", until the video reports its own
const ALL_STEPS = airwayBite.phases.flatMap((p) => p.steps.map((s) => s.n));

export function timecode(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function chapterForStep(n: number) {
  return CHAPTERS.find((c) => (c.ifuSteps as readonly number[]).includes(n));
}

/**
 * One tutorial voice at a time: every tutorial <video> carries `data-tutorial`,
 * and the one that starts playing pauses the rest (the page player and the
 * chairside step clips). Muted background loops are untouched.
 */
export function pauseOtherTutorials(self: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-tutorial]").forEach((v) => {
    if (v !== self && !v.paused) v.pause();
  });
}

/* ── Video state ─────────────────────────────────────────────────────── */

function usePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) setDuration(v.duration);
    };
    const onPlay = () => {
      setEngaged(true);
      pauseOtherTutorials(v);
    };
    const events: [string, () => void][] = [
      ["timeupdate", onTime],
      ["seeked", onTime],
      ["loadedmetadata", onMeta],
      ["durationchange", onMeta],
      ["play", onPlay],
    ];
    events.forEach(([e, f]) => v.addEventListener(e, f));
    return () => events.forEach(([e, f]) => v.removeEventListener(e, f));
  }, []);

  const seek = useCallback((t: number, play = true) => {
    const v = videoRef.current;
    if (!v) return;
    setEngaged(true);
    const target = t + 0.04; // land past the cut, on the chapter's first frame
    v.currentTime = target;
    setTime(target);
    if (play) v.play()?.catch(() => {});
  }, []);

  const chapterIndex = engaged ? CHAPTERS.findIndex((c) => time >= c.start && time < c.end) : -1;
  return { videoRef, time, duration, engaged, seek, chapterIndex };
}

type Player = ReturnType<typeof usePlayer>;

/* ── Pieces ──────────────────────────────────────────────────────────── */

function Video({ videoRef, preload }: { videoRef: React.RefObject<HTMLVideoElement | null>; preload: "none" | "metadata" }) {
  const v = airwayBite.video;
  return (
    <div className="tp-frame">
      <video
        ref={videoRef}
        className="tp-video"
        controls
        playsInline
        preload={preload}
        poster={v.poster}
        width={1920}
        height={1080}
        data-tutorial=""
        aria-label={`${airwayBite.name} tutorial, ${v.durationLabel}`}
      >
        <source src={v.src720} type="video/mp4" media="(max-width: 900px)" />
        <source src={v.src1080} type="video/mp4" />
        <track kind="chapters" src="/aps/video/chapters.vtt" srcLang="en" label="Chapters" default />
      </video>
    </div>
  );
}

/** Proportional chapter track. A pointer shortcut; the chapter list carries keyboard access. */
function Timeline({ p }: { p: Player }) {
  const lastEnd = CHAPTERS[CHAPTERS.length - 1].end;
  const tail = Math.max(0, p.duration - lastEnd);
  const fill = (start: number, end: number) => (!p.engaged || p.time <= start ? 0 : p.time >= end ? 1 : (p.time - start) / (end - start));
  return (
    <div className="tl">
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          tabIndex={-1}
          className="tl-seg"
          style={{ flexGrow: c.end - c.start }}
          data-on={i === p.chapterIndex || undefined}
          onClick={() => p.seek(c.start)}
          aria-label={`${c.label}, ${timecode(c.start)}`}
          title={c.label}
        >
          <span className="tl-bar">
            <span className="tl-fill" style={{ transform: `scaleX(${fill(c.start, c.end)})` }} />
          </span>
        </button>
      ))}
      {tail > 0 && (
        <span className="tl-seg tl-tail" style={{ flexGrow: tail }} aria-hidden="true">
          <span className="tl-bar">
            <span className="tl-fill" style={{ transform: `scaleX(${fill(lastEnd, p.duration)})` }} />
          </span>
        </span>
      )}
    </div>
  );
}

function NowLine({ p }: { p: Player }) {
  const current = p.chapterIndex >= 0 ? CHAPTERS[p.chapterIndex] : null;
  return (
    <p className="tp-now">
      <span>
        {current ? (
          <>
            <span className="tp-now-idx num">
              {p.chapterIndex + 1} of {CHAPTERS.length}
            </span>
            {current.label}
          </>
        ) : null}
      </span>
      <span className="mono">
        {timecode(p.time)} / {timecode(p.duration)}
      </span>
    </p>
  );
}

function ChapterList({ p, className = "" }: { p: Player; className?: string }) {
  return (
    <ol className={`chl ${className}`} aria-label="Chapters">
      {CHAPTERS.map((c, i) => (
        <li key={c.id}>
          <button type="button" className="chl-btn" aria-current={i === p.chapterIndex ? "true" : undefined} onClick={() => p.seek(c.start)}>
            <span className="chl-time mono">{timecode(c.start)}</span>
            <span className="chl-label">{c.label}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/* ── The player ──────────────────────────────────────────────────────── */

type Props = {
  /** Chairside layout: sticky player plus the 4 phases × 9 IFU steps; selecting a step seeks the video. */
  withSteps?: boolean;
  /** Anchor id on the player. */
  id?: string;
  /** Video preload. Defaults: "none" (overview), "metadata" (withSteps). */
  preload?: "none" | "metadata";
};

/**
 * The narrated tutorial (2:15) with its chapter track and chapter list, from
 * aps.ts `videoChapters`. With `withSteps`, the IFU steps sit beside it and
 * highlight while their chapter plays. Place inside a Section (any tone).
 */
export default function TutorialPlayer({ withSteps = false, id = "tutorial", preload }: Props) {
  const p = usePlayer();

  if (!withSteps) {
    return (
      <div className="tp" id={id}>
        <div className="tp-console">
          <Video videoRef={p.videoRef} preload={preload ?? "none"} />
          <div className="tp-rail">
            <Timeline p={p} />
            <NowLine p={p} />
          </div>
        </div>
        <div className="tp-side">
          <ChapterList p={p} />
        </div>
      </div>
    );
  }

  return <Chairside p={p} id={id} preload={preload ?? "metadata"} />;
}

function Chairside({ p, id, preload }: { p: Player; id: string; preload: "none" | "metadata" }) {
  const reduced = useReducedMotion();
  const playerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<number | null>(null);

  const current = p.chapterIndex >= 0 ? CHAPTERS[p.chapterIndex] : null;
  const playingSteps: readonly number[] = current ? current.ifuSteps : [];

  // The step being read: the last one whose top has passed 45% of the viewport (drives the phone jump bar).
  useEffect(() => {
    const root = stepsRef.current;
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

  const playStep = (n: number) => {
    const ch = chapterForStep(n);
    if (!ch) return;
    p.seek(ch.start);
    const el = playerRef.current;
    if (el && window.matchMedia("(max-width: 1023px)").matches) {
      const r = el.getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight * 0.5) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <div className="cs">
      <div className="cs-player" ref={playerRef} id={id}>
        <div className="tp-console cs-console">
          <Video videoRef={p.videoRef} preload={preload} />
          <div className="tp-rail">
            <Timeline p={p} />
            <NowLine p={p} />
            <ChapterList p={p} className="chl-grid" />
          </div>
        </div>
      </div>

      <div className="cs-steps" ref={stepsRef} id="steps">
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
                  data-playing={playingSteps.includes(n) || undefined}
                >
                  <span className="sr-only">Step </span>
                  {n}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <p className="cs-prereq">{airwayBite.prerequisite}</p>

        {airwayBite.phases.map((ph) => {
          const first = ph.steps[0].n;
          const last = ph.steps[ph.steps.length - 1].n;
          const still = chapterForStep(first)?.still;
          return (
            <section className="ph" key={ph.id} id={`phase-${ph.id}`} aria-labelledby={`ph-${ph.id}`}>
              <div className="ph-head">
                <h3 className="ph-title" id={`ph-${ph.id}`}>
                  {ph.title}
                </h3>
                <span className="ph-range num">
                  Steps {first}–{last}
                </span>
              </div>
              {still && (
                <div className="ph-still">
                  <Image src={still} alt="" width={1920} height={816} sizes="(min-width: 1024px) 480px, 100vw" quality={90} className="ph-img" />
                </div>
              )}
              <p className="ph-caption">{ph.caption}</p>

              <ol className="steps">
                {ph.steps.map((s) => {
                  const ch = chapterForStep(s.n);
                  return (
                    <li key={s.n} id={`step-${s.n}`} data-step={s.n} className="step" data-playing={playingSteps.includes(s.n) || undefined}>
                      <h4 className="step-h">
                        <button
                          type="button"
                          className="step-btn"
                          onClick={() => playStep(s.n)}
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

              {ph.id === "fit" && (
                <SpecRows className="ph-occ" rows={airwayBite.occlusion.map((o) => ({ label: o.label, value: o.body }))} />
              )}

              <Figure
                src={ph.image}
                alt={ph.imageAlt}
                width={1600}
                height={800}
                variant="inline"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="ph-ifu"
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
