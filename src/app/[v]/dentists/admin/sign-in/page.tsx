import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getViewer } from "@/lib/dentists/auth";
import { isConfigured } from "@/lib/dentists/session";
import { areaPath, isAreaSite } from "@/lib/dentists/config";
import GateCard from "../../GateCard";

export const metadata: Metadata = { title: "Manage shared files" };

type Props = {
  params: Promise<{ v: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Dr. Droter's own password page, for adding and removing files. */
export default async function AdminSignIn({ params, searchParams }: Props) {
  const { v } = await params;
  if (!isAreaSite(v)) notFound();
  const q = await searchParams;

  if ((await getViewer()).admin) redirect(areaPath.admin(v));

  const error = Array.isArray(q.error) ? q.error[0] : q.error;
  return (
    <GateCard
      v={v}
      title="Manage shared files"
      line="Enter the admin password."
      action="/api/dentists/admin/session"
      submitLabel="Sign in"
      error={isConfigured("admin") ? error : "setup"}
    />
  );
}
