/**
 * TMD education, condition guides, literature and practice content for the
 * APSleep.com redesign. Everything here is Dr. Droter's own material:
 *  - drdroter.com pages (About TMD, Facial Pain, Jaw Joint Damage, Limited Jaw
 *    Opening, Anterior Open Bite, Uncomfortable Bite, Medical Literature,
 *    Patient Downloads, New Patient Information) — lightly copy-edited for
 *    spelling only;
 *  - the TMJ Brochure 2026 (v26.4), as captured in PRD_DrDroter_Website.md;
 *  - his osteoarthritis write-up (OA for APS web), in src/data/conditions.ts.
 *
 * Content rules apply here too: no "treat"/"treatment" in any heading, no FDA
 * language, never publish his questionnaires.
 */

import { conditions as legacyConditions } from "@/data/conditions";

export type Figure = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size, for next/image. */
  width: number;
  height: number;
};

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Ordered list (e.g. a protocol). */
  steps?: string[];
  figure?: Figure;
  callout?: string;
};

export type ConditionGuide = {
  slug: string;
  title: string;
  /** Plain-language name a patient would use. */
  plainName: string;
  /** One-sentence summary for cards and the collapsed view. */
  summary: string;
  /** Short signs shown in the collapsed view. */
  signs: string[];
  /** The complete version, revealed by "Expand the full version". */
  full: GuideSection[];
  hero?: Figure;
  source: "drdroter.com" | "TMJ Brochure 2026" | "OA write-up";
  /** Which category of the 7 it belongs to. */
  category: string;
};

const fig = (src: string, alt: string, width: number, height: number, caption?: string): Figure => ({
  src: `/aps/edu/${src}`,
  alt,
  width,
  height,
  caption,
});

/* ───────────────────────── Understanding TMD ───────────────────────── */

