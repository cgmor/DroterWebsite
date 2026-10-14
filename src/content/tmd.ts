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
  /** His heading on drdroter.com/about-tmd. */
  title: "TMD and Facial Pain",
  /** drdroter.com/about-tmd, verbatim ("patients" → "patient’s"). */
  intro:
    "Understanding all the different diseases and dysfunctions that can cause facial pain is the first step in developing a list of the possible causes of a specific patient’s pain.",

  thesis: {
    line: "Telling a patient that he or she has “TMJ” is equivalent to a physician telling a patient he or she has “knee.”",
    attribution: "John R. Droter, DDS",
  },

  joint: {
    heading: "What is the TMJ?",
    /** His 2005 Dentistry Today article and drdroter.com/locked-jaw, verbatim. */
    paragraphs: [
      "A joint is 2 bones joined together to allow movement between those bones. The TMJ is a synovial joint and is susceptible to the same disease processes as any other synovial joint in the human body.",
      "As your jaw opens and closes the condyle (ball) moves in and out of the fossa (socket). Ideally you should be able to open your jaw pain-free to 40-55 mm, which is about 3 vertical finger widths.",
    ],
    selfCheck:
      "Place your fingers in front of your ears and open and close. You can feel the TMJ and the condyle moving. Any discomfort — even slight — indicates something is wrong.",
    figures: [
      fig("tmj-healthy.jpg", "Illustration of a healthy temporomandibular joint with the disc seated on the condyle", 1024, 768),
      fig("tmj-damaged.jpg", "Illustration of a damaged temporomandibular joint with the disc dislocated forward of the condyle", 1024, 768),
    ],
  },

  signs: {
    heading: "Signs and symptoms",
    intro: "",
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
    /** drdroter.com/uncomfortable-bite-occlusion, verbatim. */
    headacheStat: "Greater than 30% of headache patients have an occlusal problem that can be fixed without medications.",
  },

  definition: {
    heading: "TMD is not one disease",
    paragraphs: [
      "Many different diseases and dysfunctions can cause facial pain. The head and neck are composed of many nerves, blood vessels, muscles, bones, and connective tissues, all of which can be the primary source of pain. Pain can be originating from; muscles of the temporomandibular joint (TMJ), muscles of the neck, TMJ, teeth, sinus, ear, neuralgia, vascular, lesions of central nervous system, plus many others.",
      "Temporomandibular disorders (TMD) are a group of diseases and dysfunctions that cause facial pain. TMD is not one disease, but many different diseases grouped into one classification.",
      "Problems involving the TMJ are but one of many types of TMD. It is important to emphasize that TMD is not one disease with one treatment. Patients routinely present with a previous diagnosis of “TMJ” or “TMD.” Telling a patient that he or she has “TMJ” is equivalent to a physician telling a patient he or she has “knee.” TMJ and TMD are not accurate orthopaedic diagnoses, and clinicians should not use them as a diagnosis.",
    ],
    adaCriteria: {
      lead: "The American Dental Association’s President’s Conference on Temporomandibular Disorders defined TMD as a group of orofacial disorders characterized by:",
      items: [
        "Pain in the preauricular area (in front of the ear), TMJ, or muscles of mastication",
        "Limitations/deviations in mandibular range of motion",
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
      { name: "TMJ damage" },
      { name: "Muscles of the TMJ" },
      { name: "Cranial alignment and occlusion" },
      { name: "Cervical damage" },
      { name: "Parafunction" },
      { name: "Whole body and systemic" },
      { name: "Other" },
    ] as { name: string; note?: string }[],
    figure: fig("tmj-forty-diseases.jpg", "Dr. Droter’s lecture slide listing the 40 diseases of the TMJ", 1200, 600, "1. TMJ Damage and Diseases"),
  },

  evidence: {
    heading: "What the numbers show",
    items: [
      /** drdroter.com/about-tmd, verbatim. `label` is his whole sentence; `value` is the figure inside it. */
      { value: "70%", label: "The majority of patients (70%) with TMD facial pain have myalgia (soreness) of the TMJ muscles." },
      { value: "86%", label: "Significantly more patients with TMD facial pain have a damaged TMJ (86%) as compared to non-TMD patients (34%)." },
      { value: "70%", label: "You can have a damaged TMJ and not have pain. In fact, a majority (70%) of damaged joints adapt favorably over time without any therapy. However 30% of damaged TMJ do not adapt favorably, and a few (3%) will have serious problems including chronic pain and facial deformity." },
    ],
    caveat:
      "Any therapy that makes muscles feel better will help. These therapies however may only be masking the cause of the problem. While the patient may feel better, therapy is continually needed to maintain a degree of comfort as the cause of the problem has not been identified and resolved. Muscle relaxants are a good example of a treatment that makes the muscles feel better, but is not a long term solution.",
  },

  pain: {
    heading: "Three types of facial pain",
    lead: "All pain in the human body is one of three types:",
    types: [
      { name: "Nociceptive Pain", body: "Pain from tissue" },
      { name: "Neuropathic Pain", body: "Pain caused from nerves not functioning properly" },
      { name: "Centrally Mediated Pain", body: "Pain from the brain not functioning properly" },
    ],
    overlay:
      "Overtop of all three types of pain is how the brain interprets pain. This is affected by stress and emotion. This is not the source of the pain, but affects the pain experience.",
    figure: fig("three-types-of-pain.jpg", "Dr. Droter’s lecture slide showing the three types of facial pain", 1200, 600, "From Dr. Droter’s TMD lecture."),
    beliefs: {
      /** His heading is "Different Beliefs: Different Treatments"; the second half is dropped (no "treat" in headings). */
      heading: "Different Beliefs",
      paragraphs: [
        "There is not a consensus among professionals on which types of pain are the most prevalent. I find in my patients that sore muscles and joints in the head and neck are the source of the majority of facial pain (Nociceptive Pain). I find it invaluable to examine the muscles and joints by palpation (push on), find out what is sore, and then figure out why it is sore. Therapies are then based on removing the cause of the sore muscles and joints. I do have patients who do have neuropathic pain and centrally mediated pain, but these are not the majority.",
        "You can tell a doctor’s beliefs on the main causes of facial pain by which therapies they administer the most. I treat the physical causes of pain with an occasional treatment for the other types. A doctor who believes neuropathic pain is the most prevalent, most likely will not palpate muscles and joints, but will write prescriptions for drugs like gabapentin, neurontin, and anti depressants. A doctor who believes most facial pain is caused by Psychosocial will recommend stress counseling, relaxation techniques, and anti-anxiety medication. They may recommend physical therapy for sore muscles, but believe the muscles are sore from emotional stress. While I agree that the brain’s interpretation of pain is a factor, I do not feel it is the cause of the pain. I have found if you remove the source of the pain, the pain goes away and most patients are no longer depressed.",
        "I firmly believe the majority of headaches and facial pain is from sore muscles and joints. If your doctor does not thoroughly palpate the muscles and is quick to write you a prescription you may want a second opinion.",
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
    /** drdroter.com/facial-pain, verbatim ("will to lead" typo fixed). The groups below are from the 2026 brochure (pending his verbatim text). */
    lead: "There are 190+ different causes of Temporomandibular Disorders/Facial Pain. The examination process, which needs to include muscle and joint palpation, will lead to a working diagnosis on which you will be treated. A specific treatment is needed for each specific diagnosis. I utilize 70+ different therapies in my practice.",
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
    /** His Hot Cold Hot handout (drdroter.com/patient-downloads), verbatim. */
    heading: "Hot, Cold, Hot Therapy",
    purpose: "The purpose of Hot, Cold, Hot Therapy is open the blood vessels, close the blood vessels, then open the blood vessels, allowing a rush of blood to flush out toxins in the muscles.",
    steps: [
      "Microwave a moist hand towel for 1-2 minutes on high, or until towel is very hot.",
      "Touch towel with hand to make sure it is not too hot to apply to face.",
      "Apply hand towel to neck, jaw and face area for 3 minutes (using a timer is very helpful.)",
      "Next, apply cold to the same area for 3 minutes. Using a bag of frozen peas is best.",
      "Reheat towel in microwave on high for 30 second intervals until hot again and apply to face, jaw and neck area for 3 minutes.",
      "You can repeat the above steps as often as you desire.",
    ],
    pdf: { href: "https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf", label: "HotColdHot Download" },
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
    /** drdroter.com/children, verbatim (typos fixed: "Futrue", "interferer", "breath"). */
    heading: "Helping the Young Avoid Becoming a Future TMD Patient",
    paragraphs: [
      "Many of my Temporomandibular Disorder patient’s current problems can be traced back to childhood. For an adult to function fully, they need to have a fully developed face. Many things at different phases of childhood development can interfere with reaching full genetic potential.",
      "Children who breathe through their mouth will lack having their tongue put pressure on the maxilla (upper jaw) during growth. The maxilla is dependent on the tongue to develop fully. Without the tongue putting pressure on the maxilla it will end up being narrow and will drift down. The maxilla is also the floor of the nose.",
    ],
    signs: ["Snoring", "thumb sucking", "enlarged tonsil and adenoids", "lagging behind in growth", "attention deficit disorder"],
    adult: "If this was not treated during childhood, as an adult you will see a narrow maxilla, high palate, narrow nasal passages, gummy smile, airway problems, upper airway resistance.",
  },
};

/* ───────────────────────── Condition guides ───────────────────────── */

export const conditionGuides: ConditionGuide[] = [
  /* drdroter.com/locked-jaw — verbatim; only typos fixed. plainName/summary/signs are his own phrases from the page. */
  {
    slug: "limited-jaw-opening",
    title: "Limited Jaw Opening",
    plainName: "Not able to open wide",
    category: "TMJ damage",
    source: "drdroter.com",
    summary:
      "Limited opening presents as not being able to open more than 35 mm (2 vertical finger widths). There are 7 distinctly different causes of limited opening, each requiring different treatments.",
    signs: ["Not able to open wide", "The onset of limited opening can be gradual but is usually sudden"],
    hero: fig("limited-169.jpg", "Dr. Droter’s lecture slide on limited jaw opening", 2048, 1024),
    full: [
      {
        heading: "Not able to open wide",
        paragraphs: [
          "A very common problem that patients are referred to me in my practice is for limited jaw opening. Limited opening presents as not being able to open more than 35 mm (2 vertical finger widths). The onset of limited opening can be gradual but is usually sudden. Ideally you should be able to open your jaw pain-free to 40-55 mm, which is about 3 vertical finger widths. As your jaw opens and closes the condyle (ball) moves in and out of the fossa (socket). There are 7 distinctly different causes of limited opening, each requiring different treatments.",
        ],
        figure: fig("limited-170.jpg", "Dr. Droter’s lecture slide on jaw opening and the condyle", 2048, 1024),
      },
      {
        heading: "Different Causes of Limited Jaw Opening",
        list: ["Pain Avoidance Sore Joint", "Pain Avoidance Sore Muscle", "Muscle Spasm", "Masseteric Space Infection", "Nonreducing Disc (4b, 3b Acute)", "Joint Fibrosis", "Muscle Fibrosis", "Other"],
        paragraphs: ["To determine the specific cause diagnostic tests need to be run. It needs to be determined whether the cause is the joint or the muscles or both."],
        figure: fig("limited-171.jpg", "Dr. Droter’s lecture slide listing the causes of limited opening", 2048, 1024),
      },
      {
        heading: "Diagnostic Tests Needed",
        list: ["History: How long limited opening has existed", "Body Temperature", "Caries Exam, Perio exam", "Range of Motion: open, side to side", "Gentle Active stretch: Point to area of pain", "Anterior Stop Test", "If needed CBCT, MRI"],
        paragraphs: ["Using the above tests results and using Dr Droter’s flow chart a likely cause can be determined and effective treatments rendered."],
        callout:
          "If you suspect a masseteric space infection, which presents as swelling behind the angle of mandible, difficulty swallowing and or throat soreness, see a doctor immediately.",
        figure: fig("limited-algorithm.png", "Dr. Droter’s flow chart for limited opening and arthralgia", 1224, 1584, "Dr. Droter’s limited-opening flow chart."),
      },
      {
        heading: "TMJ Arthralgia (Sore Joint)",
        paragraphs: [
          "The most common cause of limited opening I see is a sore Temporomandibular Joint limiting jaw movement. The brain tries to avoid pain so it limits the jaw movements. A defining feature of a sore jaw joint that is limiting jaw opening is what I call a soft endpoint. If the jaw is gently and slowly supported and stretched with a thumb on top tooth and index finger on bottom tooth, the jaw will gradually open wider. This identifies that the jaw can move but is being limited by the brain telling the muscles not to move. A hard end point is when the jaw can not be gently stretched to a wider opening. A hard end point is an indication of an anteriorly displaced disc that is not reducing.",
          "If a sore jaw joint is identified as the cause of the limited opening, one needs to figure out what is causing the jaw joint to be sore.",
          "Sore TMJ Differential Diagnosis: Acute Sprain, Chronic Sprain, Osteoarthritis, Osteolysis, Perforation of Pseudodisc, Discal perforation, Retrodiscal tissue impingement, Acute 4a, other.",
        ],
        figure: fig("limited-175.jpg", "Dr. Droter’s lecture slide on the soft and hard end point", 2048, 1024),
      },
      {
        heading: "The Most Common Cause of Limited Opening",
        paragraphs: [
          "Sprained ligaments of the Jaw Joint",
          "The most common cause that I see of a sore jaw joint limiting jaw opening is an acute sprain. The TMJ can be sprained just like an ankle. A sprain is a stretching of a ligament. This can occur during sleep from parafunctional jaw movements. Joint swelling can cause the back teeth to not touch on biting down. The posterior open bite will resolve once the joint swelling from the sprain resolves. A CBCT would be helpful to rule out the other causes of a sore TMJ, but one can treat the sore joint as if it is a sprain without imaging.",
        ],
        list: ["Soft chew diet", "Ice over the TMJ for 15 minutes 3-5 times a day for 3-5 days", "CBD Balm 3-5 a day", "NSAID for 5-7 days: Advil Liquid Gel Caps 200mg, 3 caps 3x a day, or Aleve Liquid Gel Caps 220mg, 1 cap 2x a day, or Green Coffee extract 400mg 3x a day", "Temporary upper Anterior Stop for sleep", "MLS Cold Laser (808/905nm): 700 hz then 10 hz", "If still sore in 1 week will need TMJ imaging: CBCT"],
        figure: fig("limited-184.jpg", "Dr. Droter’s lecture slide on the acute sprain", 2048, 1024),
      },
      {
        heading: "If still sore",
        paragraphs: [
          "If the jaw is still sore in 1 week the most common cause is Osteoarthritis. This is easily identified on a CBCT.",
          "If the jaw joint is still sore and limiting opening still persists an MRI scan is needed. Persistent joint soreness may require an arthrocentesis with platelet rich plasma to resolve the inflammation.",
        ],
      },
      {
        heading: "Sore Muscles causing Limited Opening",
        paragraphs: [
          "Limited opening caused by sore muscles is common but not easily diagnosed by most clinicians. Most medical doctors and dentists are not well trained in muscle palpation. If a person is bracing the lower jaw to avoid uncomfortable tooth contacts, the muscles become fatigued and get sore. If fatigued muscles are the cause, an anterior stop test to deprogram the muscles will allow them to temporarily relax and will restore full opening in about 3 minutes. If an anterior stop provides relief many palliative therapies that make muscles feel better will help, while corrective therapies aimed at creating a harmonious bite will resolve the issue without the need for continuous palliative therapy.",
          "I utilize an anterior stop deprogramming test on almost all of my new patients regardless of the amount of jaw opening to quickly relax the head and neck muscles and determine how much of their facial pain and headaches are due to sore overworked muscles.",
        ],
        list: ["Hot Cold Hot- 3 min each", "CBD Balm 3-5 a day", "Temporary upper Anterior Stop for sleep", "MLS Cold Laser (808/905nm): 700 hz then 10 hz", "Electrolytes if muscle spasm"],
        figure: fig("limited-187.jpg", "Dr. Droter’s lecture slide on the anterior stop test", 2048, 1024),
      },
      {
        heading: "Muscle spasm",
        paragraphs: [
          "A muscle spasm will present as more painful than overworked bracing muscles and have a firmer end point on active stretching with muscle discomfort. In the past I used TENS therapy to break the spasm. I now use the MLS M-Hi cold laser spasm setting for about 2 minutes. Cold laser takes less time than TENS and is more effective since it has lasting healing properties. Electrolyte imbalance in overworked muscles is also likely a factor so increasing electrolytes will help. Be sure and test for Occlusal Muscle Disharmony as that is usually the main underlying cause.",
        ],
        figure: fig("limited-186.jpg", "Dr. Droter’s lecture slide on muscle spasm", 2048, 1024),
      },
      {
        heading: "Acute Closed Lock: Stuck Disc",
        paragraphs: [
          "Most patients presenting to my practice with limited opening have been pre diagnosed with a non reducing TMJ disc, the disc is “stuck”. Less than 1/5 of patients have a stuck disc as the cause. The top 3 causes that I see are acute sprain, osteoarthritis, and Occlusal Muscle Disharmony.",
          "Those with a stuck disc will present with a hard end point in active stretching test and not be able to move their jaw fully side to side.",
          "Treatments includes 2-3 weeks of jaw movement exercises, Ice, and anti inflammatory like Advil or Aleve and Cold Laser. If limited opening does not resolve an arthrocentesis with PRP is indicated.",
        ],
        figure: fig("limited-189.jpg", "Dr. Droter’s lecture slide on the acute closed lock", 2048, 1024),
      },
    ],
  },

  /* drdroter.com/jaw-joint-damage — verbatim. */
  {
    slug: "clicking-jaw",
    title: "Jaw Joint Damage",
    plainName: "The Clicking Jaw",
    category: "TMJ damage",
    source: "drdroter.com",
    summary: "85% of people with jaw joint damage do not need any treatment what so ever!!!",
    signs: ["The joint makes a clicking sound on movement"],
    hero: fig("tmj-damaged.jpg", "Dr. Droter’s illustration of a damaged TMJ", 1024, 768),
    full: [
      {
        heading: "The Clicking Jaw",
        paragraphs: [
          "Many people have damaged their TMJs (35% of the population), the disc is dislocated anteriorly, and the joint makes a clicking sound on movement. Most damaged joints adapt favorably and allow good jaw function (opening and closing), chewing, and eating pain free. As long as the clicking sound is not too annoying, these damaged joints can be well tolerated. A few people do however have jaw dysfunction and pain from a damaged joint that will need treatment. The TMJs did not adapt favorably to the damage. For them, there is treatment to help the TMJ damage readapt in a more favorable manner.",
        ],
        figure: fig("tmj-healthy.jpg", "Dr. Droter’s illustration of a healthy TMJ", 1024, 768),
      },
      {
        heading: "The Many Causes of Facial Pain",
        paragraphs: [
          "There are 190+ different causes of Temporomandibular Disorders/Facial Pain. The examination process, which needs to include muscle and joint palpation, will lead to a working diagnosis on which you will be treated. A specific treatment is needed for each specific diagnosis. I utilize 70+ different therapies in my practice.",
        ],
        figure: fig("tmj-forty-diseases.jpg", "Dr. Droter’s lecture slide: TMJ damage and diseases", 1200, 600),
      },
    ],
  },

  /* drdroter.com/anterior-open-bite — verbatim. */
  {
    slug: "anterior-open-bite",
    title: "Anterior Open Bite",
    plainName: "Front teeth used to touch a year ago",
    category: "Cranial alignment and occlusion",
    source: "drdroter.com",
    summary:
      "Front teeth that used to touch and now are no longer in contact is a serious condition that can be progressive. While surgery is the most common recommendation to correct this deformity, there are several non surgical options to fix anterior open bite.",
    signs: ["Front teeth used to touch a year ago"],
    hero: fig("aob-ant-open.jpg", "Dr. Droter’s lecture slide on anterior open bite", 2048, 1024),
    full: [
      {
        heading: "Anterior Open Bite",
        paragraphs: [
          "Front teeth need to touch to allow proper speaking, eating and swallowing. Front teeth that used to touch and now are no longer in contact is a serious condition that can be progressive. While surgery is the most common recommendation to correct this deformity, there are several non surgical options to fix anterior open bite.",
        ],
        figure: fig("aob-ms.jpg", "Dr. Droter’s lecture slide on anterior open bite", 2048, 1024),
      },
      {
        heading: "Three main causes",
        paragraphs: [
          "There are three main causes of anterior open bite that occur after puberty: TMJ bone loss, tongue bracing a damaged neck, Iatrogenic (i.e Bad Night Guards).",
          "As you can see the above anterior open bites all look very similar, yet have different etiologies (causes). Patients with anterior open bites need a CBCT to definitively determine the cause. The cause of the open bite must first be determined for treatment to be effective.",
        ],
        figure: fig("aob-causes.jpg", "Dr. Droter’s lecture slide: adult onset anterior open bite differential diagnosis", 2400, 1200),
      },
    ],
  },

  /* drdroter.com/uncomfortable-bite-occlusion — verbatim. */
  {
    slug: "uncomfortable-bite",
    title: "Uncomfortable Bite (Occlusion)",
    plainName: "Occlusal Muscle Disharmony",
    category: "Cranial alignment and occlusion",
    source: "drdroter.com",
    summary: "Greater than 30% of headache patients have an occlusal problem that can be fixed without medications.",
    signs: ["Fatigued muscles on chewing harder foods", "Deep Facial Ache", "Headaches"],
    hero: fig("occlusion-extract-002.jpg", "Dr. Droter’s lecture slide: occlusal sculpting", 2400, 1200),
    full: [
      {
        heading: "Uncomfortable Bite (Occlusion)",
        paragraphs: [
          "Occlusion is how your teeth come in contact with each other. If your teeth are hitting unevenly, (too heavy on front teeth, too heavy on right or left teeth, or too heavy on a single tooth) this can cause pain and dysfunction in the head and neck area. Ideally, with the jaw joint fully seated in its socket, all your teeth should touch evenly. If your teeth touch unevenly, your jaw muscles have to position your lower jaw the best it can to try and get a reasonably even bite. Your jaw muscles are searching for something that does not exist: an even bite. This constant searching fatigues the muscles.",
          "If you have a recent change in how your teeth come together, you need to have a dentist who will take a CBCT scan of your jaw joint to rule out possible pathologies and analyze your bite with mounted study models and or a Tek Scan.",
        ],
        figure: fig("occlusion-dawson.jpg", "Diagram: teeth in the way on closing activate muscles to move the lower jaw", 1702, 1556, "Teeth that are in the way on closing activates muscles to move the lower jaw to avoid contact with the offending tooth. (From Textbook Functional Occlusion, Peter Dawson)"),
      },
      {
        heading: "Occlusal Muscle Disharmony",
        paragraphs: ["An uneven bite causing muscle fatigue is called Occlusal Muscle Disharmony."],
        list: ["Fatigued muscles on chewing harder foods", "Deep Facial Ache", "Headaches"],
        figure: fig("occlusion-post-openbite.jpg", "Photo: hitting too heavy on front teeth", 2048, 1375, "Hitting too heavy on front teeth causes clenching of teeth to try and get back teeth to touch."),
      },
      {
        heading: "Three types of uneven bite",
        steps: ["Posterior Occlusal interference. Too heavy on a back tooth.", "Posterior open bite. Too heavy on front teeth.", "Too heavy on one side: the right or the left."],
      },
      {
        heading: "Causes of an uneven bite",
        list: ["A damaged jaw joint", "Osteoarthritis", "Multiple dental restoration done at different times by different dentist", "Unfinished orthodontics.", "Inappropriate Orthodontic Retainers", "Poorly fitting night guards.", "Neck damage causing neck muscle bracing."],
      },
      {
        heading: "Occlusal Adjustment (“Sculpting” the occlusion)",
        paragraphs: [
          "Treatments for an uneven bite depends on the severity of the malocclusion. Most uneven bites can be fixed with an occlusion adjustment: a light reshaping of teeth. If the bite is further off than what can be corrected with an occlusal adjustment, other options include orthodontics, restorative dentistry, occlusal onlays, and condylar distraction.",
          "With a proper, harmonious occlusion all teeth have an equal amount of force when the TMJ is in its fully seated position. No single tooth has to endure an excessive load. The forces through the TMJ is reparative and regenerative, not destructive.",
          "Enamel can be contoured with a dental diamond or added to with composite. Enamel is about 2-3mm thick in healthy teeth. It is stone like with no nerves. Adjusting removes very little enamel. Adjusting the teeth is usually very comfortable. If a tooth is loose or has an old filling, it can be sensitive on adjusting. If enamel is already worn from grinding your teeth, dentin may be exposed on adjusting. If this happens a small white composite filling can be placed over the exposed dentin. Afterward your bite will feel more solid. Many people notice improved comfort right away, while others take a week or two to adapt.",
        ],
        figure: fig("occlusion-extract-002.jpg", "Dr. Droter’s lecture slide: occlusal sculpting", 2400, 1200),
      },
      {
        heading: "Benefits of having a proper, ideal occlusion",
        list: ["Muscles of the jaw are more relaxed.", "Muscle movements are coordinated and smooth.", "Less risk of splitting or breaking teeth.", "Teeth will not become loose, but will remain tight and firm.", "Helps to maintain the health of the temporomandibular joint.", "Helps to maintain the health of the periodontium.", "Front teeth that are adjusted in harmony look better."],
        figure: fig("occlusion-extract-001.jpg", "Dr. Droter’s lecture slide on occlusion", 2400, 1200),
      },
    ],
  },

  /* His osteoarthritis document (OA for APS web) — verbatim; only typos fixed ("diagnose" → "diagnosis", "Bromlnj" → "Bromelain"). */
  {
    slug: "osteoarthritis",
    title: "Osteoarthritis",
    plainName: "Soreness of the joint itself",
    category: "TMJ damage",
    source: "OA write-up",
    summary:
      "There are 40 different diseases that affect joints whether it is the Temporomandibular Joint or your wrist. Osteoarthritis is the most common disease of these 40 diseases.",
    signs: ["Soreness of the joint itself", "Ear pain", "Limited jaw opening", "Difficulty chewing", "Sore jaw muscles"],
    hero: { src: "/conditions/osteoarthritis/TMJ-Arrow.png", alt: "Dr. Droter’s illustration locating the TMJ in front of the ear", width: 1448, height: 1086 },
    full: [
      {
        heading: "Osteoarthritis",
        paragraphs: [
          "There are 40 different diseases that affect joints whether it is the Temporomandibular Joint or your wrist. Osteoarthritis is the most common disease of these 40 diseases. The most common symptom of Osteoarthritis of the TMJ will be soreness of the joint itself. Osteoarthritis of the TMJ can also present as ear pain since the ear and TMJ sit right next to each other. Other symptoms include limited jaw opening, difficulty chewing, and sore jaw muscles.",
          "In some cases it can be difficult for a person to tell if their joint is sore, you have to rub in the correct spot.",
          "If the TMJ is sore a CBCT (ConeBeam CT scan) of the joint is required to confirm the diagnosis of Osteoarthritis and determine the severity.",
        ],
      },
      {
        heading: "Damaged joints have friction",
        paragraphs: [
          "Osteoarthritis occurs when you have damaged the cartilage in a joint, most likely from past trauma. Damaged joints have friction, friction causes wear. A healthy joint has no friction and will not wear out. In theory you could move a healthy joint for a thousand years and there would be no wear. Once a joint is damaged it will have friction that leads to wear. Osteoarthritis is a progressive wearing out of the joint. As a joint wears out it will progress from early to Severe. A CBCT is the best way to determine where you are in the disease process.",
        ],
      },
      {
        heading: "Therapies",
        paragraphs: [
          "Treatments include minimizing sleep bruxing with a night guard and anti-inflammatory therapies (Ice, Topical CBD Balm, Jaw exercises, anti inflammatory medications, cold laser). Using an NSAID like meloxicam for 6 to 12 weeks is probably the simplest but there are risks. I have found cold laser therapy combined with topical CBD, Ice, jaw motion exercises, and Bromelain with green coffee extract to be very effective with less risks than standard NSAID medications.",
        ],
      },
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
    title: "John R Droter DDS Article",
    description: "John R Droter DDS Article. Orthopedic Medicine",
    kind: "Article",
    href: "https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf",
    meta: "Published article · PDF",
    audience: "dentists",
  },
  {
    title: "Thomas Abrahamsen Article",
    description: "Abrahamsen T C, The worn dentition – pathognomonic patterns of abrasion and erosion. Int Dent J 2005 55: 268-76.",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf",
    meta: "International Dental Journal · PDF",
    audience: "both",
  },
  {
    title: "Rath article on Toothpaste Relative Dentin Abrasiveness",
    description: "Rath article on Toothpaste Relative Dentin Abrasiveness",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2017/06/Rath-Toothpaste-Abrasiveness-2016.pdf",
    meta: "Article · PDF",
    audience: "both",
  },
];

export const lectures: Resource[] = [
  {
    title: "Pankey TMD 2026",
    description: "Day 4 Version",
    kind: "Lecture",
    href: "https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf",
    meta: "L.D. Pankey Institute · 2026 · PDF",
    audience: "dentists",
  },
  {
    title: "Gill Ortho Ceph Analysis — Extract",
    description: "Gill Ortho Ceph Analysis Extract",
    kind: "Lecture",
    href: "https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf",
    meta: "L.D. Pankey Institute · 2026 · PDF",
    audience: "dentists",
  },
];

export const patientResources: Resource[] = [
  {
    title: "HotColdHot Download",
    description: "Home therapy for sore muscles with triggerpoints",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf",
    meta: "Handout · PDF",
    audience: "patients",
  },
  {
    title: "Photos: The Big 12",
    description: "Photos your Dentist can take to help us monitor your progress",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2017/01/Photo-Guidelines17.1.Big12.pdf",
    meta: "Guide · PDF",
    audience: "both",
  },
  {
    title: "Supplement Recommendations",
    description: "Vitamin Supplements",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2026/08/Vitamin-Recommendation-26.8.pdf",
    meta: "Aug 2026 · PDF",
    audience: "patients",
  },
  {
    title: "Toothpaste Recommendations 2018.5",
    description: "Oral Hygiene Recommendations",
    kind: "Handout",
    href: "https://drdroter.com/wp-content/uploads/2018/05/Toothpaste-Recommendations-2018.5.pdf",
    meta: "2018 · PDF",
    audience: "patients",
  },
  {
    title: "Toothpaste Abrasivenss Chart 2016 17.9 article",
    description: "Toothpaste Abrasivenss Chart 2016 17.9 article",
    kind: "Reference",
    href: "https://drdroter.com/wp-content/uploads/2018/01/Toothpaste-Abrasivenss-Chart-2016-17.9-article.pdf",
    meta: "Chart · PDF",
    audience: "patients",
  },
];

/* ───────────────────────── Practice (light touch) ───────────────────────── */

export const practice = {
  /** His page title on drdroter.com. */
  heading: "New Patient Information",
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
