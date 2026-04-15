"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--soft-gray)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[var(--deep-navy)]">
          Dr. Droter
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">TMD Guide</a>
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">Conditions</a>
          <a href="#" className="px-4 py-1.5 bg-[var(--deep-navy)] text-white rounded-md text-sm hover:bg-[var(--deep-blue)] transition-colors">
            New Patients
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-28 pb-24 bg-[var(--soft-gray)]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px flex-1 bg-[var(--deep-navy)]/20" />
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--medium-blue)] font-medium">
            TMJ & Facial Pain — Bowie, Maryland
          </span>
          <div className="h-px flex-1 bg-[var(--deep-navy)]/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--deep-navy)] leading-[1.08] mb-8"
        >
          Facial pain has over 190 causes.{" "}
          <span className="italic text-[var(--medium-blue)]">
            We find yours.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-6 mb-10"
        >
          <div className="w-1 bg-[var(--medium-blue)] rounded-full self-stretch flex-shrink-0" />
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Dr. John R. Droter, DDS has spent over four decades advancing the
            precise, orthopedic diagnosis and nonsurgical treatment of
            temporomandibular disorders. His practice is built on a simple
            principle: you can&rsquo;t treat what you haven&rsquo;t accurately
            diagnosed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#"
            className="px-6 py-3 bg-[var(--deep-navy)] text-white rounded-md font-medium hover:bg-[var(--deep-blue)] transition-colors"
          >
            New Patient? Start Here
          </a>
          <a
            href="#approach"
            className="px-6 py-3 text-[var(--deep-navy)] font-medium hover:text-[var(--medium-blue)] transition-colors"
          >
            Read about our approach ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PULL QUOTE ─── */
