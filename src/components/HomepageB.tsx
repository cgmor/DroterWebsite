"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 } as const,
  }),
};

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--deep-blue)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
          <span className="font-semibold text-[var(--deep-navy)]">
            Dr. Droter
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">Understanding TMD</a>
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">Conditions</a>
          <a href="#" className="hover:text-[var(--deep-navy)] transition-colors">New Patients</a>
          <a
            href="#"
            className="px-5 py-2 bg-[var(--deep-blue)] text-white rounded-full text-sm hover:bg-[var(--medium-blue)] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[var(--soft-gray)] text-[var(--medium-blue)] rounded-full text-sm font-medium mb-6">
              TMJ & Facial Pain Specialist — Bowie, MD
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--deep-navy)] leading-[1.1] mb-6"
          >
            Facial pain has{" "}
            <span className="text-[var(--medium-blue)]">over 190 causes.</span>
            <br />
            We find yours.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-[var(--text-secondary)] max-w-lg mb-8 leading-relaxed"
          >
            Dr. John R. Droter, DDS has spent 40+ years specializing in the
            precise diagnosis and nonsurgical treatment of temporomandibular
            disorders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#"
              className="px-6 py-3 bg-[var(--deep-blue)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--medium-blue)] transition-colors"
            >
              New Patient? Start Here
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-gray-200 text-[var(--deep-navy)] rounded-lg text-sm font-semibold hover:border-[var(--medium-blue)] hover:text-[var(--medium-blue)] transition-colors"
            >
              Understanding TMD
            </a>
          </motion.div>
        </div>

        {/* Right side — trust card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="bg-[var(--soft-gray)] rounded-3xl p-10 relative">
            <div className="absolute top-6 right-6 w-20 h-20 bg-[var(--deep-blue)] rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">40+</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[var(--medium-blue)] mb-4">
              Years of Specialized Practice
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--medium-blue)] font-bold text-sm flex-shrink-0 shadow-sm">
                  Dx
                </div>
                <div>
                  <p className="font-semibold text-[var(--deep-navy)]">
                    190+ Differential Diagnoses
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Systematic identification, not guesswork
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--medium-blue)] font-bold text-sm flex-shrink-0 shadow-sm">
                  Rx
                </div>
                <div>
                  <p className="font-semibold text-[var(--deep-navy)]">
                    70+ Treatment Modalities
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Targeted, nonsurgical therapies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--medium-blue)] font-bold text-sm flex-shrink-0 shadow-sm">
                  🎓
                </div>
                <div>
                  <p className="font-semibold text-[var(--deep-navy)]">
                    University of Maryland — Magna Cum Laude
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Pankey Institute Faculty & National Lecturer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DIFFERENTIATOR BANNER ─── */
function DiffBanner() {
  return (
    <section className="py-12 bg-[var(--deep-navy)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--sky-blue)] text-lg md:text-2xl font-medium"
        >
          &ldquo;TMJ&rdquo; is not a diagnosis — it&rsquo;s a joint. Effective
          treatment requires knowing{" "}
          <span className="text-white font-bold">exactly</span> what&rsquo;s
          wrong.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── WHAT BRINGS YOU HERE ─── */
const concerns = [
  {
    title: "Jaw Locking",
    desc: "Can't open wide or jaw gets stuck",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Headaches & Facial Pain",
    desc: "Chronic pain around temples, jaw, or ear",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Clicking / Popping Jaw",
    desc: "Sounds when opening or chewing",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
  },
  {
    title: "Bite Feels Wrong",
    desc: "Teeth don't align properly anymore",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
];

function Concerns() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-3xl md:text-4xl font-bold text-[var(--deep-navy)] text-center mb-12"
        >
          What Brings You Here?
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {concerns.map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-[var(--medium-blue)] hover:bg-[var(--soft-gray)] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--soft-gray)] group-hover:bg-[var(--medium-blue)] group-hover:text-white text-[var(--medium-blue)] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                {c.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--deep-navy)] mb-0.5">
                  {c.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{c.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── APPROACH ─── */
const steps = [
  {
    step: "1",
    title: "Orthopedic Diagnosis",
    desc: "Systematic physical examination of the joint, muscles, and occlusion with the same rigor applied to any orthopedic problem.",
  },
  {
    step: "2",
    title: "190+ Differential Diagnoses",
    desc: "We identify which of over 190 known TMJ disorders is responsible for your specific symptoms.",
  },
  {
    step: "3",
    title: "70+ Targeted Therapies",
    desc: "Each treatment — from behavioral modification to custom orthotics — is selected for your precise diagnosis.",
  },
];

function ApproachSection() {
  return (
    <section className="py-20 bg-[var(--soft-gray)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-sm uppercase tracking-widest text-[var(--medium-blue)] mb-2 text-center"
        >
          Our Approach
        </motion.p>
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-3xl md:text-4xl font-bold text-[var(--deep-navy)] text-center mb-14"
        >
          Precision, Not Guesswork
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--deep-blue)] text-white flex items-center justify-center font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-[var(--deep-navy)] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONDITIONS GRID ─── */
const conditions = [
  { title: "Clenching", desc: "Habitual jaw clenching causing muscle fatigue and pain" },
  { title: "Sleep Grinding", desc: "Rhythmic grinding during sleep causing wear and joint stress" },
  { title: "Occlusal Muscle Disharmony", desc: "Bite-muscle mismatch causing chronic strain" },
  { title: "Osteoarthritis", desc: "Degenerative joint changes causing pain and stiffness" },
  { title: "Sprain of Discal Ligament", desc: "Acute disc attachment injury causing clicking" },
  { title: "Acute Closed Lock", desc: "Disc displacement preventing full jaw opening" },
];

function ConditionsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-3xl md:text-4xl font-bold text-[var(--deep-navy)] text-center mb-12"
        >
          Common Conditions
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[var(--deep-navy)] mb-1">
                {c.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{c.desc}</p>
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
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 rounded-full bg-[var(--deep-blue)] text-white flex items-center justify-center mx-auto mb-6 text-lg">
            &ldquo;
          </div>
          <blockquote className="text-xl md:text-2xl text-[var(--deep-navy)] leading-relaxed mb-4 font-medium">
            After years of being told &lsquo;it&rsquo;s just TMJ,&rsquo; Dr.
            Droter was the first to actually diagnose what was wrong. The
            difference was immediate.
          </blockquote>
          <p className="text-sm text-[var(--text-secondary)]">
            — Patient Testimonial
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <section className="py-20 bg-[var(--deep-blue)]">
      <div className="max-w-3xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Answers?
          </h2>
          <p className="text-blue-200 mb-8 max-w-lg mx-auto">
            Take the first step toward understanding and treating your facial
            pain with a proper orthopedic diagnosis.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="px-6 py-3 bg-white text-[var(--deep-blue)] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              New Patient? Start Here
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-white/40 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 bg-[var(--deep-navy)] text-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-gray-400">
          <div>
            <p className="text-white font-semibold mb-2">
              Dr. John R. Droter, DDS
            </p>
            <p>4000 Mitchellville Road, Suite 330B</p>
            <p>Bowie, MD 20716</p>
            <p className="mt-1">drdroter@mac.com</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Navigation</p>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white transition-colors">Understanding TMD</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Patients</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">For Professionals</p>
            <p className="text-gray-500">Clinical resources coming soon.</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dr. John R. Droter, DDS. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── FULL PAGE ─── */
export default function HomepageB() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DiffBanner />
      <Concerns />
      <ApproachSection />
      <ConditionsGrid />
      <Testimonial />
      <CtaSection />
      <Footer />
    </main>
  );
}
