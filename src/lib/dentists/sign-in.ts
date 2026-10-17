/**
 * The password forms post here (plain HTML forms, so they work without
 * JavaScript). A right password sets the signed cookie and goes on; a wrong
 * one goes back to the form with a reason.
 */
import type { NextRequest } from "next/server";
import { areaPath, isAreaSite, safeNext, type AreaSite, type Role } from "./config";
import { clearSessionCookies, isSameOrigin, seeOther, setSessionCookie } from "./auth";
import { clearFailures, clientKey, failureDelay, recordFailure, retryAfter } from "./rate-limit";
import { checkPassword, createSession, isConfigured } from "./session";

function field(form: FormData | null, name: string): string {
  const v = form?.get(name);
  return typeof v === "string" ? v : "";
}

export async function handleSignIn(req: NextRequest, role: Role) {
  const form = await req.formData().catch(() => null);
  const siteField = field(form, "site");
  const site: AreaSite = isAreaSite(siteField) ? siteField : "apsleep";
  const home = role === "admin" ? areaPath.admin(site) : areaPath.files(site);
  const next = role === "admin" ? home : safeNext(field(form, "next"), site);
  const formPath = role === "admin" ? areaPath.adminSignIn(site) : areaPath.signIn(site);

  const back = (error: string) => {
    const q = new URLSearchParams({ error });
    if (next !== home) q.set("next", next);
    return seeOther(req, `${formPath}?${q}`);
  };

  if (!isSameOrigin(req)) return back("expired");
  if (!isConfigured(role)) return back("setup");

  const key = clientKey(req.headers, role);
  const wait = retryAfter(key);
  if (wait > 0) return back("wait");

  if (!(await checkPassword(field(form, "password"), role))) {
    recordFailure(key);
    await failureDelay();
    return back(retryAfter(key) > 0 ? "wait" : "wrong");
  }

  const token = await createSession(role);
  if (!token) return back("setup");
  clearFailures(key);
  const res = seeOther(req, next);
  setSessionCookie(res, req, role, token);
  return res;
}

export async function handleSignOut(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const siteField = field(form, "site");
  const site: AreaSite = isAreaSite(siteField) ? siteField : "apsleep";
  const res = seeOther(req, `${areaPath.signIn(site)}?signed-out=1`);
  if (isSameOrigin(req)) clearSessionCookies(res, req);
  return res;
}
