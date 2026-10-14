#!/usr/bin/env node
/**
 * Rebuilds public/aps/provenance/corpus.json: the corpus of text Dr. Droter
 * wrote HIMSELF, which the "Highlight AI text" overlay and report.mjs match
 * page text against.
 *
 *   node scripts/provenance/build-corpus.mjs
 *   node scripts/provenance/build-corpus.mjs --inventory <content-inventory.md> --narration <words.json>
 *
 * Needs Node ≥ 22.18 (it imports the shared TypeScript classifier directly).
 *
 * Sources (only his own words; never web-team or AI copy):
 *  1. scripts/provenance/sources/content-inventory.md: the verbatim capture of
 *     his websites. Only the "▸ Verbatim copy (reading order)" blocks of the
 *     drdroter.com pages he wrote and of apsleep.com/about (his, 2021); for
 *     apsleep.com/airway-bite only the PDF text (author JRDroter) and the text
 *     inside his four step slides; plus the text inside his APS products slide
 *     on drdroter.com/seminar-links. The apsleep.com airway-bite and products
 *     web copy is excluded: the web team wrote it. Capture notes, link lists,
 *     tables and other inventory metadata are never read.
 *  2. Assets/Disorders/Osteoarthritis.docx (his document, via mammoth).
 *  3. His narration of the tutorial intro (word-timing JSON; a snapshot in
 *     sources/ is used when the original is not on this machine).
 *  4. sources/kit-label.txt and sources/email-quotes.txt (one quote per line).
 *  5. Every .txt in Assets/APSleep/source-text/ (the drop-in folder; add a new
 *     file there and re-run this script).
 */
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { createProvenance } from "../../src/lib/provenance/classify.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rel = (p) => path.relative(ROOT, p) || ".";
const SOURCES = path.join(ROOT, "scripts/provenance/sources");
const OUT = path.join(ROOT, "public/aps/provenance/corpus.json");

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const INVENTORY = path.resolve(arg("inventory") ?? path.join(SOURCES, "content-inventory.md"));
const NARRATION_JSON = arg("narration") ?? "/Users/cole/Downloads/private/airway_bite/intro_airway_words.json";
const NARRATION_SNAPSHOT = path.join(SOURCES, "narration-airway-intro.txt");
const OA_DOCX = path.join(ROOT, "Assets/Disorders/Osteoarthritis.docx");
const DROP_IN = path.join(ROOT, "Assets/APSleep/source-text");

const kit = createProvenance();

/* ───────────────────────── helpers ───────────────────────── */

/** Paragraphs of plain text: blank-line separated, hard line breaks joined. */
function paragraphs(text) {
  return text
    .replace(/\r\n?/g, "\n")
    .split(/\n[ \t]*\n/)
    .map((p) =>
      p
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join(" "),
    )
    .filter(Boolean);
}

/** Strip the inventory's Markdown rendering from one line of page copy. */
function cleanMarkdown(line) {
  return line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images (alt text is not prose)
    .replace(/\[\s*\]\([^)]*\)/g, " ") // links left empty by a removed image
    .replace(/\[(?:iframe|input|button)\b[^\]]*\]/g, " ") // embeds and form controls
    .replace(/\[([^\]]+)\]\((?:[^()\s]|\([^)]*\))*\)/g, "$1") // links → their text
    .replace(/\*\[caption\]\*/g, " ")
    .replace(/\{\/?google_map\}/g, " ") // unrendered shortcode tags
    .replace(/^\s*#{1,6}\s*/, "") // heading markers (the heading text is his)
    .replace(/^\s*>\s?/, "") // blockquote markers
    .replace(/^\s*\d+\.\s+(?=\S)/, "") // list numbering
    .replace(/\*\*|__/g, "")
    .replace(/(^|[\s(])\*(\S[^*]*?)\*(?=[\s).,;:!?]|$)/g, "$1$2")
    .replace(/⟨(\w+)⟩/g, "$1") // ligatures restored by the capture
    .trim();
}

/** Every "double-quoted" string in a line (used for slide transcriptions). */
function quoted(line) {
  return [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1].replace(/\s+\/\s+/g, " ").trim());
}

