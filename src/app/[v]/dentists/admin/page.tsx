import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button, ButtonLink } from "@/components/site/Button";
import { Section, SectionHead } from "@/components/site/Section";
import { getViewer } from "@/lib/dentists/auth";
import { areaPath, isAreaSite, todayInArea, type AreaSite } from "@/lib/dentists/config";
import { LIMITS } from "@/lib/dentists/fields";
import { canUpload, isExpired, listFiles, type DentistFile } from "@/lib/dentists/store";
import FileMeta, { fileHref } from "../FileMeta";
import ConfirmSubmit from "./ConfirmSubmit";
import DateField from "./DateField";
import UploadForm from "./UploadForm";
import s from "../dentists.module.css";

export const metadata: Metadata = { title: "Manage shared files" };

const DONE: Record<string, string> = {
  added: "File added.",
  saved: "Changes saved.",
  shown: "The file is visible to dentists.",
  hidden: "The file is hidden from dentists.",
  deleted: "File deleted.",
};

const ERRORS: Record<string, string> = {
  title: "Give the file a title.",
  date: "That date isn't valid.",
  missing: "That file is no longer in the list.",
  storage: "The file storage didn't respond. Try again.",
  expired: "The form expired. Try again.",
  unknown: "Something went wrong. Try again.",
};

type Props = {
  params: Promise<{ v: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (x: string | string[] | undefined) => (Array.isArray(x) ? x[0] : x);

/**
 * Dr. Droter's page: add a file, choose what dentists see, set a last day,
 * delete. Uploads need the Blob store; without it the list is read-only.
 */
export default async function ManageFiles({ params, searchParams }: Props) {
  const { v } = await params;
  if (!isAreaSite(v)) notFound();
  if (!(await getViewer()).admin) redirect(areaPath.adminSignIn(v));

  const q = await searchParams;
  const done = DONE[one(q.done) ?? ""];
  const error = ERRORS[one(q.error) ?? ""];
  const editing = one(q.edit);
  const writable = canUpload();

  let files: DentistFile[] | null = null;
  try {
    files = await listFiles();
  } catch {
    files = null;
  }
  const today = todayInArea();

  return (
    <Section space="md" labelledBy="manage-title">
      <div className={s.column}>
        <SectionHead
          as="h1"
          id="manage-title"
          layout="center"
          title="Manage shared files"
          lead="Visible files are listed for dentists on both sites, behind their password."
        />

        {(done || error) && (
          <p className={`${s.flash} ${error ? s.flashError : ""}`} role={error ? "alert" : "status"}>
            {error ?? done}
          </p>
        )}

        <section className={s.panel} aria-labelledby="add-title">
          <div className={s.panelHead}>
            <h2 id="add-title" className={s.panelTitle}>
              Add a file
            </h2>
          </div>
          {writable ? (
            <UploadForm v={v} />
          ) : (
            <p className={s.notice}>
              Uploads need the file storage connected. Until it is, this list is read-only and shows the placeholder file.
            </p>
          )}
        </section>

        <div className={s.listHead}>
          <h2 className="t-h3">Files</h2>
          {files && files.length > 0 && (
            <p className={s.count}>
              {files.length} {files.length === 1 ? "file" : "files"}
            </p>
          )}
        </div>

        {files === null ? (
          <div className={s.empty} role="alert">
            <p className={s.emptyTitle}>The files couldn&rsquo;t be loaded.</p>
            <p className={s.emptyLine}>Reload the page in a minute.</p>
          </div>
        ) : files.length === 0 ? (
          <div className={s.empty}>
            <p className={s.emptyTitle}>No files yet.</p>
            <p className={s.emptyLine}>Add one above. Dentists see it once it&rsquo;s visible.</p>
          </div>
        ) : (
          <ul className={s.files}>
            {files.map((f) => (
              <AdminRow key={f.id} v={v} file={f} expired={isExpired(f, today)} editing={editing === f.id} writable={writable} />
            ))}
          </ul>
        )}

        <div className={s.areaFoot}>
          <ButtonLink href={areaPath.files(v)} variant="quiet">
            See the page dentists see
          </ButtonLink>
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

function AdminRow({ v, file: f, expired, editing, writable }: { v: AreaSite; file: DentistFile; expired: boolean; editing: boolean; writable: boolean }) {
  const action = `/api/dentists/admin/files/${encodeURIComponent(f.id)}`;
  const state = !f.visible ? "Hidden" : expired ? "Ended" : "Visible";
  return (
    <li className={s.file} id={`file-${f.id}`}>
      <div className={s.fileMain}>
        <h3 className={s.fileTitle}>
          <a href={fileHref(f.id)} target="_blank" rel="noopener" className={s.fileLink}>
            {f.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {f.note && <p className={s.fileNote}>{f.note}</p>}
        <FileMeta file={f} state={state} expired={expired} />
      </div>

      <div className={s.fileActions}>
        <form method="post" action={action}>
          <input type="hidden" name="site" value={v} />
          <input type="hidden" name="intent" value={f.visible ? "hide" : "show"} />
          <Button type="submit" variant="secondary" size="sm" disabled={!writable}>
            {f.visible ? "Hide" : "Show"}
            <span className="sr-only">: {f.title}</span>
          </Button>
        </form>
        {writable && !editing && (
          <ButtonLink href={`${areaPath.admin(v)}?edit=${encodeURIComponent(f.id)}#file-${f.id}`} variant="secondary" size="sm" icon="none">
            Edit<span className="sr-only">: {f.title}</span>
          </ButtonLink>
        )}
        <form method="post" action={action}>
          <input type="hidden" name="site" value={v} />
          <ConfirmSubmit title={f.title} disabled={!writable} />
        </form>
      </div>

      {writable && editing && (
        <form method="post" action={action} className={s.editForm} aria-label={`Edit ${f.title}`}>
          <input type="hidden" name="site" value={v} />
          <input type="hidden" name="intent" value="update" />
          <div className={s.uploadGrid}>
            <div className={s.field}>
              <label htmlFor={`edit-title-${f.id}`} className={s.label}>
                Title
              </label>
              <input id={`edit-title-${f.id}`} name="title" className={s.input} defaultValue={f.title} maxLength={LIMITS.title} required />
            </div>
            <DateField id={`edit-until-${f.id}`} defaultValue={f.availableUntil} />
            <div className={`${s.field} ${s.span2}`}>
              <label htmlFor={`edit-note-${f.id}`} className={s.label}>
                Note <span className={s.optional}>(optional)</span>
              </label>
              <textarea id={`edit-note-${f.id}`} name="note" className={s.input} defaultValue={f.note ?? ""} maxLength={LIMITS.note} rows={3} />
            </div>
          </div>
          <div className={s.editActions}>
            <Button type="submit" size="sm">
              Save changes
            </Button>
            <ButtonLink href={`${areaPath.admin(v)}#file-${f.id}`} variant="quiet" icon="none">
              Cancel
            </ButtonLink>
          </div>
        </form>
      )}
    </li>
  );
}
