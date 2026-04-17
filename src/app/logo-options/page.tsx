"use client";

import { useState } from "react";

const options = [
  {
    id: "A",
    label: "Bold Sans — Large, heavy weight, tight tracking",
    render: (
      <span className="text-[28px] font-extrabold text-white tracking-[-0.03em] leading-none">
        Droter.
      </span>
    ),
  },
  {
    id: "B",
    label: "Medium Weight — Slightly lighter, wider letter-spacing",
    render: (
      <span className="text-2xl font-semibold text-white tracking-[0.02em] leading-none">
        Droter.
      </span>
    ),
  },
  {
    id: "C",
    label: "All Caps — Uppercase, spaced out, commanding",
    render: (
      <span className="text-xl font-bold text-white uppercase tracking-[0.15em] leading-none">
        Droter.
      </span>
    ),
  },
  {
    id: "D",
    label: "Accent Dot — Bold wordmark with colored period",
    render: (
      <span className="text-[28px] font-extrabold text-white tracking-[-0.03em] leading-none">
        Droter<span className="text-[var(--sky-blue)]">.</span>
      </span>
    ),
  },
  {
    id: "E",
    label: "Frosted Pill — Logo inside a subtle frosted container",
    render: (
      <span className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
        <span className="text-xl font-bold text-white tracking-[-0.02em] leading-none">
          Droter.
        </span>
      </span>
    ),
  },
];

export default function LogoOptionsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[var(--deep-navy)]">
      {/* Show all 5 options as navbars stacked */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Logo Options</h1>
        <p className="text-gray-400 mb-10">
          Each option is shown as it would appear in the top-left navbar over
          the dark hero. Click one to see it full-width.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto px-6 pb-10">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full text-left rounded-xl border transition-all duration-200 ${
              selected === opt.id
                ? "border-[var(--sky-blue)] bg-white/5"
                : "border-white/10 hover:border-white/20 bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-6">
                <span className="text-sm font-mono text-gray-500 w-6">
                  {opt.id}
                </span>
                {opt.render}
              </div>
              <span className="text-sm text-gray-500 hidden sm:block">
                {opt.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Full-width preview of selected option */}
      {selected && (
        <div className="border-t border-white/10 mt-4">
          <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Full-width preview — Option {selected}
            </p>
          </div>
          <nav className="w-full px-6 py-5 bg-white/[0.03] backdrop-blur-sm border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {options.find((o) => o.id === selected)?.render}
              <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                <span>About</span>
                <span>Understanding TMD</span>
                <span>Conditions</span>
                <span className="px-4 py-1.5 bg-[var(--medium-blue)] text-white rounded-full text-sm">
                  New Patients
                </span>
              </div>
            </div>
          </nav>

          {/* Mock hero area to give context */}
          <div className="h-[50vh] flex items-center justify-center">
            <div className="text-center px-6">
              <p className="uppercase tracking-[0.3em] text-[var(--sky-blue)] text-sm mb-4">
                TMJ &amp; Facial Pain Specialist
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold text-white leading-tight">
                Facial Pain Has
                <br />
                <span className="text-[var(--sky-blue)]">Over 190 Causes.</span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
