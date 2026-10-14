import { createProvenance, type CorpusFile, type CorpusIndex } from "./classify";

/** The classifier, shared by the overlay. */
export const provenance = createProvenance();

export const CORPUS_URL = "/aps/provenance/corpus.json";

export interface LoadedCorpus {
  index: CorpusIndex;
  builtAt: string;
  sources: number;
  words: number;
}

let pending: Promise<LoadedCorpus> | null = null;

/** Fetches the corpus once per page load and builds the shingle index. */
export function loadCorpus(): Promise<LoadedCorpus> {
  if (!pending) {
    const p = fetch(CORPUS_URL, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`${CORPUS_URL} returned ${r.status}`);
        return r.json() as Promise<CorpusFile>;
      })
      .then((c) => ({
        index: provenance.buildIndex(c),
        builtAt: c.builtAt,
        sources: c.totals.sources,
        words: c.totals.words,
      }));
    p.catch(() => {
      if (pending === p) pending = null; // allow a retry
    });
    pending = p;
  }
  return pending;
}