export const understanding = {
  title: "Understanding TMD and facial pain",
  intro:
    "TMJ is not a diagnosis — it’s a joint. There are 40 different diseases that can affect it, and more than 190 disorders that cause pain in the head and neck. Different diseases need different approaches, which is why an accurate diagnosis comes first.",

  thesis: {
    line: "Telling a patient that he or she has “TMJ” is equivalent to a physician telling a patient he or she has “knee.”",
    attribution: "John R. Droter, DDS",
  },

  joint: {
    heading: "What is the TMJ?",
    paragraphs: [
      "The temporomandibular joint connects the temporal bone of the skull to the mandible, the lower jaw, just in front of the ears. It is actually two joints, left and right, that must work in harmony.",
      "It is the only joint in the body that rotates, slides and pivots. It is made of soft tissue — the disc, ligaments, capsule and retrodiscal tissue — and bone: the condyle and the eminence. Together they let the jaw open and close, move left and right and forward and back, for chewing, speaking and swallowing.",
    ],
    selfCheck:
      "Place your fingers in front of your ears and open and close. You can feel the TMJ and the condyle moving. Any discomfort — even slight — indicates something is wrong.",
    figures: [
      fig("tmj-healthy.jpg", "Illustration of a healthy temporomandibular joint with the disc seated on the condyle", 1024, 768, "A healthy TMJ: the disc sits between the condyle and the socket."),
      fig("tmj-damaged.jpg", "Illustration of a damaged temporomandibular joint with the disc dislocated forward of the condyle", 1024, 768, "A damaged TMJ: the disc is dislocated forward, and the joint clicks on movement."),
    ],
  },

  signs: {
    heading: "Signs and symptoms",
    intro: "Check the ones you recognise. These are educational, not a diagnosis.",
    items: [
      "Headaches, especially around the temples and behind the eyes",
      "Grinding or clenching teeth, especially at night",
      "Sore jaw and neck muscles; tired muscles after eating",
      "Pain or tenderness of the TMJ",
      "Clicking noises from the TMJ, now or in the past",
      "A rough, gravelly sound from the TMJ on movement",
      "A history of limited opening, or not being able to open and close without a sideways movement",
      "Signs of excess force on teeth: wearing, chipping, breaking, cracking, splitting, moving or loosening",
      "Earache, ear throbbing, or ringing in the ears",
      "Pain behind the eyes",
      "A change in the bite — teeth don’t feel like they fit together",
    ],
    note: "Pain is not a reliable indicator of severity. A joint with minor damage may hurt worse than one with significant damage.",
    headacheStat: "Up to 50% of headaches may be TMJ-related.",
  },

  definition: {
    heading: "TMD is not one disease",
    paragraphs: [
      "Many different diseases and dysfunctions can cause facial pain. The head and neck are made of many nerves, blood vessels, muscles, bones and connective tissues, all of which can be the primary source of pain. Pain can originate from the muscles of the TMJ, the muscles of the neck, the TMJ itself, teeth, sinus, ear, neuralgia, vascular causes and lesions of the central nervous system, among many others.",
      "Temporomandibular disorders (TMD) are a group of diseases and dysfunctions that cause facial pain. TMD is not one disease, but many different diseases grouped into one classification.",
    ],
    adaCriteria: {
      lead: "The American Dental Association’s President’s Conference on Temporomandibular Disorders defined TMD as a group of orofacial disorders characterized by:",
      items: [
        "Pain in the preauricular area (in front of the ear), the TMJ, or the muscles of mastication",
        "Limitations or deviations in the mandibular range of motion",
        "TMJ sounds during jaw function",
      ],
    },
    logic: [
      "Someone experiencing facial pain may or may not have a TMD.",
      "Someone with a TMD may or may not have damage to the TMJ, and may or may not have facial pain.",
      "Someone with damage to the TMJ will have a TMD, but may or may not have facial pain.",
    ],
    counts: [
      { value: "40", label: "different diseases that can affect the TMJ itself" },
      { value: "190+", label: "disorders that cause pain and dysfunction in the head and neck" },
      { value: "7", label: "categories those disorders fall into" },
    ],
    categories: [
      { name: "TMJ damage", note: "40 conditions of the joint itself" },
      { name: "Muscles of the TMJ" },
      { name: "Cranial alignment and occlusion" },
      { name: "Cervical damage" },
      { name: "Parafunction" },
      { name: "Whole body and systemic" },
      { name: "Other" },
    ],
    figure: fig("tmj-forty-diseases.jpg", "Dr. Droter’s lecture slide listing the 40 diseases of the TMJ", 1200, 600, "Category 1 of 7, TMJ damage: the 40 diseases of the joint itself."),
  },

  evidence: {
    heading: "What the numbers show",
    items: [
      { value: "70%", label: "of patients with TMD facial pain have myalgia — soreness — of the TMJ muscles." },
      { value: "86%", label: "of patients with TMD facial pain have a damaged TMJ, compared with 34% of non-TMD patients." },
      { value: "70%", label: "of damaged joints adapt favourably over time without any therapy. 30% do not, and a few (3%) have serious problems including chronic pain and facial deformity." },
    ],
    caveat:
      "Any therapy that makes muscles feel better will help — but it may only be masking the cause. While the patient may feel better, therapy is continually needed to maintain comfort because the cause has not been identified and resolved.",
  },

  pain: {
    heading: "Three types of facial pain",
    lead: "All pain in the human body is one of three types:",
    types: [
      { name: "Nociceptive pain", body: "Pain from tissue." },
      { name: "Neuropathic pain", body: "Pain caused by nerves not functioning properly." },
      { name: "Centrally mediated pain", body: "Pain from the brain not functioning properly." },
    ],
    overlay:
      "Over all three types of pain is how the brain interprets pain. This is affected by stress and emotion. It is not the source of the pain, but it affects the pain experience.",
    figure: fig("three-types-of-pain.jpg", "Dr. Droter’s lecture slide showing the three types of facial pain", 1200, 600, "From Dr. Droter’s TMD lecture."),
    beliefs: {
      heading: "Different beliefs, different approaches",
      paragraphs: [
        "There is not a consensus among professionals on which types of pain are the most prevalent. I find in my patients that sore muscles and joints in the head and neck are the source of the majority of facial pain (nociceptive pain). I find it invaluable to examine the muscles and joints by palpation, find out what is sore, and then figure out why it is sore. Therapies are then based on removing the cause of the sore muscles and joints.",
        "You can tell a doctor’s beliefs about the main causes of facial pain by which therapies they administer the most. While I agree that the brain’s interpretation of pain is a factor, I do not feel it is the cause of the pain. I have found that if you remove the source of the pain, the pain goes away.",
      ],
      emphasis:
        "Palpating muscles and joints and identifying which ones are sore must be part of any examination for facial pain, including headaches.",
    },
  },

  system: {
    heading: "The TMJ is part of a system",
    body: "The TMJ doesn’t work in isolation. It works in harmony with the muscles of the head and neck, the teeth, and the central and peripheral nervous systems. A problem in one area creates problems in the others — a dynamic orthopedic system. That’s why the whole system is evaluated.",
    parts: ["Skull", "TMJ", "Mandible", "Teeth", "Muscles of the neck and TMJ", "Central and peripheral nervous system"],
  },

  approaches: {
    heading: "Approaches to relief",
    lead: "Dr. Droter utilizes more than 70 different therapies. Most are not difficult to do — the trick is applying the correct therapy for the specific disease.",
    groups: [
      { name: "Physical", items: ["Ice", "Hot, cold, hot", "Cold laser", "TENS", "Range-of-motion exercises", "Stretching", "Referral to physical therapy, chiropractic or osteopathic care"] },
      { name: "Medicinal", items: ["Anti-inflammatories and NSAIDs", "Topical CBD", "Glucosamine and chondroitin", "Vitamins C, D and B12", "Minerals: magnesium, iron", "Botox injections"] },
      { name: "Dental orthotics", items: ["Splints and night guards", "Anterior stops", "Brux checkers", "Mandibular advancement devices"] },
      { name: "Occlusal and orthopedic", items: ["Occlusal adjustment", "Lingual light wire", "Planas tracks", "Sectional orthodontics", "Expansion", "Restorative dentistry"] },
      { name: "Tongue parafunction", items: ["Cervical alignment stabilization", "Myobrace", "Lingual light wire", "Frenectomy", "Myofunctional therapy"] },
      { name: "Sleep and fatigue", items: ["Mouth taping", "Diet modification", "Positional therapy", "Vitamins and minerals", "Lateral bruxing devices", "Mandibular advancement", "CPAP"] },
      { name: "Surgical, by referral", items: ["Arthrocentesis with PRP", "Discectomy", "Total joint replacement", "Orthognathic surgery"] },
    ],
    figures: [
      fig("causes-017.jpg", "Lecture slide on the many causes of facial pain", 1200, 600),
      fig("causes-019.jpg", "Lecture slide listing therapies used in Dr. Droter’s practice", 1200, 600),
      fig("causes-020.jpg", "Lecture slide on matching therapy to diagnosis", 1200, 600),
    ],
  },

  hotColdHot: {
    heading: "Hot, cold, hot: a home therapy for sore muscles",
    purpose: "Open the blood vessels, close them, then reopen them — flushing toxins from the muscles.",
    steps: [
      "Microwave a moist hand towel for 1–2 minutes. Test it on your hand first.",
      "Apply it to the neck, jaw and face for 3 minutes.",
      "Apply cold — a wrapped gel pack or frozen peas in a paper towel — for 3 minutes.",
      "Reheat the towel in 30-second intervals and reapply for 3 minutes.",
      "Repeat as desired.",
    ],
    pdf: { href: "https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf", label: "Download the Hot Cold Hot handout" },
  },

  faq: [
    {
      q: "I have headaches. Could they be TMJ-related?",
      a: "Many headaches are related to the TMJ or the TMJ muscles. Patients who suffered for years with headaches have become pain-free after an accurate diagnosis.",
    },
    {
      q: "My jaw clicks occasionally. Do I need help?",
      a: "Clicking means the ligaments holding the disc in place have been damaged. Not all clicks need treatment, but some must be treated to prevent progression. A severely damaged joint and a slightly damaged joint can appear quite similar, so a professional evaluation is essential.",
    },
    {
      q: "My jaw gets stuck sometimes. What’s happening?",
      a: "The TMJ is entering a more advanced stage of breakdown: the disc is getting stuck out of position. Seek an examination promptly — intervention now may prevent more serious progression.",
    },
    {
      q: "I grind my teeth at night. Is it just stress?",
      a: "Stress increases grinding, but it is usually not the primary cause. Common causes include an uneven bite or a damaged TMJ. A clinical examination usually reveals the true cause.",
    },
    {
      q: "What’s the difference between TMJ and TMD?",
      a: "TMJ is the joint itself. Saying you “have TMJ” is like saying you “have knee.” TMD — temporomandibular disorder — is the group of 190+ diseases and dysfunctions that cause head and neck pain. Neither is a diagnosis; the specific condition has to be identified.",
    },
    {
      q: "Do I need surgery?",
      a: "Most TMD problems are addressed without surgery. Dr. Droter utilizes more than 70 nonsurgical therapies. Surgery is considered only when conservative care has been exhausted, and it is always referred to trusted specialists.",
    },
  ],

  children: {
    heading: "Children and facial development",
    paragraphs: [
      "Many of my temporomandibular disorder patients’ current problems can be traced back to childhood. For an adult to function fully, they need to have a fully developed face.",
      "Children who breathe through their mouth lack the pressure of the tongue on the maxilla (the upper jaw) during growth. The maxilla depends on the tongue to develop fully; without it, it ends up narrow and drifts down. The maxilla is also the floor of the nose.",
    ],
    signs: ["Snoring", "Thumb sucking", "Enlarged tonsils and adenoids", "Lagging behind in growth", "Attention deficit disorder"],
    adult: "Untreated in childhood, adults show a narrow maxilla, high palate, narrow nasal passages, a gummy smile, airway problems and upper airway resistance.",
  },
};

