---
version: 1
slug: "src-app-v"
primary_target: "src/app/[v]"
related_targets: []
---

# APSleep.com: review build (/v1, /v2, /v3)

## Scope and modes
One site in one visual world, served three times for review. Each version has its own home page; every inner page is shared. The route tree is `src/app/[v]/…`, where v is v1, v2 or v3.
- **Home pages:** Persuade mode.
- **/airway-bite:** Operate mode. It's used chairside on a phone, and the kit's QR code lands here.
- **/understanding-tmd, /conditions, /conditions/[slug] and /library:** Read mode.
- **/appliances and /about:** Persuade-lite.

## Audience, job, action
Dentists come first. Their job is to evaluate the Airway Bite, order it (Order through Great Lakes Dental), use the protocol chairside, and learn from Dr. Droter's lectures and literature. Patients come second. Their job is to understand TMD and their likely condition in layers (a summary, then "Expand the full version"), then talk with a dentist. A light-touch panel covers his Bowie practice.

## Proof and content
All copy comes from src/content/aps.ts and src/content/tmd.ts. The material includes:
- the tutorial video and its chapters, stills, loops and renders
- the GLB of the device
- his lecture slides in /aps/edu, his TMJ illustrations and his headshot

Never invent claims, testimonials, prices or stats.

## Emphases
- **V1** leads with the Airway Bite.
- **V2** leads with Dr. Droter and his expertise.
- **V3** leads with TMD education.

Every version keeps the rotating 3D "Airway Bite, in detail" section, the full education depth and the practice panel.

## Direction contract
THESIS: The category standard played straight, at the craft of Straumann's clinical authority and Eight Sleep's rendered-product polish. A premium clinical-device and education site. It refuses the dental-supplier template (stock smiles, tooth icons, teal gradients, icon-card rows) and the AI-editorial looks (cream and serif journal, kicker labels over every heading).

OWN-WORLD: The ground is white. Media fields use the animation's own porcelain grey (#DCDCDC), so renders and stills bleed edge to edge. A cool mist (#F2F3F5) is the secondary band field for quiet sections: the tutorial, the condition indexes, the practice panel and the footer. There is one deep night-blue field family for sleep and airway moments, graphite ink, slate secondary text, and a single signal blue used only for interaction and the airway line. Display type is a light-weight grotesk (Geist 300–400, tight tracking down to −0.035em), capped at a calm clinical scale: home h1 64px, page h1 43px, h2 36px. UI and body use the same family. Geist Mono appears only for measurements, timecodes and spec values. Image cards have 20px corners, spec sheets use hairline rows, and Dr. Droter's own lecture slides are shown as framed figure plates. There are no eyebrow labels, no icon-tile card grids and no gradient text.

STORY: The visitor sees a serious clinical device and the decades of diagnostic thinking behind it, in Dr. Droter's own words (verbatim from his sources; AI-written copy is kept to interface labels and measured with the review bar's Highlight AI text view). Dentists order it and can use it chairside in one tap. Patients learn that "TMJ is not a diagnosis — it's a joint," find their condition, and read its full version.

FIRST VIEWPORT (revised 2026-10-14 for PRODUCT "Scale" and Principle 6; display text is capped at 64px, content at 1200px):
- **V1:** the device, contained (at most 560px, no bleed), on a porcelain field. On the left: the h1 "Airway Bite", his line "Easier and quicker to use. Disposable. No need to sterilize parts.", "Order from Great Lakes Dental" (primary) and "Watch the tutorial" (secondary), with the millimetre spec row directly beneath (4 mm · 10–12 mm · 14.6 × 22.0 × 13.8 mm). There is no dead band.
- **V2:** his verbatim thesis as the h1 ("An accurate diagnosis is the key and first step to any effective therapy."), his name, and the credit line "Visiting Faculty, L.D. Pankey Institute · Founder, ArrowPath Sleep". A modest framed portrait sits beside it, at most 380px wide, top-aligned with the headline. It is NEVER full-height and NEVER dissolved into the field; the user called the large face "creepy". The Airway Bite card with the order action is in the same viewport, grouped with the copy.
- **V3:** his heading "The Many Causes of Facial Pain" over his healthy and damaged TMJ plates with a toggle, his About TMD sentence, and two entry actions: "For patients: Find your condition" and "For dentists: See the Airway Bite". An Airway Bite band starts within the first scroll.

The header on every version has the logo, the nav (Airway Bite · Appliances · Understanding TMD · Conditions · Library · About), an audience switch (Dentists | Patients) and an Order button.

FORM: The category standard, chosen by the user (the canon card), quality bar straumann.com + eightsleep.com; seed: none (unavailable). Signature interactions:
1. the rotating 3D "Airway Bite, in detail" with view presets and a range scale
2. "How far forward?", an airway control that swaps the intro stills
3. the chairside protocol synced to the video chapters

Motion grammar: one authored moment per page. On V1 the hero device settles in; elsewhere content fades from an already-visible default, with exponential ease-out. Reduced motion is honoured.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- The suite number and public email (show the phone only).
- Patent-pending wording (omit for now).
- The final logo art (use the vector reconstruction).
