"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_LABEL, type BlockResult, type Category, type PageSummary } from "@/lib/provenance/classify";
import { loadCorpus, provenance, type LoadedCorpus } from "@/lib/provenance/load";
import { setAiPrefs, useAiPrefs } from "./aiPrefs";
import "./ai-highlight.css";

/** Anything inside this is never scanned (the review bar and the legend). */
const SKIP = "[data-provenance-skip]";
const MARK = "data-prov";
const OUTER = "data-prov-outer";
const OWN_TITLE = "data-prov-title";
const RESCAN_MS = 400;
/** Even under a constant stream of DOM changes, rescan at least this often. */
const RESCAN_MAX_MS = 2000;

type AiBlock = { text: string; path: string; words: number; score: number };

type ScanState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; summary: PageSummary; ai: AiBlock[]; corpus: Omit<LoadedCorpus, "index"> };

/* ───────────────────────── page marks ───────────────────────── */

function highlights(): HighlightRegistry | null {
  return typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight === "function" ? CSS.highlights : null;
}

function clearMarks() {
  document.querySelectorAll(`[${MARK}]`).forEach((el) => {
    el.removeAttribute(MARK);
    el.removeAttribute(OUTER);
    if (el.hasAttribute(OWN_TITLE)) {
      el.removeAttribute("title");
      el.removeAttribute(OWN_TITLE);
    }
  });
  const hl = highlights();
  for (const c of CATEGORIES) hl?.delete(`prov-${c}`);
}

function describe(b: BlockResult, corpus: LoadedCorpus): string {
  const src = b.source >= 0 ? ` · ${corpus.index.sources[b.source].label}` : "";
  if (b.shingles === 0) {
    return b.category === "his" ? `${CATEGORY_LABEL.his}: phrase found in his words${src}` : `${CATEGORY_LABEL.label}: short phrase not in his words`;
  }
  return `${CATEGORY_LABEL[b.category]}: ${Math.round(b.score * 100)}% of ${b.shingles} word runs found in his writing${src}`;
}

function applyMarks(blocks: BlockResult[], corpus: LoadedCorpus) {
  clearMarks();
  const els = new Set(blocks.map((b) => b.el));
  const outer = new Set<Element>();
  for (const el of els) {
    for (let p = el.parentElement; p; p = p.parentElement) if (els.has(p)) outer.add(p);
  }
  const ranges: Record<Category, StaticRange[]> = { his: [], edited: [], ai: [], label: [] };
  for (const b of blocks) {
    b.el.setAttribute(MARK, b.category);
    if (outer.has(b.el)) b.el.setAttribute(OUTER, "");
    if (!b.el.hasAttribute("title")) {
      b.el.setAttribute("title", describe(b, corpus));
      b.el.setAttribute(OWN_TITLE, "");
    }
    for (const t of b.nodes) {
      ranges[b.category].push(new StaticRange({ startContainer: t, startOffset: 0, endContainer: t, endOffset: t.length }));
    }
  }
  const hl = highlights();
  if (hl) for (const c of CATEGORIES) hl.set(`prov-${c}`, new Highlight(...ranges[c]));
}

/** Mutations we cause ourselves (legend re-renders, the portal) are ignored. */
function isOwnMutation(r: MutationRecord): boolean {
  const target = r.target.nodeType === 1 ? (r.target as Element) : r.target.parentElement;
  if (target?.closest(SKIP)) return true;
  if (r.type !== "childList") return false;
  const nodes = [...Array.from(r.addedNodes), ...Array.from(r.removedNodes)];
  return nodes.length > 0 && nodes.every((n) => n.nodeType === 1 && (n as Element).matches(SKIP));
}

/* ───────────────────────── report text ───────────────────────── */

const pct = (x: number) => (x > 0 && x < 0.005 ? "<1%" : `${Math.round(x * 100)}%`);
const num = (n: number) => n.toLocaleString("en-US");

