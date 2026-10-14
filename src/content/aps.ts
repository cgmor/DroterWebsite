/**
 * Shared content for the APSleep.com redesign (ArrowPath Sleep).
 *
 * Every design version renders from this file so that the copy stays identical
 * across versions and Dr. Droter is comparing design, not wording.
 *
 * Sources: the live apsleep.com / drdroter.com pages (verbatim where possible),
 * the Aug 2026 Airway Bite IFU (APS Airway Bite Instructions 26.8), the kit
 * label, and Dr. Droter's own emails.
 *
 * Content rules (from the client — do not break these in any version):
 *  - No "treat" / "treatment" in headings (state dental boards).
 *  - Never "FDA approved" or "FDA registered".
 *  - No price and no checkout. Ordering goes through Great Lakes Dental.
 *  - Never publish his questionnaires (FPQ, Occlusion screen, Sleep Fatigue screen).
 *  - Never use the cartoon of Dr. Droter; real photography only.
 */

export const brand = {
  name: "ArrowPath Sleep",
  short: "APS",
  domain: "APSleep.com",
  legalName: "ArrowPath Sleep LLC",
  tagline: "Helping you to a vibrant, well rested, pain free life.",
  logo: {
    // Final logo files come from the asset pipeline (see public/aps/brand/).
    mark: "/aps/brand/aps-mark.svg",
    lockup: "/aps/brand/aps-logo.svg",
  },
};

export const distributor = {
  name: "Great Lakes Dental",
  url: "https://greatlakesdentaltech.com/",
  /** His IFU: "Order from: Great Lakes Dental". */
  cta: "Order from Great Lakes Dental",
  note: "Order from: Great Lakes Dental",
};

export const contact = {
  officePhone: "301-805-9400",
  company: {
    name: "ArrowPath Sleep LLC",
    /** As printed on his kit label. */
    lines: ["8230 Leesburg Pike Ste 660", "Vienna, VA 22182"],
  },
  practice: {
    name: "John R. Droter, DDS",
    // Suite number is inconsistent across sources (330B / B330 / B328) — confirm.
    lines: ["4000 Mitchellville Road, Suite B330", "Bowie, MD 20716"],
  },
};

/* ───────────────────────── Airway Bite ───────────────────────── */

export type AirwayStep = {
  n: number;
  title: string;
  body: string;
};

export type AirwayPhase = {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
  steps: AirwayStep[];
};

