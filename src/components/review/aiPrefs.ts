import { useSyncExternalStore } from "react";

/** Review-only preferences for the "Highlight AI text" overlay. */
export interface AiPrefs {
  on: boolean;
  /** Tint Dr. Droter's verbatim text green (unmarked by default). */
  tint: boolean;
  /** Legend panel folded down to a pill. */
  collapsed: boolean;
}

const KEY = "aps-review:ai-highlight";
const OFF: AiPrefs = { on: false, tint: false, collapsed: false };

let current: AiPrefs | null = null;
const listeners = new Set<() => void>();

function readStored(): AiPrefs {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<AiPrefs>;
      return { on: p.on === true, tint: p.tint === true, collapsed: p.collapsed === true };
    }
  } catch {
    /* storage blocked or corrupt: fall back to off */
  }
  return { ...OFF };
}

function persist(p: AiPrefs) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* private mode etc.: state just won't survive a reload */
  }
}

/** First read on the client: stored state, overridden by ?ai=1 / ?ai=0. */
function init(): AiPrefs {
  const p = readStored();
  try {
    const q = new URLSearchParams(window.location.search).get("ai");
    if (q === "1" || q === "0") {
      p.on = q === "1";
      persist(p);
    }
  } catch {
    /* no URL */
  }
  return p;
}

function getSnapshot(): AiPrefs {
  if (!current) current = init();
  return current;
}

function getServerSnapshot(): AiPrefs {
  return OFF;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = readStored();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setAiPrefs(patch: Partial<AiPrefs>) {
  current = { ...getSnapshot(), ...patch };
  persist(current);
  listeners.forEach((l) => l());
}

export function useAiPrefs(): AiPrefs {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
