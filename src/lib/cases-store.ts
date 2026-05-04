import { Redis } from "@upstash/redis";
import { promises as fs } from "node:fs";
import path from "node:path";

export interface QuizCase {
  id: string;
  primary: string;
  primaryCustom?: string;
  secondaries: string[];
  secondaryCustom?: string;
  answers: Record<string, string>;
  notes?: string;
  timestamp: string;
}

const KEY = "tmd:cases";
const FILE = path.join(process.cwd(), ".data", "tmd-cases.json");

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

function ensureLocalFsAllowed() {
  if (process.env.VERCEL) {
    throw new Error(
      "Upstash Redis is not configured. On Vercel, connect a Redis store via the Marketplace (Storage → Create → Redis). Required env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN."
    );
  }
}

async function readFile(): Promise<QuizCase[]> {
  ensureLocalFsAllowed();
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as QuizCase[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeFile(cases: QuizCase[]): Promise<void> {
  ensureLocalFsAllowed();
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(cases, null, 2), "utf8");
}

export async function listCases(): Promise<QuizCase[]> {
  if (redis) {
    const data = await redis.get<QuizCase[]>(KEY);
    return data ?? [];
  }
  return readFile();
}

async function saveAll(cases: QuizCase[]): Promise<void> {
  if (redis) {
    await redis.set(KEY, cases);
    return;
  }
  await writeFile(cases);
}

export async function addCase(
  data: Omit<QuizCase, "id" | "timestamp">
): Promise<QuizCase> {
  const cases = await listCases();
  const entry: QuizCase = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  cases.push(entry);
  await saveAll(cases);
  return entry;
}

export async function updateCase(
  id: string,
  data: Omit<QuizCase, "id" | "timestamp">
): Promise<QuizCase | null> {
  const cases = await listCases();
  const idx = cases.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updated: QuizCase = {
    ...data,
    id,
    timestamp: new Date().toISOString(),
  };
  cases[idx] = updated;
  await saveAll(cases);
  return updated;
}

export async function deleteCase(id: string): Promise<boolean> {
  const cases = await listCases();
  const next = cases.filter((c) => c.id !== id);
  if (next.length === cases.length) return false;
  await saveAll(next);
  return true;
}

export const storageBackend = hasUpstash ? "upstash" : "file";