export const airwayBite = {
  name: "ArrowPath Sleep Airway Bite",
  shortName: "Airway Bite",
  kitName: "APS Airway Bite Kit",
  category: "Bite registration",

  /*
   * Everything below is Dr. Droter's own wording unless marked. Sources:
   *  - IFU = his one-page instructions PDF (APS Airway Bite Instructions 26.8, author JRDroter)
   *  - IFU slides = the four instruction slides he made (text transcribed verbatim)
   *  - Email = his Aug 14 2026 "Marketing" email
   *  - Narration = his voiceover on the tutorial animation
   *  - Label = the kit label he approved
   * Only obvious typos are corrected ("loose" → "lose", "rest on hold" → "rest and hold").
   */

  /** Email + IFU slide 1. */
  purpose:
    "To make airway devices you need to record the best jaw position for the airway and relate this to the lab.",

  /** Email (his advantages list). */
  summary: "Easier and quicker to use. Disposable. No need to sterilize parts.",

  /** IFU slides 2 and 4. */
  summaryLong: [
    "Measure and mark the amount of protrusive you want to build into the Mandibular Advancement Device. 50% is typically a good place to start.",
    "Take digital scan bite with anterior stop in place and jaw positioned forward. Send to lab digitally. Can also be used to take silicone bite registration.",
  ],

  /** IFU slide 2. */
  useWhen: "Measure and mark the amount of protrusive you want to build into the Mandibular Advancement Device.",

  /** Narration (titles are fragments of the same narration). */
  airwayStory: [
    {
      title: "When you’re sleeping",
      body: "When you’re sleeping, your airway in patients can be very narrow and you have trouble getting air through.",
    },
    {
      title: "Position the jaw further forward",
      body: "But if you move the jaw, position the jaw further forward, the airway is more open. It gets rid of snoring, can get rid of obstructive sleep apnea.",
    },
    {
      title: "How far do you move it forward?",
      body: "The question is, how far do you move it forward? Forward too far, it’s uncomfortable, but not far enough, the airway does not open.",
    },
  ],

  /** Email (his advantages list), IFU slides and the meeting transcript. Title = his sentence. */
  advantages: [
    { title: "Easier and quicker to use.", body: "Within five minutes I had the bite done." },
    { title: "Disposable.", body: "No need to sterilize parts." },
    { title: "No parts to lose or keep track of.", body: "" },
    { title: "Patients tapping on device relaxes the muscles before taking the airway bite.", body: "" },
    { title: "Send to lab digitally.", body: "Can also be used to take silicone bite registration." },
    { title: "Jaw is now held stable in forward position.", body: "" },
  ],

  /** Label. */
  kit: {
    contents: ["(1) APS Airway Bite", "(1) Ruler", "(1) Pencil"],
    notes: ["Single Patient Use Only", "Made in USA"],
    line: "APS Airway Bite Kit. Includes: (1) APS Airway Bite, (1) Ruler, (1) Pencil. Single Patient Use Only.",
    labelImage: "/aps/airway-bite/kit-label.jpg",
  },

  /** Materials named in his IFU, in his words. */
  youWillNeed: [
    "Parkell Blu-Mousse Super Fast",
    "Flowable composite",
    "Digital scanner",
    "Silicone, if not using a digital scanner",
  ],

  /** IFU. */
  prerequisite: "Prior to taking an airway bite take a Digital scan of the upper and lower jaws without a bite.",

  /** IFU slide 1. */
  occlusion: [
    { label: "Class 2", body: "Device shifted back so flush with buccal surface of front teeth." },
    { label: "Class 3", body: "Device shifted forward so lingual surface of front teeth touch device." },
  ],

  /** Phase titles and captions: IFU slides. Steps: IFU, verbatim. */
  phases: [
    {
      id: "fit",
      eyebrow: "Steps 1–2",
      title: "To Accommodate Different Occlusions",
      caption: "APS Airway Bite Anterior Stop 4mm. Reline with Parkell Blu-Mousse Super Fast. Can do 2nd reline over the first if needed.",
      image: "/aps/airway-bite/ifu-1-occlusion-and-anterior-stop.jpg",
      imageAlt:
        "Dr. Droter’s instruction slide: the Airway Bite shifted for Class 2 and Class 3 occlusions, and the 4 mm anterior stop.",
      steps: [
        {
          n: 1,
          title: "Trial and Positioning",
          body: "Try the device in the mouth. Adjust forward for a Class III bite or backward for a Class II bite. Once positioned, note the orientation.",
        },
        {
          n: 2,
          title: "Silicone Application",
          body: "Fill the device with Parkell Blu-Mousse super fast silicone. A second reline can be performed if needed.",
        },
      ],
    },
    {
      id: "map",
      eyebrow: "Steps 3–5",
      title: "Mark furthest forward and back jaw position",
      caption:
        "Mark furthest forward and back jaw position and midline with disposable pencil. Measure and mark the amount of protrusive you want to build into the Mandibular Advancement Device. 50% is typically a good place to start.",
      image: "/aps/airway-bite/ifu-2-marking-and-measurement.jpg",
      imageAlt:
        "Dr. Droter’s instruction slide: marking the forward and back jaw positions with a pencil, measuring on the scale, and placing bonding agent.",
      steps: [
        {
          n: 3,
          title: "Jaw Movement Assessment",
          body: "With the device affixed to the upper teeth, have the patient move their jaw as far back as possible. Mark the position of the lower incisor and the midline with a pencil. Repeat with the jaw moved as far forward as possible.",
        },
        {
          n: 4,
          title: "Measurement",
          body: "Remove the device from the mouth and measure the total anterior-posterior movement. Typically, this is around 10-12 mm.",
        },
        {
          n: 5,
          title: "Target Position Marking",
          body: "Mark a point halfway between the most retruded and most protruded positions. This is the target position for jaw posture. Typically around 50% of the total movement is a good place to start.",
        },
      ],
    },
    {
      id: "lock",
      eyebrow: "Steps 6–7",
      title: "Move jaw into position",
      caption:
        "Move jaw into position, verify with tap tap, then flow flowable composite in front of lower incisors, cure. At edge of anterior stop flow some composite behind teeth and cure. Jaw is now held stable in forward position.",
      image: "/aps/airway-bite/ifu-3-tapping-and-composite.jpg",
      imageAlt:
        "Dr. Droter’s instruction slide: tapping the jaw into position and flowing composite in front of and behind the lower incisors.",
      steps: [
        {
          n: 6,
          title: "Patient Tapping",
          body: "Instruct the patient to repeatedly tap their teeth on the airway bite, guiding them to tap at the midway forward mark.",
        },
        {
          n: 7,
          title: "Flowable Composite Application",
          body: "Once you are satisfied with the forward arcing position of the lower jaw, have the patient rest and hold there. Verify it is in the area you marked with the pencil. Apply flowable composite to the airway bite in front of and behind the lower incisors. Cure the composite. This will hold the jaw in the desired forward position.",
        },
      ],
    },
    {
      id: "capture",
      eyebrow: "Steps 8–9",
      title: "Send to lab digitally",
      caption:
        "Take digital scan bite with anterior stop in place and jaw positioned forward. Send to lab digitally. Can also be used to take silicone bite registration.",
      image: "/aps/airway-bite/ifu-4-digital-scan-and-final-device.jpg",
      imageAlt:
        "Dr. Droter’s instruction slide: the digital scan bite, the final mandibular advancement device, and silicone bite registrations.",
      steps: [
        {
          n: 8,
          title: "Digital Scan",
          body: "With the jaw held in the forward position, perform a digital scan of the bite. This will align the upper and lower arch models for the dental lab to fabricate the sleep device.",
        },
        {
          n: 9,
          title: "Alternative: Silicone Bite",
          body: "If not using a digital scanner, a silicone bite can be created by squirting silicone into the back of the device.",
        },
      ],
    },
  ] satisfies AirwayPhase[],

  pdf: {
    href: "/aps/airway-bite/APS_Airway_Bite_Instructions.pdf",
    label: "Printable instructions",
    note: "A one-page version for chairside use.",
  },

  /** Tutorial animation (draft — Dr. Droter has one written change pending). */
  video: {
    src1080: "/aps/video/airway-bite-explainer-1080.mp4",
    src720: "/aps/video/airway-bite-explainer-720.mp4",
    poster: "/aps/video/airway-bite-explainer-poster.jpg",
    durationLabel: "2 min 15 s",
    chapters: "/aps/video/chapters.json",
  },

  /**
   * Chapters of the tutorial video (seconds). `ifuSteps` maps each chapter to
   * the numbered IFU steps above so a step list can seek the video.
   * Stills: `-clean` variants are cropped above the burned-in caption bar
   * (1920×816, background #DCDCDC); plain variants are full 1920×1080 frames.
   */
  videoChapters: [
    { id: "intro", label: "How far forward?", start: 0, end: 22.83, ifuSteps: [], still: "/aps/stills/intro-airway-open-clean.webp" },
    { id: "title", label: "The Airway Bite", start: 22.83, end: 36.58, ifuSteps: [], still: "/aps/stills/title.webp" },
    { id: "kit", label: "The kit", start: 36.58, end: 43.0, ifuSteps: [], still: "/aps/stills/kit-clean.webp" },
    { id: "before-you-start", label: "Before you start", start: 43.0, end: 47.92, ifuSteps: [], still: "/aps/stills/before-you-start-clean.webp" },
    { id: "step-01", label: "Try-in", start: 47.92, end: 56.5, ifuSteps: [1], still: "/aps/stills/step-01-try-in-clean.webp" },
    { id: "step-02", label: "Reline", start: 56.5, end: 63.58, ifuSteps: [2], still: "/aps/stills/step-02-reline-clean.webp" },
    { id: "step-03", label: "Mark the range", start: 63.58, end: 77.17, ifuSteps: [3], still: "/aps/stills/step-03-mark-the-range-clean.webp" },
    { id: "step-04", label: "Measure", start: 77.17, end: 83.54, ifuSteps: [4], still: "/aps/stills/step-04-measure-clean.webp" },
    { id: "step-05", label: "Target", start: 83.54, end: 89.33, ifuSteps: [5], still: "/aps/stills/step-05-target-clean.webp" },
    { id: "step-06", label: "Tap into position", start: 89.33, end: 96.96, ifuSteps: [6], still: "/aps/stills/step-06-tap-into-position-clean.webp" },
    { id: "step-07", label: "Lock the position", start: 96.96, end: 106.04, ifuSteps: [7], still: "/aps/stills/step-07-lock-the-position-clean.webp" },
    { id: "step-08", label: "Bite scan", start: 106.04, end: 112.21, ifuSteps: [8, 9], still: "/aps/stills/step-08-bite-scan-clean.webp" },
    // 116.5–132 s is real chairside footage; the patient's face is visible —
    // consent for public use is unconfirmed, so never cut it into loops or stills.
  ],

  /** Short muted loops for hero backgrounds (MP4 + WebM + poster). */
  loops: {
    airwayOpening: { mp4: "/aps/loops/hero-airway-opening.mp4", webm: "/aps/loops/hero-airway-opening.webm", poster: "/aps/loops/hero-airway-opening-poster.jpg" },
    kitReveal: { mp4: "/aps/loops/hero-kit-reveal.mp4", webm: "/aps/loops/hero-kit-reveal.webm", poster: "/aps/loops/hero-kit-reveal-poster.jpg" },
    stepsMontage: { mp4: "/aps/loops/hero-steps-montage.mp4", webm: "/aps/loops/hero-steps-montage.webm", poster: "/aps/loops/hero-steps-montage-poster.jpg" },
  },

  /** Interactive 3D model (@google/model-viewer is installed). */
  model: {
    glb: "/aps/3d/airway-bite.glb",
  },
};

