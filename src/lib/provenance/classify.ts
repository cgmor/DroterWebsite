/**
 * Provenance classifier: how much of each text block on a page is Dr. Droter's
 * own words, and how much was written by AI?
 *
 * It is automatic and honest by construction. Nothing is hand-tagged. A block
 * counts as his only when its word sequences appear in the corpus of text he
 * wrote himself (public/aps/provenance/corpus.json, rebuilt with
 * `node scripts/provenance/build-corpus.mjs`).
 *
 * Method: normalize → tokenize → 5-word shingles. For each block, score = the
 * share of its shingles found in the corpus. On both sides, shingles stay
 * within one sentence of one line (a corpus paragraph; on the page, a run of
 * text between <br>s and block-level boundaries), so moving or re-joining his
 * sentences is not mistaken for rewriting them. A 3–4-word sentence or line
 * inside a longer block counts as one unit, found only if the whole phrase is
 * in the corpus.
 *   score ≥ 0.85          → "his"    (Dr. Droter, verbatim)
 *   0.35 ≤ score < 0.85   → "edited" (Dr. Droter, edited)
 *   score < 0.35          → "ai"     (AI-written)
 *   under 5 words         → "his" if the whole phrase appears in the corpus,
 *                           otherwise "label" (AI · label: nav, buttons, chrome)
 *
 * Everything lives inside one self-contained factory, so the CLI
 * (scripts/provenance/report.mjs) can inject the *same* code into a page with
 * `createProvenance.toString()`. Do not reference anything outside the
 * function body, and use only erasable TypeScript (no enums, namespaces or
 * parameter properties): Node strips the types when the scripts import it.
 */

export type Category = "his" | "edited" | "ai" | "label";

export const CATEGORIES: readonly Category[] = ["his", "edited", "ai", "label"];

export const CATEGORY_LABEL: Record<Category, string> = {
  his: "Dr. Droter, verbatim",
  edited: "Dr. Droter, edited",
  ai: "AI-written",
  label: "AI · label",
};

export interface CorpusSource {
  id: string;
  label: string;
  origin: string;
  chars: number;
  words: number;
  /** Normalized text, one segment (paragraph) per line. */
  text: string;
}

export interface CorpusFile {
  version: number;
  builtAt: string;
  normalization: string;
  shingleSize: number;
  totals: { sources: number; chars: number; words: number; shingles: number };
  sources: CorpusSource[];
}

export interface CorpusIndex {
  /** shingle → index of the first source that contains it */
  shingles: Map<string, number>;
  /** " seg | seg | … " — every segment's tokens, for whole-phrase lookups */
  phrases: string;
  /** start offset of each segment in `phrases`, with its source index */
  offsets: number[];
  offsetSource: number[];
  sources: { id: string; label: string }[];
  words: number;
}

export interface Verdict {
  category: Category;
  words: number;
  shingles: number;
  hits: number;
  score: number;
  /** index into CorpusIndex.sources of the best-matching source, or -1 */
  source: number;
}

export interface TextBlock {
  el: Element;
  /** The block's own text (nested blocks excluded). */
  text: string;
  /** The same text split at line breaks and block-level boundaries. */
  lines: string[];
  /** The text nodes that make up `text`, for highlighting. */
  nodes: Text[];
}

export interface BlockResult extends Verdict, TextBlock {
  path: string;
}

export interface PageSummary {
  totalWords: number;
  totalBlocks: number;
  words: Record<Category, number>;
  blocks: Record<Category, number>;
  share: Record<Category, number>;
}

export interface ScanOptions {
  /** Extra selector whose subtrees are ignored (e.g. the review bar). */
  skip?: string;
  /** Count text inside display:none / visibility:hidden subtrees too. */
  includeHidden?: boolean;
}

