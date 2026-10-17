import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getViewer } from "@/lib/dentists/auth";
import { isConfigured } from "@/lib/dentists/session";
import { areaPath, isAreaSite, safeNext } from "@/lib/dentists/config";
import GateCard from "../GateCard";

export const metadata: Metadata = { title: "Shared files for dentists" };

type Props = {
  params: Promise<{ v: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (x: string | string[] | undefined) => (Array.isArray(x) ? x[0] : x);

/** The dentist password page (the QR code lands here). */
export default async function DentistSignIn({ params, searchParams }: Props) {
  const { v } = await params;
  if (!isAreaSite(v)) notFound();
  const q = await searchParams;
  const next = safeNext(one(q.next), v);

  if ((await getViewer()).dentist) redirect(next);

  return (
    <GateCard
      v={v}
      title="Shared files for dentists"
      line="Enter the password from Dr. Droter."
      action="/api/dentists/session"
      submitLabel="See the files"
      error={isConfigured("dentist") ? one(q.error) : "setup"}
      status={one(q["signed-out"]) ? "You're signed out." : undefined}
      next={next !== areaPath.files(v) ? next : undefined}
    />
  );
}