/* ───────────────────────── Appliances ───────────────────────── */

/**
 * Indications and appliances: his product chart (apsleep.com/products) and his 2023
 * "APS products" slide. Details are his slide wording; the Temp Anterior Stop line is
 * from his Oct 2025 email; the title is his 2021 apsleep.com heading.
 */
export const applianceGuide = {
  intro: "",
  title: "Are you wearing the correct night guard?",
  subtitle: "",
  groups: [
    {
      indication: "Clenching",
      items: [
        { name: "APS D-PAS", detail: "Diagnostic- Palatal Anterior Stop" },
        { name: "APS Temp Anterior Stop", detail: "Heat moldable yet hard" },
      ],
      note: "Patient must have muscle inhibition.",
    },
    {
      indication: "Grinding",
      items: [
        { name: "APS Brux-PAS", detail: "with lower Essix" },
        { name: "Lower Hard CR Orthotic", detail: "Hard Lower Full Coverage Centric Relation Orthotic" },
      ],
    },
    {
      indication: "Grinding + Airway",
      items: [{ name: "APS Lat-Brux", detail: "" }],
    },
    {
      indication: "Airway",
      items: [{ name: "MAD", detail: "Final Mandibular Advancement Device" }],
    },
  ],
};

/* ───────────────────────── Dr. Droter ───────────────────────── */

