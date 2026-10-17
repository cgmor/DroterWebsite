/**
 * Proxy (Next 16's name for middleware). It runs only for the dentist sharing
 * area, on both sites, and its API (see `config.matcher`):
 *
 *   1. AI agents, crawlers, link previewers and scripts get a 403.
 *   2. No valid session → the password page (pages) or a 401 (API).
 *   3. Everything that passes gets noindex / no-store headers.
 *
 * This is the optimistic check. Every page and route handler verifies the
 * session again (src/lib/dentists/auth.ts).
 */
import { NextResponse, type NextRequest } from "next/server";
import { isBlockedAgent } from "@/lib/dentists/bots";
import { areaPath, COOKIE, isAreaSite, PRIVATE_HEADERS, withPrivateHeaders } from "@/lib/dentists/config";
import { rolesFrom } from "@/lib/dentists/session";

/** API paths anyone (who isn't a bot) may call: the two password forms and sign-out. */
const OPEN_API = new Set(["/session", "/admin/session", "/signout"]);

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (isBlockedAgent(req.headers.get("user-agent"))) {
    return new NextResponse("Forbidden", { status: 403, headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" } });
  }

  const viewer = await rolesFrom((n) => req.cookies.get(n)?.value, COOKIE);

  if (pathname === "/api/dentists" || pathname.startsWith("/api/dentists/")) {
    const rest = pathname.slice("/api/dentists".length);
    if (!OPEN_API.has(rest)) {
      const allowed = rest.startsWith("/admin/") ? viewer.admin : viewer.dentist;
      if (!allowed) return NextResponse.json({ error: "Sign in first." }, { status: 401, headers: PRIVATE_HEADERS });
    }
    return withPrivateHeaders(NextResponse.next());
  }

  const m = /^\/([^/]+)\/dentists(\/.*)?$/.exec(pathname);
  const site = m?.[1];
  if (!m || !isAreaSite(site)) return withPrivateHeaders(NextResponse.next());
  const rest = m[2] ?? "";

  if (rest === "/sign-in" || rest === "/admin/sign-in") return withPrivateHeaders(NextResponse.next());

  if (rest === "/admin" || rest.startsWith("/admin/")) {
    if (!viewer.admin) return withPrivateHeaders(NextResponse.redirect(new URL(areaPath.adminSignIn(site), req.url)));
  } else if (!viewer.dentist) {
    const to = new URL(areaPath.signIn(site), req.url);
    const here = pathname + search;
    if (here !== areaPath.files(site)) to.searchParams.set("next", here);
    return withPrivateHeaders(NextResponse.redirect(to));
  }

  return withPrivateHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/:site(apsleep|droter)/dentists",
    "/:site(apsleep|droter)/dentists/:path*",
    "/api/dentists",
    "/api/dentists/:path*",
  ],
};
