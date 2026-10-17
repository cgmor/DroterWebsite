import type { NextRequest } from "next/server";
import { handleSignIn } from "@/lib/dentists/sign-in";

/** Dentist password form (POST). */
export function POST(req: NextRequest) {
  return handleSignIn(req, "dentist");
}
