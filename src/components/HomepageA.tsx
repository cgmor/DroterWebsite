"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-5 bg-white/[0.03] backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xl font-bold text-white uppercase tracking-[0.15em] leading-none">
          Droter<span className="text-[var(--sky-blue)]">.</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#understanding-tmd" className="hover:text-white transition-colors">Understanding TMD</a>
          <a href="#about" className="hover:text-white transition-colors">Meet Dr. Droter</a>
          <a href="#new-patients" className="hover:text-white transition-colors">Get Relief</a>
          <a href="#for-dentists" className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[var(--medium-blue)] text-white rounded-full hover:bg-[var(--sky-blue)] hover:text-[var(--deep-navy)] transition-colors">
            For Dentists
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

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
            href="#new-patients"
            className="px-8 py-4 bg-[var(--medium-blue)] hover:bg-[var(--sky-blue)] text-white hover:text-[var(--deep-navy)] rounded-full text-lg font-semibold transition-all duration-300"
          >
            Get Relief Now
          </a>
          <a
            href="#understanding-tmd"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Understanding TMD
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

/* ─── SECTION 1: UNDERSTANDING TMD ─── */
const commonConditions = [
  { title: "Clenching", slug: "clenching", desc: "Habitual daytime or nocturnal jaw clenching causing muscle fatigue and pain." },
  { title: "Sleep Grinding (Bruxism)", slug: "sleep-grinding", desc: "Rhythmic grinding of teeth during sleep leading to wear, pain, and joint stress." },
  { title: "Occlusal Muscle Disharmony", slug: "occlusal-muscle-disharmony", desc: "When the bite and jaw muscles are not working together, causing chronic strain." },
  { title: "Osteoarthritis of the TMJ", slug: "osteoarthritis", desc: "Degenerative changes in the jaw joint causing pain, stiffness, and crepitus." },
  { title: "Sprain of the Discal Ligament", slug: "sprain-discal-ligament", desc: "Acute injury to the disc attachment causing sudden pain and clicking." },
  { title: "Acute Closed Lock", slug: "acute-closed-lock", desc: "The disc displaces and the jaw cannot fully open — often sudden and alarming." },
  { title: "Anterior Open Bite", slug: "anterior-open-bite", desc: "When the front teeth no longer come together, affecting chewing and speech." },
  { title: "Sleep Breathing Disorders", slug: "sleep-breathing-disorders", desc: "Airway-related conditions including snoring and obstructive sleep apnea linked to jaw position." },
  { title: "Tight and Sore Neck Muscles", slug: "neck-pain", desc: "Chronic neck tension and pain resulting from jaw dysfunction and postural compensation." },
];

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

