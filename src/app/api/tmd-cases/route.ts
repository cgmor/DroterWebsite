import { NextRequest, NextResponse } from "next/server";
import {
  addCase,
  detectedEnv,
  listCases,
  storageBackend,
  type QuizCase,
} from "@/lib/cases-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = detectedEnv();
  try {
    const cases = await listCases();
    return NextResponse.json({ backend: storageBackend, env, cases });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message, backend: storageBackend, env },
      { status: 500 }
    );
  }
}

interface IncomingCase {
  primary?: string;
  primaryCustom?: string;
  secondaries?: string[];
  secondaryCustom?: string;
  answers?: Record<string, string>;
  notes?: string;
}

export async function POST(req: NextRequest) {
  let body: IncomingCase;
  try {
    body = (await req.json()) as IncomingCase;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const primary = (body.primary ?? "").trim();
  if (!primary) {
    return NextResponse.json(
      { error: "primary diagnosis is required" },
      { status: 400 }
    );
  }

  const payload: Omit<QuizCase, "id" | "timestamp"> = {
    primary,
    primaryCustom: body.primaryCustom?.trim() || undefined,
    secondaries: Array.isArray(body.secondaries) ? body.secondaries : [],
    secondaryCustom: body.secondaryCustom?.trim() || undefined,
    answers: body.answers ?? {},
    notes: body.notes?.trim() || undefined,
  };

  try {
    const entry = await addCase(payload);
    return NextResponse.json({ case: entry }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