/* ───────────────────────── Condition guides ───────────────────────── */

const oa = legacyConditions["osteoarthritis"];

export const conditionGuides: ConditionGuide[] = [
  {
    slug: "limited-jaw-opening",
    title: "Limited jaw opening",
    plainName: "I can’t open wide",
    category: "TMJ damage",
    source: "drdroter.com",
    summary:
      "Not being able to open more than 35 mm — about two finger widths. There are seven distinctly different causes, each needing a different approach.",
    signs: ["Opening less than two finger widths", "Onset usually sudden", "Jaw may need to be wiggled to open", "Pain on opening wide"],
    hero: fig("limited-169.jpg", "Lecture slide introducing limited jaw opening", 2048, 1024),
    full: [
      {
        heading: "Not able to open wide",
        paragraphs: [
          "A very common reason patients are referred to my practice is limited jaw opening. Limited opening presents as not being able to open more than 35 mm (two vertical finger widths). The onset can be gradual but is usually sudden. Ideally you should be able to open your jaw pain-free to 40–55 mm, about three vertical finger widths. As your jaw opens and closes, the condyle (ball) moves in and out of the fossa (socket).",
          "There are seven distinctly different causes of limited opening, each requiring different care.",
        ],
        figure: fig("limited-170.jpg", "Lecture slide on normal jaw opening and condyle movement", 2048, 1024),
      },
      {
        heading: "Different causes of limited jaw opening",
        list: ["Pain avoidance — sore joint", "Pain avoidance — sore muscle", "Muscle spasm", "Masseteric space infection", "Nonreducing disc (4b, 3b acute)", "Joint fibrosis", "Muscle fibrosis", "Other"],
        paragraphs: ["To determine the specific cause, diagnostic tests need to be run. It must be determined whether the cause is the joint, the muscles, or both."],
        figure: fig("limited-171.jpg", "Lecture slide listing the causes of limited opening", 2048, 1024),
      },
      {
        heading: "Diagnostic tests needed",
        list: ["History: how long limited opening has existed", "Body temperature", "Caries exam and periodontal exam", "Range of motion: open, side to side", "Gentle active stretch: point to the area of pain", "Anterior stop test", "If needed, CBCT and MRI"],
        paragraphs: [
          "Using these results and Dr. Droter’s flow chart, a likely cause can be determined.",
        ],
        callout:
          "If you suspect a masseteric space infection — swelling behind the angle of the mandible, difficulty swallowing and/or a sore throat — see a doctor immediately.",
        figure: fig("limited-algorithm.png", "Dr. Droter’s flow chart for diagnosing limited opening and arthralgia", 1224, 1584, "Dr. Droter’s limited-opening flow chart."),
      },
      {
        heading: "TMJ arthralgia: the sore joint",
        paragraphs: [
          "The most common cause of limited opening I see is a sore temporomandibular joint limiting jaw movement. The brain tries to avoid pain, so it limits the jaw’s movements.",
          "A defining feature of a sore joint that is limiting opening is what I call a soft end point. If the jaw is gently and slowly supported and stretched, it will gradually open wider — the jaw can move, but the brain is telling the muscles not to. A hard end point, where the jaw cannot be gently stretched wider, indicates an anteriorly displaced disc that is not reducing.",
        ],
        figure: fig("limited-175.jpg", "Lecture slide comparing a soft and a hard end point on stretching", 2048, 1024),
      },
      {
        heading: "The most common cause: a sprained jaw joint",
        paragraphs: [
          "The TMJ can be sprained just like an ankle. A sprain is a stretching of a ligament, and it can happen during sleep from parafunctional jaw movements. Joint swelling can stop the back teeth touching on biting down; that posterior open bite resolves once the swelling does.",
          "If the jaw is still sore after a week, the most common cause is osteoarthritis, which is easily identified on a CBCT. If soreness and limited opening persist, an MRI is needed, and persistent soreness may require an arthrocentesis with platelet-rich plasma to resolve the inflammation.",
        ],
        figure: fig("limited-184.jpg", "Lecture slide on the acute sprain of the jaw joint", 2048, 1024),
      },
      {
        heading: "Sore muscles causing limited opening",
        paragraphs: [
          "Limited opening caused by sore muscles is common, but not easily diagnosed by most clinicians. If a person is bracing the lower jaw to avoid uncomfortable tooth contacts, the muscles become fatigued and sore. An anterior stop test to deprogram the muscles lets them temporarily relax and restores full opening in about three minutes.",
          "If an anterior stop provides relief, palliative therapies that make muscles feel better will help — while corrective therapies aimed at a harmonious bite resolve the issue without continuous palliative care.",
        ],
        figure: fig("limited-187.jpg", "Lecture slide on the anterior stop deprogramming test", 2048, 1024),
      },
      {
        heading: "Acute closed lock: a stuck disc",
        paragraphs: [
          "Most patients who come to my practice with limited opening have been pre-diagnosed with a non-reducing (“stuck”) disc. Fewer than one in five actually have a stuck disc as the cause. The top three causes I see are acute sprain, osteoarthritis and occlusal muscle disharmony.",
          "Those with a stuck disc present with a hard end point on the active stretching test and cannot move the jaw fully side to side.",
        ],
        figure: fig("limited-189.jpg", "Lecture slide on the acute closed lock", 2048, 1024),
      },
    ],
  },

  {
    slug: "clicking-jaw",
    title: "Jaw joint damage: the clicking jaw",
    plainName: "My jaw clicks",
    category: "TMJ damage",
    source: "drdroter.com",
    summary:
      "About 35% of people have damaged their TMJs. Most damaged joints adapt well — 85% of people with jaw joint damage do not need any treatment whatsoever.",
    signs: ["Clicking on opening or chewing", "Usually pain-free", "Sometimes jaw dysfunction or pain"],
    hero: fig("tmj-damaged.jpg", "Illustration of a TMJ with the disc dislocated forward", 1024, 768),
    full: [
      {
        heading: "Why joints click",
        paragraphs: [
          "Many people have damaged their TMJs — about 35% of the population. The disc is dislocated anteriorly, and the joint makes a clicking sound on movement.",
          "Most damaged joints adapt favourably and allow good jaw function: opening and closing, chewing and eating pain-free. As long as the clicking isn’t too annoying, these joints can be well tolerated.",
          "A few people do have jaw dysfunction and pain from a damaged joint that did not adapt favourably. For them, there is care to help the TMJ readapt in a more favourable manner.",
        ],
        figure: fig("tmj-healthy.jpg", "Illustration of a healthy TMJ", 1024, 768, "Healthy joint: the disc sits on the condyle."),
      },
      {
        heading: "Forty diseases of the joint itself",
        paragraphs: [
          "Clicking is one sign of TMJ damage, the first of the seven categories of TMD — and there are 40 different diseases of the joint itself. Across all seven categories there are 190+ causes of temporomandibular disorders and facial pain. The examination, which needs to include muscle and joint palpation, leads to a working diagnosis, and a specific approach is needed for each specific diagnosis.",
        ],
        figure: fig("tmj-forty-diseases.jpg", "Dr. Droter’s lecture slide listing the 40 diseases of the TMJ", 1200, 600, "Category 1 of 7: TMJ damage and diseases, from Dr. Droter’s lecture."),
      },
    ],
  },

  {
    slug: "anterior-open-bite",
    title: "Anterior open bite",
    plainName: "My front teeth no longer touch",
    category: "Cranial alignment and occlusion",
    source: "drdroter.com",
    summary:
      "Front teeth that used to touch and now don’t is a serious condition that can be progressive. There are several non-surgical options — once the cause is known.",
    signs: ["Front teeth no longer meet", "Changes in speaking, eating or swallowing", "Bite feels different than it used to"],
    hero: fig("aob-ant-open.jpg", "Lecture slide showing an anterior open bite", 2048, 1024),
    full: [
      {
        heading: "Why it matters",
        paragraphs: [
          "Front teeth need to touch to allow proper speaking, eating and swallowing. Front teeth that used to touch and are no longer in contact is a serious condition that can be progressive. While surgery is the most common recommendation, there are several non-surgical options to correct anterior open bite.",
        ],
        figure: fig("aob-ms.jpg", "Lecture slide on anterior open bite", 2048, 1024),
      },
      {
        heading: "Three main causes after puberty",
        list: ["TMJ bone loss", "Tongue bracing a damaged neck", "Iatrogenic — for example, a bad night guard"],
        paragraphs: [
          "Anterior open bites can look very similar yet have different causes. Patients with an anterior open bite need a CBCT to definitively determine the cause, and the cause must be determined first for care to be effective.",
        ],
        figure: fig("aob-causes.jpg", "Lecture slide comparing anterior open bites with different causes", 2400, 1200, "Similar bites, different causes."),
      },
    ],
  },

  {
    slug: "uncomfortable-bite",
    title: "Uncomfortable bite: occlusal muscle disharmony",
    plainName: "My bite feels wrong",
    category: "Cranial alignment and occlusion",
    source: "drdroter.com",
    summary:
      "When teeth hit unevenly, the jaw muscles keep searching for an even bite that doesn’t exist — and fatigue. More than 30% of headache patients have an occlusal problem that can be fixed without medications.",
    signs: ["Muscles tire chewing harder foods", "Deep facial ache", "Headaches"],
    hero: fig("occlusion-extract-002.jpg", "Lecture slide on occlusal adjustment", 2400, 1200),
    full: [
      {
        heading: "What occlusion is",
        paragraphs: [
          "Occlusion is how your teeth come into contact with each other. If your teeth are hitting unevenly — too heavy on the front teeth, on the right or left, or on a single tooth — it can cause pain and dysfunction in the head and neck.",
          "Ideally, with the jaw joint fully seated in its socket, all your teeth touch evenly. If they touch unevenly, your jaw muscles position the lower jaw the best they can to get a reasonably even bite. They are searching for something that does not exist, and this constant searching fatigues them.",
          "If you have a recent change in how your teeth come together, you need a dentist who will take a CBCT scan of your jaw joint to rule out pathology, and analyze your bite with mounted study models and/or a TekScan.",
        ],
        figure: fig("occlusion-dawson.jpg", "Diagram of a tooth interference activating muscles to move the lower jaw", 1702, 1556, "Teeth in the way on closing activate muscles to move the lower jaw. From Functional Occlusion, Peter Dawson."),
      },
      {
        heading: "Three types of uneven bite",
        steps: ["Posterior occlusal interference — too heavy on a back tooth", "Posterior open bite — too heavy on the front teeth", "Too heavy on one side, the right or the left"],
        figure: fig("occlusion-post-openbite.jpg", "Photo illustrating a posterior open bite", 2048, 1375, "Hitting too heavy on the front teeth causes clenching to get the back teeth to touch."),
      },
      {
        heading: "Causes of an uneven bite",
        list: ["A damaged jaw joint", "Osteoarthritis", "Multiple restorations done at different times by different dentists", "Unfinished orthodontics", "Inappropriate orthodontic retainers", "Poorly fitting night guards", "Neck damage causing neck-muscle bracing"],
      },
      {
        heading: "Paths to relief",
        paragraphs: [
          "The approach depends on the severity. Most uneven bites can be corrected with an occlusal adjustment: a light reshaping of the teeth. If the bite is further off than an adjustment can correct, other options include orthodontics, restorative dentistry, occlusal onlays and condylar distraction.",
          "Enamel is about 2–3 mm thick in healthy teeth, stone-like, with no nerves, and adjusting removes very little of it. Afterward the bite feels more solid; many people notice improved comfort right away, while others take a week or two to adapt.",
        ],
        list: ["Jaw muscles are more relaxed", "Muscle movements are coordinated and smooth", "Less risk of splitting or breaking teeth", "Teeth stay tight and firm", "Helps maintain the health of the TMJ and the periodontium"],
        figure: fig("occlusion-extract-001.jpg", "Lecture slide on the benefits of a harmonious occlusion", 2400, 1200),
      },
    ],
  },

  {
    slug: "osteoarthritis",
    title: oa.title,
    plainName: "My jaw joint aches",
    category: "TMJ damage",
    source: "OA write-up",
    summary: oa.heroDescription,
    signs: oa.symptoms.primary.slice(0, 4),
    hero: { src: "/conditions/osteoarthritis/TMJ-Arrow.png", alt: "Illustration locating the TMJ in front of the ear", width: 1448, height: 1086 },
    full: [
      { heading: "Overview", paragraphs: oa.overview },
      { heading: "Symptoms", list: [...oa.symptoms.primary, ...(oa.symptoms.secondary ?? [])] },
      { heading: "Diagnosis", paragraphs: oa.diagnosis ?? [] },
      ...oa.treatments.map((t) => ({ heading: t.category, list: t.items })),
      { heading: "Important notes", list: oa.importantNotes ?? [] },
    ],
  },

  {
    slug: "clenching",
    title: "Clenching",
    plainName: "I clench my teeth",
    category: "Parafunction",
    source: "TMJ Brochure 2026",
    summary: "The patient is usually aware of clenching. The masseter muscles ache, and the joint may click in the morning.",
    signs: ["Aware of clenching", "Masseter muscles ache", "Morning clicking"],
    full: [
      {
        heading: "Pattern",
        paragraphs: ["The patient is aware of clenching, the masseter muscles ache, and there may be clicking in the morning."],
      },
      {
        heading: "Approach",
        list: ["Occlusal adjustment", "D-PAS night guard", "Magnesium and vitamin C"],
      },
    ],
  },

  {
    slug: "sleep-grinding",
    title: "Sleep grinding",
    plainName: "I grind my teeth at night",
    category: "Parafunction",
    source: "TMJ Brochure 2026",
    summary: "Stress increases grinding, but it is usually not the primary cause. The clinical exam usually reveals it: an uneven bite or a damaged TMJ.",
    signs: ["Worn teeth", "Chipping, cracking or loosening", "A partner hears grinding"],
    full: [
      {
        heading: "Pattern",
        paragraphs: ["Worn teeth are the defining sign. Excess force also shows as chipping, breaking, cracking, splitting, moving or loosening teeth."],
      },
      {
        heading: "Causes",
        paragraphs: ["Stress increases grinding but is usually not the primary cause. Common causes include an uneven bite or a damaged TMJ, and a clinical examination usually reveals which."],
      },
      {
        heading: "Approach",
        list: ["Protective night guard", "Airway night guard", "Occlusal adjustment where the bite is the cause"],
      },
    ],
  },

  {
    slug: "occlusal-muscle-disharmony",
    title: "Occlusal muscle disharmony",
    plainName: "Headaches and sore chewing muscles",
    category: "Muscles of the TMJ",
    source: "TMJ Brochure 2026",
    summary: "The most commonly missed diagnosis: teeth touching imprecisely make the muscles work to compensate, causing sore muscles and headaches.",
    signs: ["Sore muscles when chewing", "Headaches", "Slight soreness of the lateral pterygoid"],
    full: [
      {
        heading: "Pattern",
        paragraphs: [
          "Teeth that touch imprecisely create muscle tension, which leads to headaches. Distinguishing features are slight soreness of the lateral pterygoid and sore muscles when chewing.",
          "The critical question: is the primary soreness from the jaw muscles, the jaw joint or the neck muscles — and does the bite have anything to do with it? Half of headaches are not bite-related, so an accurate diagnosis is essential.",
        ],
      },
      { heading: "Approach", paragraphs: ["Precision refinement of the bite — an occlusal adjustment — rather than muscle relief alone."] },
    ],
  },

  {
    slug: "sprain-discal-ligament",
    title: "Sprain of the discal ligament",
    plainName: "My jaw suddenly hurts and won’t open",
    category: "TMJ damage",
    source: "TMJ Brochure 2026",
    summary: "Sudden onset with limited opening and a soft end point on stretching — the TMJ sprained like an ankle.",
    signs: ["Sudden onset", "Limited opening", "Soft end point on stretching"],
    full: [
      { heading: "Pattern", paragraphs: ["Sudden onset, limited opening, and a soft end point when the jaw is gently stretched."] },
      { heading: "Approach", list: ["Cold laser", "Rest and a soft diet", "An anti-inflammatory (NSAID)", "Anterior repositioning orthotic"] },
    ],
  },

  {
    slug: "acute-closed-lock",
    title: "Acute closed lock",
    plainName: "My jaw is stuck",
    category: "TMJ damage",
    source: "TMJ Brochure 2026",
    summary: "Limited opening with a hard end point: the disc is stuck out of position. Seek an examination promptly.",
    signs: ["Limited opening", "Hard end point on stretching", "Can’t move fully side to side"],
    full: [
      { heading: "Pattern", paragraphs: ["Limited opening with a hard end point on the active stretching test. The jaw cannot move fully side to side."] },
      { heading: "Approach", paragraphs: ["Two to three weeks of jaw movement exercises, ice, an anti-inflammatory and cold laser. If limited opening does not resolve, arthrocentesis with PRP is indicated."] },
    ],
  },
];