function UnderstandingTMD() {
  return (
    <section id="understanding-tmd">
      {/* Differentiator */}
      <div className="py-24 bg-[var(--deep-navy)] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.25em] text-[var(--sky-blue)] text-sm mb-6">
              Understanding TMD
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
      </div>

      {/* The Approach */}
      <div className="py-24 bg-white">
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
      </div>

      {/* Common Conditions */}
      <div className="py-24 bg-[var(--soft-gray)]">
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
              >
                <Link
                  href={`/conditions/${c.slug}`}
                  className="group block bg-white rounded-xl p-6 border border-gray-100 hover:border-[var(--medium-blue)] hover:shadow-lg transition-all duration-300 h-full"
                >
                  <h3 className="text-lg font-bold text-[var(--deep-navy)] mb-2 group-hover:text-[var(--medium-blue)] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[var(--medium-blue)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: ABOUT DR. DROTER ─── */
const credentials = [
  { value: "40+", label: "Years of Specialized Practice" },
  { value: "190+", label: "Differential Diagnoses" },
  { value: "70+", label: "Treatment Modalities" },
];

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="uppercase tracking-[0.25em] text-[var(--medium-blue)] text-sm mb-4 text-center"
        >
          About
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[var(--deep-navy)] text-center mb-16"
        >
          Dr. John R. Droter, DDS
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start -mt-8">
          {/* Bio */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="pt-16"
          >
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              A graduate of the University of Maryland School of Dentistry
              (1985, Magna Cum Laude), Dr. Droter has devoted his career to the
              diagnosis and nonsurgical treatment of temporomandibular disorders
              and facial pain.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              His advanced training spans the L.D. Pankey Institute, the Center
              for Advanced Dental Study, the University of Florida Facial Pain
              Center, and UCSD — equipping him with a uniquely comprehensive
              approach to orofacial pain.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              A faculty member at the Pankey Institute and a nationally
              recognized lecturer, Dr. Droter utilizes specialized diagnostic
              tools including EMG, computerized jaw tracking, and CT/MRI
              interpretation to build precise treatment plans.
            </p>
          </motion.div>

          {/* Dr. Droter cartoon */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex items-start justify-center"
          >
            <Image
              src="/DroterCartoon.png"
              alt="Dr. John R. Droter"
              width={280}
              height={280}
              className="rounded-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Credentials bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          className="mt-8 bg-[var(--soft-gray)] rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { main: "University of Maryland", sub: "Magna Cum Laude, 1985" },
              { main: "L.D. Pankey Institute", sub: "Faculty Member" },
              { main: "University of Florida", sub: "Facial Pain Center" },
              { main: "Dentistry Today", sub: "National Recognition" },
            ].map((item) => (
              <div key={item.main} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[var(--medium-blue)] flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <div>
                  <span className="text-sm font-semibold text-[var(--deep-navy)] block">{item.main}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
            {credentials.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--deep-navy)]">
                  {s.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: NEW PATIENTS ─── */
const quizOptions = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Jaw Locking",
    desc: "Can't open wide or jaw gets stuck in position",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: "Headaches & Facial Pain",
    desc: "Chronic pain around temples, jaw, or ear",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
    title: "Clicking / Popping Jaw",
    desc: "Sounds or sensations when opening or chewing",
    color: "from-cyan-600 to-cyan-800",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    title: "Bite Feels Wrong",
    desc: "Teeth don't come together like they used to",
    color: "from-sky-600 to-sky-800",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: "Daily Fatigue",
    desc: "Persistent tiredness linked to jaw tension and sleep disruption",
    color: "from-blue-700 to-indigo-900",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      </svg>
    ),
    title: "Neck Pain",
    desc: "Chronic neck tension and soreness from jaw dysfunction",
    color: "from-teal-600 to-teal-800",
  },
];

function NewPatients() {
  return (
    <section id="new-patients" className="py-24 bg-[var(--deep-navy)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="uppercase tracking-[0.25em] text-[var(--sky-blue)] text-sm mb-4 text-center"
        >
          New Patients
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white text-center mb-6"
        >
          What Brings You Here?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-center text-gray-400 mb-14 text-lg max-w-2xl mx-auto"
        >
          Every patient&rsquo;s path is different. Select your primary concern
          below to begin your assessment and learn what to expect at your first
          visit.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quizOptions.map((c, i) => (
            <motion.a
              key={c.title}
              variants={fadeUp}
              custom={i}
              href="#"
              className={`group relative rounded-2xl bg-gradient-to-br ${c.color} p-8 text-white overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <span className="mb-4 block">{c.icon}</span>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-white/80">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Start assessment →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: FOR DENTISTS ─── */
function ForDentists() {
  return (
    <section id="for-dentists" className="py-20 bg-gradient-to-br from-[var(--deep-navy)] to-[var(--deep-blue)]">
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
                <a href="#understanding-tmd" className="hover:text-white transition-colors">
                  Understanding TMD
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Dr. Droter
                </a>
              </li>
              <li>
                <a href="#new-patients" className="hover:text-white transition-colors">
                  New Patients
                </a>
              </li>
              <li>
                <a href="#for-dentists" className="hover:text-white transition-colors">
                  For Dentists
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
      <Navbar />
      <Hero />
      <UnderstandingTMD />
      <About />
      <NewPatients />
      <ForDentists />
      <Footer />
    </main>
  );
}
