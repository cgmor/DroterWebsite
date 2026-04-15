"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--deep-navy)]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-[var(--deep-blue)] opacity-30 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-[var(--medium-blue)] opacity-20 blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.3em] text-[var(--sky-blue)] text-sm mb-6"
        >
          TMJ &amp; Facial Pain Specialist — Bowie, Maryland
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8"
        >
          Facial Pain Has
          <br />
          <span className="text-[var(--sky-blue)]">Over 190 Causes.</span>
          <br />
          We Find Yours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Dr. John R. Droter, DDS — 40 years specializing in the diagnosis and
          nonsurgical treatment of temporomandibular disorders and facial pain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#new-patient"
            className="px-8 py-4 bg-[var(--medium-blue)] hover:bg-[var(--sky-blue)] text-white hover:text-[var(--deep-navy)] rounded-full text-lg font-semibold transition-all duration-300"
          >
            New Patient? Start Here
          </a>
          <a
            href="#approach"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Our Approach
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── WHAT BRINGS YOU HERE ─── */
const conditions = [
  {
    icon: "🔒",
    title: "Jaw Locking",
    desc: "Can't open wide or jaw gets stuck in position",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: "⚡",
    title: "Headaches & Facial Pain",
    desc: "Chronic pain around temples, jaw, or ear",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    icon: "🔊",
    title: "Clicking / Popping Jaw",
    desc: "Sounds or sensations when opening or chewing",
    color: "from-cyan-600 to-cyan-800",
  },
  {
    icon: "😬",
    title: "Bite Feels Wrong",
    desc: "Teeth don't come together like they used to",
    color: "from-sky-600 to-sky-800",
  },
];

function WhatBringsYou() {
  return (
    <section className="py-24 bg-[var(--soft-gray)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[var(--deep-navy)] text-center mb-4"
        >
          What Brings You Here?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-[var(--text-secondary)] mb-14 text-lg"
        >
          Select a concern to learn more
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {conditions.map((c, i) => (
            <motion.a
              key={c.title}
              variants={fadeUp}
              custom={i}
              href="#"
              className={`group relative rounded-2xl bg-gradient-to-br ${c.color} p-8 text-white overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <span className="text-4xl mb-4 block">{c.icon}</span>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-white/80">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DIFFERENTIATOR ─── */
function Differentiator() {
  return (
    <section className="py-24 bg-[var(--deep-navy)] text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-[0.25em] text-[var(--sky-blue)] text-sm mb-6">
            An Important Distinction
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold leading-tight">
            &ldquo;TMJ&rdquo; is not a diagnosis.
            <br />
            <span className="text-[var(--sky-blue)]">It&rsquo;s a joint.</span>
          </h2>
          <p className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The temporomandibular joint is one of the most complex in the human
            body. Over 190 distinct disorders can affect it. Effective treatment
            demands a precise, orthopedic diagnosis — not a generic label.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── THE APPROACH ─── */
const approaches = [
  {
    number: "01",
    title: "Orthopedic Diagnosis",
    desc: "A systematic, evidence-based physical examination of the joint, muscles, and occlusion — the same rigor applied to any orthopedic problem.",
  },
  {
    number: "02",
    title: "190+ Differential Diagnoses",
    desc: "Your pain is not a mystery. We systematically identify which of over 190 known TMJ disorders is responsible for your specific symptoms.",
  },
  {
    number: "03",
    title: "70+ Targeted Therapies",
    desc: "From behavioral modification to custom orthotics, each treatment is selected and sequenced to address your precise diagnosis.",
  },
];

function Approach() {
  return (
    <section id="approach" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="uppercase tracking-[0.25em] text-[var(--medium-blue)] text-sm mb-4 text-center"
        >
          The Approach
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[var(--deep-navy)] text-center mb-16"
        >
          Precision Over Guesswork
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {approaches.map((a, i) => (
            <motion.div
              key={a.number}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <span className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-[var(--soft-gray)] block mb-4">
                {a.number}
              </span>
              <h3 className="text-xl font-bold text-[var(--deep-navy)] mb-3">
                {a.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST BAR ─── */
const stats = [
  { value: "40+", label: "Years of Practice" },
  { value: "190+", label: "Differential Diagnoses" },
  { value: "70+", label: "Treatment Modalities" },
  { value: "Magna\nCum Laude", label: "University of Maryland" },
];

function TrustBar() {
  return (
    <section className="py-16 bg-[var(--deep-blue)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white whitespace-pre-line">
                {s.value}
              </div>
              <div className="text-sm text-[var(--sky-blue)] mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMMON CONDITIONS ─── */
const commonConditions = [
  {
    title: "Clenching",
    desc: "Habitual daytime or nocturnal jaw clenching causing muscle fatigue and pain.",
  },
  {
    title: "Sleep Grinding (Bruxism)",
    desc: "Rhythmic grinding of teeth during sleep leading to wear, pain, and joint stress.",
  },
  {
    title: "Occlusal Muscle Disharmony",
    desc: "When the bite and jaw muscles are not working together, causing chronic strain.",
  },
  {
    title: "Osteoarthritis of the TMJ",
    desc: "Degenerative changes in the jaw joint causing pain, stiffness, and crepitus.",
  },
  {
    title: "Sprain of the Discal Ligament",
    desc: "Acute injury to the disc attachment causing sudden pain and clicking.",
  },
  {
    title: "Acute Closed Lock",
    desc: "The disc displaces and the jaw cannot fully open — often sudden and alarming.",
  },
];

function CommonConditions() {
  return (
    <section className="py-24 bg-[var(--soft-gray)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[var(--deep-navy)] text-center mb-14"
        >
          Common Conditions We Treat
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonConditions.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[var(--medium-blue)] hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--deep-navy)] mb-2">
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
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <svg
            className="w-12 h-12 text-[var(--sky-blue)] mx-auto mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[var(--deep-navy)] leading-relaxed mb-6">
            After years of being told &lsquo;it&rsquo;s just TMJ,&rsquo; Dr.
            Droter was the first to actually diagnose what was wrong. The
            difference was immediate.
          </blockquote>
          <p className="text-[var(--text-secondary)] font-semibold">
            — Patient Testimonial
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOR DENTISTS TEASER ─── */
function DentistTeaser() {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--deep-navy)] to-[var(--deep-blue)]">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.2em] text-[var(--sky-blue)] text-sm mb-4">
            Coming Soon
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold mb-4">
            For Dental Professionals
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            A dedicated clinical resource with case studies, diagnostic
            protocols, and continuing education — curated from 40 years of
            specialized practice.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 border border-[var(--sky-blue)] text-[var(--sky-blue)] rounded-full hover:bg-[var(--sky-blue)] hover:text-[var(--deep-navy)] transition-all duration-300"
          >
            Get Notified
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-12 bg-[var(--deep-navy)] text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3">
              Dr. John R. Droter, DDS
            </h4>
            <p>TMJ & Facial Pain Specialist</p>
            <p className="mt-2">4000 Mitchellville Road, Suite 330B</p>
            <p>Bowie, MD 20716</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Understanding TMD
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Common Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  New Patients
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Contact</h4>
            <p>drdroter@mac.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dr. John R. Droter, DDS. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── FULL PAGE ─── */
export default function HomepageA() {
  return (
    <main>
      <Hero />
      <WhatBringsYou />
      <Differentiator />
      <Approach />
      <TrustBar />
      <CommonConditions />
      <Testimonial />
      <DentistTeaser />
      <Footer />
    </main>
  );
}
