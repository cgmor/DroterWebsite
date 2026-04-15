# Product Requirements Document (PRD)
## Dr. Droter — TMJ/TMD Digital Presence

**Version:** 1.0  
**Date:** April 15, 2026  
**Author:** [Your Name]  
**Status:** Tier 1 — Public Patient-Facing Site

---

## 1. Executive Summary

This document defines the requirements for a modern, high-end medical website for **John R. Droter, DDS** — a nationally recognized specialist in temporomandibular joint (TMJ) disorders and facial pain diagnosis, practicing in Bowie, Maryland. The website replaces his current WordPress site (drdroter.com) with a premium, immersive digital presence inspired by the design language of [home.medvi.org](https://home.medvi.org/).

The site is architected in **three tiers**, seamlessly blended into a single cohesive experience:

| Tier | Audience | Access | Status |
|------|----------|--------|--------|
| 1 | Patients & general public | Open | **This PRD** |
| 2 | Dentists & clinicians | Paywall / login | Future PRD |
| 3 | Interactive diagnostic quiz | Open (with optional gating) | Future PRD |

This PRD covers **Tier 1** exclusively.

---

## 2. Design Philosophy & Visual Direction

### 2.1 Inspiration: MEDVi (home.medvi.org)

Adopt the following design patterns from MEDVi:

- **Hero section** with bold typography, short punchy tagline, and subtle background animation or gradient
- **Card-based navigation** — large, tappable content cards with images/icons that route to deeper pages (like MEDVi's Weight Loss / Men's Health / etc. cards)
- **Scroll-driven storytelling** — sections revealed on scroll with smooth transitions and fade-ins
- **Dark/light contrast sections** — alternating background tones to create visual rhythm
- **Trust signals bar** — horizontal strip with key credibility stats (e.g., "40+ years experience", "190+ diagnoses", "70+ therapies", "Pankey Institute Faculty")
- **Testimonial carousel** — patient quotes with photos
- **Sticky navigation** with frosted-glass effect
- **Mobile-first responsive design**
- **No clutter** — generous whitespace, one idea per viewport

### 2.2 Brand Identity

| Element | Value |
|---------|-------|
| Primary color | Deep blue (#1A3B6E) |
| Secondary color | Medium blue (#3A7BD5) |
| Accent color | Light sky blue (#7EB6E8) |
| Backgrounds | Clean white (#FFFFFF), soft blue-gray (#F0F4F8), deep navy (#0F2340) for contrast sections |
| Typography | Modern sans-serif (Inter, Plus Jakarta Sans, or similar) with a refined serif for headings (Playfair Display or similar) |
| Tone | Authoritative but warm. Expert but accessible. Clinical precision meets patient empathy. |
| Logo | Retain or modernize the existing mountain/skull icon from the brochure. Consider a refined monogram "JRD" alternative. |

### 2.3 Imagery Style

- Custom anatomical illustrations (SVG or high-res) showing healthy vs. damaged TMJ — modernized versions of the brochure diagrams
- Professional headshot of Dr. Droter
- Abstract medical/scientific background textures (not stock photos of smiling patients)
- Subtle anatomical line art as decorative elements

---

## 3. Site Architecture

### 3.1 Navigation (Top-Level)

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Home   Understanding TMD   About Dr. Droter        │
│          Common Conditions   New Patients   For Dentists 🔒 │
│          Contact                              [Book Now]    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Full Sitemap

```
/                                → Landing page (hero + overview)
/understanding-tmd               → Deep-dive educational content
/understanding-tmd/how-tmj-works → TMJ anatomy & mechanics
/understanding-tmd/signs-symptoms→ Signs & symptoms checklist
/understanding-tmd/190-disorders → The 190+ disorders overview
/understanding-tmd/faq           → Commonly asked questions
/conditions/                     → Common conditions hub
/conditions/clicking-jaw         → Jaw clicking / disc dislocation
/conditions/locked-jaw           → Limited opening / closed lock
/conditions/headaches            → TMJ-related headaches & OMD
/conditions/bite-changes         → Anterior open bite / occlusion
/conditions/teeth-grinding       → Clenching & sleep grinding
/conditions/osteoarthritis       → Osteoarthritis of the TMJ
/about                           → About Dr. Droter
/new-patients                    → What to expect, forms, process
/for-dentists                    → Tier 2 (locked — login/paywall)
/quiz                            → Tier 3 (interactive diagnostic)
/contact                         → Contact, location, hours
```

---

## 4. Page-by-Page Requirements — Tier 1

### 4.1 Landing Page (`/`)

The most critical page. Must immediately communicate expertise, build trust, and guide users to relevant content.

**Section 1 — Hero**
- Full-viewport hero with dark gradient background
- Headline: "Facial Pain Has Over 190 Causes. We Find Yours."
- Subheadline: "Dr. John R. Droter, DDS — 40 years specializing in the diagnosis and nonsurgical treatment of temporomandibular disorders and facial pain."
- CTA button: "Take the TMD Assessment" (links to Tier 3 quiz, grayed/coming soon for now)
- Secondary CTA: "New Patient? Start Here"
- Subtle animated SVG of TMJ anatomy in background or side panel

**Section 2 — "What Brings You Here?" Cards**
Four large interactive cards (MEDVi-style), each linking to a condition page:

| Card | Title | Subtitle | Link |
|------|-------|----------|------|
| 1 | Jaw Locking | Can't open wide? Jaw gets stuck? | /conditions/locked-jaw |
| 2 | Headaches & Facial Pain | Temple headaches, pain behind eyes | /conditions/headaches |
| 3 | Clicking or Popping Jaw | Sounds when you chew or open | /conditions/clicking-jaw |
| 4 | Bite Feels Wrong | Teeth don't fit together like they used to | /conditions/bite-changes |

Each card should have a custom icon/illustration and hover animation.

**Section 3 — Key Differentiator Statement**
Dark background section with large typography:
> "TMJ is not a diagnosis. It's a joint. There are 40 different diseases that can affect it and 190+ disorders that cause head and neck pain. Different diseases require different treatments. That's why accurate diagnosis comes first."

This section educates and differentiates Dr. Droter from generic "TMJ treatment" providers.

**Section 4 — The Approach (3-Column)**
Three columns with icons:

| Column | Title | Content |
|--------|-------|---------|
| 1 | Orthopedic Diagnosis | State-of-the-art CT and MRI imaging, EMG muscle analysis, and hands-on joint/muscle palpation to identify the specific cause of your pain. |
| 2 | 190+ Differential Diagnoses | Not one disease, not one treatment. Dr. Droter evaluates across 7 categories of TMD to find your specific condition. |
| 3 | 70+ Targeted Therapies | From physical therapy and dental orthotics to cold laser and occlusal adjustment — the right therapy for the right diagnosis. |

**Section 5 — Trust Bar**
Horizontal scrolling or static bar with key stats:
- "University of Maryland — Magna Cum Laude"
- "L.D. Pankey Institute Faculty"
- "40+ Years in TMJ/Facial Pain"
- "Dentistry Today — Top Clinician in CE"
- "70+ Treatment Modalities"

**Section 6 — "The TMJ Is Part of a System"**
Visual section with an interactive or animated Venn diagram showing the interconnected system: Skull → TMJ → Mandible → Teeth → Muscles (Neck + TMJ) → CNS/PNS. Text overlay:
> "The TMJ doesn't exist in isolation. It works in harmony with your muscles, teeth, neck, and nervous system. A problem in one area creates problems in the others. That's why we evaluate the whole system."

Sourced from brochure page 4.

**Section 7 — Common Conditions Preview**
A horizontal scroll or grid showing the 6 most common TMDs with diagnosis, pattern, and treatment summary (sourced from brochure page 7):

1. **Clenching** — Patient is aware, masseters ache, morning clicking → Occlusal adjust, D-PAS night guard, magnesium + Vitamin C
2. **Sleep Grinding** — Worn teeth → Protective/airway night guard
3. **Occlusal Muscle Disharmony** — Sore muscles chewing, headaches, sore lateral pterygoid → Occlusal adjustment
4. **Osteoarthritis of TMJ** — Arthralgia, CBCT bone loss, MRI findings → NSAID 6-12 weeks, occlusal adjustment, no night guard
5. **Sprain Discal Ligament (Acute)** — Sudden onset, limited opening, soft end point → Cold laser, rest, soft diet, NSAID, anterior reposition orthotic
6. **Acute Closed Lock** — Limited opening, hard end point → Arthrocentesis with PRP

Display as expandable cards or an accordion.

**Section 8 — Patient Testimonials**
Carousel with 3-5 patient testimonials. Placeholder quotes for now (Dr. Droter to supply real ones). Format matches MEDVi's testimonial section.

**Section 9 — "For Dentists" Teaser**
Dark section with lock icon:
> "Are you a dental professional? Access clinical protocols, diagnostic frameworks, and continuing education materials."
> [Log In / Learn More →]
This links to the Tier 2 paywall page. Subtle presence — not hidden, but not the focus.

**Section 10 — Footer**
- Dr. Droter's practice info: 4000 Mitchellville Road, Suite 330B, Bowie, Maryland 20716
- Email: drdroter@mac.com
- Phone number
- Quick links to all pages
- Privacy policy link
- "© 2026 John R. Droter, DDS"

---

### 4.2 Understanding TMD (`/understanding-tmd`)

A long-form educational hub page with anchor-linked sections. This is the core Tier 1 educational content, sourced from the uploaded brochure.

**Section A — What Is the TMJ?**
Content from brochure page 2:
- The TMJ connects the temporal bone to the mandible (jawbone), located in front of the ears
- It's actually two joints (left and right) that must work in harmony
- The only joint in the body that rotates, slides, and pivots
- Composed of soft tissue (disc, ligaments, capsule, retrodiscal tissue) and bone (condyle, eminence)
- Allows movement: open/close, left/right, forward/back — for chewing, speaking, swallowing
- Include a modernized interactive illustration showing healthy TMJ (jaw closed and open) alongside a damaged TMJ with anteriorly dislocated disc
- Self-check instruction: "Place your fingers in front of your ears and open and close. You can feel the TMJ and condyle. Any discomfort — even slight — indicates something is wrong."

**Section B — Signs & Symptoms Checklist**
Content from brochure page 1. Present as an interactive checklist (not just a list — let users tap/check items):

1. Headaches, especially around the temples and behind the eyes (up to 50% of headaches may be TMJ-related)
2. Grinding or clenching teeth, especially at night
3. Sore jaw and neck muscles; tired muscles after eating
4. Pain or tenderness of the TMJ
5. Clicking noises from the TMJ (present or past)
6. Rough, gravelly sound from the TMJ on movement
7. History of limited opening; inability to open/close without sideways movement
8. Signs of excess force on teeth: wearing, chipping, breaking, cracking, splitting, moving, loosening
9. Earache, ear throbbing, or ringing in the ears (tinnitus)
10. Pain behind the eyes
11. Change in the bite — teeth don't feel like they fit together

Include the important note: "Pain is not a reliable indicator of severity. A joint with minor damage may hurt worse than one with significant damage."

**Section C — TMD Is Not One Disease**
Content from brochure page 3:
- There are 40 different diseases that can affect the TMJ itself
- TMJ disorders are part of a larger group: Temporomandibular Disorders (TMD)
- There are over 190 different diseases that can cause pain and dysfunction in the head and neck
- These 190 disorders fall into 7 categories:
  1. TMJ Damage (40 conditions)
  2. Muscles of the TMJ
  3. Cranial Alignment / Occlusion
  4. Cervical Damage
  5. Parafunction
  6. Whole Body / Systemic
  7. Other
- Visual: Infographic or interactive taxonomy showing the 7 categories with expandable disease lists
- Key message: "Different diseases require different treatments"

**Section D — The Interconnected System**
Content from brochure page 4:
- The TMJ works in harmony with: muscles (head/neck), teeth, and the CNS/PNS
- A problem in one area creates problems in others
- This is a dynamic orthopedic system
- Visual: Interactive Venn diagram or animated system diagram

**Section E — Treatment Approaches**
Content from brochure page 5:
- Dr. Droter utilizes 70+ different therapies
- Treatment categories:
  - **Physical**: Ice, hot/cold/hot, cold laser, TENS, range-of-motion exercises, stretching, referrals to PT/chiropractic/osteopathic
  - **Medicinal**: Anti-inflammatories, NSAIDs, CBD topical, glucosamine/chondroitin, vitamins (C, D, B12), minerals (magnesium, iron), Botox injections
  - **Dental Orthotics**: Various splints, night guards, anterior stops, brux checkers, mandibular advancement devices
  - **Occlusal/Orthopedic**: Lingual light wire, Planas tracks, sectional orthodontics, expansion, restorative dentistry, occlusal adjustment
  - **Tongue Parafunction**: Cervical alignment stabilization, Myobrace, lingual light wire, frenectomy, myofunctional therapy
  - **Sleep/Fatigue**: Mouth taping, diet modification, positional therapy, vitamins/minerals, lateral bruxing devices, mandibular advancement, CPAP
  - **Surgical** (referral): Arthrocentesis with PRP, discectomy, total joint replacement, orthognathic surgery
- Key message: "Most therapies are not difficult to do. The trick is applying the correct therapy for the specific disease."

**Section F — Hot, Cold, Hot Therapy (Self-Help)**
Content from brochure page 6. Present as a step-by-step interactive guide:
- Purpose: Open blood vessels → close blood vessels → reopen, flushing toxins from muscles
- Steps:
  1. Microwave a moist hand towel 1-2 minutes (test with hand first)
  2. Apply to neck, jaw, and face for 3 minutes
  3. Apply cold (wrapped gel pack or frozen peas in paper towel) for 3 minutes
  4. Reheat towel in 30-second intervals, reapply for 3 minutes
  5. Repeat as desired
- Note: Mention the RecoveryTherm Cube by Therabody as an alternative (contrast mode, 20-minute cycle)
- This is a "take-home value" section — gives patients something actionable immediately

---

### 4.3 Conditions Pages (`/conditions/*`)

Each condition page follows a consistent template:

```
[Hero with condition title + illustration]
[What is this condition?]
[How do I know if I have this? — symptoms/patterns]
[What causes it?]
[How is it diagnosed?]
[How is it treated?]
[Important note / when to seek help]
[CTA: Book a consultation]
```

#### 4.3.1 Clicking Jaw (`/conditions/clicking-jaw`)
- 35% of the population has some TMJ damage
- Disc is dislocated anteriorly; joint clicks on movement
- 85% of people with jaw joint damage need NO treatment
- Most damaged joints adapt favorably — pain-free function
- Some do not adapt → need treatment to help readapt
- Illustrations: Healthy TMJ vs. anteriorly dislocated disc (with click on recapture) vs. stuck disc (no click)
- Key message: "Not all clicks need treatment, but some must be treated to avoid progression."

#### 4.3.2 Locked Jaw (`/conditions/locked-jaw`)
- Jaw gets stuck, can't open wide
- May need to wiggle jaw to free it
- Indicates advanced stage of TMJ breakdown — disc getting stuck out of position
- Intervention may prevent progression to more serious disease stages
- Acute closed lock treatment: Arthrocentesis with PRP
- Soft end point vs. hard end point active stretch distinction

#### 4.3.3 Headaches & Facial Pain (`/conditions/headaches`)
- Up to 50% of all headaches may be TMJ-related
- Occlusal Muscle Disharmony (OMD) — the most commonly missed diagnosis
- OMD = teeth touching imprecisely → muscle tension → headaches
- Distinguishing features: slight soreness in lateral pterygoid, sore muscles when chewing
- Treatment: precision refinement of the bite (occlusal adjustment), not just muscle relief
- Critical question: "Is the primary soreness from jaw muscles, jaw joint, or neck muscles — and does the bite have anything to do with it?"
- 50% of headaches are NOT bite-related, so accurate diagnosis is essential

#### 4.3.4 Bite Changes (`/conditions/bite-changes`)
- Anterior open bite: front teeth no longer touch
- Teeth feel like they don't fit together
- Can be caused by TMJ damage, condylar resorption, or occlusal changes
- Link to uncomfortable bite / occlusion content from drdroter.com

#### 4.3.5 Teeth Grinding (`/conditions/teeth-grinding`)
- Stress increases grinding but is usually not the primary cause
- Clinical exam usually reveals the cause: uneven bite or damaged TMJ
- Signs: worn teeth, chipping, breaking, cracking, splitting, moving, loosening
- Treatment varies: protective night guard, airway night guard, occlusal adjustment

#### 4.3.6 Osteoarthritis (`/conditions/osteoarthritis`)
- Active degeneration of the TMJ
- Diagnosed via CBCT (bone loss) and MRI (T2, STIR findings)
- Pattern: arthralgia with imaging confirmation
- Treatment: NSAID for 6-12 weeks, occlusal adjustment
- Important: Do NOT put in a night guard

---

### 4.4 About Dr. Droter (`/about`)

**Section 1 — Professional Bio**
- Professional headshot (high-quality, modern portrait)
- Graduated magna cum laude, University of Maryland Dental School (1985)
- Advanced training at:
  - L.D. Pankey Institute
  - Center for Advanced Dental Study (Drs. Peter Dawson & Mark Piper)
  - University of Florida Facial Pain Center (Drs. Parker Mahan, Henry Gremillion, Frank Dolwick)
  - University of California San Diego (Dr. Terry Tanaka)
  - Dr. Guy Haddix, Statesville, NC

**Section 2 — Practice & Approach**
- Private practice in Bowie, MD (Washington DC / Baltimore / Annapolis area)
- Orthopedic approach to diagnosing and treating TMJ
- State-of-the-art imaging: CT scans, MRI scans
- Computerized measurement and analysis of joint and muscle function (EMG, jaw tracking)
- Nonsurgical TMJ rehabilitation
- Network of physicians and therapists for non-TMJ causes
- "An accurate diagnosis is the key and first step to any effective therapy."

**Section 3 — Teaching & Recognition**
- Visiting faculty, L.D. Pankey Institute (Florida)
- Past visiting faculty, Spear Education Center (Arizona)
- Past visiting faculty, Washington Hospital Center — teaching TMD to orthodontic residents (2000-2012 at Children's Hospital)
- On staff at Anne Arundel Medical Center — rounds with orthopedic surgeons
- National lecturer
- Named in Dentistry Today's Top Clinicians in Dental CE
- Published articles on TMJ; authored TMJ Manual for patients
- Contributing author to Pankey Institute teaching manuals

**Section 4 — Specialized Equipment**
- ElectroMyoGraphy (EMG) with surface electrodes
- Computerized jaw tracking
- CT and MRI interpretation
- Clinical palpation protocol for muscles and joints

---

### 4.5 New Patients (`/new-patients`)

**What to Expect**
- First appointment: Comprehensive exam to begin finding the source of pain/dysfunction
- Goals of first visit:
  - Is the TMJ damaged?
  - Is the neck damaged?
  - Does the damage contribute to presenting problems?
  - What further tests or imaging are needed?
- Patient will be informed and educated about likely diagnoses and next steps
- Some cases are diagnosed at first visit; most require additional information

**Appointment Process**
1. **Pre-visit**: Complete the Facial Pain Questionnaire thoroughly (emphasize importance)
2. **First appointment**: Physical exam, muscle/joint palpation, initial assessment
3. **Imaging** (if needed): MRI and CT scans ordered for suspected TMJ damage
4. **Follow-up**: Interpret imaging, correlate with clinical data, establish definitive diagnosis
5. **Treatment plan**: Specific therapy matched to specific diagnosis

**Sample Initial Treatments**
Cold laser, jaw exercises, active stretching, TENS, anterior stop muscle deprogrammer, trigger point therapy, ischemic pressure, hot/cold/hot therapy, anesthetic nerve blocks

**Patient Forms Download**
Link to downloadable forms (PDF)

**Location & Logistics**
- Address: 4000 Mitchellville Road, Suite 330B, Bowie, MD 20716
- Map embed
- Parking information
- Insurance note (if applicable)

---

### 4.6 FAQ (`/understanding-tmd/faq`)

Source: Brochure page 8 and drdroter.com content.

**Q: I have headaches. Could they be TMJ-related?**
Many headaches are related to TMJ or TMJ muscle problems. Patients who suffered for years with headaches have become pain-free after accurate diagnosis and treatment.

**Q: My jaw clicks occasionally. Do I need treatment?**
Clicking means the ligaments holding the disc in place have been damaged. Not all clicks need treatment, but some must be treated to prevent progression. A severely damaged joint and a slightly damaged joint can appear quite similar — professional evaluation is essential.

**Q: My jaw gets stuck sometimes. What's happening?**
The TMJ is entering a more advanced stage of breakdown. The disc is getting stuck out of position. Seek examination immediately — intervention now may prevent more serious disease progression.

**Q: I grind my teeth at night. Is it just stress?**
While stress increases grinding, it is usually not the primary cause. Common causes include an uneven bite or a damaged TMJ. Clinical examination usually reveals the true cause.

**Q: What's the difference between TMJ and TMD?**
TMJ is the joint itself (temporomandibular joint). Saying you "have TMJ" is like saying you "have knee." TMD (temporomandibular disorder) refers to the group of 190+ diseases and dysfunctions that cause head and neck pain. Neither is a diagnosis — a specific condition within those categories must be identified.

**Q: Do I need surgery?**
Most TMD problems are treated nonsurgically. Dr. Droter utilizes 70+ nonsurgical therapies. Surgery is only considered when conservative treatment has been exhausted and is always referred to trusted specialists.

---

### 4.7 For Dentists — Locked Page (`/for-dentists`)

**Tier 2 — Gated Content (Future Development)**

This page shows a professional landing section visible to all, with content locked behind authentication:

- Visible teaser: "Clinical protocols, diagnostic frameworks, and CE resources for dental professionals"
- Feature list (visible): Diagnostic decision trees, treatment protocols by condition, imaging interpretation guides, case studies, video lectures
- Login / Register form
- Pricing tiers (TBD)
- "Coming Soon" badge if not yet launched

The page should feel integrated, not bolted on. It's a natural part of the navigation — dental professionals visiting the patient-facing site should feel invited, not redirected.

---

### 4.8 Contact (`/contact`)

- Large map embed (Google Maps)
- Address: 4000 Mitchellville Road, Suite 330B, Bowie, MD 20716
- Email: drdroter@mac.com
- Phone
- Simple contact form: Name, Email, Phone, Message, "Are you a new or existing patient?"
- Office hours

---

## 5. Interactive Elements & Micro-Interactions

### 5.1 TMJ Anatomy Explorer
An interactive SVG/Canvas illustration on the Understanding TMD page where users can:
- Toggle between healthy and damaged TMJ states
- Hover over components (disc, condyle, temporal bone, lateral pterygoid muscle) to see labels and descriptions
- Animate jaw open/close to show rotation and sliding mechanics
- Show disc recapture (click) vs. stuck disc (no click) scenarios

### 5.2 Symptom Checklist
Interactive checklist on the Signs & Symptoms page:
- Users tap to check symptoms they experience
- After checking, a gentle prompt appears: "You've identified [X] possible signs of TMD. Consider scheduling an evaluation."
- No diagnosis is given — purely educational and motivational

### 5.3 "Do I Have This?" Assessment Teaser
A CTA that appears on condition pages linking to the Tier 3 quiz:
- "Want to understand your symptoms better? Take the TMD Assessment →"
- Initially marked "Coming Soon" until Tier 3 is built

### 5.4 Scroll Animations
- Fade-in on scroll for content sections
- Parallax on hero backgrounds
- Counter animations for stats (190+, 40+, 70+)
- Smooth anchor scrolling on the Understanding TMD page

---

## 6. Technical Requirements

### 6.1 Stack Recommendation

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) or Astro for static-first |
| Styling | Tailwind CSS + custom design tokens |
| Animations | Framer Motion or GSAP |
| CMS | MDX for content pages (easy for Dr. Droter to edit) or Sanity/Contentful for dynamic content |
| Hosting | Vercel or Netlify |
| Forms | Formspree or custom API route |
| Analytics | Plausible or PostHog (privacy-first) |
| Auth (Tier 2) | Clerk, Auth.js, or Supabase Auth |
| Payments (Tier 2) | Stripe |

### 6.2 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

### 6.3 SEO Requirements

- Semantic HTML5 with proper heading hierarchy
- Structured data (Schema.org): LocalBusiness, MedicalOrganization, FAQPage, MedicalCondition
- Open Graph and Twitter Card meta tags
- XML sitemap
- Canonical URLs
- Alt text on all images
- Target keywords: "TMJ specialist Maryland", "TMD treatment Bowie MD", "facial pain diagnosis", "jaw clicking treatment", "TMJ headaches", "locked jaw treatment"

### 6.4 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigable
- Screen reader tested
- Color contrast ratios ≥ 4.5:1
- Focus indicators on all interactive elements
- Reduced motion support via `prefers-reduced-motion`

---

## 7. Content Inventory — Tier 1

All Tier 1 content is sourced from two origins:

| Source | Content |
|--------|---------|
| **Uploaded PDF** (TMJ Brochure 2026 v26.4) | Signs & symptoms, TMJ anatomy, 40 joint diseases list, 190 TMDs overview, 7 categories, system diagram, 70 therapies list, 6 common TMDs table, OMD section, hot/cold/hot therapy protocol, FAQ |
| **drdroter.com** (current website) | Dr. Droter bio, practice description, specialized equipment, new patient process, condition pages (locked jaw, anterior open bite, uncomfortable bite), About TMD deep-dive, patient forms |

Content should be professionally rewritten for the new site's tone — authoritative, warm, and accessible. The brochure's clinical detail should be preserved but presented with modern UX patterns (expandable sections, interactive elements, visual aids) rather than dense text blocks.

---

## 8. Future Tiers (Out of Scope — Reference Only)

### Tier 2 — For Dentists (Paywall)
- Clinical diagnostic protocols and decision trees
- Treatment planning frameworks by condition
- CT/MRI interpretation guides with case examples
- Video lecture library
- Downloadable clinical forms and checklists
- CE credit tracking
- Monthly subscription model via Stripe

### Tier 3 — Interactive TMD Quiz
- Multi-step guided questionnaire
- Asks about symptoms, history, pain patterns, jaw function
- Produces an educational summary (not a diagnosis)
- Suggests which condition pages to read
- Optional: generates a pre-visit summary patients can bring to their appointment
- Optional: email capture for lead generation

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Organic traffic (monthly) | 5,000+ within 6 months | Analytics |
| New patient inquiries via site | 10+ per month | Form submissions |
| Average session duration | > 3 minutes | Analytics |
| Bounce rate | < 45% | Analytics |
| "For Dentists" interest clicks | Track for Tier 2 launch | Event tracking |
| Quiz completion (Tier 3) | Track for Tier 3 launch | Event tracking |

---

## 10. Launch Checklist

- [ ] All Tier 1 pages built and reviewed
- [ ] Dr. Droter reviews all clinical content for accuracy
- [ ] Professional headshot and any new imagery obtained
- [ ] Contact form tested and receiving submissions
- [ ] SEO metadata and structured data in place
- [ ] Mobile responsive testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse > 95)
- [ ] Analytics installed
- [ ] DNS configured, SSL active
- [ ] "For Dentists" page shows login/coming soon state
- [ ] "Quiz" CTA shows coming soon state
- [ ] Old site redirects configured (drdroter.com → new domain or same domain)
- [ ] Patient forms downloadable
- [ ] Privacy policy page live

---

*End of PRD — Tier 1*
