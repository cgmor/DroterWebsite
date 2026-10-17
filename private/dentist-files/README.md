# private/dentist-files

Read-only fallback for the dentist sharing area (`/apsleep/dentists`,
`/droter/dentists`), used only when `BLOB_READ_WRITE_TOKEN` is not set.
Nothing here is served from `public/`: files are streamed through
`/api/dentists/files/[id]` after the password check. `manifest.json` lists them.
Once the Blob store is connected, Dr. Droter manages files at
`/<site>/dentists/admin` and this folder is ignored.
