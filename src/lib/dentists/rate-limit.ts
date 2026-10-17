/**
 * Simple in-memory backoff for the two password forms. Five free tries per
 * address in fifteen minutes, then a lockout that doubles from 30 seconds up
 * to 15 minutes. Per server instance, which is enough against guessing a
 * three-word password; the cookie signature does the real work.
 */

type Entry = { fails: number; first: number; lockedUntil: number };

const WINDOW_MS = 15 * 60 * 1000;
const FREE_TRIES = 5;
const BASE_LOCK_MS = 30 * 1000;
const MAX_LOCK_MS = 15 * 60 * 1000;
const MAX_ENTRIES = 5000;

const buckets = new Map<string, Entry>();

function prune(now: number) {
  if (buckets.size < MAX_ENTRIES) return;
  for (const [k, e] of buckets) if (now - e.first > WINDOW_MS && e.lockedUntil < now) buckets.delete(k);
  if (buckets.size >= MAX_ENTRIES) buckets.clear();
}

/** The client address as the platform reports it. */
export function clientKey(headers: Headers, scope: string): string {
  const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = fwd || headers.get("x-real-ip")?.trim() || "local";
  return `${scope}:${ip}`;
}

/** Seconds to wait, or 0 when a try is allowed now. */
export function retryAfter(key: string, now = Date.now()): number {
  const e = buckets.get(key);
  if (!e) return 0;
  if (now - e.first > WINDOW_MS && e.lockedUntil <= now) {
    buckets.delete(key);
    return 0;
  }
  return e.lockedUntil > now ? Math.ceil((e.lockedUntil - now) / 1000) : 0;
}

export function recordFailure(key: string, now = Date.now()) {
  prune(now);
  const e = buckets.get(key) ?? { fails: 0, first: now, lockedUntil: 0 };
  e.fails += 1;
  if (e.fails >= FREE_TRIES) {
    e.lockedUntil = now + Math.min(MAX_LOCK_MS, BASE_LOCK_MS * 2 ** (e.fails - FREE_TRIES));
  }
  buckets.set(key, e);
}

export function clearFailures(key: string) {
  buckets.delete(key);
}

/** A short, jittered pause after a wrong password. */
export function failureDelay(): Promise<void> {
  return new Promise((r) => setTimeout(r, 350 + Math.floor(Math.random() * 300)));
}
