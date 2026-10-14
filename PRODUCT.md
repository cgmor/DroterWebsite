# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: dentists.** These range from general dentists to sleep dentists who make airway (sleep apnea and snoring) appliances, or who see patients with TMD and facial pain. They come to evaluate and use ArrowPath Sleep appliances, above all the Airway Bite, and to learn from Dr. Droter's teaching. Many arrive on a phone from the QR code on the kit, at the chair, partway through a procedure.
- **Secondary: patients and the public.** People with jaw, face and head pain, clicking or locking jaws, bite changes, grinding, or poor sleep who want to understand what may be behind their symptoms. They are guided to understand first and then to talk with a dentist. In Dr. Droter's words: "Who is our customer? Dentist. Educate patients to seek out 'our dentists' who use our products."

## Product Purpose

APSleep.com is the single site for ArrowPath Sleep LLC and the work of its founder, John R. Droter, DDS. It has four jobs:

1. Present the ArrowPath Sleep Airway Bite prominently, as the company's launch product. It is prominent, but it is not the whole site.
2. Present the APS appliance line, chosen by clinical indication.
3. Be the home of Dr. Droter's educational material on TMD and facial pain: what the TMJ is, signs and symptoms, the 190+ causes, common conditions, approaches to relief, medical literature and lectures.
4. Introduce Dr. Droter and, lightly, his practice in Bowie, MD.

Success means Dr. Droter, a demanding client who said "I do not have a professional working web site," sees a site that reads as expensive, authoritative and human-made. Dentists should be able to order the Airway Bite (through Great Lakes Dental) and use its protocol chairside. Patients should leave understanding their symptoms better.

## Positioning

- **The Airway Bite.** A disposable, single-use chairside device that records the protrusive bite registration a mandibular advancement device is built around. By his account it takes about five minutes chairside, versus roughly twenty with traditional gauges. There's nothing to sterilize and there are no parts to lose. Patient tapping relaxes the muscles before the bite is taken.
- **The expertise behind it.** Since 1996 his practice has focused on diagnosing facial pain. He is visiting faculty at the L.D. Pankey Institute and has 3,000+ facial-problem questionnaires from his patients.
- **His thesis:** "TMJ is not a diagnosis — it's a joint." There are 190+ causes of facial pain, and an accurate diagnosis is the key and first step to any effective therapy.

## Operating Context

- The QR code on every kit's ruler card points to **apsleep.com/airway-bite**. That URL must keep working, and that page must be usable on a phone chairside.
- Ordering goes through **Great Lakes Dental** (greatlakesdentaltech.com), the distributor. Living Tree Dental Lab manufactures the device. The distribution agreement is not yet signed.
- The tutorial animation (2:15, narrated by Dr. Droter) is used on the site and at trade shows.
- He wants educational pages that are scannable, with a way to "expand a simplified version into the complete version."

## Capabilities and Constraints

- **Stack:** Next.js 16 App Router, Tailwind v4, deployed on Vercel. The three design versions under review live at /v1, /v2 and /v3. Shared copy lives in `src/content/aps.ts` and `src/content/tmd.ts`; condition articles live in `src/data/conditions.ts`.
- **No "treat" / "treatment" in headings** (state dental board rule). Use "approaches", "paths to relief", "solutions" and similar.
- **Never "FDA approved", "FDA registered" or "FDA cleared."** The device is Class I and 510(k)-exempt, and registration is pending, so make no regulatory claims.
- **No price, no cart, no checkout.** The order CTA is "Order through Great Lakes Dental."
- **Never publish his questionnaires** (Facial Problem Questionnaire, Occlusion screen, Sleep Fatigue screen). He considers the questions his core IP.
- **Practice information is light touch:** a short "See Dr. Droter in Bowie" panel with the office phone, not a full new-patient section.
- **The full tutorial video and the interactive 3D model of the device are published as they are.** Cole made this decision on 2026-10-14 and will confirm patient consent and IP with Dr. Droter.
- **Undecided:** the exact public email, the suite number (330B / B330), patent-pending wording, and the launch date.

## Brand Commitments

- **Name:** ArrowPath Sleep, short form APS, at APSleep.com. The legal entity is ArrowPath Sleep LLC.
- **Logo:** the seven-chevron hex mark plus the geometric "APS" wordmark and "ArrowPath Sleep". It's a vector reconstruction of the kit label, kept in `src/components/shared/ApsLogo.tsx`, until master art arrives.
- **Founder's credit line:** "John R. Droter, DDS · Visiting Faculty, L.D. Pankey Institute".
- **Tone:** authoritative and clinical, but plain-spoken. It's his own voice, a teacher's voice.
- **Rejected (do not use):** the "hims/hers" / MEDVi consumer-telehealth style, and the cartoon illustration of Dr. Droter. His only written style note asks for a "more prestigious looking font."
- **Strong preference (Cole):** v1 "Precision" is the best of the first round, especially its graphics. Every version must keep the rotating 3D "Airway Bite, in detail" section.
- **Standing direction (Cole, 2026-10-14):** the category standard played straight, a premium clinical-device site with no novelty world. The quality bar is a combination of **straumann.com** (clinical authority, restraint, an education hub for clinicians) and **eightsleep.com** (rendered product, polish, motion). All three versions share one world and differ only in emphasis: V1 leads with the Airway Bite, V2 with Dr. Droter and his expertise, V3 with TMD education.

## Evidence on Hand

- `public/aps/video/`: the narrated tutorial (1080p and 720p), chapters.json/.vtt and a poster.
- `public/aps/stills/`: 40 frames from the animation; the `-clean` crops sit on #DCDCDC.
- `public/aps/loops/`: three short silent hero loops.
- `public/aps/renders/`: device studio renders.
- `public/aps/3d/`: GLB models of the Airway Bite and the Temp Anterior Stops.
- `public/aps/airway-bite/`: the IFU PDF and the four IFU slides, plus a photo of the kit label.
- `public/aps/about/droter-headshot.jpg`: the only photograph of him.
- `public/conditions/osteoarthritis/`: his TMJ illustrations (healthy and damaged joint, zoom sequence).
- **Text:** his drdroter.com pages (About TMD, Facial Pain, Jaw Joint Damage, Limited Jaw Opening, Anterior Open Bite, Uncomfortable Bite, Children, Medical Literature, New Patient Information), the TMJ Brochure 2026 content (in PRD_DrDroter_Website.md), his OA condition write-up, and the Pankey TMD 2026 lecture PDFs.
- **Absent (never fabricate):** testimonials, pricing, awards beyond Dentistry Today's Top Clinicians in CE, publication counts, years-in-practice claims beyond "since 1996", and patient photos.

## Product Principles

1. **Diagnosis before device.** Show the expertise and the education first, so the product reads as the outcome of a career spent diagnosing facial pain, not a gadget.
2. **The Airway Bite is the flagship, not the whole fleet.** It should be prominent and easy to order, but the site also carries TMD knowledge, conditions, literature and the man behind it.
3. **Teach in layers.** Give a short summary first, with the complete version one expand away.
4. **Chairside-fast.** Anything a dentist needs mid-procedure (the steps, the video chapters, the PDF) must be reachable in one tap on a phone.
5. **Only what's true.** Use his words and his numbers. Leave empty slots out rather than filling them with invention.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast of at least 4.5:1, keyboard navigation, visible focus, `prefers-reduced-motion` respected, and alt text on all clinical imagery. Many patients are older adults in pain, so body text should be generous and use plain language.
