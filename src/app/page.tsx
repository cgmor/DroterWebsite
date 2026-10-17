import Image from "next/image";
import Link from "next/link";
import ApsLogo from "@/components/shared/ApsLogo";
import { sitePages, sites } from "@/content/sites";

export const metadata = {
  title: "APSleep.com and drdroter.com — Drafts for review",
};

export default function ReviewIndex() {
  return (
    <main
      className="min-h-screen bg-[#F4F4F2] text-[#16191D]"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-24">
        <header className="flex flex-col gap-8 border-b border-black/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ApsLogo variant="lockup" className="mb-10 h-9 w-auto text-[#2b2b2b]" />
            <h1 className="max-w-[18ch] text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px]">
              Two sites, one design
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-black/65">
              APSleep.com covers airway and sleep, for patients and dentists. drdroter.com is the
              practice, focused on TMD and facial pain. They share one design and stay separate.
            </p>
          </div>
          <Image
            src="/aps/airway-bite/kit-label.jpg"
            alt="APS Airway Bite Kit label"
            width={160}
            height={267}
            className="hidden w-[120px] rounded-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] sm:block"
          />
        </header>

        <ol className="mt-4 divide-y divide-black/10">
          {sites.map((v) => (
            <li key={v.id} className="grid gap-6 py-10 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <h2 className="text-[26px] font-semibold tracking-[-0.01em]">{v.domain}</h2>
                <p className="mt-1 text-[16px] text-black/50">{v.focus}</p>
                <p className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-black/65">{v.idea}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {sitePages[v.id].map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${v.id}${p.slug ? `/${p.slug}` : ""}`}
                        className="inline-block rounded-full border border-black/15 px-3.5 py-1.5 text-[14px] text-black/75 transition-colors hover:border-black/40 hover:text-black"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/${v.id}`}
                className="inline-flex items-center justify-center rounded-full bg-[#16191D] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-black"
              >
                Open {v.domain}
              </Link>
            </li>
          ))}
        </ol>

        <footer className="mt-10 border-t border-black/10 pt-8 text-[14px] leading-relaxed text-black/50">
          Drafts only, not yet live. Items marked “coming soon” are waiting on files from
          Dr. Droter. apsleep.com/airway-bite will keep working at launch so the kit’s QR code
          still resolves.
        </footer>
      </div>
    </main>
  );
}
