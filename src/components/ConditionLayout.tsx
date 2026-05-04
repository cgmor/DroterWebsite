"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export interface ConditionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ConditionData {
  slug: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  overview: string[];
  pullQuote?: string;
  symptoms: {
    primary: string[];
    secondary?: string[];
  };
  diagnosis?: string[];
  treatments: {
    category: string;
    items: string[];
  }[];
  images?: ConditionImage[];
  diagram?: ReactNode;
  importantNotes?: string[];
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-5 bg-[var(--deep-navy)] border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white uppercase tracking-[0.15em] leading-none"
        >
          Droter<span className="text-[var(--sky-blue)]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="/#understanding-tmd" className="hover:text-white transition-colors">Understanding TMD</Link>
          <Link href="/#about" className="hover:text-white transition-colors">Meet Dr. Droter</Link>
          <Link href="/#new-patients" className="hover:text-white transition-colors">Get Relief</Link>
          <Link href="/#for-dentists" className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[var(--medium-blue)] text-white rounded-full hover:bg-[var(--sky-blue)] hover:text-[var(--deep-navy)] transition-colors">
            For Dentists
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[var(--deep-navy)] text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3">Dr. John R. Droter, DDS</h4>
            <p>TMJ & Facial Pain Specialist</p>
            <p className="mt-2">4000 Mitchellville Road, Suite 330B</p>
            <p>Bowie, MD 20716</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/#understanding-tmd" className="hover:text-white transition-colors">Understanding TMD</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Dr. Droter</Link></li>
              <li><Link href="/#new-patients" className="hover:text-white transition-colors">New Patients</Link></li>
              <li><Link href="/#for-dentists" className="hover:text-white transition-colors">For Dentists</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Contact</h4>
            <p>drdroter@mac.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dr. John R. Droter, DDS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function ConditionLayout({ condition }: { condition: ConditionData }) {
  return (
    <main>
      <Navbar />

      {/* Hero — editorial, left-aligned */}
      <section className="relative pt-28 pb-16 bg-[var(--deep-navy)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-[var(--deep-blue)] opacity-20 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link
              href="/#understanding-tmd"
              className="inline-flex items-center gap-2 text-sm text-[var(--sky-blue)] hover:text-white transition-colors mb-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              All conditions
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--sky-blue)]">
                {condition.subtitle}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
              {condition.title}
            </h1>

            <div className="flex items-start gap-5">
              <div className="w-1 bg-[var(--sky-blue)] rounded-full self-stretch flex-shrink-0" />
              <p className="text-lg text-gray-300 leading-relaxed">
                {condition.heroDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview — long-form editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-10"
          >
            What is {condition.title}?
          </motion.h2>

          {condition.overview.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`text-[17px] text-[var(--text-secondary)] leading-[1.8] ${
                i < condition.overview.length - 1 ? "mb-6" : ""
              }`}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Pull quote — breaks up the text wall */}
          {condition.pullQuote && (
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="my-12 pl-6 border-l-2 border-[var(--medium-blue)]"
            >
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[var(--deep-navy)] italic leading-relaxed">
                {condition.pullQuote}
              </p>
            </motion.blockquote>
          )}
        </div>

        {/* Diagram — full bleed within content area */}
        {condition.diagram && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 mt-12"
          >
            {condition.diagram}
          </motion.div>
        )}

        {/* Images from the doc — each one full width, stacked */}
        {condition.images && condition.images.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 mt-12 space-y-8">
            {condition.images.map((img, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg overflow-hidden bg-[#1a1a2e]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
                {img.caption && (
                  <figcaption className="text-xs text-gray-400 px-5 py-3 italic bg-[#1a1a2e]">
                      {img.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
          </div>
        )}
      </section>

      {/* Symptoms — asymmetric layout, not a grid of identical cards */}
      <section className="py-20 bg-[var(--soft-gray)]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-3"
          >
            Signs &amp; symptoms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--text-secondary)] mb-10"
          >
            Common indicators that you may be experiencing this condition.
          </motion.p>

          {/* Primary — prominent */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <ul className="space-y-4">
              {condition.symptoms.primary.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--deep-navy)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--deep-navy)] text-[17px] leading-relaxed font-medium">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Secondary — quieter, indented */}
          {condition.symptoms.secondary && condition.symptoms.secondary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-11"
            >
              <p className="text-sm uppercase tracking-widest text-[var(--text-secondary)] mb-4">
                Also associated with
              </p>
              <div className="flex flex-wrap gap-2">
                {condition.symptoms.secondary.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-white rounded-full text-sm text-[var(--text-secondary)] border border-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Diagnosis — timeline style */}
      {condition.diagnosis && condition.diagnosis.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-10"
            >
              How it&rsquo;s diagnosed
            </motion.h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />

              <div className="space-y-8">
                {condition.diagnosis.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-5 items-start relative"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--deep-navy)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                      {i + 1}
                    </div>
                    <p className="text-[17px] text-[var(--text-secondary)] leading-relaxed pt-1">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Treatments — staggered, not a uniform grid */}
      <section className="py-20 bg-[var(--deep-navy)]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Treatment approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-12"
          >
            Every treatment plan is tailored to your specific diagnosis. These are the typical approaches Dr. Droter considers.
          </motion.p>

          <div className="space-y-6">
            {condition.treatments.map((t, i) => (
              <motion.div
                key={t.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border-l-2 border-[var(--sky-blue)] pl-6"
              >
                <h3 className="text-white font-semibold mb-3">{t.category}</h3>
                <ul className="space-y-1.5">
                  {t.items.map((item) => (
                    <li key={item} className="text-gray-400 text-[15px] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes — feels like a real aside, not a generated callout */}
      {condition.importantNotes && condition.importantNotes.length > 0 && (
        <section className="py-14 bg-[var(--soft-gray)]">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-[var(--deep-navy)] uppercase tracking-wider mb-4">
                Worth knowing
              </p>
              {condition.importantNotes.map((note, i) => (
                <p
                  key={i}
                  className={`text-[var(--text-secondary)] leading-relaxed ${
                    i < condition.importantNotes!.length - 1 ? "mb-4" : ""
                  }`}
                >
                  {note}
                </p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA — simple, not overdesigned */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-[var(--deep-navy)] mb-2">
              Think this might be you?
            </h2>
            <p className="text-[var(--text-secondary)]">
              An accurate diagnosis changes everything.
            </p>
          </div>
          <Link
            href="/#new-patients"
            className="px-6 py-3 bg-[var(--deep-navy)] text-white rounded-md font-medium hover:bg-[var(--deep-blue)] transition-colors flex-shrink-0"
          >
            Get Relief Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
