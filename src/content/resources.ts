/**
 * Dr. Droter's patient handouts as web pages on drdroter.com (/droter/library/…).
 * On the Oct 14 call: "those downloadable pages should be a web page on their
 * own." There are no PDF downloads for patients.
 *
 * Wording is his, verbatim from the handouts (Assets/APSleep/source-text/):
 *  - hotcoldhot.txt (via tmd.ts `understanding.hotColdHot`);
 *  - vitamin-recommendation-26.8.txt ("Nutritional Supplement Recommendations 2026");
 *  - toothpaste-recommendations-2018.5.txt ("Toothpaste Recommendations 2018" and
 *    "Toothbrushing Tools Recommendations 2018").
 * Card lines and group names are his link text and headings on
 * drdroter.com/patient-downloads. Only damage from the PDF text extraction
 * (dropped "fl"/"fi") and obvious typos are corrected. Prices are left out.
 *
 * Buy links: every product has an optional `buyUrl`. Amazon links come later
 * (no affiliate account yet); while it is empty the page shows no link.
 *
 * Updating a handout: when he sends a new version, replace that handout's
 * object below (title, version, groups/products); the page renders whatever is
 * here, in this order.
 */

import { understanding } from "./tmd";

/** Only drdroter.com carries these pages. */
export const resourceSite = "droter" as const;

export type Product = {
  name: string;
  /** His notes under the product, one line each. */
  notes: string[];
  /** His "Disadvantage-" line, without the label. */
  disadvantage?: string;
  /** Where to buy (an Amazon link, later). Empty = no link is shown. */
  buyUrl?: string;
};

export type ProductGroup = {
  heading: string;
  /** His general advice for the group, one paragraph each. */
  advice?: { heading: string; lines: string[] };
  products: Product[];
};

/* ───────────────────────── Hot, Cold, Hot ───────────────────────── */

const hcd = understanding.hotColdHot;

export const hotColdHot = {
  slug: "hot-cold-hot",
  title: hcd.heading,
  /** His line under the download on drdroter.com/patient-downloads. */
  line: "Home therapy for sore muscles with triggerpoints",
  /** His heading word on the handout. */
  label: "Directions",
  purpose: hcd.purpose,
  /** His bullets. The last line of the handout ("You can repeat…") sits under the list. */
  steps: hcd.steps.filter((s) => !s.startsWith("You can repeat")),
  repeat: hcd.steps.find((s) => s.startsWith("You can repeat")) ?? "",
};

/* ───────────────────────── Supplements ───────────────────────── */

export const supplements = {
  slug: "supplements",
  /** His link text on drdroter.com/patient-downloads. */
  title: "Supplement Recommendations",
  /** His heading for it on drdroter.com/patient-downloads. */
  label: "Vitamin Supplements",
  /** The handout's own title line. */
  docTitle: "Nutritional Supplement Recommendations 2026",
  author: "John R. Droter, DDS",
  version: "26.8",
  /** His "Where to buy" box. */
  whereToBuy: { heading: "Where to buy", text: "Amazon" },
  groups: [
    {
      heading: "Multi Vitamin",
      products: [
        {
          name: "Life Extensions Two per Day",
          notes: ["For smaller size pills and same nutrients can use Life Extensions Two per Day"],
          buyUrl: "",
        },
        {
          name: "NOW Liquid Multi",
          notes: ["If not able to swallow pills.", "Has Xylitol which may upset stomach.", "Women may need to add iron."],
          buyUrl: "",
        },
        {
          name: "Life Extension Iron Protein Plus",
          notes: ["Many Women need to add iron."],
          buyUrl: "",
        },
      ],
    },
    {
      heading: "Joint Health",
      products: [
        {
          name: "Doctor’s Best Vegetarian Glucosamine Chondroitin & MSM",
          notes: ["Contains no shellfish or animal products."],
          buyUrl: "",
        },
        {
          name: "Life Extensions CoffeeGenic 400mg Green Coffee Extract",
          notes: ["Anti-Inflammatory"],
          buyUrl: "",
        },
      ],
    },
    {
      heading: "Other Helpful Supplements",
      products: [
        {
          name: "Probiora Professional Strength",
          notes: ["Maintain a healthy oral flora.", "Rub tablet around mouth with tongue after brushing before bed"],
          buyUrl: "",
        },
        {
          name: "Stella Life Probiotics Kit",
          notes: ["Take after antibiotic therapy to repopulate gut and Oral bacteria"],
          buyUrl: "",
        },
        {
          name: "Fast Lyte No Sugar",
          notes: ["Electrolytes"],
          buyUrl: "",
        },
        {
          name: "Mother Earth Ionic Angstrom Magnesium 2 oz bottle",
          notes: ["Take 0.5 teaspoon sublingual (5mg) - (2 droppers, half filled)"],
          buyUrl: "",
        },
        {
          name: "NOW Vitamin D-3 5,000 IU",
          notes: [
            "Take 1-2 capsules daily for low vitamin D.",
            "Repeat blood test in 8 weeks.",
            "Once blood levels normal, Life Extension Two per Day multi vitamin should suffice.",
          ],
          buyUrl: "",
        },
        {
          name: "Shaklee +C Boost- 500 Vitamin C Sustained Release",
          notes: ["Take 1000 mg before strenuous exercise.", "Take 1000mg before sleep if grind or clench teeth."],
          buyUrl: "",
        },
        {
          name: "Natural Calm Magnesium Citrate, Raspberry Lemon flavor",
          notes: [
            "Take 1-4 grams, 2 hours prior to sleep.",
            "Use to calm muscles and treat low magnesium levels.",
            "In too high a dose will cause diarrhea.",
            "Verify Kidney health prior to starting this supplement.",
          ],
          buyUrl: "",
        },
      ],
    },
  ] satisfies ProductGroup[],
};