export const doctor = {
  name: "John R. Droter, DDS",
  shortName: "Dr. Droter",
  title: "Founder, ArrowPath Sleep",
  affiliation: "Visiting Faculty, L.D. Pankey Institute",
  headshot: "/aps/about/droter-headshot.jpg",
  headshotAlt: "Portrait of Dr. John R. Droter",

  /** apsleep.com/about (his words, 2021). Typos fixed: "practiced" → "practice", "access what" → "access to what". */
  founderStory:
    "John R Droter, DDS, in 1996 created a practice focused on diagnosing and treating facial pain. Common problems he observed were fatigue, not waking rested, clenching of teeth, and sleep grinding of teeth. Over the years he customized diagnostic tools and treatments to help his patients. In 2021 he formed ArrowPath Sleep so patients and dentists could have access to what he has found to be so effective.",

  /** drdroter.com/about-dr-droter, verbatim. Typos fixed: "theSpear" → "the Spear", "Dentistry’s Todays" → "Dentistry Today’s". */
  bio: [
    "Dr. Droter graduated magna cum laude from the University of Maryland Dental School with a huge void in understanding TMJ problems. His quest for an understanding has led him to study most notably at the L.D. Pankey Institute, The Center for Advanced Dental Study with Dr. Peter Dawson and Dr. Mark Piper, The University of Florida’s Facial Pain Center with Dr. Parker Mahan, Dr. Henry Gremillion, and Dr. Frank Dolwick, The University of California, San Diego with Dr. Terry Tanaka and with Dr. Guy Haddix in Statesville, NC.",
    "Dr. Droter maintains a private practice diagnosing facial pain in the Washington DC, Baltimore, Annapolis area. When TMJ damage is suspected in causing a patient’s problem, he utilizes state of the art imaging (CT and MRI scans) along with computerized measurement and analysis of joint and muscle function. He provides nonsurgical TMJ rehabilitation for those patients with damaged joints. He has a network of excellent physicians and therapist when problems other than the TMJ are the cause. An accurate diagnosis is the key and first step to any effective therapy.",
    "He is a visiting faculty member at the LD Pankey Institute in Florida. Past positions include visiting faculty member at the Spear Educational Center in Arizona, visiting faculty member at The Washington Hospital Center in Washington, DC teaching temporomandibular disorders to the orthodontic residents and on staff at Anne Arundel Medical Center in Annapolis where he did rounds with orthopedic surgeons learning the medical approach to damaged joints. He lectures nationally and is honored to be included in the Dentistry Today’s Top Clinicians in Dental Continuing Education. His writings include published articles on the TMJ, and a TMJ Manual written for patients.",
  ],

  pullQuote: "An accurate diagnosis is the key and first step to any effective therapy.",

  /** Each label completes his own sentence (apsleep.com/about, his email, drdroter.com/facial-pain). */
  facts: [
    { value: "3,000+", label: "I have 3,000+ patients with a facial problem Questionnaires filled out." },
    { value: "190+", label: "There are 190+ different causes of Temporomandibular Disorders/Facial Pain." },
    { value: "70+", label: "I utilize 70+ different therapies in my practice." },
  ],

  /** Fragments of his bio (drdroter.com/about-dr-droter), verbatim. */
  training: [
    { place: "University of Maryland Dental School", detail: "Graduated magna cum laude" },
    { place: "L.D. Pankey Institute", detail: "Now visiting faculty" },
    { place: "The Center for Advanced Dental Study", detail: "With Dr. Peter Dawson and Dr. Mark Piper" },
    { place: "The University of Florida’s Facial Pain Center", detail: "With Dr. Parker Mahan, Dr. Henry Gremillion, and Dr. Frank Dolwick" },
    { place: "The University of California, San Diego", detail: "With Dr. Terry Tanaka" },
    { place: "Statesville, NC", detail: "With Dr. Guy Haddix" },
  ],

  /** Sentences of his bio, verbatim. */
  teaching: [
    "Visiting Faculty, L.D. Pankey Institute",
    "Visiting faculty member at the Spear Educational Center in Arizona",
    "Visiting faculty member at The Washington Hospital Center in Washington, DC teaching temporomandibular disorders to the orthodontic residents",
    "On staff at Anne Arundel Medical Center in Annapolis where he did rounds with orthopedic surgeons learning the medical approach to damaged joints",
    "He lectures nationally and is honored to be included in the Dentistry Today’s Top Clinicians in Dental Continuing Education.",
  ],
};

