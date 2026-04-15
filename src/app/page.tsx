import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--soft-gray)] flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--medium-blue)] font-medium mb-3">
            Dr. Droter Website — Homepage Options
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[var(--deep-navy)] mb-4">
            Choose a Direction
          </h1>
          <p className="text-[#4A5568] max-w-lg mx-auto">
            Three distinct homepage concepts for Dr. Droter&rsquo;s TMJ &amp;
            Facial Pain practice. Each follows the PRD but takes a different
            design personality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Option A */}
          <Link
            href="/option-a"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[var(--medium-blue)] hover:shadow-xl transition-all duration-300"
          >
            <div className="h-40 bg-gradient-to-br from-[#0F2340] to-[#1A3B6E] flex items-center justify-center">
              <span className="text-5xl font-bold text-white/20 group-hover:text-white/40 transition-colors font-[family-name:var(--font-playfair)]">
                A
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-[var(--deep-navy)] mb-1">
                Bold &amp; Cinematic
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Full-screen dark hero with dramatic typography, gradient
                backgrounds, and animated orbs. High-impact first impression.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--medium-blue)] group-hover:translate-x-1 transition-transform">
                View →
              </span>
            </div>
          </Link>

          {/* Option B */}
          <Link
            href="/option-b"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[var(--medium-blue)] hover:shadow-xl transition-all duration-300"
          >
            <div className="h-40 bg-gradient-to-br from-white to-[#F0F4F8] flex items-center justify-center border-b border-gray-100">
              <span className="text-5xl font-bold text-gray-200 group-hover:text-[var(--medium-blue)]/30 transition-colors font-[family-name:var(--font-playfair)]">
                B
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-[var(--deep-navy)] mb-1">
                Clean &amp; Clinical
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Light, airy SaaS-style layout with a frosted navbar, split hero
                with trust card, and clean card components.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--medium-blue)] group-hover:translate-x-1 transition-transform">
                View →
              </span>
            </div>
          </Link>

          {/* Option C */}
          <Link
            href="/option-c"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[var(--medium-blue)] hover:shadow-xl transition-all duration-300"
          >
            <div className="h-40 bg-gradient-to-br from-[#F0F4F8] to-[#E2E8F0] flex items-center justify-center">
              <span className="text-5xl font-bold text-[var(--deep-navy)]/10 group-hover:text-[var(--deep-navy)]/25 transition-colors font-[family-name:var(--font-playfair)] italic">
                C
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-[var(--deep-navy)] mb-1">
                Warm &amp; Editorial
              </h2>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Narrow, content-focused layout inspired by editorial design.
                Serif headings, generous whitespace, storytelling rhythm.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--medium-blue)] group-hover:translate-x-1 transition-transform">
                View →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