const sources = [];
function addSource(id, label, origin, segments) {
  const text = segments
    .map((s) => kit.normalize(s))
    .filter((s) => kit.tokenize(s).length)
    .join("\n");
  if (!text) {
    console.warn(`  ! ${id}: no text, skipped`);
    return;
  }
  const words = text.split("\n").reduce((n, s) => n + kit.tokenize(s).length, 0);
  sources.push({ id, label, origin, chars: text.length, words, text });
}

/* ───────────────────────── 1. the website inventory ───────────────────────── */

/** drdroter.com pages he wrote, plus apsleep.com/about (his, 2021). */
const INVENTORY_PAGES = [
  ["https://drdroter.com/about-dr-droter/", "About Dr. Droter"],
  ["https://drdroter.com/new-patient-information/", "New Patient Information"],
  ["https://drdroter.com/about-tmd/", "About TMD"],
  ["https://drdroter.com/facial-pain/", "Facial Pain"],
  ["https://drdroter.com/jaw-joint-damage/", "Jaw Joint Damage"],
  ["https://drdroter.com/locked-jaw/", "Limited Jaw Opening"],
  ["https://drdroter.com/anterior-open-bite-front-teeth-no-longer-touch/", "Anterior Open Bite"],
  ["https://drdroter.com/uncomfortable-bite-occlusion/", "Uncomfortable Bite (Occlusion)"],
  ["https://drdroter.com/children/", "Children"],
  ["https://drdroter.com/patient-downloads/", "Patient Downloads"],
  ["https://drdroter.com/links/", "Patient Links"],
  ["https://drdroter.com/medical-literature/", "Medical Literature"],
  ["https://drdroter.com/seminar-links/", "Seminar Links"],
  ["https://drdroter.com/pankey-tmd-2026/", "Pankey TMD 2026"],
  ["https://drdroter.com/contact/", "Contact"],
  ["https://apsleep.com/about/", "About (written by him, 2021)"],
];

/** Split the inventory into its "## Title — URL" page sections. */
function inventorySections(md) {
  const out = new Map();
  const parts = md.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const head = part.slice(0, nl);
    const m = head.match(/ — (https?:\/\/\S+)\s*$/);
    if (m) out.set(m[1], part.slice(nl + 1).split(/^---\s*$/m)[0]);
  }
  return out;
}

/** The lines of one "**▸ Label…**" block, up to the next ▸ label. */
function labelledBlock(section, labelStart) {
  const lines = section.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`**▸ ${labelStart}`));
  if (start < 0) return null;
  const body = [];
  for (const l of lines.slice(start + 1)) {
    if (l.startsWith("**▸")) break;
    body.push(l);
  }
  return body;
}

async function fromInventory() {
  if (!existsSync(INVENTORY)) throw new Error(`Inventory not found: ${INVENTORY}`);
  const sections = inventorySections(await readFile(INVENTORY, "utf8"));
  const origin = rel(INVENTORY);

  for (const [url, title] of INVENTORY_PAGES) {
    const section = sections.get(url);
    const body = section && labelledBlock(section, "Verbatim copy");
    if (!body) throw new Error(`Inventory has no verbatim copy for ${url}`);
    const { host, pathname } = new URL(url);
    addSource(`${host}${pathname}`, `${host}: ${title}`, `${origin} → ${url}`, paragraphs(body.map(cleanMarkdown).join("\n")));
  }

  // apsleep.com/airway-bite: only his PDF and the text inside his step slides.
  const ab = sections.get("https://apsleep.com/airway-bite/");
  if (!ab) throw new Error("Inventory has no apsleep.com/airway-bite section");
  const pdf = labelledBlock(ab, "Printable PDF");
  addSource(
    "apsleep.com/airway-bite#pdf",
    "Airway Bite IFU PDF (author JRDroter)",
    `${origin} → Printable PDF — verbatim text`,
    paragraphs(pdf.filter((l) => /^\s*>/.test(l)).map(cleanMarkdown).join("\n")),
  );
  const slides = labelledBlock(ab, "Text inside the four step images");
  addSource(
    "apsleep.com/airway-bite#slides",
    "Airway Bite step slides (his)",
    `${origin} → Text inside the four step images`,
    slides.flatMap((l) => quoted(l)),
  );

  // drdroter.com/seminar-links: the text inside his APS products slide.
  const sl = sections.get("https://drdroter.com/seminar-links/");
  const note = sl?.split("\n").find((l) => l.includes("Text inside `APS-products"));
  if (note) {
    const slideText = note.split("This is the only place")[0];
    addSource(
      "drdroter.com/seminar-links#aps-products-slide",
      "APS products slide (his)",
      `${origin} → Seminar Links, APS-products slide`,
      quoted(slideText),
    );
  }
}

