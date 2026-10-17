/**
 * Signed session cookies for the dentist area, built on Web Crypto so the
 * proxy and the route handlers share one implementation.
 *
 * A token is `<role>.<expires>.<nonce>.<signature>`. The signature is an
 * HMAC-SHA256 (DENTIST_SESSION_SECRET) over the first three parts plus a
 * fingerprint of the current password for that role, so changing a password
 * signs everyone out. Missing or short secrets fail closed: nothing verifies.
 */
import type { Role } from "./config";
import { SESSION_TTL } from "./config";

const ROLE_CODE: Record<Role, string> = { dentist: "d", admin: "a" };
const MIN_SECRET = 32;
const MIN_PASSWORD = 8;

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(value: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const bin = atob(value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4));
    const out = new Uint8Array(new ArrayBuffer(bin.length));
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

/** Passwords are said aloud ("maple harbor velvet forty-two"), so case, spaces and dashes don't matter. */
export function normalizePassword(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function secret(): string {
  return process.env.DENTIST_SESSION_SECRET ?? "";
}

function passwordFor(role: Role): string {
  return normalizePassword((role === "admin" ? process.env.ADMIN_PASSWORD : process.env.DENTIST_PASSWORD) ?? "");
}

/** Is sign-in possible for this role (secret and password both set)? */
export function isConfigured(role: Role): boolean {
  return secret().length >= MIN_SECRET && passwordFor(role).length >= MIN_PASSWORD;
}

let keyCache: { secret: string; key: Promise<CryptoKey> } | null = null;

function hmacKey(): Promise<CryptoKey> {
  const s = secret();
  if (!keyCache || keyCache.secret !== s) {
    keyCache = {
      secret: s,
      key: crypto.subtle.importKey("raw", enc.encode(s), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]),
    };
  }
  return keyCache.key;
}

async function fingerprint(role: Role): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(`${ROLE_CODE[role]}:${passwordFor(role)}`));
  return b64url(digest).slice(0, 22);
}

async function signedPayload(role: Role, expires: number, nonce: string): Promise<Uint8Array<ArrayBuffer>> {
  return enc.encode(`${ROLE_CODE[role]}.${expires}.${nonce}.${await fingerprint(role)}`);
}

/** A fresh token for `role`, or null when the area isn't configured. */
export async function createSession(role: Role, now = Date.now()): Promise<string | null> {
  if (!isConfigured(role)) return null;
  const expires = Math.floor(now / 1000) + SESSION_TTL[role];
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(12)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), await signedPayload(role, expires, nonce));
  return `${ROLE_CODE[role]}.${expires}.${nonce}.${b64url(sig)}`;
}

/** True only for an unexpired token of this role, signed with the current secret and password. */
export async function verifySession(token: string | undefined | null, role: Role, now = Date.now()): Promise<boolean> {
  if (!token || token.length > 256 || !isConfigured(role)) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [code, exp, nonce, sig] = parts;
  if (code !== ROLE_CODE[role] || !/^\d{9,12}$/.test(exp) || !/^[A-Za-z0-9_-]{16}$/.test(nonce)) return false;
  const expires = Number(exp);
  if (expires * 1000 <= now || expires * 1000 > now + SESSION_TTL[role] * 1000 + 60_000) return false;
  const sigBytes = fromB64url(sig);
  if (!sigBytes || sigBytes.length !== 32) return false;
  try {
    return await crypto.subtle.verify("HMAC", await hmacKey(), sigBytes, await signedPayload(role, expires, nonce));
  } catch {
    return false;
  }
}

/**
 * Constant-time password check: HMAC both sides with the session secret and
 * let `subtle.verify` compare them.
 */
export async function checkPassword(input: string, role: Role): Promise<boolean> {
  if (!isConfigured(role)) return false;
  const candidate = normalizePassword(input.slice(0, 200));
  if (!candidate) return false;
  const key = await hmacKey();
  const expected = await crypto.subtle.sign("HMAC", key, enc.encode(`pw:${ROLE_CODE[role]}:${passwordFor(role)}`));
  return crypto.subtle.verify("HMAC", key, expected, enc.encode(`pw:${ROLE_CODE[role]}:${candidate}`));
}

/** Who is this request? An admin session also opens the dentist pages. */
export async function rolesFrom(get: (name: string) => string | undefined, cookieNames: Record<Role, string>) {
  const admin = await verifySession(get(cookieNames.admin), "admin");
  const dentist = admin || (await verifySession(get(cookieNames.dentist), "dentist"));
  return { admin, dentist };
}
