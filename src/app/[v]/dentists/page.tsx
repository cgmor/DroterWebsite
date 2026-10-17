import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button, ButtonLink } from "@/components/site/Button";
import { Section, SectionHead } from "@/components/site/Section";
import { getViewer } from "@/lib/dentists/auth";
import { areaPath, isAreaSite } from "@/lib/dentists/config";
import { isListed, listFiles, type DentistFile } from "@/lib/dentists/store";
import FileMeta, { fileHref } from "./FileMeta";
import s from "./dentists.module.css";

export const metadata: Metadata = { title: "Shared files for dentists" };

/**
 * The shared files, as dentists see them: what Dr. Droter has made visible
 * and that is not past its last day ("download it for a week, and then it's
 * gone"). One list for both sites.
 */
export default async function DentistFiles({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isAreaSite(v)) notFound();
  const viewer = await getViewer();
  if (!viewer.dentist) redirect(areaPath.signIn(v));

  let files: DentistFile[] | null = null;
  try {
    files = (await listFiles()).filter((f) => isListed(f));
  } catch {
    files = null;
  }

  return (
    <Section space="md" labelledBy="files-title">
      <div className={s.column}>
        <SectionHead as="h1" id="files-title" layout="center" title="Shared files for dentists" />

        {files === null ? (
          <div className={s.empty} role="alert">
            <p className={s.emptyTitle}>The files couldn&rsquo;t be loaded.</p>
            <p className={s.emptyLine}>Reload the page in a minute.</p>
          </div>
        ) : files.length === 0 ? (
          <div className={s.empty}>
            <p className={s.emptyTitle}>No files are shared right now.</p>
            <p className={s.emptyLine}>Files Dr. Droter shares appear here.</p>
          </div>
        ) : (
          <ul className={s.files}>
            {files.map((f) => (
              <li key={f.id} className={s.file}>
                <div className={s.fileMain}>
                  <h2 className={s.fileTitle}>
                    <a href={fileHref(f.id)} target="_blank" rel="noopener" className={s.fileLink}>
                      {f.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h2>
                  {f.note && <p className={s.fileNote}>{f.note}</p>}
                  <FileMeta file={f} />
                </div>
                <div className={s.fileActions}>
                  <ButtonLink href={fileHref(f.id, true)} variant="secondary" size="sm" icon="download" plain download>
                    Download<span className="sr-only">: {f.title}</span>
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={s.areaFoot}>
          {viewer.admin && (
            <ButtonLink href={areaPath.admin(v)} variant="quiet">
              Manage files
            </ButtonLink>
          )}
          <form method="post" action="/api/dentists/signout">
            <input type="hidden" name="site" value={v} />
            <Button type="submit" variant="quiet" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