export const conditionCategories = understanding.definition.categories.map((c) => c.name);

/* ───────────────────────── Literature & resources ───────────────────────── */

export type Resource = {
  title: string;
  description: string;
  kind: "Lecture" | "Article" | "Reference" | "Handout" | "Instructions" | "Video";
  href?: string;
  meta?: string;
  audience: "dentists" | "patients" | "both";
};

export const literature: Resource[] = [
  {
    title: "Orthopedic Medicine",
    description: "John R. Droter, DDS, on the orthopedic approach to diagnosing the TMJ.",
    kind: "Article",
    href: "https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf",
    meta: "Published article · PDF",
    audience: "dentists",
  },
  {
    title: "The worn dentition — pathognomonic patterns of abrasion and erosion",
    description: "Abrahamsen T C. Int Dent J 2005; 55: 268–76.",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf",
    meta: "International Dental Journal · PDF",
    audience: "both",
  },
  {
    title: "Toothpaste relative dentin abrasiveness",
    description: "Rath, 2016 — comparing the abrasiveness of common toothpastes.",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2017/06/Rath-Toothpaste-Abrasiveness-2016.pdf",
    meta: "Article · PDF",
    audience: "both",
  },
];

export const lectures: Resource[] = [
  {
    title: "Pankey TMD 2026",
    description: "Slides from Dr. Droter’s TMD course at the L.D. Pankey Institute (Day 4 version).",
    kind: "Lecture",
    href: "https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf",
    meta: "L.D. Pankey Institute · 2026 · PDF",
    audience: "dentists",
  },
  {
    title: "Gill Ortho Ceph Analysis — Extract",
    description: "Cephalometric analysis extract used alongside the Pankey TMD course.",
    kind: "Lecture",
    href: "https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf",
    meta: "L.D. Pankey Institute · 2026 · PDF",
    audience: "dentists",
  },
];

