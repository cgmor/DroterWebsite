import type { NextRequest } from "next/server";
import { handleSignOut } from "@/lib/dentists/sign-in";

/** Signs out of both the dentist and the admin session (POST). */
export function POST(req: NextRequest) {
  return handleSignOut(req);
}