function reportText(state: Extract<ScanState, { status: "ready" }>): string {
  const { summary: s, ai, corpus } = state;
  const lines = [
    `AI-written text on ${window.location.pathname}`,
    `${window.location.href} · scanned ${new Date().toLocaleString("en-US")}`,
    `${num(s.totalWords)} words in ${num(s.totalBlocks)} blocks: his verbatim ${pct(s.share.his)} · his edited ${pct(s.share.edited)} · AI-written ${pct(s.share.ai)} · AI labels ${pct(s.share.label)}`,
    `Corpus: ${corpus.sources} sources, ${num(corpus.words)} words of Dr. Droter's own writing (built ${corpus.builtAt.slice(0, 10)})`,
    "",
    `AI-written blocks (${ai.length}):`,
    "",
  ];
  ai.forEach((b, i) => {
    lines.push(`${i + 1}. ${b.path}  [${b.words} words, ${Math.round(b.score * 100)}% match]`);
    lines.push(`   ${b.text}`);
    lines.push("");
  });
  return lines.join("\n");
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      const host = document.querySelector(".provx-legend") ?? document.body;
      host.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/* ───────────────────────── components ───────────────────────── */

/**
 * "Highlight AI text": a switch for the review bar. When on, every text block
 * on the page is matched against the corpus of Dr. Droter's own words and
 * marked; a legend gives the share of words by category and copies a report.
 * Also turns on with ?ai=1 (and off with ?ai=0); remembered in localStorage.
 */
export default function AiHighlight() {
  const prefs = useAiPrefs();
  const pathname = usePathname();
  const [scan, setScan] = useState<ScanState>({ status: "loading" });

  useEffect(() => {
    if (!prefs.on) return;
    const root = document.documentElement;
    root.setAttribute("data-prov-on", "");
    if (highlights()) root.setAttribute("data-prov-hl", "");

    let alive = true;
    let timer = 0;
    let pendingSince = 0;
    let corpus: LoadedCorpus | null = null;

    const run = () => {
      pendingSince = 0;
      if (!alive || !corpus) return;
      const blocks = provenance.scan(document.body, corpus.index, { skip: SKIP });
      applyMarks(blocks, corpus);
      setScan({
        status: "ready",
        summary: provenance.summarize(blocks),
        ai: blocks.filter((b) => b.category === "ai").map((b) => ({ text: b.text, path: b.path, words: b.words, score: b.score })),
        corpus: { builtAt: corpus.builtAt, sources: corpus.sources, words: corpus.words },
      });
    };

    loadCorpus().then(
      (c) => {
        corpus = c;
        run();
      },
      (err: unknown) => {
        if (alive) setScan({ status: "error", message: err instanceof Error ? err.message : String(err) });
      },
    );

    const observer = new MutationObserver((records) => {
      if (records.every(isOwnMutation)) return;
      const now = Date.now();
      if (!pendingSince) pendingSince = now;
      window.clearTimeout(timer);
      timer = window.setTimeout(run, Math.max(0, Math.min(RESCAN_MS, pendingSince + RESCAN_MAX_MS - now)));
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });

    return () => {
      alive = false;
      observer.disconnect();
      window.clearTimeout(timer);
      clearMarks();
      root.removeAttribute("data-prov-on");
      root.removeAttribute("data-prov-hl");
    };
  }, [prefs.on, pathname]);

  useEffect(() => {
    if (!prefs.on || !prefs.tint) return;
    const root = document.documentElement;
    root.setAttribute("data-prov-tint", "");
    return () => root.removeAttribute("data-prov-tint");
  }, [prefs.on, prefs.tint]);

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={prefs.on}
        className="provx-switch"
        title="Mark text on this page that is not Dr. Droter's own words (also ?ai=1)"
        onClick={() => setAiPrefs({ on: !prefs.on })}
      >
        <span className="provx-track" aria-hidden="true">
          <span className="provx-thumb" />
        </span>
        <span className="hidden sm:inline">Highlight AI text</span>
        <span className="sm:hidden">AI text</span>
      </button>
      {prefs.on && createPortal(<Legend scan={scan} tint={prefs.tint} collapsed={prefs.collapsed} />, document.body)}
    </>
  );
}