/* ───────────────────────── Library (lectures + education) ───────────────────────── */

export type LibraryItem = {
  title: string;
  description: string;
  kind: "Lecture" | "Article" | "Instructions" | "Video" | "Brochure" | "Reference";
  format: string; // e.g. "PDF", "Video"
  href?: string; // omitted = coming soon
  meta?: string;
  status?: "available" | "coming-soon" | "dentists-only";
};

export const library = {
  dentists: [
    {
      title: "Airway Bite — Instructions for Use",
      description: "ArrowPath Sleep Airway Bite. Prior to taking an airway bite take a Digital scan of the upper and lower jaws without a bite.",
      kind: "Instructions",
      format: "PDF",
      href: "/aps/airway-bite/APS_Airway_Bite_Instructions.pdf",
      meta: "1 page · Aug 2026",
      status: "available",
    },
    {
      title: "Airway Bite — Chairside tutorial",
      description: "Narrated by Dr. Droter.",
      kind: "Video",
      format: "Video",
      href: "/aps/video/airway-bite-explainer-1080.mp4",
      meta: "2 min 15 s",
      status: "available",
    },
    {
      title: "Pankey TMD 2026",
      description: "Day 4 Version",
      kind: "Lecture",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf",
      meta: "L.D. Pankey Institute · 2026",
      status: "available",
    },
    {
      title: "Gill Ortho Ceph Analysis — Extract",
      description: "Gill Ortho Ceph Analysis Extract",
      kind: "Lecture",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf",
      meta: "L.D. Pankey Institute · 2026",
      status: "available",
    },
    {
      title: "An Orthopaedic Approach to the Diagnosis and Treatment of Disorders of the Temporomandibular Joint",
      description: "John R. Droter, DDS. Dentistry Today, November 2005.",
      kind: "Article",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf",
      meta: "Published article",
      status: "available",
    },
    {
      title: "The worn dentition — pathognomonic patterns of abrasion and erosion",
      description: "Abrahamsen T C, The worn dentition – pathognomonic patterns of abrasion and erosion. Int Dent J 2005 55: 268-76.",
      kind: "Reference",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf",
      meta: "Recommended reading",
      status: "available",
    },
    {
      title: "Six common TMDs — diagnosis, pattern and approach",
      description: "",
      kind: "Reference",
      format: "PDF",
      status: "coming-soon",
    },
    {
      title: "Facial pain diagnosis — clinical protocols",
      description: "",
      kind: "Lecture",
      format: "Library",
      status: "dentists-only",
    },
  ] satisfies LibraryItem[],

  patients: [
    {
      title: "Do you have a TMJ problem?",
      description: "",
      kind: "Brochure",
      format: "PDF",
      meta: "2026 edition",
      status: "coming-soon",
    },
  ] satisfies LibraryItem[],
};

/** Patient education — headings must avoid "treat". */
export const education = {
  conditionsHeading: "Common conditions",
  /** drdroter.com/jaw-joint-damage, verbatim ("will to lead" typo fixed). */
  conditionsIntro:
    "There are 190+ different causes of Temporomandibular Disorders/Facial Pain. The examination process, which needs to include muscle and joint palpation, will lead to a working diagnosis on which you will be treated. A specific treatment is needed for each specific diagnosis.",
  /** Shown on condition content in place of a "Treatment" heading. */
  approachHeading: "Paths to relief",
  /** drdroter.com/new-patient-information, verbatim. */
  patientsLine: "Hopefully your path to finding the solution to your problem begins here.",
  keyMessages: [
    "Telling a patient that he or she has “TMJ” is equivalent to a physician telling a patient he or she has “knee.”",
    "There are 190+ different causes of Temporomandibular Disorders/Facial Pain.",
    "85% of people with jaw joint damage do not need any treatment what so ever!!!",
    "An accurate diagnosis is the key and first step to any effective therapy.",
  ],
};