/* ───────────────────────── Toothpaste ───────────────────────── */

export const toothpaste = {
  slug: "toothpaste",
  /** His link text on drdroter.com/patient-downloads, without the version number. */
  title: "Toothpaste Recommendations",
  /** His heading for it on drdroter.com/patient-downloads. */
  label: "Oral Hygiene Recommendations",
  docTitle: "Toothpaste Recommendations 2018",
  author: "John R. Droter, DDS",
  version: "2018.5",
  advice: {
    heading: "Advice in General",
    lines: [
      "If toothpaste label says “whitening”, it is probably very abrasive and should be avoided.",
      "Abrasiveness can damage teeth at the gum line. All toothpastes below have low abrasiveness.",
      "Fluoride is very, very effective at preventing decay. All below have fluoride except Spry fluoride free.",
      "SLS is Sodium Lauryl Sulfate, a surfactant foaming agent that may be problematic long term.",
    ],
  },
  recommendations: {
    heading: "Recommendations",
    lines: [
      "Spry with Fluoride is best overall option. MyntSmile is the only option that will keep crowns shiny.",
      "For those with cold sensitive teeth use Colgate Sensitive Complete Protection for 1 tube then switch to Spry with Xylitol, Aloe, Fluoride (or MyntSmile) AND rinse with Listerine Smart Rinse.",
      "To prevent root damage brush with Listerine Smart Rinse. Limit toothpaste use to several times a week, Pronamel is best toothpaste choice to minimize root abrasion.",
      "High caries rate, dry mouth, or very sensitive teeth, get prescription for Neutramaxx 5000.",
    ],
  },
  groups: [
    {
      heading: "Toothpaste",
      products: [
        {
          name: "Spry with Xylitol, Aloe, Fluoride",
          notes: ["Uses Xylitol and no saccharine, has fluoride, no SLS", "Low abrasiveness."],
          disadvantage: "Slightly dulls porcelain",
          buyUrl: "",
        },
        {
          name: "Pronamel Daily Protection",
          notes: ["Very low abrasiveness (34 RDA), no SLS."],
          disadvantage: "Slightly dulls porcelain, has saccharine.",
          buyUrl: "",
        },
        {
          name: "Listerine Smart rinse",
          notes: [
            "No Abrasiveness, will not damage root surfaces or dull porcelain when used instead of tooth paste, has fluoride, no SLS, no saccharine, very low cost, is a great rinse after brushing with a toothpaste also.",
          ],
          disadvantage: "will not remove any staining.",
          buyUrl: "",
        },
        {
          name: "Colgate Sensitive Complete Protection",
          notes: ["Has potassium nitrate to desensitize roots,", "Low abrasiveness (63 RDA)."],
          disadvantage: "Slightly dulls porcelain, Has SLS and saccharine",
          buyUrl: "",
        },
        {
          name: "Neutramaxx 5000 TCP Plus Turbo",
          notes: ["5000ppm Fluoride, potassium nitrate to desensitize roots,", "Tri calcium Phosphate, no SLS, no saccharine"],
          disadvantage: "Slightly dulls porcelain, Rx Only, Cost",
          buyUrl: "",
        },
        {
          name: "Biotene with Fluoride",
          notes: ["Low abrasiveness (78 RDA), No SLS"],
          disadvantage: "Slightly dulls porcelain, has saccharine.",
          buyUrl: "",
        },
        {
          name: "Colgate Original",
          notes: ["Low abrasiveness (68 RDA), very low cost."],
          disadvantage: "Slightly dulls porcelain, Has SLS and saccharine.",
          buyUrl: "",
        },
        {
          name: "Spry Fluoride Free",
          notes: ["Uses Xylitol and no saccharine, no SLS", "Low abrasiveness."],
          disadvantage: "Slightly dulls porcelain, increased risk of caries, decay.",
          buyUrl: "",
        },
        {
          name: "MyntSmile",
          notes: ["Very low abrasion, has fluoride, no SLS, no saccharine,", "will not dull porcelain, uses nano diamond polishing particles"],
          disadvantage: "Cost, diamonds are expensive.",
          buyUrl: "",
        },
      ],
    },
    {
      /** His second page: "Toothbrushing Tools Recommendations 2018". */
      heading: "Toothbrushing Tools",
      advice: {
        heading: "General Advice",
        lines: [
          "Use a soft bristle brush. Even though the bristle will not damage teeth (it is the abrasiveness of the toothpaste that does the damage to root surfaces), medium or hard bristles will damage gum tissue, which will expose the root which can then be damaged by the toothpaste.",
          "Use a massaging circular motion for a manual toothbrush not a scrubbing motion.",
          "“Massage the gums” instead of brushing the teeth.",
        ],
      },
      products: [
        {
          name: "Oral B Prohealth Advanced Soft",
          notes: ["(Not the All in One model)", "Must be soft. Do not get medium"],
          buyUrl: "",
        },
        { name: "drTungs Smart Floss", notes: [], buyUrl: "" },
        { name: "G.U.M. Soft Picks", notes: [], buyUrl: "" },
        { name: "Listerine UltraClean Access Flosser", notes: [], buyUrl: "" },
        { name: "BreathRx Tongue Scraper", notes: [], buyUrl: "" },
        {
          name: "Hydrofloss Oral Irrigator",
          notes: ["Charges the water (ions) so tooth surfaces become less able to retain bacteria, stain and calcium deposits."],
          buyUrl: "",
        },
        {
          name: "Oral-B Pro 5000 SmartSeries Power Rechargeable Electric Toothbrush with Bluetooth Connectivity Powered by Braun",
          notes: [
            "The bluetooth is not practical and a waste of $$ as probably not used by most, but this model has better features than the less expensive models. It has the ability to indicate when you are using too much pressure and has a light feather mode to help prevent wearing of root surfaces. If you have damaged root surfaces use this brush along with Listerine Smart Rinse. Limit toothpaste use to only several times a week, Pronamel is best choice.",
          ],
          buyUrl: "",
        },
        {
          name: "Oral-B Pro 1000",
          notes: ["Smaller and less expensive. Same action as Pro 5000 regular mode, but does not have the feather mode or the “too hard” indicator."],
          buyUrl: "",
        },
      ],
    },
  ] satisfies ProductGroup[],
  /** Titles in tmd.ts `literature` that he listed with this handout (drdroter.com/patient-downloads, "Oral Hygiene Recommendations"). */
  reading: ["The worn dentition", "Rath article on Toothpaste"],
};