export function createProvenance() {
  const N = 5;
  const VERBATIM = 0.85;
  const EDITED = 0.35;

  /** Structural text blocks. Each one owns the text not inside a nested one. */
  const STRUCT = "p,li,h1,h2,h3,h4,h5,h6,dt,dd,figcaption,blockquote,td,th,label,summary";
  /** Leaf-level controls that own their text when no structural block does. */
  const LEAF = "a,button";
  /** Never text, or never page copy. */
  const NEVER = "script,style,noscript,template,svg,math,textarea,select,input,iframe,object,canvas,video,audio";

  const NUMBER_WORDS = new Map<string, string>(
    (
      "zero:0 one:1 two:2 three:3 four:4 five:5 six:6 seven:7 eight:8 nine:9 ten:10 eleven:11 twelve:12 " +
      "thirteen:13 fourteen:14 fifteen:15 sixteen:16 seventeen:17 eighteen:18 nineteen:19 twenty:20 " +
      "thirty:30 forty:40 fifty:50 sixty:60 seventy:70 eighty:80 ninety:90 hundred:100"
    )
      .split(" ")
      .map((p) => p.split(":") as [string, string]),
  );

  /**
   * Corpus-storage normalization: Unicode NFKC, lowercase, curly quotes →
   * straight, every dash → "-", ellipsis → "...", soft hyphens and zero-width
   * spaces removed, whitespace collapsed. Spelling (and typos) untouched.
   */
  function normalize(s: string): string {
    return s
      .normalize("NFKC")
      .replace(/[\u00AD\u200B\u200C\u200D\u2060\uFEFF]/g, "")
      .replace(/[\u2018\u2019\u201A\u201B\u2032\u02BC\u0060\u00B4]/g, "'")
      .replace(/[\u201C\u201D\u201E\u201F\u2033\u00AB\u00BB]/g, '"')
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
      .replace(/\u2026/g, "...")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Words for matching: normalized text split on anything that is not a
   * letter or digit. Apostrophes inside words are dropped ("patient's" →
   * "patients"), "&" reads as "and", digits split from letters ("10mm" →
   * "10 mm"), and number words become digits ("two" → "2") so that pure
   * formatting changes do not count as rewriting.
   */
  function tokenize(s: string): string[] {
    const t = normalize(s)
      .replace(/&/g, " and ")
      .replace(/(\p{L})'(?=\p{L})/gu, "$1")
      .replace(/(\p{N})(?=\p{L})/gu, "$1 ")
      .replace(/(\p{L})(?=\p{N})/gu, "$1 ");
    const out: string[] = [];
    for (const w of t.split(/[^\p{L}\p{N}]+/u)) {
      if (w) out.push(NUMBER_WORDS.get(w) ?? w);
    }
    return out;
  }

  /**
   * A text's runs: its sentences, tokenized. Shingles never cross a sentence
   * end or a line break, on the corpus side and the page side alike, so
   * re-ordering or re-joining his sentences is not mistaken for rewriting.
   */
  function runs(s: string): string[][] {
    return normalize(s)
      .split(/(?<=[.!?]["')\]]?)\s+/)
      .map(tokenize)
      .filter((t) => t.length);
  }

  function buildIndex(corpus: { sources: { id: string; label: string; text: string }[] }): CorpusIndex {
    const shingles = new Map<string, number>();
    const parts: string[] = [];
    const offsets: number[] = [];
    const offsetSource: number[] = [];
    let words = 0;
    let pos = 1; // after the leading space
    corpus.sources.forEach((src, si) => {
      for (const seg of src.text.split("\n")) {
        const toks = tokenize(seg);
        if (!toks.length) continue;
        words += toks.length;
        const joined = toks.join(" ");
        offsets.push(pos);
        offsetSource.push(si);
        parts.push(joined);
        pos += joined.length + 3; // " | "
        for (const run of runs(seg)) {
          for (let i = 0; i + N <= run.length; i++) {
            const k = run.slice(i, i + N).join(" ");
            if (!shingles.has(k)) shingles.set(k, si);
          }
        }
      }
    });
    return {
      shingles,
      phrases: ` ${parts.join(" | ")} `,
      offsets,
      offsetSource,
      sources: corpus.sources.map((s) => ({ id: s.id, label: s.label })),
      words,
    };
  }

  function sourceAt(idx: CorpusIndex, offset: number): number {
    let lo = 0;
    let hi = idx.offsets.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (idx.offsets[mid] <= offset) {
        found = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return found < 0 ? -1 : idx.offsetSource[found];
  }

  /**
   * Classify a block from its lines. Returns null when there are no words.
   *
   * Under 5 words in total: "his" when every line appears whole in the corpus,
   * otherwise "label". Otherwise score = the share of the block's 5-word
   * shingles found in the corpus, taken within each sentence of each line
   * (see runs); a 3–4-word run counts as one unit, found if the whole phrase
   * is in the corpus.
   */
  function classifyText(input: string | string[], idx: CorpusIndex): Verdict | null {
    const lines = typeof input === "string" ? [input] : input;
    const all = lines.flatMap(tokenize);
    const n = all.length;
    if (!n) return null;

    const votes = new Map<number, number>();
    const vote = (si: number) => votes.set(si, (votes.get(si) ?? 0) + 1);
    const best = () => {
      let source = -1;
      let top = 0;
      votes.forEach((v, k) => {
        if (v > top) {
          top = v;
          source = k;
        }
      });
      return source;
    };

    if (n < N) {
      let his = true;
      for (const toks of lines.map(tokenize)) {
        if (!toks.length) continue;
        const at = idx.phrases.indexOf(` ${toks.join(" ")} `);
        if (at < 0) his = false;
        else vote(sourceAt(idx, at + 1));
      }
      return { category: his ? "his" : "label", words: n, shingles: 0, hits: 0, score: his ? 1 : 0, source: his ? best() : -1 };
    }

    // Units: every 5-word shingle of a run, plus each 3–4-word run as a whole
    // (found only if that exact phrase is in his writing). 1–2-word fragments
    // ("Clenching", "Steps 1–2") carry no evidence either way.
    let shingles = 0;
    let hits = 0;
    const shingle = (r: string[]) => {
      for (let i = 0; i + N <= r.length; i++) {
        shingles++;
        const si = idx.shingles.get(r.slice(i, i + N).join(" "));
        if (si !== undefined) {
          hits++;
          vote(si);
        }
      }
    };
    for (const r of lines.flatMap(runs)) {
      if (r.length >= N) shingle(r);
      else if (r.length >= 3) {
        shingles++;
        const at = idx.phrases.indexOf(` ${r.join(" ")} `);
        if (at >= 0) {
          hits++;
          vote(sourceAt(idx, at + 1));
        }
      }
    }
    if (!shingles) shingle(all); // only tiny fragments: shingle the block as one run
    const score = hits / shingles;
    const category: Category = score >= VERBATIM ? "his" : score >= EDITED ? "edited" : "ai";
    return { category, words: n, shingles, hits, score, source: best() };
  }

  /**
   * The page's text blocks, each with its *own* text: p, li, h1–h6, dt, dd,
   * figcaption, blockquote, td, th, label and summary own every text node
   * whose nearest such ancestor they are. Text outside all of those belongs
   * to its leaf-level a/button, or else to the nearest non-inline element
   * (a span or div holding its own text).
   */
  function collectBlocks(root: Element, opts: ScanOptions = {}): TextBlock[] {
    const doc = root.ownerDocument;
    const view = doc.defaultView;
    const skip = opts.skip ? `${NEVER},${opts.skip}` : NEVER;

    const displayCache = new Map<Element, string>();
    const display = (el: Element): string => {
      let d = displayCache.get(el);
      if (d === undefined) {
        d = view ? view.getComputedStyle(el).display : "block";
        displayCache.set(el, d);
      }
      return d;
    };
    const visCache = new Map<Element, boolean>();
    const visible = (el: Element): boolean => {
      if (opts.includeHidden) return true;
      let v = visCache.get(el);
      if (v === undefined) {
        v = typeof el.checkVisibility === "function" ? el.checkVisibility({ visibilityProperty: true, checkVisibilityCSS: true }) : true;
        visCache.set(el, v);
      }
      return v;
    };
    const leafHasStruct = new Map<Element, boolean>();
    const isLeafOwner = (el: Element): boolean => {
      let v = leafHasStruct.get(el);
      if (v === undefined) {
        v = !el.querySelector(STRUCT);
        leafHasStruct.set(el, v);
      }
      return v;
    };

    const ownerOf = new Map<Node, Element>();
    const owners: Element[] = [];
    const nodesOf = new Map<Element, Text[]>();

    const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const data = (node as Text).data;
      if (!data || !/\S/.test(data)) continue;
      const parent = node.parentElement;
      if (!parent || parent.closest(skip) || !visible(parent)) continue;

      let owner: Element | null = parent.closest(STRUCT);
      if (owner && !root.contains(owner)) owner = null;
      if (!owner) {
        const leaf = parent.closest(LEAF);
        if (leaf && root.contains(leaf) && isLeafOwner(leaf)) owner = leaf;
      }
      if (!owner) {
        let el: Element = parent;
        while (el !== root && el.parentElement && !el.matches(LEAF)) {
          const d = display(el);
          if (d !== "inline" && d !== "contents") break;
          el = el.parentElement;
        }
        owner = el;
      }
      ownerOf.set(node, owner);
      const list = nodesOf.get(owner);
      if (list) list.push(node as Text);
      else {
        nodesOf.set(owner, [node as Text]);
        owners.push(owner);
      }
    }

    /** The owner's own text as lines: <br>, block-level children and nested blocks break lines. */
    const ownLines = (owner: Element): string[] => {
      let out = "";
      const walk = (node: Node) => {
        for (let c = node.firstChild; c; c = c.nextSibling) {
          if (c.nodeType === 3) {
            const data = (c as Text).data.replace(/\s+/g, " ");
            if (ownerOf.get(c) === owner) out += data;
            else if (data === " ") out += " "; // spacing between inline elements
          } else if (c.nodeType === 1) {
            const e = c as Element;
            if (e.tagName === "BR" || (e !== owner && nodesOf.has(e))) {
              out += "\n";
              continue;
            }
            if (e.matches(skip)) continue;
            const d = display(e);
            const brk = !d.startsWith("inline") && d !== "contents" ? "\n" : d === "inline" ? "" : " ";
            out += brk;
            walk(e);
            out += brk;
          }
        }
      };
      walk(owner);
      return out
        .split("\n")
        .map((l) => l.replace(/ +/g, " ").trim())
        .filter(Boolean);
    };

    owners.sort((a, b) => (a === b ? 0 : a.compareDocumentPosition(b) & 4 ? -1 : 1));
    const blocks: TextBlock[] = [];
    for (const el of owners) {
      const lines = ownLines(el);
      if (lines.length) blocks.push({ el, text: lines.join(" "), lines, nodes: nodesOf.get(el) ?? [] });
    }
    return blocks;
  }

  /** A readable, near-unique CSS path (stops at an id or a one-of-a-kind landmark). */
  function cssPath(el: Element): string {
    const doc = el.ownerDocument;
    const parts: string[] = [];
    let e: Element | null = el;
    while (e && e.tagName !== "HTML") {
      const tag = e.tagName.toLowerCase();
      if (e.id && /^[A-Za-z][\w-]*$/.test(e.id)) {
        parts.unshift(`${tag}#${e.id}`);
        break;
      }
      let part = tag;
      const cls = Array.from(e.classList).find((c) => /^[A-Za-z][\w-]*$/.test(c));
      if (cls) part += `.${cls}`;
      const parent: Element | null = e.parentElement;
      if (parent) {
        const tagName = e.tagName;
        const same = Array.from(parent.children).filter((c) => c.tagName === tagName);
        if (same.length > 1) part += `:nth-of-type(${same.indexOf(e) + 1})`;
      }
      parts.unshift(part);
      if (tag === "body") break;
      if (/^(main|header|footer|nav|aside)$/.test(tag) && doc.getElementsByTagName(tag).length === 1) break;
      e = parent;
    }
    return parts.join(" > ");
  }

  function scan(root: Element, idx: CorpusIndex, opts: ScanOptions = {}): BlockResult[] {
    const out: BlockResult[] = [];
    for (const b of collectBlocks(root, opts)) {
      const v = classifyText(b.lines, idx);
      if (v) out.push({ ...v, ...b, path: cssPath(b.el) });
    }
    return out;
  }

  function summarize(blocks: { category: Category; words: number }[]): PageSummary {
    const zero = (): Record<Category, number> => ({ his: 0, edited: 0, ai: 0, label: 0 });
    const words = zero();
    const count = zero();
    let totalWords = 0;
    for (const b of blocks) {
      words[b.category] += b.words;
      count[b.category] += 1;
      totalWords += b.words;
    }
    const share = zero();
    for (const k of Object.keys(share) as Category[]) share[k] = totalWords ? words[k] / totalWords : 0;
    return { totalWords, totalBlocks: blocks.length, words, blocks: count, share };
  }

  return { N, VERBATIM, EDITED, normalize, tokenize, runs, buildIndex, classifyText, collectBlocks, cssPath, scan, summarize };
}

export type Provenance = ReturnType<typeof createProvenance>;