export const patientResources: Resource[] = [
  {
    title: "Hot Cold Hot",
    description: "Home therapy for sore muscles with trigger points.",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf",
    meta: "Handout · PDF",
    audience: "patients",
  },
  {
    title: "Photos: The Big 12",
    description: "Photos your dentist can take to help monitor your progress.",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2017/01/Photo-Guidelines17.1.Big12.pdf",
    meta: "Guide · PDF",
    audience: "both",
  },
  {
    title: "Supplement recommendations",
    description: "Dr. Droter’s vitamin and supplement recommendations.",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2026/08/Vitamin-Recommendation-26.8.pdf",
    meta: "Aug 2026 · PDF",
    audience: "patients",
  },
  {
    title: "Toothpaste recommendations",
    description: "Which toothpastes are gentlest on worn enamel.",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2018/05/Toothpaste-Recommendations-2018.5.pdf",
    meta: "2018 · PDF",
    audience: "patients",
  },
  {
    title: "Toothpaste abrasiveness chart",
    description: "Relative dentin abrasiveness of common toothpastes.",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2018/01/Toothpaste-Abrasivenss-Chart-2016-17.9-article.pdf",
    meta: "Chart · PDF",
    audience: "patients",
  },
];

/* ───────────────────────── Practice (light touch) ───────────────────────── */

export const practice = {
  heading: "See Dr. Droter in Bowie, Maryland",
  body: "Dr. Droter maintains a private practice diagnosing facial pain in the Washington DC, Baltimore and Annapolis area. After you call the office, you’ll receive an email with a link to the new patient forms.",
  phone: "301-805-9400",
  addressLines: ["4000 Mitchellville Road", "Bowie, MD 20716"],
  firstVisit: [
    "Is the TMJ damaged?",
    "Is the neck damaged?",
    "Does this damage contribute to the problems you are having?",
    "What further tests or radiographs, if any, are needed for a definitive diagnosis?",
  ],
};