function PullQuote() {
  return (
    <section className="py-16 bg-[var(--deep-navy)]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white font-bold leading-snug"
        >
          &ldquo;TMJ&rdquo; is not a diagnosis.
          <span className="text-[var(--sky-blue)]"> It&rsquo;s a joint.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-gray-400 max-w-xl mx-auto"
        >
          The temporomandibular joint is one of the most complex in the human
          body. Over 190 distinct disorders can affect it. Treatment without an
          accurate diagnosis is just guessing.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── WHAT BRINGS YOU HERE ─── */
const concerns = [
  { title: "Jaw Locking", desc: "Can't open wide, or jaw gets stuck in position" },
  { title: "Headaches & Facial Pain", desc: "Chronic pain around your temples, jaw, or ear" },
  { title: "Clicking / Popping Jaw", desc: "Sounds or sensations when opening or chewing" },
  { title: "Bite Feels Wrong", desc: "Your teeth don't come together like they used to" },
];

function WhatBringsYou() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-10"
        >
          What brings you here?
        </motion.h2>

        <div className="space-y-4">
          {concerns.map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              className="group flex items-center justify-between p-5 border border-gray-150 rounded-lg hover:border-[var(--medium-blue)] hover:bg-[var(--soft-gray)] transition-all duration-200"
            >
              <div>
                <h3 className="font-semibold text-[var(--deep-navy)] group-hover:text-[var(--medium-blue)] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {c.desc}
                </p>
              </div>
              <span className="text-gray-300 group-hover:text-[var(--medium-blue)] group-hover:translate-x-1 transition-all text-xl">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── THE APPROACH ─── */
function Approach() {
  return (
    <section id="approach" className="py-20 bg-[var(--soft-gray)]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-xs uppercase tracking-[0.25em] text-[var(--medium-blue)] mb-3"
        >
          The Approach
        </motion.p>
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-12"
        >
          Precision over guesswork.
        </motion.h2>

        <div className="space-y-10">
          {[
            {
              num: "01",
              title: "Orthopedic Diagnosis",
              text: "A systematic, evidence-based physical examination of the joint, muscles, and occlusion — applying the same rigor as any orthopedic evaluation.",
            },
            {
              num: "02",
              title: "190+ Differential Diagnoses",
              text: "Your pain is not a mystery. We methodically identify which of over 190 documented TMJ disorders is responsible for your symptoms.",
            },
            {
              num: "03",
              title: "70+ Targeted Therapies",
              text: "From behavioral modification to custom orthotics, every treatment is chosen and sequenced to address your precise diagnosis — nothing more, nothing less.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex gap-6 items-start"
            >
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[var(--deep-navy)]/10 flex-shrink-0 leading-none pt-1">
                {item.num}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--deep-navy)] mb-1">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ─── */
function TrustStrip() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { big: "40+", small: "Years of Practice" },
            { big: "190+", small: "Differential Diagnoses" },
            { big: "70+", small: "Treatment Modalities" },
            { big: "Magna Cum Laude", small: "University of Maryland '85" },
          ].map((s, i) => (
            <motion.div
              key={s.small}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-2xl font-bold text-[var(--deep-navy)]">
                {s.big}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {s.small}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONDITIONS ─── */
const conditionsList = [
  { title: "Clenching", desc: "Habitual jaw clenching causing muscle fatigue and chronic pain." },
  { title: "Sleep Grinding (Bruxism)", desc: "Rhythmic grinding during sleep leading to wear, pain, and joint stress." },
  { title: "Occlusal Muscle Disharmony", desc: "When the bite and jaw muscles aren't working in harmony." },
  { title: "Osteoarthritis of the TMJ", desc: "Degenerative changes causing pain, stiffness, and crepitus." },
  { title: "Sprain of the Discal Ligament", desc: "Acute injury to the disc attachment causing sudden pain." },
  { title: "Acute Closed Lock", desc: "The disc displaces and the jaw cannot fully open." },
];

function Conditions() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[var(--deep-navy)] mb-10"
        >
          Common conditions we treat
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {conditionsList.map((c, i) => (
            <motion.div
              key={c.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-5 bg-[var(--soft-gray)] rounded-lg"
            >
              <h3 className="font-semibold text-[var(--deep-navy)] mb-1">
                {c.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIAL ─── */
function Testimonial() {
  return (
    <section className="py-20 bg-[var(--soft-gray)]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-[var(--deep-navy)]/10 mb-10" />
          <blockquote className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[var(--deep-navy)] leading-relaxed italic">
            &ldquo;After years of being told &lsquo;it&rsquo;s just TMJ,&rsquo;
            Dr. Droter was the first to actually diagnose what was wrong. The
            difference was immediate.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            — Patient Testimonial
          </p>
          <div className="h-px bg-[var(--deep-navy)]/10 mt-10" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DENTIST TEASER ─── */
function DentistTeaser() {
  return (
    <section className="py-16 bg-[var(--deep-navy)]">
      <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sky-blue)] mb-1">
            Coming Soon
          </p>
          <h3 className="text-xl font-bold">For Dental Professionals</h3>
          <p className="text-sm text-gray-400 mt-1">
            Case studies, diagnostic protocols & continuing education
          </p>
        </div>
        <a
          href="#"
          className="px-5 py-2.5 border border-[var(--sky-blue)] text-[var(--sky-blue)] rounded-md text-sm font-medium hover:bg-[var(--sky-blue)] hover:text-[var(--deep-navy)] transition-all duration-200 flex-shrink-0"
        >
          Get Notified
        </a>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 bg-[var(--deep-navy)] border-t border-white/5 text-sm text-gray-500">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-white font-semibold">
              Dr. John R. Droter, DDS
            </p>
            <p className="mt-1">4000 Mitchellville Road, Suite 330B</p>
            <p>Bowie, MD 20716</p>
          </div>
          <div className="text-right">
            <p>drdroter@mac.com</p>
            <div className="flex gap-4 mt-2 md:justify-end">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs">
          &copy; {new Date().getFullYear()} Dr. John R. Droter, DDS. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── FULL PAGE ─── */
export default function HomepageC() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PullQuote />
      <WhatBringsYou />
      <Approach />
      <TrustStrip />
      <Conditions />
      <Testimonial />
      <DentistTeaser />
      <Footer />
    </main>
  );
}
