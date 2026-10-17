/**
 * Session checks for pages and route handlers. The proxy checks first (an
 * optimistic redirect); every page and handler checks again here.
 */
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, PRIVATE_HEADERS, SESSION_TTL, withPrivateHeaders, type Role } from "./config";
import { rolesFrom } from "./session";

export type Viewer = { admin: boolean; dentist: boolean };

/** In a Server Component. */
export async function getViewer(): Promise<Viewer> {
  const jar = await cookies();
  return rolesFrom((n) => jar.get(n)?.value, COOKIE);
}

/** In a route handler. */
export function viewerFrom(req: NextRequest): Promise<Viewer> {
  return rolesFrom((n) => req.cookies.get(n)?.value, COOKIE);
}

/** Cookies are Secure everywhere except plain-http local development. */
function secureFor(req: NextRequest): boolean {
  return process.env.NODE_ENV === "production" || req.nextUrl.protocol === "https:";
}

export function setSessionCookie(res: NextResponse, req: NextRequest, role: Role, token: string) {
  res.cookies.set(COOKIE[role], token, {
    httpOnly: true,
    secure: secureFor(req),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL[role],
  });
}

export function clearSessionCookies(res: NextResponse, req: NextRequest) {
  for (const role of ["dentist", "admin"] as const) {
    res.cookies.set(COOKIE[role], "", { httpOnly: true, secure: secureFor(req), sameSite: "lax", path: "/", maxAge: 0 });
  }
}

/** A POST from another site is refused (the Lax cookie already isn't sent; this is belt and braces). */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** 303 to a path in this deployment, with the area's headers. */
export function seeOther(req: NextRequest, pathAndQuery: string): NextResponse {
  return withPrivateHeaders(NextResponse.redirect(new URL(pathAndQuery, req.nextUrl.origin), 303));
}

export function jsonError(status: number, error: string): NextResponse {
  return NextResponse.json({ error }, { status, headers: PRIVATE_HEADERS });
}
