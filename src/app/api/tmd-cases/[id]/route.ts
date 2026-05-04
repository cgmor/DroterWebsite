import { NextRequest, NextResponse } from "next/server";
import { deleteCase, updateCase, type QuizCase } from "@/lib/cases-store";

export const dynamic = "force-dynamic";

interface IncomingCase {
  primary?: string;
  primaryCustom?: string;
  secondaries?: string[];
  secondaryCustom?: string;
  answers?: Record<string, string>;
  notes?: string;
}

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/tmd-cases/[id]">
) {
  const { id } = await ctx.params;

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
    const updated = await updateCase(id, payload);
    if (!updated) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }
    return NextResponse.json({ case: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/tmd-cases/[id]">
) {
  const { id } = await ctx.params;
  try {
    const removed = await deleteCase(id);
    if (!removed) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