function Legend({ scan, tint, collapsed }: { scan: ScanState; tint: boolean; collapsed: boolean }) {
  const [status, setStatus] = useState("");
  const statusTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(statusTimer.current), []);

  const say = (msg: string) => {
    setStatus(msg);
    window.clearTimeout(statusTimer.current);
    statusTimer.current = window.setTimeout(() => setStatus(""), 4000);
  };

  const ready = scan.status === "ready" ? scan : null;
  const s = ready?.summary;

  if (collapsed) {
    return (
      <aside className="provx-legend" data-provenance-skip="" data-collapsed="" aria-label="AI text legend">
        <button type="button" className="provx-pill" aria-expanded="false" onClick={() => setAiPrefs({ collapsed: false })}>
          <span className="provx-sw provx-sw-ai" aria-hidden="true" />
          {s ? (
            <span>
              AI <strong>{pct(s.share.ai + s.share.label)}</strong> · his <strong>{pct(s.share.his + s.share.edited)}</strong>
            </span>
          ) : (
            <span>AI text</span>
          )}
          <span className="provx-sr">Show the AI text legend</span>
        </button>
      </aside>
    );
  }

  const copy = async () => {
    if (!ready) return;
    const ok = await copyText(reportText(ready));
    say(ok ? `Copied ${ready.ai.length} AI-written blocks.` : "Copy failed: clipboard blocked.");
  };

  const rows: { c: Category; sw: string; note?: string }[] = [
    { c: "his", sw: "provx-sw provx-sw-his", note: tint ? "tinted green" : "left unmarked" },
    { c: "edited", sw: "provx-sw provx-sw-edited" },
    { c: "ai", sw: "provx-sw provx-sw-ai" },
    { c: "label", sw: "provx-sw provx-sw-label" },
  ];

  return (
    <aside className="provx-legend" data-provenance-skip="" aria-label="AI text legend">
      <div className="provx-head">
        <p className="provx-title">Who wrote this page?</p>
        <button type="button" className="provx-icon" aria-expanded="true" aria-label="Minimize the legend" onClick={() => setAiPrefs({ collapsed: true })}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {scan.status === "error" && (
        <p className="provx-status" role="alert">
          Could not load the corpus ({scan.message}). Run node scripts/provenance/build-corpus.mjs.
        </p>
      )}
      {scan.status === "loading" && <p className="provx-note">Reading the page…</p>}

      {s && (
        <>
          <div
            className="provx-bar"
            role="img"
            aria-label={`Share of words: his verbatim ${pct(s.share.his)}, his edited ${pct(s.share.edited)}, AI-written ${pct(s.share.ai)}, AI labels ${pct(s.share.label)}`}
          >
            {CATEGORIES.map((c) => (
              <span key={c} className={`provx-bar-${c}`} style={{ width: `${s.share[c] * 100}%` }} />
            ))}
          </div>
          <table className="provx-table">
            <thead className="provx-sr">
              <tr>
                <th scope="col">Written by</th>
                <th scope="col">Share of words</th>
                <th scope="col">Words</th>
                <th scope="col">Blocks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ c, sw, note }) => (
                <tr key={c}>
                  <th scope="row">
                    <span className="provx-cat">
                      <span className={sw} data-on={c === "his" && tint ? "" : undefined} aria-hidden="true">
                        {c === "edited" ? "ab" : null}
                      </span>
                      <span>
                        {CATEGORY_LABEL[c]}
                        {note && <span className="provx-note">{note}</span>}
                      </span>
                    </span>
                  </th>
                  <td className="provx-share">{pct(s.share[c])}</td>
                  <td>{num(s.words[c])}</td>
                  <td>{num(s.blocks[c])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="provx-total">
            {num(s.totalWords)} words in {num(s.totalBlocks)} text blocks. Hover a block for its match score.
          </p>
        </>
      )}

      <div className="provx-actions">
        <button type="button" role="switch" aria-checked={tint} className="provx-switch" onClick={() => setAiPrefs({ tint: !tint })}>
          <span className="provx-track" aria-hidden="true">
            <span className="provx-thumb" />
          </span>
          Tint his words green
        </button>
        <button type="button" className="provx-btn" onClick={copy} disabled={!ready}>
          Copy report
        </button>
      </div>
      <p className="provx-status" aria-live="polite">
        {status}
      </p>
      {ready && (
        <p className="provx-foot">
          Matched against {ready.corpus.sources} sources, {num(ready.corpus.words)} words of his own writing.
        </p>
      )}
    </aside>
  );
}