/* ───────────────────────── TMJ Brochure 2026 ───────────────────────── */

/**
 * His patient brochure "Temporo Mandibular Joint Disorders — Do you have a TMJ
 * problem?" (TMJ Brochure 2026.v 26.4, by John R Droter, DDS), verbatim from
 * the PDF (pdftotext). Only obvious typos are fixed ("gravely" → "gravelly",
 * "including;" → "including:"). One question is reworded where the brochure
 * says "treatment", because questions render as headings (no "treat" in
 * headings): "Do I need treatment?" → "Do I need help?".
 * Used by /understanding-tmd (signs and symptoms, the self-check, the FAQ).
 */
export const tmjBrochure = {
  title: "Temporo Mandibular Joint Disorders",
  version: "26.4",
  /** "SIGNS AND SYMPTOMS OF TMJ DISORDERS", items 1–11 as written. Item 8 carries his sub-list. */
  signs: [
    { text: "Headaches, especially headaches around the temple and behind the eyes. It has been estimated that up to half of all headaches are TMJ related." },
    { text: "Grinding or clenching your teeth, especially at night." },
    { text: "Sore muscles of the jaw and neck. Tired muscles after eating. Sore muscles from clenching or grinding your teeth." },
    { text: "Pain or tenderness of the TMJ." },
    { text: "Any present or past clicking noises from your TMJ." },
    { text: "A rough, sand like, gravelly sound of the TMJ upon movement." },
    {
      text: "A past history of limited opening. Not being able to open your jaw as far as you could in the past. Not being able to open or close your jaw without moving it sideways.",
    },
    {
      text: "Any signs of excess force on the teeth, including:",
      sub: [
        "Teeth that are wearing away.",
        "Teeth that are chipping or breaking.",
        "Teeth that are cracking or splitting.",
        "Teeth that are moving.",
        "Teeth that are loose.",
      ],
    },
    { text: "Earache, ear throbbing, or ringing in the ears." },
    { text: "Pain behind the eyes." },
    { text: "A change in the bite. The teeth do not feel like they fit together properly." },
  ] as { text: string; sub?: string[] }[],
  /** His "NOTE:" under the list (the label is set by the page). */
  note: "Pain is not a good indicator of the severity of the disease. A joint with minor damage may hurt worse than a joint that has significant damage.",
  /** "How The TMJ Works": his self-check sentence, and the sentence that closes the same paragraph's check. */
  selfCheck: [
    "If you place your fingers in front of your ears and open and close, you can feel the TMJ and the condyle.",
    "Any discomfort when you touch the joint, even very slight discomfort, is an indication that something is wrong.",
  ],
  /** "Commonly Asked Questions": his four, answers verbatim. */
  faq: [
    {
      q: "I have headaches. Is there a chance that it is due to the TMJ?",
      a: "Many headaches are related to a problem with either the TMJ or the muscles of the TMJ. Many patients who had suffered for years with headaches are now pain free after their TMJ problem was accurately diagnosed and treated.",
    },
    {
      q: "My jaw joint clicks occasionally. Do I need help?",
      a: "You can not have clicking in the TMJ without having damaged the ligaments that once held the disc in place. The extent of the damage needs to be determined. Not all clicks of the TMJ need to be treated, but some must be to avoid future problems. You must have a doctor who is knowledgeable in TMJ problems evaluate you. A severely damaged joint and a slightly damaged joint can surprisingly appear quite similar. Seeking treatment now may prevent the disease process from progressing into its more painful and destructive stages.",
    },
    {
      q: "Occasionally my jaw gets stuck and I can not open very wide. If I wiggle my jaw, that frees it up sometimes. Sometimes it does not. What is happening?",
      a: "Get an examination immediately by a doctor who is knowledgeable in treating TMJ problems. Your TMJ is entering a more advanced stage of breakdown. The disc is getting stuck out of its normal position. Intervention now may prevent you from entering the more serious forms of this disease process.",
    },
    {
      q: "I grind my teeth at night. I guess I am under too much stress. Is there anything that can be done?",
      a: "While stress will cause the amount of grinding to increase, it is usually not the primary cause of the grinding. A clinical examination usually will reveal the cause of the grinding. Common causes of grinding are an uneven bite or a damaged TMJ.",
    },
  ],
};

/* ───────────────────────── Index ───────────────────────── */

export type ResourcePage = {
  slug: string;
  title: string;
  /** One line for the card (his words). */
  line: string;
  /** Card foot: his heading for it. */
  label: string;
};

/** The pages, in his drdroter.com/patient-downloads order. */
export const resourcePages: ResourcePage[] = [
  { slug: hotColdHot.slug, title: hotColdHot.title, line: hotColdHot.line, label: hotColdHot.label },
  {
    slug: supplements.slug,
    title: supplements.title,
    /* His three headings on the handout. */
    line: supplements.groups.map((g) => g.heading).join(", ").replace(/, ([^,]+)$/, " and $1"),
    label: supplements.label,
  },
  { slug: toothpaste.slug, title: toothpaste.title, line: toothpaste.advice.lines[0], label: toothpaste.label },
];
