#!/usr/bin/env node
/**
 * Who wrote each page? Opens pages on the dev server, runs the SAME classifier
 * as the "Highlight AI text" overlay (src/lib/provenance/classify.ts) against
 * the corpus of Dr. Droter's own words, and prints per page the share of words
 * that are his (verbatim / edited) or AI-written, followed by every AI-written
 * block, so editors can drive the AI share down.
 *
 *   node scripts/provenance/report.mjs /v1 /v1/airway-bite /v2/about
 *   node scripts/provenance/report.mjs --main --edited /v1/about
 *
 * Options:
 *   --base <url>   dev server (default http://localhost:3100)
 *   --main         only scan <main> (default: the whole page minus the review bar)
 *   --edited       also list "Dr. Droter, edited" blocks
 *   --labels       also list "AI · label" blocks (nav, buttons, short chrome)
 *   --json         machine-readable output
 *   --width <px>   viewport width (default 1440)
 *
 * Needs Node ≥ 22.18 and the cached Playwright (override with PLAYWRIGHT_PATH).
 * Rebuild the corpus first if sources changed: node scripts/provenance/build-corpus.mjs
 */
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProvenance } from "../../src/lib/provenance/classify.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CORPUS = path.join(ROOT, "public/aps/provenance/corpus.json");
const PLAYWRIGHT = process.env.PLAYWRIGHT_PATH ?? "/Users/cole/.npm/_npx/d71ea5ed3eabc9b3/node_modules/playwright";

/* ───────────────────────── args ───────────────────────── */

const argv = process.argv.slice(2);
const flags = new Set();
const values = {};
const targets = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--base" || a === "--width") values[a.slice(2)] = argv[++i];
  else if (a.startsWith("--")) flags.add(a.slice(2));
  else targets.push(a);
}
if (!targets.length || flags.has("help")) {
  console.log("usage: node scripts/provenance/report.mjs [--main] [--edited] [--labels] [--json] [--base url] <url-or-path…>");
  process.exit(targets.length ? 0 : 1);
}
const BASE = (values.base ?? "http://localhost:3100").replace(/\/$/, "");
const WIDTH = Number(values.width ?? 1440);
const toUrl = (t) => (/^https?:\/\//.test(t) ? t : `${BASE}${t.startsWith("/") ? t : `/${t}`}`);

/* ───────────────────────── run ───────────────────────── */

const corpus = JSON.parse(await readFile(CORPUS, "utf8"));
const require = createRequire(import.meta.url);
const { chromium } = require(PLAYWRIGHT);

// The classifier, as source, so the page runs exactly the overlay's code.
const KIT_SOURCE = `(${createProvenance.toString()})()`;

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: WIDTH, height: 900 }, reducedMotion: "reduce" });
const results = [];

try {
  for (const target of targets) {
    const url = toUrl(target);
    const page = await context.newPage();
    try {
      const res = await page.goto(url, { waitUntil: "load", timeout: 60_000 });
      if (!res || !res.ok()) throw new Error(`HTTP ${res ? res.status() : "no response"}`);
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
      // Scroll through once so anything rendered on approach is in the DOM.
      await page.evaluate(async () => {
        const step = Math.max(400, window.innerHeight * 0.8);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);

      const out = await page.evaluate(
        ({ src, corpus, mainOnly }) => {
          const kit = (0, eval)(src);
          const idx = kit.buildIndex(corpus);
          const root = (mainOnly && document.querySelector("main")) || document.body;
          const blocks = kit.scan(root, idx, { skip: "[data-provenance-skip]" });
          return {
            title: document.title,
            summary: kit.summarize(blocks),
            blocks: blocks.map((b) => ({
              category: b.category,
              words: b.words,
              score: b.score,
              hits: b.hits,
              units: b.shingles,
              path: b.path,
              text: b.text,
              source: b.source >= 0 ? idx.sources[b.source].label : null,
            })),
          };
        },
        { src: KIT_SOURCE, corpus, mainOnly: flags.has("main") },
      );
      results.push({ target, url, ...out });
    } catch (err) {
      results.push({ target, url, error: err instanceof Error ? err.message : String(err) });
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

/* ───────────────────────── print ───────────────────────── */

if (flags.has("json")) {
  console.log(JSON.stringify({ corpus: { builtAt: corpus.builtAt, ...corpus.totals }, pages: results }, null, 2));
  process.exit(0);
}

const pct = (x) => `${(x * 100).toFixed(1)}%`;
const n = (x) => x.toLocaleString("en-US");
const wrap = (text, width, indent) => {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if (line && line.length + w.length + 1 > width) {
      lines.push(line);
      line = w;
    } else line = line ? `${line} ${w}` : w;
  }
  if (line) lines.push(line);
  return lines.map((l) => indent + l).join("\n");
};

const LIST = [["ai", "AI-written"]];
if (flags.has("edited")) LIST.push(["edited", "Dr. Droter, edited"]);
if (flags.has("labels")) LIST.push(["label", "AI · label"]);

console.log(
  `\nCorpus: ${corpus.totals.sources} sources, ${n(corpus.totals.words)} words of Dr. Droter's own writing (built ${corpus.builtAt.slice(0, 16).replace("T", " ")} UTC).`,
);
console.log(`Scope: ${flags.has("main") ? "<main> only" : "whole page except the review bar"}. Shingles: ${corpus.shingleSize} words.\n`);

for (const r of results) {
  console.log("━".repeat(78));
  if (r.error) {
    console.log(`${r.target}  ERROR: ${r.error}\n`);
    continue;
  }
  const s = r.summary;
  console.log(`${r.target}   ${r.url}`);
  console.log(`  ${n(s.totalWords)} words in ${n(s.totalBlocks)} blocks`);
  console.log(`  his verbatim ${pct(s.share.his).padStart(6)}   (${n(s.words.his)} words, ${s.blocks.his} blocks)`);
  console.log(`  his edited   ${pct(s.share.edited).padStart(6)}   (${n(s.words.edited)} words, ${s.blocks.edited} blocks)`);
  console.log(`  AI-written   ${pct(s.share.ai).padStart(6)}   (${n(s.words.ai)} words, ${s.blocks.ai} blocks)`);
  console.log(`  AI labels    ${pct(s.share.label).padStart(6)}   (${n(s.words.label)} words, ${s.blocks.label} blocks)`);
  for (const [cat, name] of LIST) {
    const list = r.blocks.filter((b) => b.category === cat);
    console.log(`\n  ${name} blocks (${list.length}):`);
    list.forEach((b, i) => {
      const src = b.source ? ` · ${b.source}` : "";
      console.log(`\n  ${String(i + 1).padStart(3)}. ${b.path}  [${b.words} words, ${Math.round(b.score * 100)}% match${src}]`);
      console.log(wrap(b.text, 72, "       "));
    });
  }
  console.log("");
}

const ok = results.filter((r) => !r.error);
if (ok.length > 1) {
  console.log("━".repeat(78));
  console.log("Summary (share of words)\n");
  const w = Math.max(28, ...ok.map((r) => r.target.length + 2));
  console.log(`${"page".padEnd(w)}${"words".padStart(7)}${"his".padStart(8)}${"edited".padStart(8)}${"AI".padStart(8)}${"labels".padStart(8)}`);
  for (const r of ok) {
    const s = r.summary;
    console.log(
      `${r.target.padEnd(w)}${n(s.totalWords).padStart(7)}${pct(s.share.his).padStart(8)}${pct(s.share.edited).padStart(8)}${pct(s.share.ai).padStart(8)}${pct(s.share.label).padStart(8)}`,
    );
  }
  console.log("");
}
