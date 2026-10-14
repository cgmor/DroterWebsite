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
  cta: "Order through Great Lakes Dental",
  note: "ArrowPath Sleep appliances are available from Great Lakes Dental.",
};

export const contact = {
  officePhone: "301-805-9400",
  company: {
    name: "ArrowPath Sleep LLC",
    lines: ["8230 Leesburg Pike, Suite 660", "Vienna, VA 22182"],
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

  /** His own framing (Aug 14 marketing email / IFU). */
  purpose:
    "To make an airway device you need to record the best jaw position for the airway and relate that position to the lab.",

  /** Products page, verbatim. */
  summary:
    "The Airway Bite records the protrusive bite registration that a mandibular advancement device is built around.",

  summaryLong: [
    "The device is tried in the mouth and relined with silicone, then used to map the patient’s full range of jaw movement — typically 10–12 mm from fully retruded to fully protruded.",
    "Once the target forward position is identified and held with flowable composite, the bite is captured by digital scan and sent to the lab to fabricate the appliance. A silicone bite registration can be taken instead if no scanner is available.",
  ],

  useWhen: "Use it when fabricating a MAD for the Airway indication.",

  /** The airway story, from the voiceover of the tutorial (Dr. Droter). */
  airwayStory: [
    {
      title: "While you sleep",
      body: "The airway can become very narrow, and it is hard to get air through.",
    },
    {
      title: "Move the jaw forward",
      body: "With the jaw further forward, the airway is more open.",
    },
    {
      title: "How far forward?",
      body: "Too far is uncomfortable. Not far enough, and the airway does not open. The Airway Bite finds the position in between — and records it for the lab.",
    },
  ],

  /** Dr. Droter's advantages list (Aug 14 — Marketing), lightly copy-edited. */
  advantages: [
    {
      title: "About five minutes, chairside",
      body: "Easier and quicker to use than a traditional bite gauge.",
    },
    {
      title: "Disposable",
      body: "Single patient use. Nothing to sterilize.",
    },
    {
      title: "No parts to lose",
      body: "No parts to lose or keep track of.",
    },
    {
      title: "Muscles relaxed first",
      body: "Patient tapping on the device relaxes the muscles before the airway bite is taken.",
    },
    {
      title: "Digital or silicone",
      body: "Capture the bite with an intraoral scan, or take a silicone bite registration.",
    },
    {
      title: "Locks with composite",
      body: "Flowable, light-cured composite holds the jaw in the forward position. Vertical is easy to change.",
    },
  ],

  kit: {
    contents: ["(1) APS Airway Bite", "(1) Ruler", "(1) Pencil"],
    notes: ["Single Patient Use Only", "Made in USA"],
    line: "One single-use packet: the airway bite, a pencil and a card ruler. Nothing to sterilize.",
    labelImage: "/aps/airway-bite/kit-label.jpg",
  },

  /** What the clinic supplies. */
  youWillNeed: [
    "Parkell Blu-Mousse Super Fast (or similar fast-set silicone)",
    "Bonding agent and flowable composite",
    "Curing light",
    "Intraoral scanner — or bite registration silicone",
  ],

  prerequisite: "Before you begin — take a digital scan of the upper and lower jaws without a bite.",

  occlusion: [
    {
      label: "Class II",
      body: "Device shifted back so it sits flush with the buccal surface of the front teeth.",
    },
    {
      label: "Class III",
      body: "Device shifted forward so the lingual surface of the front teeth touches the device.",
    },
  ],

  /** Live apsleep.com/airway-bite copy, verbatim (Aug 2026). */
  phases: [
    {
      id: "fit",
      eyebrow: "Phase one",
      title: "Fit the device",
      caption:
        "APS Airway Bite with 4 mm anterior stop. Reline with Parkell Blu-Mousse Super Fast; a second reline can be done over the first if needed.",
      image: "/aps/airway-bite/ifu-1-occlusion-and-anterior-stop.jpg",
      imageAlt:
        "ArrowPath Sleep Airway Bite positioned for Class II and Class III occlusions, alongside the 4 mm anterior stop seated on the upper front teeth.",
      steps: [
        {
          n: 1,
          title: "Trial and positioning",
          body: "Try the device in the mouth. Adjust forward for a Class III bite or backward for a Class II bite. Once positioned, note the orientation.",
        },
        {
          n: 2,
          title: "Silicone application",
          body: "Fill the device with Parkell Blu-Mousse Super Fast silicone. A second reline can be performed over the first if needed.",
        },
      ],
    },
    {
      id: "map",
      eyebrow: "Phase two",
      title: "Map the range of movement",
      caption:
        "Mark the furthest forward and back jaw positions and the midline with a disposable pencil, then measure the protrusive amount to build into the mandibular advancement device.",
      image: "/aps/airway-bite/ifu-2-marking-and-measurement.jpg",
      imageAlt:
        "Marking the furthest forward and back jaw positions and the midline with a disposable pencil, measuring protrusive movement on an MIO scale, and placing bonding agent on the device.",
      steps: [
        {
          n: 3,
          title: "Jaw movement assessment",
          body: "With the device affixed to the upper teeth, have the patient move their jaw as far back as possible. Mark the position of the lower incisor and the midline with a disposable pencil. Repeat with the jaw moved as far forward as possible.",
        },
        {
          n: 4,
          title: "Measurement",
          body: "Remove the device from the mouth and measure the total anterior–posterior movement. Typically this is around 10–12 mm.",
        },
        {
          n: 5,
          title: "Target position marking",
          body: "Mark a point halfway between the most retruded and most protruded positions. This is the target position for jaw posture — roughly 50% of total movement is typically a good place to start.",
        },
      ],
    },
    {
      id: "lock",
      eyebrow: "Phase three",
      title: "Lock in the position",
      caption:
        "Move the jaw into position, verify with tap-tap, then flow composite in front of the lower incisors and at the edge of the anterior stop, and cure. The jaw is now held stable in the forward position.",
      image: "/aps/airway-bite/ifu-3-tapping-and-composite.jpg",
      imageAlt:
        "Flowing composite in front of and behind the lower incisors with the jaw tapped into the forward position, then curing to hold the jaw stable.",
      steps: [
        {
          n: 6,
          title: "Patient tapping",
          body: "Instruct the patient to repeatedly tap their teeth on the airway bite, guiding them to tap at the midway forward mark.",
        },
        {
          n: 7,
          title: "Flowable composite application",
          body: "Once you are satisfied with the forward arcing position of the lower jaw, have the patient rest and hold there. Verify it is in the area you marked with the pencil. Apply flowable composite to the airway bite in front of and behind the lower incisors, then cure. This holds the jaw in the desired forward position.",
        },
      ],
    },
    {
      id: "capture",
      eyebrow: "Phase four",
      title: "Capture and send to the lab",
      caption:
        "Take the digital scan bite with the anterior stop in place and the jaw positioned forward, then send to the lab digitally. The device can also be used to take a silicone bite registration.",
      image: "/aps/airway-bite/ifu-4-digital-scan-and-final-device.jpg",
      imageAlt:
        "Jaw held stable in the forward position, digital scan of the bite sent to the lab, and the resulting final mandibular advancement device.",
      steps: [
        {
          n: 8,
          title: "Digital scan",
          body: "With the jaw held in the forward position, perform a digital scan of the bite. This aligns the upper and lower arch models so the dental lab can fabricate the sleep device.",
        },
        {
          n: 9,
          title: "Alternative: silicone bite",
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

export const applianceGuide = {
  intro:
    "APS devices are selected by clinical indication — what the patient is doing at night, and whether the airway is involved.",
  title: "Choosing the correct night guard",
  subtitle: "Four presentations, and the APS appliance indicated for each.",
  groups: [
    {
      indication: "Clenching",
      items: [
        { name: "APS D-PAS", detail: "Diagnostic palatal anterior stop" },
        { name: "APS Temp Anterior Stop", detail: "Heat-moldable, hard anterior stop" },
      ],
      note: "Patient must have muscle inhibition.",
    },
    {
      indication: "Grinding",
      items: [
        { name: "APS Brux-PAS", detail: "Palatal anterior stop with lower Essix" },
        { name: "Lower Hard CR Orthotic", detail: "Hard lower full-coverage centric relation orthotic" },
      ],
    },
    {
      indication: "Grinding + Airway",
      items: [{ name: "APS Lat-Brux", detail: "For sleep grinding with airway involvement" }],
    },
    {
      indication: "Airway",
      items: [
        { name: "MAD", detail: "Mandibular advancement device — built from the Airway Bite registration" },
      ],
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

  /** apsleep.com/about, lightly copy-edited for grammar. */
  founderStory:
    "In 1996, John R. Droter, DDS, created a practice focused on diagnosing facial pain. Common problems he observed were fatigue, not waking rested, clenching of teeth, and sleep grinding of teeth. Over the years he customized diagnostic tools and approaches to help his patients. In 2021 he formed ArrowPath Sleep so patients and dentists could have access to what he has found to be so effective.",

  /** drdroter.com/about-dr-droter, lightly copy-edited for grammar. */
  bio: [
    "Dr. Droter graduated magna cum laude from the University of Maryland Dental School with a huge void in understanding TMJ problems. His quest for an understanding has led him to study most notably at the L.D. Pankey Institute; The Center for Advanced Dental Study with Dr. Peter Dawson and Dr. Mark Piper; the University of Florida’s Facial Pain Center with Dr. Parker Mahan, Dr. Henry Gremillion and Dr. Frank Dolwick; the University of California, San Diego with Dr. Terry Tanaka; and with Dr. Guy Haddix in Statesville, NC.",
    "Dr. Droter maintains a private practice diagnosing facial pain in the Washington DC, Baltimore and Annapolis area. When TMJ damage is suspected in causing a patient’s problem, he utilizes state-of-the-art imaging (CT and MRI scans) along with computerized measurement and analysis of joint and muscle function. He has a network of excellent physicians and therapists when problems other than the TMJ are the cause. An accurate diagnosis is the key and first step to any effective therapy.",
    "He is a visiting faculty member at the L.D. Pankey Institute in Florida. Past positions include visiting faculty member at the Spear Education Center in Arizona, visiting faculty member at The Washington Hospital Center in Washington, DC teaching temporomandibular disorders to the orthodontic residents, and on staff at Anne Arundel Medical Center in Annapolis, where he did rounds with orthopedic surgeons learning the medical approach to damaged joints. He lectures nationally and is honored to be included in Dentistry Today’s Top Clinicians in Dental Continuing Education. His writings include published articles on the TMJ, and a TMJ manual written for patients.",
  ],

  pullQuote: "An accurate diagnosis is the key and first step to any effective therapy.",

  facts: [
    { value: "1996", label: "Practice focused on facial pain" },
    { value: "3,000+", label: "Facial problem questionnaires completed by his patients" },
    { value: "190+", label: "Causes of facial pain he screens for" },
    { value: "70+", label: "Therapies used in his practice" },
  ],

  training: [
    { place: "University of Maryland Dental School", detail: "DDS, magna cum laude" },
    { place: "L.D. Pankey Institute", detail: "Advanced study; now visiting faculty" },
    { place: "The Center for Advanced Dental Study", detail: "With Dr. Peter Dawson and Dr. Mark Piper" },
    { place: "University of Florida Facial Pain Center", detail: "With Drs. Parker Mahan, Henry Gremillion and Frank Dolwick" },
    { place: "University of California, San Diego", detail: "With Dr. Terry Tanaka" },
    { place: "Statesville, NC", detail: "With Dr. Guy Haddix" },
  ],

  teaching: [
    "Visiting faculty, L.D. Pankey Institute (Florida)",
    "Past visiting faculty, Spear Education Center (Arizona)",
    "Past visiting faculty, The Washington Hospital Center — temporomandibular disorders for orthodontic residents",
    "Past staff, Anne Arundel Medical Center (Annapolis) — rounds with orthopedic surgeons",
    "Named among Dentistry Today’s Top Clinicians in Dental Continuing Education",
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
      description: "The one-page chairside protocol: fit, map, lock, capture.",
      kind: "Instructions",
      format: "PDF",
      href: "/aps/airway-bite/APS_Airway_Bite_Instructions.pdf",
      meta: "1 page · Aug 2026",
      status: "available",
    },
    {
      title: "Airway Bite — Chairside tutorial",
      description: "Animated walkthrough of every step, from try-in to bite scan.",
      kind: "Video",
      format: "Video",
      href: "/aps/video/airway-bite-explainer-1080.mp4",
      meta: "2 min 15 s",
      status: "available",
    },
    {
      title: "Pankey TMD 2026",
      description: "Lecture slides from Dr. Droter’s TMD course at the L.D. Pankey Institute (Day 4 version).",
      kind: "Lecture",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf",
      meta: "L.D. Pankey Institute · 2026",
      status: "available",
    },
    {
      title: "Gill Ortho Ceph Analysis — Extract",
      description: "Cephalometric analysis extract used alongside the Pankey TMD course.",
      kind: "Lecture",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf",
      meta: "L.D. Pankey Institute · 2026",
      status: "available",
    },
    {
      title: "Orthopedic Medicine",
      description: "Article by John R. Droter, DDS on the orthopedic approach to diagnosing the TMJ.",
      kind: "Article",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf",
      meta: "Published article",
      status: "available",
    },
    {
      title: "The worn dentition — pathognomonic patterns of abrasion and erosion",
      description: "Abrahamsen T C. Int Dent J 2005; 55: 268–76.",
      kind: "Reference",
      format: "PDF",
      href: "https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf",
      meta: "Recommended reading",
      status: "available",
    },
    {
      title: "Six common TMDs — diagnosis, pattern and approach",
      description: "A one-page clinical reference for the six disorders seen most often.",
      kind: "Reference",
      format: "PDF",
      status: "coming-soon",
    },
    {
      title: "Facial pain diagnosis — clinical protocols",
      description: "Diagnostic frameworks, screening questions and decision trees for dental professionals.",
      kind: "Lecture",
      format: "Library",
      status: "dentists-only",
    },
  ] satisfies LibraryItem[],

  patients: [
    {
      title: "Do you have a TMJ problem?",
      description: "Dr. Droter’s patient brochure: signs, the joint, and why diagnosis comes first.",
      kind: "Brochure",
      format: "PDF",
      meta: "2026 edition",
      status: "coming-soon",
    },
  ] satisfies LibraryItem[],
};

/** Patient education — headings must avoid "treat". */
export const education = {
  conditionsHeading: "Common conditions we help you find a solution for",
  conditionsIntro:
    "Facial pain has more than 190 possible causes. These short guides explain the ones Dr. Droter sees most often — read the summary, or expand for the full version.",
  /** Shown on condition content in place of a "Treatment" heading. */
  approachHeading: "Paths to relief",
  patientsLine:
    "ArrowPath Sleep appliances are prescribed and fitted by dentists. Learn what may be behind your symptoms, then talk with your dentist.",
  keyMessages: [
    "TMJ is not a diagnosis — it’s a joint.",
    "There are 190+ different causes of temporomandibular disorders and facial pain.",
    "85% of people with jaw joint damage do not need any treatment whatsoever.",
    "An accurate diagnosis is the key and first step to any effective therapy.",
  ],
};