/* ───────────────────────── 2–5. documents and drop-ins ───────────────────────── */

async function fromDocx() {
  if (!existsSync(OA_DOCX)) return console.warn(`  ! ${rel(OA_DOCX)} not found, skipped`);
  const require = createRequire(import.meta.url);
  const mammoth = require("mammoth");
  const { value } = await mammoth.extractRawText({ path: OA_DOCX });
  addSource("docx/osteoarthritis", "Osteoarthritis (his Word document)", rel(OA_DOCX), paragraphs(value));
}

async function fromNarration() {
  let text;
  let origin;
  if (existsSync(NARRATION_JSON)) {
    const json = JSON.parse(await readFile(NARRATION_JSON, "utf8"));
    text = json.words.map((w) => w.word).join(" ");
    origin = NARRATION_JSON;
    await writeFile(NARRATION_SNAPSHOT, `${text}\n`); // keep the snapshot current
  } else {
    text = await readFile(NARRATION_SNAPSHOT, "utf8");
    origin = rel(NARRATION_SNAPSHOT);
  }
  addSource("narration/airway-intro", "His narration: Airway Bite tutorial intro", origin, [text]);
}

async function fromManual() {
  const kitLabel = path.join(SOURCES, "kit-label.txt");
  addSource("kit-label", "Kit label text he approved", rel(kitLabel), paragraphs(await readFile(kitLabel, "utf8")));
  const emails = path.join(SOURCES, "email-quotes.txt");
  const lines = (await readFile(emails, "utf8")).split("\n").map((l) => l.trim()).filter(Boolean);
  addSource("emails", "Quotes from his emails", rel(emails), lines);
}

async function fromDropIn() {
  if (!existsSync(DROP_IN)) return console.log(`  (no ${rel(DROP_IN)} folder yet)`);
  const files = (await readdir(DROP_IN)).filter((f) => f.toLowerCase().endsWith(".txt")).sort();
  for (const f of files) {
    const p = path.join(DROP_IN, f);
    addSource(`source-text/${f}`, `Source text: ${f}`, rel(p), paragraphs(await readFile(p, "utf8")));
  }
}

/* ───────────────────────── build ───────────────────────── */

await fromInventory();
await fromDocx();
await fromNarration();
await fromManual();
await fromDropIn();

const index = kit.buildIndex({ sources });
const corpus = {
  version: 1,
  builtAt: new Date().toISOString(),
  builtBy: "node scripts/provenance/build-corpus.mjs",
  normalization:
    "NFKC; lowercase; curly quotes → straight; all dashes → '-'; ellipsis → '...'; soft hyphens removed; whitespace collapsed; one segment (paragraph) per line; spelling and typos kept",
  shingleSize: kit.N,
  thresholds: { verbatim: kit.VERBATIM, edited: kit.EDITED },
  totals: {
    sources: sources.length,
    chars: sources.reduce((n, s) => n + s.chars, 0),
    words: sources.reduce((n, s) => n + s.words, 0),
    shingles: index.shingles.size,
  },
  sources,
};

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(corpus, null, 1)}\n`);

const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);
console.log(`\nCorpus of Dr. Droter's own words → ${rel(OUT)}\n`);
console.log(`${pad("source", 58)}${lpad("chars", 8)}${lpad("words", 8)}`);
for (const s of sources) console.log(`${pad(s.label.slice(0, 57), 58)}${lpad(s.chars, 8)}${lpad(s.words, 8)}`);
console.log(`${pad(`${corpus.totals.sources} sources`, 58)}${lpad(corpus.totals.chars, 8)}${lpad(corpus.totals.words, 8)}`);
console.log(`${corpus.totals.shingles} unique ${kit.N}-word shingles\n`);
