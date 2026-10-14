# APSleep / drdroter.com — Verbatim Content Inventory

Captured 2026-10-13 (America/New_York) for the APSleep.com rebuild. Read-only capture; nothing in the git repo was touched.

**Method.** Every page was downloaded as raw server HTML with `curl` and converted to Markdown with a stdlib-only converter that keeps the source text exactly (entities decoded, runs of whitespace collapsed the way a browser renders them). Both sites are server-rendered WordPress (APSleep: Twenty Twenty-One theme; drdroter.com: Twenty Fourteen child theme), so there is no JavaScript-only copy to miss. `/airway-bite/` was also fetched with WebFetch as a cross-check, and the text matched. Typos, odd spacing and odd capitalisation are left **as published**. Where a note is needed it sits in a separate *Capture notes* block and never inside the copy.

**Conventions in the copy blocks.** Each page sits under its own H2. The page’s own headings are shifted down two levels (page H1 → `###`, H2 → `####`, and so on), and the inventory’s own labels (▸ Verbatim copy, ▸ Links & media, ▸ Capture notes, and the Airway Bite extras) are bold lines, not headings, so the page’s heading hierarchy stays intact. `*[caption]*` marks a `<figcaption>`. `![alt](src)` is an image exactly as the page embeds it, and an empty `![]` means the source has no alt text. `[button: …]` and `[input …]` are form controls. Site chrome (header, nav, sidebar, footer) is captured once per site in the "Site chrome" sections, not repeated on every page.

## Index

| # | Page | Source URL | Approx. length (words, main content) | Status |
|---|------|------------|------------------------------------:|--------|
| 1 | ArrowPath Sleep Airway Bite — Instructions for Use | https://apsleep.com/airway-bite/ | ~573 | Captured in full + PDF + 4 images downloaded |
| 2 | Products | https://apsleep.com/products/ | ~195 | Captured in full. Not password-protected |
| 3 | About | https://apsleep.com/about/ | ~68 | Captured in full. Not password-protected |
| 4 | APSleep | https://apsleep.com/ | ~39 | Captured. Placeholder page ("Full Website Coming Soon……….August 2021") |
| 5 | Contact | https://apsleep.com/contact/ | ~14 | Captured in full. Not password-protected |
| 6 | About Dr. Droter | https://drdroter.com/about-dr-droter/ | ~282 | Captured in full. Not password-protected |
| 7 | New Patient Information | https://drdroter.com/new-patient-information/ | ~1005 | Captured in full. Not password-protected |
| 8 | About TMD | https://drdroter.com/about-tmd/ | ~984 | Captured in full. Not password-protected |
| 9 | Facial Pain | https://drdroter.com/facial-pain/ | ~447 | Captured in full. Not password-protected |
| 10 | Jaw Joint Damage | https://drdroter.com/jaw-joint-damage/ | ~193 | Captured in full. Not password-protected |
| 11 | Limited Jaw Opening | https://drdroter.com/locked-jaw/ | ~1111 | Captured in full. Not password-protected |
| 12 | Anterior Open Bite | https://drdroter.com/anterior-open-bite-front-teeth-no-longer-touch/ | ~139 | Captured in full. Not password-protected |
| 13 | Uncomfortable Bite (Occlusion) | https://drdroter.com/uncomfortable-bite-occlusion/ | ~597 | Captured in full. Not password-protected |
| 14 | Children | https://drdroter.com/children/ | ~454 | Captured in full. Not password-protected |
| 15 | Patient Downloads | https://drdroter.com/patient-downloads/ | ~56 | Captured in full. Not password-protected |
| 16 | Patient Links | https://drdroter.com/links/ | ~93 | Captured in full. Not password-protected |
| 17 | Medical Literature | https://drdroter.com/medical-literature/ | ~30 | Captured in full. Not password-protected |
| 18 | Seminar Links | https://drdroter.com/seminar-links/ | ~31 | Captured in full. Not password-protected |
| 19 | Pankey TMD 2026 | https://drdroter.com/pankey-tmd-2026/ | ~16 | Captured in full. Not password-protected |
| 20 | Contact | https://drdroter.com/contact/ | ~21 | Captured. Email is an image; the map shortcode is unrendered (see notes) |
| 21 | Seminar Downloads | https://apsleep.com/seminar-downloads/ | ~2 | Captured. **Empty**: title only, no body (bonus, from the nav) |
| 22 | Seminar Downloads | https://drdroter.com/seminar-downloads/ | ~24 | **Password-protected**, content not retrievable (bonus, from the nav) |

**Password protection:** none of the 20 requested pages is protected. That includes `/pankey-tmd-2026/`, which is public and has 2 public PDF downloads. The only protected page found is **https://drdroter.com/seminar-downloads/**, which shows "Protected: Seminar Downloads" and a password form. It was not in the request but is linked from the drdroter.com nav. **https://apsleep.com/seminar-downloads/** (also linked from its nav) is published but empty.

**Not retrieved:** nothing among the requested pages. The things that cannot be retrieved are the contents of the protected drdroter.com Seminar Downloads page and the text inside images, except where it is transcribed below and labelled as a transcription.

**Downloaded assets** (in `scratchpad/apsleep-assets/`): the 4 Airway Bite step images (1600×800 JPG), `APS_Airway_Bite_Instructions.pdf` (1 page, 2.0 MB), the drdroter.com headshot at full size `Droter-1crop.jpg` (1991×2416) and at display size `Droter-1crop-247x300.jpg`, the APSleep About headshot `Droter-1cropweb.jpg` (824×1000), and the drdroter.com contact email image `IMG_3287-1.jpg` (full size). One more file is in `scratchpad/extra-assets/`: `APS-products.001-1024x512.jpeg`, the APS/Living Tree slide from drdroter.com/seminar-links/. No other drdroter.com images or PDFs were downloaded; their URLs are listed per page and were all HTTP 200 on 2026-10-13.

### Cross-site discrepancies to resolve

1. **Lab / ordering source, the main contradiction.** On apsleep.com, `/products/` says "APS appliances are available from **Great Lakes Dental** — greatlakesdentaltech.com", and `/airway-bite/` plus its PDF ("Order from: Great Lakes Dental greatlakesdentaltech.com/") say the same for the Airway Bite. On drdroter.com, `/seminar-links/` lists "Living Tree Dental Lab / ArrowPath Sleep Orthotics / https://www.livingtreelab.com" next to an `APS-products.001` slide image, uploaded 2023/03. That slide names "Living Tree Dental Lab — Nate Brock, CDT, (865) 509-4509, connect@livingtreelab.com — 3D Printed Orthotics". The apsleep.com Great Lakes copy and PDF date from 2026/08, so Great Lakes is probably the current lab and the drdroter.com page is stale. Confirm with Dr. Droter. (greatlakesdentaltech.com returned HTTP 403 to curl, probably bot protection. livingtreelab.com returned 200.)
2. **Suite number.** APSleep `/contact/` says "4000 Mitchellville Rd. / Suite B328 / Bowie, MD 20716". drdroter.com `/contact/` says "4000 Mitchellville Road / Suite 330B / Bowie Maryland, 20716".
3. **Phone.** APSleep says 301-805-5553. The practice number on drdroter.com `/contact/` and `/new-patient-information/` is 301-805-9400. These may be two separate business lines, but that should be confirmed.
4. **Email.** APSleep shows `info@APSleep.com` as plain text with no mailto link. On drdroter.com the email is a handwritten image reading "drdroter@" followed by the text "mac.com", i.e. drdroter@mac.com, presumably as an anti-spam measure.
5. **Airway Bite: web page vs. printable PDF wording.** The PDF says "Parkell Blue-Mousse super fast silicone" where the web says "Parkell Blu-Mousse Super Fast" (Parkell's product name is Blu-Mousse). The PDF says "have the patient rest on hold there" where the web says "rest and hold there". The PDF says "with a pencil" where the web says "with a disposable pencil". The step images say "Class 2 / Class 3" where the page text says "Class II / Class III". The full list is in the Airway Bite section.
6. **apsleep.com is mostly stale.** The home page is still the 2021 placeholder ("Full Website Coming Soon……….August 2021"). `/seminar-downloads/` is empty. Every page carries the default WordPress sidebar ("Hello world!" post, "A WordPress Commenter") and placeholder footer social links (facebook.com/wordpress, twitter.com/wordpress, `mailto:wordpress@example.com`). `/airway-bite/` is not in the nav and is reachable only from the Products page button.
7. **Bio framing differs.** APSleep `/about/` says "John R Droter, DDS, in 1996 created a practiced [sic in source] focused on diagnosing and treating facial pain … In 2021 he formed ArrowPath Sleep". The drdroter.com bio gives no dates. It names the L.D. Pankey Institute (current visiting faculty), the Spear Educational Center (past), and others.
8. **drdroter.com outbound-link health** (checked 2026-10-13). `davidmugforddmd.com` (Periodontist, `/links/`) **redirects to a Cox "Internet Threat Blocker — blocked" page**, so do not migrate it. `luckyvitamin.com` now redirects to fruitfulyield.com. These return 404: kidsmalocclusions.com/conferences/, myobrace.com/faqs, and the shaklee.com healthyweight link. These gave no response: edgertherapy.com, totalsleepcare.net, learnairwayortho.com. Per-link status is in each page's Links & media list.

## Site chrome — apsleep.com (identical on /about/, /products/, /contact/, /airway-bite/; on the home page the site title is an H1 instead of a link)

**Header + primary nav (verbatim):**

[APSleep](https://apsleep.com/)

[button: Menu Close ]

- [Home](https://apsleep.com/)
- [About](https://apsleep.com/about/)
- [Seminar Downloads](https://apsleep.com/seminar-downloads/)
- [Products](https://apsleep.com/products/)
- [Contact](https://apsleep.com/contact/)

**Sidebar (`aside.widget-area`) and footer (verbatim, default WordPress content):**

Search…

[input type=search name="s"] [input type=submit value="Search"]

#### Recent Posts

- [Hello world!](https://apsleep.com/2021/03/hello-world/)

#### Recent Comments

- [A WordPress Commenter](https://wordpress.org/) on [Hello world!](https://apsleep.com/2021/03/hello-world/#comment-1)

- [Facebook](https://www.facebook.com/wordpress)
- [Twitter](https://twitter.com/wordpress)
- [Instagram](https://www.instagram.com/explore/tags/wordcamp/)
- [Email](mailto:wordpress@example.com)

[APSleep](https://apsleep.com/)

Proudly powered by [WordPress](https://wordpress.org/).

Capture notes: no favicon/site icon is set. The theme is Twenty Twenty-One. `/airway-bite/` is not in the menu.

## Site chrome — drdroter.com (identical on all 15 requested pages)

**Header + primary nav (verbatim):**

### [John R. Droter, DDS](https://drdroter.com/)

[ Search ](#search-container)

[button: Primary Menu]

- [Home](https://drdroter.com/)
- [About Dr. Droter](https://drdroter.com/about-dr-droter/)
- [New Patient Information](https://drdroter.com/new-patient-information/)
- [Limited Jaw Opening](https://drdroter.com/locked-jaw/)
- [Anterior Open Bite](https://drdroter.com/anterior-open-bite-front-teeth-no-longer-touch/)
- [Uncomfortable Bite (Occlusion)](https://drdroter.com/uncomfortable-bite-occlusion/)
- [Jaw Joint Damage](https://drdroter.com/jaw-joint-damage/)
- [Facial Pain](https://drdroter.com/facial-pain/)
- [Patient Downloads](https://drdroter.com/patient-downloads/)
- [Patient Links](https://drdroter.com/links/)
- [About TMD](https://drdroter.com/about-tmd/)
- [Children](https://drdroter.com/children/)
- [Seminar Downloads](https://drdroter.com/seminar-downloads/)
- [Seminar Links](https://drdroter.com/seminar-links/)
- [Medical Literature](https://drdroter.com/medical-literature/)
- [Privacy Policy](https://drdroter.com/privacy-policy-2/)
- [Contact](https://drdroter.com/contact/)
- [Pankey TMD 2026](https://drdroter.com/pankey-tmd-2026/)

Search for: [input type=search name="s" placeholder="Search …"]

[input type=submit value="Search"]

**Site tagline (rendered in `#secondary` after the content) + footer (verbatim):**

#### Facial Pain Diagnosis and Treatment

[Privacy Policy](https://drdroter.com/privacy-policy-2/) [ Proudly powered by WordPress ](https://wordpress.org/)

Capture notes: favicon/site icon is https://drdroter.com/wp-content/uploads/2025/07/cropped-Logo-color-eps-32x32.png (a 192×192 variant also exists: …-192x192.png). The theme is a Twenty Fourteen child theme. The nav links "Home" (https://drdroter.com/), "Seminar Downloads" (password-protected) and "Privacy Policy" (https://drdroter.com/privacy-policy-2/) were not in scope.

---

## ArrowPath Sleep Airway Bite — Instructions for Use — https://apsleep.com/airway-bite/

- **Source URL:** https://apsleep.com/airway-bite/
- **HTML `<title>`:** ArrowPath Sleep Airway Bite — Instructions for Use – APSleep
- **Approx. length:** ~573 words (main content)

**Prerequisite (as published):** "**Before you begin —** take a digital scan of the upper and lower jaws *without* a bite." (PDF wording: "Prior to taking an airway bite take a Digital scan of the upper and lower jaws without a bite.")

**Ordering link (exact):** `https://greatlakesdentaltech.com/`, anchor text "greatlakesdentaltech.com", vendor named as "**Great Lakes Dental**". **Printable PDF (exact):** `https://apsleep.com/wp-content/uploads/2026/08/APS_Airway_Bite_Instructions.pdf`, anchor text "Download PDF".

**Step numbering:** the 9 steps are `<li class="aps-step">` items under one CSS counter (`counter-reset: apsstep` on `.aps`, `decimal-leading-zero`), so the live page shows them as **01–09 running across all four phases**, not restarting per phase. The `[01]`…`[09]` below reproduce that generated number, which is not text in the HTML. "Phase one" etc. are eyebrow labels styled uppercase by CSS. "Enlarge" is the zoom-badge label inside each image link.

**▸ Verbatim copy (reading order):**

### ArrowPath Sleep Airway Bite — Instructions for Use

Clinical instructions for recording a protrusive bite registration with the **ArrowPath Sleep Airway Bite**. To make an airway device you need to record the best jaw position for the airway and relate that position to the lab.

**Before you begin —** take a digital scan of the upper and lower jaws *without* a bite.

###### Class II

Device shifted back so it sits flush with the buccal surface of the front teeth.

###### Class III

Device shifted forward so the lingual surface of the front teeth touches the device.

Phase one

#### Fit the device

[ ![ArrowPath Sleep Airway Bite positioned for Class II and Class III occlusions, alongside the 4 mm anterior stop seated on the upper front teeth.](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-1-occlusion-and-anterior-stop.jpg) Enlarge](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-1-occlusion-and-anterior-stop.jpg)

*[caption]* APS Airway Bite with 4 mm anterior stop. Reline with Parkell Blu-Mousse Super Fast; a second reline can be done over the first if needed.

##### [01] Trial and positioning

Try the device in the mouth. Adjust forward for a Class III bite or backward for a Class II bite. Once positioned, note the orientation.

##### [02] Silicone application

Fill the device with Parkell Blu-Mousse Super Fast silicone. A second reline can be performed over the first if needed.

Phase two

#### Map the range of movement

[ ![Marking the furthest forward and back jaw positions and the midline with a disposable pencil, measuring protrusive movement on an OraStretch MIO scale, and placing bonding agent on the device.](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-2-marking-and-measurement.jpg) Enlarge](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-2-marking-and-measurement.jpg)

*[caption]* Mark the furthest forward and back jaw positions and the midline with a disposable pencil, then measure the protrusive amount to build into the mandibular advancement device.

##### [03] Jaw movement assessment

With the device affixed to the upper teeth, have the patient move their jaw as far back as possible. Mark the position of the lower incisor and the midline with a disposable pencil. Repeat with the jaw moved as far forward as possible.

##### [04] Measurement

Remove the device from the mouth and measure the total anterior–posterior movement. Typically this is around 10–12 mm.

##### [05] Target position marking

Mark a point halfway between the most retruded and most protruded positions. This is the target position for jaw posture — roughly 50% of total movement is typically a good place to start.

Phase three

#### Lock in the position

[ ![Flowing composite in front of and behind the lower incisors with the jaw tapped into the forward position, then curing to hold the jaw stable.](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-3-tapping-and-composite.jpg) Enlarge](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-3-tapping-and-composite.jpg)

*[caption]* Move the jaw into position, verify with tap-tap, then flow composite in front of the lower incisors and at the edge of the anterior stop, and cure. The jaw is now held stable in the forward position.

##### [06] Patient tapping

Instruct the patient to repeatedly tap their teeth on the airway bite, guiding them to tap at the midway forward mark.

##### [07] Flowable composite application

Once you are satisfied with the forward arcing position of the lower jaw, have the patient rest and hold there. Verify it is in the area you marked with the pencil. Apply flowable composite to the airway bite in front of and behind the lower incisors, then cure. This holds the jaw in the desired forward position.

Phase four

#### Capture and send to the lab

[ ![Jaw held stable in the forward position, digital scan of the bite sent to the lab, and the resulting final mandibular advancement device.](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-4-digital-scan-and-final-device.jpg) Enlarge](https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-4-digital-scan-and-final-device.jpg)

*[caption]* Take the digital scan bite with the anterior stop in place and the jaw positioned forward, then send to the lab digitally. The device can also be used to take a silicone bite registration.

##### [08] Digital scan

With the jaw held in the forward position, perform a digital scan of the bite. This aligns the upper and lower arch models so the dental lab can fabricate the sleep device.

##### [09] Alternative: silicone bite

If not using a digital scanner, a silicone bite can be created by squirting silicone into the back of the device.

##### Printable instructions

A one-page version for chairside use.

[Download PDF](https://apsleep.com/wp-content/uploads/2026/08/APS_Airway_Bite_Instructions.pdf)

##### Ordering

The ArrowPath Sleep Airway Bite is available from **Great Lakes Dental**.

[greatlakesdentaltech.com](https://greatlakesdentaltech.com/)

**▸ Materials list (derived from the page, not page copy):**

**Neither the live page nor the PDF has a separate materials list.** The materials and equipment named inline are listed below with their exact wording and where each one appears. This list is derived from the page, not page copy:

- "Parkell Blu-Mousse Super Fast" silicone: step 02 and the phase-one caption. The PDF spells it "Parkell Blue-Mousse super fast silicone".
- "4 mm anterior stop" / "APS Airway Bite with 4 mm anterior stop": phase-one caption. Image 1 label: "APS Airway Bite Anterior Stop 4mm".
- "disposable pencil": step 03 and the phase-two caption. The PDF says just "pencil".
- "OraStretch MIO scale": phase-two image alt text, and visible in the photo.
- "bonding agent": phase-two image alt text. Image 2 label: "Place bonding agent".
- "flowable composite" and cure: step 07 and the phase-three caption.
- Digital (intraoral) scanner: steps 08–09. The photo in image 4 shows a 3Shape scanner, which is not named in the text.
- Silicone for bite registration (alternative): step 09.

**▸ Printable PDF — verbatim text:**

Source: https://apsleep.com/wp-content/uploads/2026/08/APS_Airway_Bite_Instructions.pdf, downloaded to `scratchpad/apsleep-assets/APS_Airway_Bite_Instructions.pdf`. It is one US-Letter page. PDF metadata: Title "APS Airway Bite Instructions 26.8.pages", Author "JRDroter", created 2026-08-14 in Pages.

Layout: the APS logo and the title "ArrowPath Sleep Airway Bite" across the top, with "Order from:" at top right. A left column holds the same 4 slide images used on the web page, and a right column holds the numbered text. The extracted text dropped the fi/fl ligatures, so they are restored below in ⟨angle brackets⟩. Everything else is exact, typos included.

> ArrowPath Sleep Airway Bite
>
> Order from:  
> Great Lakes Dental  
> greatlakesdentaltech.com/
>
> Prior to taking an airway bite take a Digital scan of the upper and lower jaws without a bite.
>
> 1. **Trial and Positioning:** Try the device in the mouth. Adjust forward for a Class III bite or backward for a Class II bite. Once positioned, note the orientation.
> 2. **Silicone Application:** Fill the device with Parkell Blue-Mousse super fast silicone. A second reline can be performed if needed.
>
> 3. **Jaw Movement Assessment:** With the device af⟨fi⟩xed to the upper teeth, have the patient move their jaw as far back as possible. Mark the position of the lower incisor and the midline with a pencil. Repeat with the jaw moved as far forward as possible.
> 4. **Measurement:** Remove the device from the mouth and measure the total anterior-posterior movement. Typically, this is around 10-12 mm.
> 5. **Target Position Marking:** Mark a point halfway between the most retruded and most protruded positions. This is the target position for jaw posture. Typically around 50% of the total movement is a good place to start.
>
> 6. **Patient Tapping:** Instruct the patient to repeatedly tap their teeth on the airway bite, guiding them to tap at the midway forward mark.
> 7. **Flowable Composite Application:** Once you are satis⟨fi⟩ed with the forward arcing position of the lower jaw, have the patient rest on hold there. Verify it is in the area you marked with the pencil. Apply ⟨fl⟩owable composite to the airway bite in front of and behind the lower incisors. Cure the composite. This will hold the jaw in the desired forward position.
>
> 8. **Digital Scan:** With the jaw held in the forward position, perform a digital scan of the bite. This will align the upper and lower arch models for the dental lab to fabricate the sleep device.
> 9. **Alternative: Silicone Bite:** If not using a digital scanner, a silicone bite can be created by squirting silicone into the back of the device.

(The bold step labels match the PDF's bold run-in heads.)

**▸ Text inside the four step images (transcribed from the downloaded 1600×800 JPGs; not HTML text):**

Each image is a slide headed "ArrowPath Sleep Airway Bite" with the APS logo ("APS / ArrowPath Sleep").

1. **aps-airway-bite-1-occlusion-and-anterior-stop.jpg**: "To Accommodate Different Occlusions" (underlined) · "Class 2 Device shifted back so flush with buccal surface of front teeth" · "Class 3 Device shifted forward so lingual surface of front teeth touch device." · red labels "Class 2" / "Class 3" on the model photos · "To make airway devices you need to record the best jaw position for the airway and relate this to the lab." · "APS Airway Bite Anterior Stop 4mm" · "Reline with Parkell Blu-Mousse Super Fast" / "Can do 2nd reline over the first if needed". Also shows a CAD render of the device.
2. **aps-airway-bite-2-marking-and-measurement.jpg**: "Mark furthest forward and back jaw position and midline with disposable pencil" · "Measure and mark the amount of protrusive you want to build into the Mandibular Advancement Device" · "50% is typically a good place to start" · "Place bonding agent" (arrows to the device). Photos: pencil marking, OraStretch MIO Scale, marked device.
3. **aps-airway-bite-3-tapping-and-composite.jpg**: "Move jaw into position, verify with tap tap, then flow flowable composite in front of lower incisors, cure." · "At edge of anterior stop flow some composite behind teeth and cure." · "Jaw is now held stable in forward position."
4. **aps-airway-bite-4-digital-scan-and-final-device.jpg**: "Jaw is held stable in forward position." · "Take digital scan bite with anterior stop in place and jaw positioned forward. Send to lab digitally." · "Final Mandibular Advancement Device" · "Can also be used to take silicone bite registration". Photos: patient, scan of the arches, white printed MAD, 3Shape scanner, silicone bites.

**▸ Web page vs. PDF — wording differences:**

| Topic | Web page (live) | PDF |
|---|---|---|
| Prerequisite | "**Before you begin —** take a digital scan of the upper and lower jaws *without* a bite." | "Prior to taking an airway bite take a Digital scan of the upper and lower jaws without a bite." |
| Silicone | "Parkell Blu-Mousse Super Fast silicone. A second reline can be performed over the first if needed." | "Parkell Blue-Mousse super fast silicone. A second reline can be performed if needed." |
| Marking | "…with a disposable pencil." | "…with a pencil." |
| Measurement | "anterior–posterior movement. Typically this is around 10–12 mm." | "anterior-posterior movement. Typically, this is around 10-12 mm." |
| Target | "…target position for jaw posture — roughly 50% of total movement is typically a good place to start." | "…target position for jaw posture. Typically around 50% of the total movement is a good place to start." |
| Composite | "rest and hold there … then cure. This holds the jaw…" | "rest on hold there … Cure the composite. This will hold the jaw…" |
| Scan | "This aligns the upper and lower arch models so the dental lab can fabricate the sleep device." | "This will align the upper and lower arch models for the dental lab to fabricate the sleep device." |
| Structure | 4 named phases (Fit the device / Map the range of movement / Lock in the position / Capture and send to the lab), Class II/III explainer, captions | 9 numbered steps, no phases |

**▸ Links & media:**

**Links (in order):**

- "[image]Enlarge" → https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-1-occlusion-and-anterior-stop.jpg — *checked 2026-10-13: HTTP 200*
- "[image]Enlarge" → https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-2-marking-and-measurement.jpg — *checked 2026-10-13: HTTP 200*
- "[image]Enlarge" → https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-3-tapping-and-composite.jpg — *checked 2026-10-13: HTTP 200*
- "[image]Enlarge" → https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-4-digital-scan-and-final-device.jpg — *checked 2026-10-13: HTTP 200*
- "Download PDF" → https://apsleep.com/wp-content/uploads/2026/08/APS_Airway_Bite_Instructions.pdf — *checked 2026-10-13: HTTP 200*
- "greatlakesdentaltech.com" → https://greatlakesdentaltech.com/ — *checked 2026-10-13: HTTP 403*

**Images (in order):**

- https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-1-occlusion-and-anterior-stop.jpg — alt="ArrowPath Sleep Airway Bite positioned for Class II and Class III occlusions, alongside the 4 mm anterior stop seated on the upper front teeth."
- https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-2-marking-and-measurement.jpg — alt="Marking the furthest forward and back jaw positions and the midline with a disposable pencil, measuring protrusive movement on an OraStretch MIO scale, and placing bonding agent on the device."
- https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-3-tapping-and-composite.jpg — alt="Flowing composite in front of and behind the lower incisors with the jaw tapped into the forward position, then curing to hold the jaw stable."
- https://apsleep.com/wp-content/uploads/2026/08/aps-airway-bite-4-digital-scan-and-final-device.jpg — alt="Jaw held stable in the forward position, digital scan of the bite sent to the lab, and the resulting final mandibular advancement device."

---

## Products — https://apsleep.com/products/

- **Source URL:** https://apsleep.com/products/
- **HTML `<title>`:** Products – APSleep
- **Approx. length:** ~195 words (main content)

**The 7 products, in page order, with their indication (structured from the copy below, same wording):**

| # | Product (exact) | Indication heading (exact) | Indication-specific text (exact) |
|---|-----------------|----------------------------|----------------------------------|
| 1 | APS D-PAS | Clenching | "Patient must have muscle inhibition." (note under the Clenching card, applies to both Clenching items) |
| 2 | APS Temp Anterior Stop | Clenching | (same card note as above) |
| 3 | APS Brux-PAS | Grinding | — |
| 4 | Lower Hard CR Orthotic | Grinding | — |
| 5 | APS Lat-Brux | Grinding + Airway | — |
| 6 | MAD — Mandibular Advancement Device | Airway | — |
| 7 | ArrowPath Sleep Airway Bite | Bite registration (eyebrow) | "**Use it when** fabricating a MAD for the Airway indication." + the two description paragraphs |

**Ordering text (exact):** "APS appliances are available from **Great Lakes Dental** — greatlakesdentaltech.com" (link: `https://greatlakesdentaltech.com/`)

Capture notes: the card headings (Clenching / Grinding / …) and the eyebrows are uppercase on screen through CSS `text-transform`, but the source text is the mixed case shown here. The page has no product photos, prices or SKUs. The sub-head says "Four presentations", and those four cover products 1–6. The Airway Bite is a separate feature block. A 2023 slide on drdroter.com/seminar-links/ expands "D-PAS" as "Diagnostic-Palatal Anterior Stop" and "Brux-PAS" as "Brux-PAS with lower Essix"; see that section.

**▸ Verbatim copy (reading order):**

### Products

APS devices are selected by clinical indication — what the patient is doing at night, and whether the airway is involved. Use the guide below to match the presentation to the appropriate appliance.

Selection guide

#### Choosing the correct night guard

Four presentations, and the APS appliance indicated for each.

##### Clenching

- APS D-PAS
- APS Temp Anterior Stop

Patient must have muscle inhibition.

##### Grinding

- APS Brux-PAS
- Lower Hard CR Orthotic

##### Grinding + Airway

- APS Lat-Brux

##### Airway

- MAD — Mandibular Advancement Device

Bite registration

#### ArrowPath Sleep Airway Bite

The Airway Bite records the protrusive bite registration that a mandibular advancement device is built around. The device is tried in the mouth and relined with silicone, then used to map the patient’s full range of jaw movement — typically 10–12 mm from fully retruded to fully protruded.

Once the target forward position is identified and held with flowable composite, the bite is captured by digital scan and sent to the lab to fabricate the appliance. A silicone bite registration can be taken instead if no scanner is available.

**Use it when** fabricating a MAD for the Airway indication.

[View the step-by-step instructions](https://apsleep.com/airway-bite/)

##### Ordering

APS appliances are available from **Great Lakes Dental** — [greatlakesdentaltech.com](https://greatlakesdentaltech.com/)

**▸ Links & media:**

**Links (in order):**

- "View the step-by-step instructions" → https://apsleep.com/airway-bite/ — *checked 2026-10-13: HTTP 200*
- "greatlakesdentaltech.com" → https://greatlakesdentaltech.com/ — *checked 2026-10-13: HTTP 403*

---

## About — https://apsleep.com/about/

- **Source URL:** https://apsleep.com/about/
- **HTML `<title>`:** About – APSleep
- **Approx. length:** ~68 words (main content)

**▸ Verbatim copy (reading order):**

### About

![](https://apsleep.com/wp-content/uploads/2021/03/Droter-1cropweb.jpg)

John R Droter, DDS, in 1996 created a practiced focused on diagnosing and treating facial pain. Common problems he observed were fatigue, not waking rested, clenching of teeth, and sleep grinding of teeth. Over the years he customized diagnostic tools and treatments to help his patients. In 2021 he formed ArrowPath Sleep so patients and dentists could have access what he has found to be so effective.

**▸ Links & media:**

**Images (in order):**

- https://apsleep.com/wp-content/uploads/2021/03/Droter-1cropweb.jpg — alt="" — displayed 255×310

**▸ Capture notes:**

- "created a practiced focused" and "have access what he has found" are as published.
- The headshot `Droter-1cropweb.jpg` (824×1000) is the same photo as drdroter.com's `Droter-1crop.jpg`, re-exported in 2021.

---

## APSleep — https://apsleep.com/

- **Source URL:** https://apsleep.com/
- **HTML `<title>`:** APSleep
- **Approx. length:** ~39 words (main content)

**▸ Verbatim copy (reading order):**

![](https://apsleep.com/wp-content/uploads/2021/03/White-on-Black2web.jpg)

Helping you to a vibrant, well rested, pain free life

Full Website Coming Soon……….August 2021
Link to Dr Droter’s Practice website
[www.drdroter.com](http://www.drdroter.com)

![](https://apsleep.com/wp-content/uploads/2021/03/RKRS-00060-262.jpg)

*[caption]* Headache Solutions

![](https://apsleep.com/wp-content/uploads/2021/03/fatigued-268.jpg)

*[caption]* Causes of Fatigue and solutions

![](https://apsleep.com/wp-content/uploads/2021/03/Unknown.jpeg)

*[caption]* Are you wearing the correct night guard?

**▸ Links & media:**

**Links (in order):**

- "www.drdroter.com" → http://www.drdroter.com — *checked 2026-10-13: HTTP 200 → redirects to https://drdroter.com/*

**Images (in order):**

- https://apsleep.com/wp-content/uploads/2021/03/White-on-Black2web.jpg — alt="" — displayed 320×320
- https://apsleep.com/wp-content/uploads/2021/03/RKRS-00060-262.jpg — alt="" — displayed 478×350
- https://apsleep.com/wp-content/uploads/2021/03/fatigued-268.jpg — alt="" — displayed 900×598
- https://apsleep.com/wp-content/uploads/2021/03/Unknown.jpeg — alt="" — displayed 281×179

**▸ Capture notes:**

- The page has no H1 or entry title. The site title "APSleep" is the H1 on this page.
- The first paragraph ("Helping you to a vibrant, well rested, pain free life") is set at 49px as an inline style, acting as the hero line.
- The three captioned images ("Headache Solutions", "Causes of Fatigue and solutions", "Are you wearing the correct night guard?") are **not** links.
- "Full Website Coming Soon……….August 2021" is out of date.

---

## Contact — https://apsleep.com/contact/

- **Source URL:** https://apsleep.com/contact/
- **HTML `<title>`:** Contact – APSleep
- **Approx. length:** ~14 words (main content)

**▸ Verbatim copy (reading order):**

### Contact

APS ArrowPath Sleep
4000 Mitchellville Rd.
Suite B328
Bowie, MD 20716

info@APSleep.com
301-805-5553

**▸ Links & media:**

- (none in main content)

**▸ Capture notes:**

- `info@APSleep.com` is plain text, not a mailto link. There is no form and no map.

---

## About Dr. Droter — https://drdroter.com/about-dr-droter/

- **Source URL:** https://drdroter.com/about-dr-droter/
- **HTML `<title>`:** About Dr. Droter | John R. Droter, DDS
- **Approx. length:** ~282 words (main content)

**▸ Verbatim copy (reading order):**

### About Dr. Droter

[ ![](https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop-247x300.jpg) ](https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop.jpg)

Dr. Droter graduated magna cum laude from the University of Maryland Dental School with a huge void in understanding TMJ problems. His quest for an understanding has led him to study most notably at the L.D. Pankey Institute, The Center for Advanced Dental Study with Dr. Peter Dawson and Dr. Mark Piper, The University of Florida’s Facial Pain Center with Dr. Parker Mahan, Dr. Henry Gremillion, and Dr. Frank Dolwick, The University of California, San Diego with Dr. Terry Tanaka and with Dr. Guy Haddix in Statesville, NC.

Dr. Droter maintains a private practice diagnosing facial pain in the Washington DC, Baltimore, Annapolis area. When TMJ damage is suspected in causing a patient’s problem, he utilizes state of the art imaging (CT and MRI scans) along with computerized measurement and analysis of joint and muscle function. He provides nonsurgical TMJ rehabilitation for those patients with damaged joints. He has a network of excellent physicians and therapist when problems other than the TMJ are the cause. An accurate diagnosis is the key and first step to any effective therapy.

He is a visiting faculty member at the LD Pankey Institute in Florida.  Past positions include visiting faculty member at theSpear Educational Center in Arizona, visiting faculty member at The Washington Hospital Center in Washington, DC teaching temporomandibular disorders to the orthodontic residents and on staff at Anne Arundel Medical Center in Annapolis where he did rounds with orthopedic surgeons learning the medical approach to damaged joints. He lectures nationally and is honored to be included in the Dentistry’s Todays Top Clinicians in Dental Continuing Education. His writings include published articles on the TMJ, and a TMJ Manual written for patients.

**▸ Links & media:**

**Links (in order):**

- "[image]" → https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop.jpg — *checked 2026-10-13: HTTP 200*

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop-247x300.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop.jpg; links to: https://drdroter.com/wp-content/uploads/2018/09/Droter-1crop.jpg; displayed 247×300

**▸ Capture notes:**

- "theSpear Educational Center" (missing space), "therapist" (singular) and "Dentistry’s Todays Top Clinicians" are exactly as published.
- The headshot thumbnail links to the full-size `Droter-1crop.jpg` (1991×2416, Canon EOS 5D Mark IV), downloaded.

---

## New Patient Information — https://drdroter.com/new-patient-information/

- **Source URL:** https://drdroter.com/new-patient-information/
- **HTML `<title>`:** New Patient Information | John R. Droter, DDS
- **Approx. length:** ~1005 words (main content)

**▸ Verbatim copy (reading order):**

### New Patient Information

Hopefully your path to finding the solution to your problem begins here. After you have contacted our office, 301-805-9400, you will receive an email with a link to fill out the New Patient Forms.  Most important is the Facial Problem Questionnaire. Please take your time and fill out as accurately as possible. Once the forms are completed online we will review them and determine the best path forward for you.

There are several different exams that we provide for new patients. Below are explanations of each type.

Emergency Exam
Preliminary Exam
Review of Scans
Comprehensive Exam

##### Emergency Exam

A short, problem focused exam to address an immediate concern. The goal is to find a palliative solution to alleviate pain, discomfort, or worry, so that a more thorough exam can be performed at a future date. Some form of treatment or therapy may be rendered at this appointment to help alleviate pain. There will not be time at this appointment to discuss a complex history. The Facia Problem Questionnaire Form (part of  New Patient Forms  ) is crucial to helping Dr Droter figure out your problem efficiently and accurately, so be sure to take your time and complete the forms thouroughly.

Sample trreatment that may be recommeded: Cold Laser, Jaw exercises, Active stretching, Transcutaneous Electro Nerve stimulation (TENS), anterior stop muscle deprogrammer, triggerpoint therapy, ischemic pressure, Thermal therapy (Hot, Cold, Hot), anesthetic nerve blocks.

##### Preliminary Exam

Appointment Goal – To begin the process of finding the source of the pain or dysfunction. To begin to look at each area of the head and neck that may be the source of the problem. To determine whether the TMJs are healthy or damaged, and (if damaged) whether or not it is causing the problem with which the patient presents. To look for other possible causes of pain and dysfunction including cancer, neurological, vascular, muscular, and/or referred pain.

![open](https://drdroter.com/wp-content/uploads/2016/06/open.jpg)

*[caption]* Measure Maximal Opening. Should be 40-55 mm or about three finer widths

A written history is reviewed and an oral history is taken of the problem. A preliminary head and neck evaluation is performed, including: muscle coordination, muscle palpation of the head and neck, TMJ palpation, preliminary evaluation of the oral hard and soft tissues, a cancer screening exam, TMJ auscultation with a stethoscope, TMJ Doppler auscultation, range of motion analysis, TM joint loading evaluation, intra-oral occlusal analysis, and facial bone structural analysis.

![palpate](https://drdroter.com/wp-content/uploads/2016/06/palpate.jpg)

*[caption]* Palapting the TMJ to see if it is sore

The beginning of a differential diagnosis is created, with recommendations made as to the next step. This first appointment will usually take about an hour.

The goal of the first appointment is to answer these questions:
Is the TMJ damaged?
Is the Neck Damaged?
Does this damage contribute to the problems you are having?
What further tests or radiographs, if any, are needed, to develop a definitive diagnosis?

You will be informed and educated as to what your problem might be, and will be given a plan on how best to reach a definitive diagnosis. In some cases, Dr. Droter figures out what the problem is at this appointment and treatment can be initiated. However, most cases require additional information. Once we have an accurate diagnosis, a specific treatment to your specific problem can be chosen.

##### Review of Scans

If you were found to have TMJ damage during the first appointment, MRI and CT scans were ordered to determine what is damaged and the extend of the damage.

Appointment Goal – To interpret the MRI and CT and relate them to the clinical data gathered. To educate the patients about their disease process.

Special computer software is used to enhance the images and the data from the DICOM files sent by the radiology center. This enhanced data is analyzed and related to clinical data previously gathered. The radiology report is reviewed and correlated to my interpretation. Since the radiologist did not

have access to all the clinical data, this often limits his initial interpretation. If there are any discrepancies between my findings and the radiologist’s report, then I will consult with the radiologist to come to a consensus on the interpretation.

The patient is informed of what we see on the scans, and what this means as far as their health is concerned. Recommendations are then made to the patient as to what their next step is to start the healing process.

Either a working diagnosis or a differential diagnosis is formulated. A written summary is given to the patient.

##### Comprehensive Exam

Specialized Equipment that Dr. Droter Utilizes for evaluating joint and muscle health

ElectroMyoGraphy (EMG)- Surface Electrodes (not the painful needle electrodes) are used to evaluation the health of the muscles. Many patients have jaw muscle that are exhausted. This measures how exhausted they are.

Joint Vibration Analysis (JVA)- CT and MRI scans show the joint not moving. The JVA is the joint in motion. A recording device that looks like a set of headphones is placed over the TMJs. The device picks up any vibrations emitted from the joints and sends them to the computer where it is recorded. A healthy joint makes no sounds. A damage joint will emit sounds. Many of the sounds can not be heard with the human ear but are detectable with this device. This information gives a picture of what happens to the joint in motion. This information is combined with the CR and MRI to give an over assessment of joint health and function.

Jaw Tracker Motion Analysis- A magnet is placed on the lower jaw. With a recording headset on, the movements of the lower jaw are tracked. If there is any joint damage or muscle disharmony. the jaw will move irregularly and be detected by this test.

TekScan Bite Analysis- A pressure sensing thin plastic is used to record the intensity and timing of which teeth hit. Ideally when a person bites down all the teeth should hit evenly. This device measures not only which teeth are hitting, but also the relative intensity and the timing.

![](https://drdroter.com/wp-content/uploads/2025/09/exam-144-1024x791.jpg)

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2016/06/open.jpg — alt="open" — displayed 791×593
- https://drdroter.com/wp-content/uploads/2016/06/palpate.jpg — alt="palpate" — displayed 879×659
- https://drdroter.com/wp-content/uploads/2025/09/exam-144-1024x791.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2025/09/exam-144.jpg; displayed 1024×791

**▸ Capture notes:**

- "Emergency Exam / Preliminary Exam / Review of Scans / Comprehensive Exam" right after the intro is a plain line-broken list in the source, not anchor links.
- Typos as published: "Facia Problem Questionnaire", "thouroughly", "trreatment", "recommeded", "three finer widths", "Palapting", "the extend of the damage", "CR and MRI" (for CT), "over assessment".
- "Since the radiologist did not" / "have access…" is split across two `<p>` elements in the source and is kept that way.
- "New Patient Forms" is not a link. The forms are emailed after the patient calls.

---

## About TMD — https://drdroter.com/about-tmd/

- **Source URL:** https://drdroter.com/about-tmd/
- **HTML `<title>`:** About TMD | John R. Droter, DDS
- **Approx. length:** ~984 words (main content)

**▸ Verbatim copy (reading order):**

### About TMD

##### TMD and Facial Pain

Many different diseases and dysfunctions can cause facial pain. The head and neck are composed of many nerves, blood vessels, muscles , bones, and connective tissues, all of which can be the primary source of pain. Pain can be originating from; muscles of the temporomandibular joint (TMJ), muscles of the neck, TMJ, teeth, sinus, ear, neuralgia, vascular, lesions of central nervous system, plus many others. Understanding all the different diseases and dysfunctions that can cause facial pain is the first step in developing a list of the possible causes of a specific patients pain.

Temporomandibular disorders (TMD) are a group of diseases and dysfunctions that cause facial pain. TMD is not one disease, but many different diseases grouped into one classification. Why the maxilla was left out is not known. Ideally the term should be Temporo/Mandibular/Maxillary Disorder, as this more accurately describes the anatomic regions involved.

The American Dental Association’s President’s Conference on Temporomandibular Disorders defined TMD as a group of orofacial disorders characterized by:

Pain in the preauricular area (in front of the ear), TMJ, or muscles of mastication

Limitations/deviations in mandibular range of motion

TMJ sounds during jaw function

The classification of TMD is an attempt to group together diseases and dysfunctions together that are in the area of expertise that a dentist would treat. I see two main problems with TMD as presently defined. First is that the inclusion criteria is too broad. Pain in the preauricular area (in front of the ear) will include many disease that a dentist is not qualified to treat. An example would be otitis media (middle ear infection) causing preauricular pain. Second is that  there are no clear cut boundaries where a dentist expertise ends and another specialty begins. An example is muscle splinting to protect a damaged temporomandibular joint (TMJ) will involved neck muscle which will cause a dysfunction in the neck muscles. Alternately damage to the neck bones will cause muscle splinting in the neck that will affect the TMJ and its function.  A list of possible TMDs is seen in table 1.1. While this is not a complete list, it does include the most common.

Problems involving the TMJ are but one of many types of TMD. It is important to emphasize that TMD is not one disease with one treatment. Patients routinely present with a previous diagnosis of “TMJ” or “TMD.” Telling a patient that he or she has “TMJ” is equivalent to a physician telling a patient he or she has “knee.” TMJ and TMD are not accurate orthopaedic diagnoses, and clinicians should not use them as a diagnosis.

Someone experiencing Facial Pain may or may not have a TMD.

Someone with a TMD may or may not have damage to the TMJ, and may or may not have facial pain.

Someone with damage to the TMJ will have a TMD, but may or may not have facial pain.

The majority of patients (70%) with TMD facial pain have myalgia (soreness) of the TMJ muscles. Any therapy that makes muscles feel better will help. These therapies however may only be masking the cause of the problem. While the patient may feel better, therapy is continually needed to maintain a degree of comfort as the cause of the problem has not been identified and resolved. Muscle relaxants are a good example of a treatment that makes the muscles feel better, but is not a long term solution.

Along with the muscles, TMJ damage also plays a significant role in many facial pain patients.

Significantly more patients with TMD facial pain have a damaged TMJ (86%) as compared to non-TMD patients (34%).

You can have a damaged TMJ and not have pain. In fact, a majority (70%) of damaged joints adapt favorably over time with out any therapy. However 30% of damaged TMJ do not adapt favorably, and a few (3%) will have serious problems including chronic pain and facial deformity.

###### Three Types of Facial Pain

All pain in the human body is one of three types:
Nociceptive Pain- Pain from tissue
Neuropathic Pain- Pain caused from nerves not functioning properly
Centrally Mediated Pain- Pain from the brain not functioning properly

Overtop of all three types of pain is how the brain interprets pain. This is affected by stress and emotion. This is not the source of the pain, but affects the pain experience.

![](https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001-1024x512.jpg)

**Different Beliefs: Different Treatments**
There is not a consensus among professionals on which types of pain are the most prevalent. I find in my patients that sore muscles and joints in the head and neck are the source of the majority of facial pain (Nociceptive Pain). I find it invaluable to examine the muscles and joints by palpation (push on) , find out what is sore, and then figure out why it is sore. Therapies are then based on removing the cause of the sore muscles and joints. I do have patients who do have neuropathic pain and centrally mediated pain, but these are not the majority.

You can tell a doctor’s beliefs on the main causes of facial pain by which therapies they administer the most. I treat the physical causes of pain with an occasional treatment for the other types. A doctor who believes neuropathic pain is the most prevalent, most likely will not palpate muscles and joints, but will write prescriptions for drugs like gabapentin, neurontin, and anti depressants. A doctor who believes most facial pain is caused by Psychosocial will recommend stress counseling, relaxation techniques, and anti-anxiety medication. They may recommend physical therapy for sore muscles, but believe the muscles are sore from emotional stress. While I agree that the brain’s interpretation of pain is a factor, I do not feel it is the cause of the pain. I have found if you remove the source of the pain, the pain goes away and most patients are no longer depressed.

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001.jpg; displayed 1024×512

**▸ Capture notes:**

- The body text is **not wrapped in `<p>` tags** in the source (classic-editor content without autop). On the live site it may render as one long run-on block. The paragraph breaks above follow the blank lines in the source.
- "Table 1.1" is referenced in the text, but no table exists on the page.
- The second half ("Three Types of Facial Pain" through the end) duplicates the opening of /facial-pain/ almost word for word.

---

## Facial Pain — https://drdroter.com/facial-pain/

- **Source URL:** https://drdroter.com/facial-pain/
- **HTML `<title>`:** Facial Pain | John R. Droter, DDS
- **Approx. length:** ~447 words (main content)

**▸ Verbatim copy (reading order):**

### Facial Pain

###### Three Types of Facial Pain

All pain in the human body is one of three types:
Nociceptive Pain- Pain from tissue
Neuropathic Pain- Pain caused from nerves not functioning properly
Centrally Mediated Pain- Pain from the brain not functioning properly
Overtop of all three types of pain is how the brain interprets pain. This is affected by stress and emotion. This is not the source of the pain, but affects the pain experience.

![](https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001-1024x512.jpg)

**Different Beliefs: Different Treatments**
There is not a consensus among professionals on which types of pain are the most prevalent. I find in my patients that sore muscles and joints in the head and neck are the source of the majority of facial pain (Nociceptive Pain). I find it invaluable to examine the muscles and joints by palpation (push on) , find out what is sore, and then figure out why it is sore. Therapies are then based on removing the cause of the sore muscles and joints. I do have patients who do have neuropathic pain and centrally mediated pain, but these are not the majority.

You can tell a doctor’s beliefs on the main causes of facial pain by which therapies they administer the most. I treat the physical causes of pain with an occasional treatment for the other types. A doctor who believes neuropathic pain is the most prevalent, most likely will not palpate muscles and joints, but will write prescriptions for drugs like gabapentin, neurontin, and anti depressants. A doctor who believes most facial pain is caused by Psychosocial will recommend stress counseling, relaxation techniques, and anti-anxiety medication. They may recommend physical therapy for sore muscles, but believe the muscles are sore from emotional stress. While I agree that the brain’s interpretation of pain is a factor, I do not feel it is the cause of the pain. I have found if you remove the source of the pain, the pain goes away and most patients are no longer depressed.

I firmly believe the majority of headaches and facial pain is from sore muscles and joints. **Palpating muscles and joints and identifying which ones are sore must be part of any examination for facial pain, including headaches.** If your doctor does not thoroughly palpate the muscles and is quick to write you a prescription you may want a second opinion.

###### The Many Causes of Facial Pain, The Many Treatments

There are 190+ different causes of Temporomandibular Disorders/Facial Pain. The examination process, which needs to include muscle and joint palpation, will to lead to a working diagnosis on which you will be treated. A specific treatment is needed for each specific diagnosis. I utilize 70+ different therapies in my practice.

![](https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.017-1024x512.jpg)

![](https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.019-1024x512.jpg)

![](https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.020-1024x512.jpg)

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/Spear-TMD-2023-Web.001.jpg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.017-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.017.jpg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.019-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.019.jpg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.020-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/Web-Images-23.7-jpg.020.jpg; displayed 1024×512

**▸ Capture notes:**

- "will to lead to a working diagnosis" is as published. The same paragraph appears on /jaw-joint-damage/.

---

## Jaw Joint Damage — https://drdroter.com/jaw-joint-damage/

- **Source URL:** https://drdroter.com/jaw-joint-damage/
- **HTML `<title>`:** Jaw Joint Damage | John R. Droter, DDS
- **Approx. length:** ~193 words (main content)

**▸ Verbatim copy (reading order):**

### Jaw Joint Damage

Jaw Joint Damage
“The Clicking Jaw”

![](https://drdroter.com/wp-content/uploads/2016/06/heathy-tmj-1024x768.jpeg)

![](https://drdroter.com/wp-content/uploads/2016/06/damaged-tmj-1024x768.jpeg)

###### **85% of people with jaw joint damage do not need any treatment what so ever!!!**

Many people have damaged their TMJs (35% of the population), the disc is dislocated anteriorly, and the joint makes a clicking sound on movement. Most damaged joints adapt favorably and allow good jaw function (opening and closing), chewing, and eating pain free. As long as the clicking sound is not too annoying, these damaged joints can be well tolerated. A few people do however have jaw dysfunction and pain from a damaged joint that will need treatment. The TMJs did not adapt favorably to the damage. For them, there is treatment to help the TMJ damage readapt in a more favorable manor.

###### The Many Causes of Facial Pain, The Many Treatments

There are 190+ different causes of Temporomandibular Disorders/Facial Pain. The examination process, which needs to include muscle and joint palpation, will to lead to a working diagnosis on which you will be treated. A specific treatment is needed for each specific diagnosis. I utilize 70+ different therapies in my practice. The six most common TMDs are listed below.

![](https://drdroter.com/wp-content/uploads/2023/07/TMJ-damage.001-1024x512.jpg)

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2016/06/heathy-tmj-1024x768.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2016/06/heathy-tmj.jpeg; displayed 1024×768
- https://drdroter.com/wp-content/uploads/2016/06/damaged-tmj-1024x768.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2016/06/damaged-tmj.jpeg; displayed 1024×768
- https://drdroter.com/wp-content/uploads/2023/07/TMJ-damage.001-1024x512.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/07/TMJ-damage.001.jpg; displayed 1024×512

**▸ Capture notes:**

- The paragraph ends "The six most common TMDs are listed below." The list exists only inside the image `TMJ-damage.001-1024x512.jpg`, not as text.
- "what so ever!!!" and "favorable manor" are as published.

---

## Limited Jaw Opening — https://drdroter.com/locked-jaw/

- **Source URL:** https://drdroter.com/locked-jaw/
- **HTML `<title>`:** Limited Jaw Opening | John R. Droter, DDS
- **Approx. length:** ~1111 words (main content)

**▸ Verbatim copy (reading order):**

### Limited Jaw Opening

**Not able to open wide**

A very common problem that patients are referred to me in my practice is for limited jaw opening. Limited opening presents as not being able to open more than 35 mm (2 vertical finger widths). The onset of limited opening can be gradual but is usually sudden.  Ideally you should be able to open your jaw pain-free to 40-55 mm, which is about 3 vertical finger widths. As your jaw opens and closes the condyle (ball) moves in and out of the fossa (socket).  There are 7 distinctly different causes of limited opening, each requiring different treatments.

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.169-1024x512.jpeg)

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.170-1024x512.jpeg)

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.171-1024x512.jpeg)

**Different Causes of Limited Jaw Opening**:
Pain Avoidance Sore Joint,
Pain Avoidance Sore Muscle,
Muscle Spasm,
Masseteric Space Infection,
Nonreducing Disc (4b,3b Acute),
Joint Fibrosis,
Muscle Fibrosis,
Other.
To determine the specific cause diagnostic tests need to be run. It needs to be determined whether the cause is the joint or the muscles or both.
**Diagnostic Tests Needed:**
History: How long limited opening has existed
Body Temperature
Caries Exam, Perio exam
Range of Motion: open, side to side
Gentle Active stretch: Point to area of pain
Anterior Stop Test
If needed CBCT, MRI

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.172-1024x850.jpeg)

Using the above tests results and using Dr Droter’s flow chart a likely cause can be determined and effective treatments rendered. If you suspect a masseteric space infection, which presents as swelling behind the angle of mandible, difficulty swallowing and or throat soreness, see a doctor immediately.

![](https://drdroter.com/wp-content/uploads/2026/06/Limit-Open-Algorithm-and-arthalgia-22.3.1-791x1024.png)

**TMJ Arthralgia (Sore Joint)**

The most common cause of limited opening I see is a sore Temporomandibular Joint limiting jaw movement. The brain tries to avoid pain so it limits the jaw movements. A defining feature of a sore jaw joint that is limiting jaw opening is what I call a soft endpoint. If the jaw is gently and slowly supported and stretched with a thumb on top tooth and index finger on bottom tooth, the jaw will gradually open wider. This identifies that the jaw can move but is being limited by the brain telling the muscles not to move. A hard end point is when the jaw can not be gently stretched to a wider opening. A hard end point is an indication of a anteriorly displaced disc that is not reducing. See section on Anteriorly dislocated discs.

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.175-1024x512.jpeg)

If a sore jaw joint is identified as the cause of the limited opening, one needs to figure out what is causing the jaw joint to be sore.

Sore TMJ Differential Diagnosis: Acute Sprain, Chronic Sprain, Osteoarthritis, Osteolysis, Perforation of Pseudodisc, Discal perforation, Retrodiscal tissue impingement, Acute 4a, other.

**The Most Common Cause of Limited Opening**
Sprained ligaments of the Jaw Joint

The most common cause that I see  of a sore jaw joint limiting jaw opening is an acute sprain. The TMJ can be sprained just like an ankle. A sprain is a stretching of a ligament. This can occur during sleep from parafunctional jaw movements. Joint swelling can cause the back teeth to not touch on biting down. The posterior open bite will resolve once the joint swelling from the sprain resolves . A CBCT would be helpful to rule out the other causes of a sore TMJ, but one can treat the sore joint as if it is a sprain without imaging.

**Acute Sprain Therapy:**
Soft chew diet
Ice over the TMJ for 15 minutes 3-5 times a day for 3-5 days,
CBD Balm 3-5 a day
NSAID for 5-7 days:
Advil Liquid Gel Caps 200mg, 3 caps 3x a day
or Aleve  Liquid Gel Caps 220mg, 1 cap 2x a day
or Green Coffee extract 400mg 3x a day
Temporary upper Anterior Stop for sleep
MLS Cold Laser (808/905nm): 700 hz then 10 hz
If still sore in 1 week will need TMJ imaging: CBCT

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.184-1024x512.jpeg)

If the jaw is still sore in 1 week the most common cause is Osteoarthritis. This is easily identified on a CBCT. See section on Osteoarthritis for treatments.

If the jaw joint is still sore and limiting opening still persists an MRI scan is needed. Persistent joint soreness may require an arthrocentesis with platelet rich plasma to resolve the inflammation.

**Sore Muscles causing Limited Opening**

Limited opening caused by sore muscles is common but not easily diagnosed by most clinicians. Most medical doctors and dentists are not well trained in muscle palpation. If a person is bracing the lower jaw to avoid uncomfortable tooth contacts, the muscles become fatigued and get sore. if fatigued muscles are the cause, an anterior stop test to deprogram the muscles will allow them to temporarily relax and will restore full opening in about  3 minutes. If an anterior stop provides relief many palliative therapies that make muscles feel better will help, while corrective therapies aimed at creating a harmonious bite will resolve the issue without the need for continuous palliative therapy. See Occlusal Muscle Disharmony

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.187-1024x512.jpeg)

**Additional Sore Muscle Therapies**

I utilize an anterior stop deprogramming test on almost all of my new patients regardless of the amount of jaw opening to quickly relax the head and neck muscles and determine how much of their facial pain and headaches are due to sore overworked muscles.

**Home therapies include**:
Hot Cold Hot- 3 min each
CBD Balm 3-5 a day
Temporary upper Anterior Stop for sleep
MLS Cold Laser (808/905nm): 700 hz then 10 hz
Electrolytes if muscle spasm

A muscle spasm will present as more painful than overworked bracing muscles and have a firmer end point on active stretching with muscle discomfort.
In the past I used TENS therapy to break the spasm. I now use the MLS M-Hi cold laser spasm setting for about 2 minutes. Cold laser takes less time than TENS and is more effective since it has lasting healing properties. Electrolyte imbalance in overworked muscles is also likely a factor so increasing electrolytes will help. Be sure and test for Occlusal Muscle Disharmony as that is usually the main underlying cause. See Occlusal Muscle Disharmony

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.186-1024x512.jpeg)

**Acute Closed Lock: Stuck Disc**

Most patients presenting to my practice with limited opening have been pre diagnosed with a non reducing TMJ disc, the disc is “stuck”. Less than 1/5 of patients have a stuck disc as the cause. The top 3 causes that I see are acute sprain, osteoarthritis, and Occlusal Muscle Disharmony.

Those with a stuck disc will present with a hard end point in active stretching test and not be able to move their jaw fully side to side.

Treatments includes 2-3 weeks of jaw movement exercises, Ice, and anti inflammatory like Advil or Aleve and Cold Laser. If limited opening does not resolve an arthrocentesis with PRP is indicated.

![](https://drdroter.com/wp-content/uploads/2026/06/TMD5.189-1024x512.jpeg)

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2026/06/TMD5.169-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.169-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.170-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.170-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.171-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.171-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.172-1024x850.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.172.jpeg; displayed 1024×850
- https://drdroter.com/wp-content/uploads/2026/06/Limit-Open-Algorithm-and-arthalgia-22.3.1-791x1024.png — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/Limit-Open-Algorithm-and-arthalgia-22.3.1.png; displayed 791×1024
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.175-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.175-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.184-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.184-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.187-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.187-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.186-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.186-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2026/06/TMD5.189-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2026/06/TMD5.189-2048x1024.jpeg; displayed 1024×512

**▸ Capture notes:**

- Nav label is "Limited Jaw Opening". The page title is also "Limited Jaw Opening" (slug /locked-jaw/).
- The "Different Causes…", "Diagnostic Tests Needed", "Acute Sprain Therapy" and "Home therapies include" items are `<br>`-separated lines in the source, not HTML lists.
- "See section on Anteriorly dislocated discs", "See section on Osteoarthritis" and "See Occlusal Muscle Disharmony" are plain text, not links.

---

## Anterior Open Bite — https://drdroter.com/anterior-open-bite-front-teeth-no-longer-touch/

- **Source URL:** https://drdroter.com/anterior-open-bite-front-teeth-no-longer-touch/
- **HTML `<title>`:** Anterior Open Bite | John R. Droter, DDS
- **Approx. length:** ~139 words (main content)

**▸ Verbatim copy (reading order):**

### Anterior Open Bite

![](https://drdroter.com/wp-content/uploads/2025/07/Screenshot-2025-07-13-at-5.54.03 PM-1024x541.jpg)

*[caption]* Front teeth used to touch a year ago.

Front teeth need to touch to allow proper speaking, eating and swallowing. Front teeth that used to touch and now are no longer in contact is a serious condition that can be progressive. While surgery is the most common recommendation to correct this deformity, there are several non surgical options to fix anterior open bite.

![](https://drdroter.com/wp-content/uploads/2025/07/ms-MY.001-1024x512.jpeg)

![](https://drdroter.com/wp-content/uploads/2025/07/ant-open.001-1024x512.jpeg)

There are three main causes of anterior open bite that occur after puberty: TMJ bone loss, tongue bracing a damaged neck, Iatrogenic (i.e Bad Night Guards)

![](https://drdroter.com/wp-content/uploads/2021/08/TMD4-Extract.003.jpeg)

As you can see the above anterior open bites all look very similar, yet have different etiologies (causes). Patients with anterior open bites need a CBCT to definitively determine the cause. The cause of the open bite must first be determined for treatment to be effective.

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2025/07/Screenshot-2025-07-13-at-5.54.03 PM-1024x541.jpg — alt="" — displayed 1024×541
- https://drdroter.com/wp-content/uploads/2025/07/ms-MY.001-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2025/07/ms-MY.001-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2025/07/ant-open.001-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2025/07/ant-open.001-2048x1024.jpeg; displayed 1024×512
- https://drdroter.com/wp-content/uploads/2021/08/TMD4-Extract.003.jpeg — alt="" — displayed 2400×1200

**▸ Capture notes:**

- The first image filename contains a **U+202F narrow no-break space** before "PM" (a macOS screenshot name): `Screenshot-2025-07-13-at-5.54.03 PM-1024x541.jpg`. Its URL-encoded form, …5.54.03%E2%80%AFPM-1024x541.jpg, returns HTTP 200.

---

## Uncomfortable Bite (Occlusion) — https://drdroter.com/uncomfortable-bite-occlusion/

- **Source URL:** https://drdroter.com/uncomfortable-bite-occlusion/
- **HTML `<title>`:** Uncomfortable Bite (Occlusion) | John R. Droter, DDS
- **Approx. length:** ~597 words (main content)

**▸ Verbatim copy (reading order):**

### Uncomfortable Bite (Occlusion)

Occlusion is the how your teeth come in contact with each other.
If your teeth are hitting unevenly, (too heavy on front teeth, too heavy on right or left teeth, or too heavy on a single tooth) this can cause pain and dysfunction in the head and neck area. Ideally, with the jaw joint fully seated in its socket, all your teeth should touch evenly. If your teeth touch unevenly, your jaw muscles have to position your lower jaw the best it can to try and get a reasonably even bite. Your jaw muscles are searching for something that does not exist: an even bite. This constant searching fatigues the muscles.

If you have a recent change in how your teeth come together, you need to have a dentist who will take a CBCT scan of your jaw joint to rule out possible pathologies and analyze your with bite mounted study models and or a Tek Scan.

![](https://drdroter.com/wp-content/uploads/2025/07/OMD-dawson-1024x936.jpg)

*[caption]* **Teeth that are in the way on closing activates muscles to move the lower jaw to avoid contact with the offending tooth.**
(From Textbook Functional Occlusion, Peter Dawson)

![](https://drdroter.com/wp-content/uploads/2025/07/post-opebite-1024x687.jpg)

*[caption]* **Hitting too heavy on front teeth causes clenching of teeth to try and get back teeth to touch.**

An uneven bite causing muscle fatigue is called
**Occlusal Muscle Disharmony**

**Symptoms of an uneven bite include:**
Fatigued muscles on chewing harder foods
Deep Facial Ache
Headaches

**Three types of uneven bite:**
1. Posterior Occlusal interference. Too heavy on a back tooth.
2. Posterior open bite. Too heavy on front teeth.
3. Too heavy on one side: the right or the left.

**Greater than 30% of headache patients have an occlusal problem that can be fixed without medications**.

**Causes of an uneven bite:**
A damaged jaw joint
Osteoarthritis
Multiple dental restoration done at different times by different dentist
Unfinished orthodontics.
Inappropriate Orthodontic Retainers
Poorly fitting night guards.
Neck damage causing neck muscle bracing.

**Treatments**
Treatments for an uneven bite depends on the severity of the malocclusion. Most uneven bites can be fixed with an occlusion adjustment: a light reshaping of teeth. If the bite is further off than what can be corrected with an occlusal adjustment, other options include orthodontics, restorative dentistry, occlusal onlays, and condylar distraction.

![](https://drdroter.com/wp-content/uploads/2025/07/TMD5-Extract.002.jpeg)

Occlusal Adjustment (“Sculpting” the occlusion)
With a proper, harmonious occlusion all teeth have an equal amount of force when the TMJ is in its fully seated position. No single tooth has to endure an excessive load. The forces through the TMJ is reparative and regenerative, not destructive.

![](https://drdroter.com/wp-content/uploads/2025/07/Screenshot-2025-07-20-at-8.39.18 PM.png)

*[caption]* Screenshot

Enamel can be contoured with a dental diamond or added to with
composite. Enamel is about 2-3mm thick in healthy teeth. It is stone
like with no nerves. Adjusting removes very little enamel.
Adjusting the teeth is usually very comfortable. If a tooth is loose or
has an old filling, it can be sensitive on adjusting.
If enamel is already worn from grinding your teeth, dentin may be
exposed on adjusting. If this happens a small white composite filling
can be placed over the exposed dentin.
Afterward your bite will feel more solid. Many people notice improved
comfort right away, while others take a week or two to adapt.

**Benefits of having a proper, ideal occlusion**:
Muscles of the jaw are more relaxed.
Muscle movements are coordinated and smooth.
Less risk of splitting or breaking teeth.
Teeth will not become loose, but will remain tight and firm.
Helps to maintain the health of the temporomandibular joint.
Helps to maintain the health of the periodontium.
Front teeth that are adjusted in harmony look better.

![](https://drdroter.com/wp-content/uploads/2025/07/TMD5-Extract.001.jpeg)

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2025/07/OMD-dawson-1024x936.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2025/07/OMD-dawson.jpg; displayed 1024×936
- https://drdroter.com/wp-content/uploads/2025/07/post-opebite-1024x687.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2025/07/post-opebite-2048x1375.jpg; displayed 1024×687
- https://drdroter.com/wp-content/uploads/2025/07/TMD5-Extract.002.jpeg — alt="" — displayed 2400×1200
- https://drdroter.com/wp-content/uploads/2025/07/Screenshot-2025-07-20-at-8.39.18 PM.png — alt="" — displayed 948×1006
- https://drdroter.com/wp-content/uploads/2025/07/TMD5-Extract.001.jpeg — alt="" — displayed 2400×1200

**▸ Capture notes:**

- "An uneven bite causing muscle fatigue is called / **Occlusal Muscle Disharmony**" is one paragraph set in the medium font size.
- The lines starting "Enamel can be contoured…" keep the hard line breaks from the source (pasted from a PDF).
- One image caption is literally "Screenshot". That image's filename contains a U+202F narrow no-break space (`Screenshot-2025-07-20-at-8.39.18%E2%80%AFPM.png` when URL-encoded, HTTP 200).

---

## Children — https://drdroter.com/children/

- **Source URL:** https://drdroter.com/children/
- **HTML `<title>`:** Children | John R. Droter, DDS
- **Approx. length:** ~454 words (main content)

**▸ Verbatim copy (reading order):**

### Children

**Helping the Young Avoid Becoming a Futrue TMD Patient**
Many of my Temporomandibular Disorder patient’s current problems can be traced back to childhood. For an adult to function fully, they need to have a fully developed face. Many things at different phases of childhood development can interferer with reaching full genetic potential.
…………………………………………………………………….

**Infant Breast Feeding Problems**
Any infant/mom struggling with breast feeding should be evaluated to see if lip or tongue tie is the problem. There is a simple that wil have a lifetime of benefit.

Symptoms include : New born not able to latch and breastfeed, failure to thrive, sore nipple, long breastfeeding times.

![](https://drdroter.com/wp-content/uploads/2017/09/MG_2415s-300x200.jpg)

*[caption]* Infant with Restricted Upper Lip Frenum- Photo Courtesy of Dr Myriam Berrahil

![](https://drdroter.com/wp-content/uploads/2017/09/MG_2419s-300x200.jpg)

*[caption]* Upper Frenum removed with Laser- Treatment by Myriam Berrahil DDS, Miami

![](https://drdroter.com/wp-content/uploads/2017/09/MG_2416s-300x200.jpg)

*[caption]* Infant with Restricted Tongue Frenum- Photo Courtesy of Dr Myriam Berrahil

![](https://drdroter.com/wp-content/uploads/2017/09/MG_2420s-300x200.jpg)

*[caption]* Tongue Frenum removed with laser- Treatment by Myriam Berrahil DDS, Miami

**Airway**
Children who breath through their mouth will lack having their tongue put pressure on the maxilla (upper jaw) during growth. The maxilla is dependent on the tongue to develop fully. Without the tongue putting pressure  on the maxilla it will end up  being narrow and will drift down. The maxilla is also the floor of the nose.

Signs and Symptoms in children include : Snoring, thumb sucking, enlarged tonsil and adenoids, lagging behind in growth, attention deficit disorder.

If this was not treated during childhood, as an adult  you will see a narrow maxilla, high palate, narrow nasal passages, gummy smile, airway problems, upper airway resistance.

Examples of various treatments; Retraining breathing and swallowing, allergy identification and diet changes, expanding upper and lower arches with lingual light wires (not braces), increasing vertical heigh of occlusion on select teeth to redirect growth, surgical removal of tonsils and adenoids, frenectomy.

“Many kids breath through their mouth. This needs to be corrected at any age. The sooner we correct the better.”
German Ramirez, DDS

…………………………………………………………………….
**Resources**

**German Ramirez, DDS**
Dr Ramirez has a free textbook you can read online at his website. He also offers courses for dentist on early treatment of malocclusion.
Free Textbook  [Ramirez Free Textbook](http://www.kidsmalocclusions.com)
Courses     [Ramirez Courses](http://www.kidsmalocclusions.com/conferences/)

[ ![](https://drdroter.com/wp-content/uploads/2017/09/Ramirez-4-300x230.jpg) ](https://drdroter.com/k/ramirez-4/)

[ ![](https://drdroter.com/wp-content/uploads/2017/09/Ramirez-1-300x228.jpg) ](https://drdroter.com/k/ramirez-1/)

*[caption]* Treatment by Dr German Ramirez

**Barry Rafael, DDS**
Dr. Raphael teaches course on Myofunctional Orthodontics with the Myobrace System. He also offers numerous course related to kids and facial development.
Courses  [Raphael Courses](https://www.learnairwayortho.com/professional-education/course-catalogue/)

**Myobrace**
Myobrace is one of many ways to help overcome dysfunctional breathing and swallowing. Their website is a source of some information. They offer courses around the world. I took Dr Raphaels course on Myobrace and found it to be outstanding.
Information on Myobrace [About Myobrace](http://www.myobrace.com/faqs)
Courses on Myobrace [Myobrace Courses](http://myoresearch.com/courses/)

![](https://drdroter.com/wp-content/uploads/2017/09/Original-Myofunctional-K1-Orthodontic-Trainer-Myobrace-Teeth-Trainer-K1-Dental-Orthodontic-teeth-trainer-K1-Blue-300x300.jpg)

…………………Future Topics
Food Allergies/ Food sensitivities
Developing malocclusions

**▸ Links & media:**

**Links (in order):**

- "Ramirez Free Textbook" → http://www.kidsmalocclusions.com — *checked 2026-10-13: HTTP 200*
- "Ramirez Courses" → http://www.kidsmalocclusions.com/conferences/ — *checked 2026-10-13: HTTP 404*
- "[image]" → https://drdroter.com/k/ramirez-4/ — *checked 2026-10-13: HTTP 200 → redirects to https://drdroter.com/children/ramirez-4/*
- "[image]" → https://drdroter.com/k/ramirez-1/ — *checked 2026-10-13: HTTP 200 → redirects to https://drdroter.com/children/ramirez-1/*
- "Raphael Courses" → https://www.learnairwayortho.com/professional-education/course-catalogue/ — *checked 2026-10-13: no response (timeout/DNS)*
- "About Myobrace" → http://www.myobrace.com/faqs — *checked 2026-10-13: HTTP 404 → redirects to https://myobrace.com/faqs*
- "Myobrace Courses" → http://myoresearch.com/courses/ — *checked 2026-10-13: HTTP 200 → redirects to https://myoresearch.com/en-au/online-courses*

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2017/09/MG_2415s-300x200.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/MG_2415s-1024x683.jpg; displayed 300×200
- https://drdroter.com/wp-content/uploads/2017/09/MG_2419s-300x200.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/MG_2419s-1024x683.jpg; displayed 300×200
- https://drdroter.com/wp-content/uploads/2017/09/MG_2416s-300x200.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/MG_2416s-1024x683.jpg; displayed 300×200
- https://drdroter.com/wp-content/uploads/2017/09/MG_2420s-300x200.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/MG_2420s-1024x683.jpg; displayed 300×200
- https://drdroter.com/wp-content/uploads/2017/09/Ramirez-4-300x230.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/Ramirez-4-1024x785.jpg; links to: https://drdroter.com/k/ramirez-4/; displayed 491×376
- https://drdroter.com/wp-content/uploads/2017/09/Ramirez-1-300x228.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/Ramirez-1-1024x777.jpg; links to: https://drdroter.com/k/ramirez-1/; displayed 472×359
- https://drdroter.com/wp-content/uploads/2017/09/Original-Myofunctional-K1-Orthodontic-Trainer-Myobrace-Teeth-Trainer-K1-Dental-Orthodontic-teeth-trainer-K1-Blue-300x300.jpg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2017/09/Original-Myofunctional-K1-Orthodontic-Trainer-Myobrace-Teeth-Trainer-K1-Dental-Orthodontic-teeth-trainer-K1-Blue.jpg; displayed 300×300

**▸ Capture notes:**

- Typos as published: "Futrue", "interferer", "There is a simple that wil have", "breath through", "heigh", "Barry Rafael" in the heading vs. "Dr. Raphael" in the body.
- The two Ramirez thumbnails link to WordPress attachment pages (/k/ramirez-4/, /k/ramirez-1/), which now redirect to /children/ramirez-…/.
- The "…………" rows are literal ellipsis characters used as dividers.

---

## Patient Downloads — https://drdroter.com/patient-downloads/

- **Source URL:** https://drdroter.com/patient-downloads/
- **HTML `<title>`:** Patient Downloads | John R. Droter, DDS
- **Approx. length:** ~56 words (main content)

**▸ Verbatim copy (reading order):**

### Patient Downloads

[HotColdHot Download](https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf)
Home therapy for sore muscles with triggerpoints

[Photos: The Big 12](https://drdroter.com/wp-content/uploads/2017/01/Photo-Guidelines17.1.Big12.pdf)
Photos your Dentist can take to help us monitor your progress

**Vitamin Supplements**
[Supplement Recommendations](https://drdroter.com/wp-content/uploads/2026/08/Vitamin-Recommendation-26.8.pdf)

**Oral Hygiene Recommendations**
[Toothpaste Recommendations 2018.5](https://drdroter.com/wp-content/uploads/2018/05/Toothpaste-Recommendations-2018.5.pdf)
[Abrahamsen Article on Toothpaste Abrasion](https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf)
[Abrahamsen Handout](https://drdroter.com/wp-content/uploads/2017/06/2008-Abrahamsen-Handout.pdf)
[Rath article on Toothpaste Relative Dentin Abrasiveness](https://drdroter.com/wp-content/uploads/2017/06/Rath-Toothpaste-Abrasiveness-2016.pdf)
[Toothpaste Abrasivenss Chart 2016 17.9 article](https://drdroter.com/wp-content/uploads/2018/01/Toothpaste-Abrasivenss-Chart-2016-17.9-article.pdf)

**▸ Links & media:**

**Links (in order):**

- "HotColdHot Download" → https://drdroter.com/wp-content/uploads/2016/06/hotcoldhot2.pdf — *checked 2026-10-13: HTTP 200*
- "Photos: The Big 12" → https://drdroter.com/wp-content/uploads/2017/01/Photo-Guidelines17.1.Big12.pdf — *checked 2026-10-13: HTTP 200*
- "Supplement Recommendations" → https://drdroter.com/wp-content/uploads/2026/08/Vitamin-Recommendation-26.8.pdf — *checked 2026-10-13: HTTP 200*
- "Toothpaste Recommendations 2018.5" → https://drdroter.com/wp-content/uploads/2018/05/Toothpaste-Recommendations-2018.5.pdf — *checked 2026-10-13: HTTP 200*
- "Abrahamsen Article on Toothpaste Abrasion" → https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf — *checked 2026-10-13: HTTP 200*
- "Abrahamsen Handout" → https://drdroter.com/wp-content/uploads/2017/06/2008-Abrahamsen-Handout.pdf — *checked 2026-10-13: HTTP 200*
- "Rath article on Toothpaste Relative Dentin Abrasiveness" → https://drdroter.com/wp-content/uploads/2017/06/Rath-Toothpaste-Abrasiveness-2016.pdf — *checked 2026-10-13: HTTP 200*
- "Toothpaste Abrasivenss Chart 2016 17.9 article" → https://drdroter.com/wp-content/uploads/2018/01/Toothpaste-Abrasivenss-Chart-2016-17.9-article.pdf — *checked 2026-10-13: HTTP 200*

**▸ Capture notes:**

- All 7 PDFs return HTTP 200. They were not downloaded, because only the airway-bite assets and the headshot were requested.

---

## Patient Links — https://drdroter.com/links/

- **Source URL:** https://drdroter.com/links/
- **HTML `<title>`:** Patient Links | John R. Droter, DDS
- **Approx. length:** ~93 words (main content)

**▸ Verbatim copy (reading order):**

### Patient Links

##### Links

[Lucky Vitamins Shop](https://www.luckyvitamin.com)
Vitamin store that covers most brands, has good prices and good customer service

[Shaklee](https://www.shaklee.com/us/en/shop/healthyweight)
Vitamin Company that makes great vitamins.

#####

##### My Team: Specialist who I routinely work with to get excellent results

[Dr Edward Zebovitz](http://www.drzebovitz.com)
Oral Surgeon

[Dr David Mugford](http://www.davidmugforddmd.com)
Periodontist

[Dr John Benkovich](http://www.drbenkovich.com)
Orthodontist

[Dr Jeffrey Luzader](http://www.chesapeakeendo.com)
Endodontist

[Rosemarie Edger, PT](http://edgertherapy.com/home)
Physical Therapy, Cranial Therapy

[Dr Mark Schwartz](http://theannapolischiropractor.com)
Atlas Orthogonist

[Dr Liliana Calkins](http://www.sunrise-orthodontics.com)
Orhtodonist

[Drs. Walzer, Sullivan and Hlousek](http://www.annapolisoss.com)
Oral Surgeons

[Drs. John Davliakos, Robert Cook, Arezoo Bahar](http://www.apadentistry.net/about.html)
Prosthedontists

Timothy Burke, MD    (443) 453-5055[](http://www.totalsleepcare.net/our-locations/)
Sleep Specialist

#####

**▸ Links & media:**

**Links (in order):**

- "Lucky Vitamins Shop" → https://www.luckyvitamin.com — *checked 2026-10-13: HTTP 403 → redirects to https://www.fruitfulyield.com/?redirectsrc=luckyvitamin.com*
- "Shaklee" → https://www.shaklee.com/us/en/shop/healthyweight — *checked 2026-10-13: HTTP 404 → redirects to https://us.shaklee.com/us/en/shop/healthyweight*
- "Dr Edward Zebovitz" → http://www.drzebovitz.com — *checked 2026-10-13: HTTP 200*
- "Dr David Mugford" → http://www.davidmugforddmd.com — *checked 2026-10-13: HTTP 200 → redirects to https://www.cox.com/business/cybersecurity/internet-threat-blocker/blocked.html*
- "Dr John Benkovich" → http://www.drbenkovich.com — *checked 2026-10-13: HTTP 403*
- "Dr Jeffrey Luzader" → http://www.chesapeakeendo.com — *checked 2026-10-13: HTTP 403*
- "Rosemarie Edger, PT" → http://edgertherapy.com/home — *checked 2026-10-13: no response (timeout/DNS)*
- "Dr Mark Schwartz" → http://theannapolischiropractor.com — *checked 2026-10-13: HTTP 200*
- "Dr Liliana Calkins" → http://www.sunrise-orthodontics.com — *checked 2026-10-13: HTTP 200*
- "Drs. Walzer, Sullivan and Hlousek" → http://www.annapolisoss.com — *checked 2026-10-13: HTTP 403*
- "Drs. John Davliakos, Robert Cook, Arezoo Bahar" → http://www.apadentistry.net/about.html — *checked 2026-10-13: HTTP 400*
- "" → http://www.totalsleepcare.net/our-locations/ — *checked 2026-10-13: no response (timeout/DNS)*

**▸ Capture notes:**

- The page title is "Patient Links" (slug /links/). Typos as published: "Orhtodonist", "Prosthedontists", "Specialist" (singular).
- "Timothy Burke, MD … (443) 453-5055" is followed by an **empty link** (`<a>` containing only a `<br>`) to http://www.totalsleepcare.net/our-locations/, then "Sleep Specialist".
- There are empty `<h3>` elements in the source; they show as a bare `#####` above.

---

## Medical Literature — https://drdroter.com/medical-literature/

- **Source URL:** https://drdroter.com/medical-literature/
- **HTML `<title>`:** Medical Literature | John R. Droter, DDS
- **Approx. length:** ~30 words (main content)

**▸ Verbatim copy (reading order):**

### Medical Literature

[Thomas Abrahamsen Article](https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf)
Abrahamsen T C, The worn dentition – pathognomonic patterns of abrasion and erosion. Int Dent J 2005 55: 268-76.

[John R Droter DDS Article](https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf)
Orthopedic Medicine

**▸ Links & media:**

**Links (in order):**

- "Thomas Abrahamsen Article" → https://drdroter.com/wp-content/uploads/2016/11/AbrahamsenIDJ.pdf — *checked 2026-10-13: HTTP 200*
- "John R Droter DDS Article" → https://drdroter.com/wp-content/uploads/2016/11/DroterOrthopedDx.pdf — *checked 2026-10-13: HTTP 200*

**▸ Capture notes:**

- Both PDFs return HTTP 200.

---

## Seminar Links — https://drdroter.com/seminar-links/

- **Source URL:** https://drdroter.com/seminar-links/
- **HTML `<title>`:** Seminar Links | John R. Droter, DDS
- **Approx. length:** ~31 words (main content)

**▸ Verbatim copy (reading order):**

### Seminar Links

“Yoint” Video by Dr Westesson

[iframe: https://www.youtube.com/embed/nH8KG3fIoBM?feature=oembed title="TMJ Anatomy "The Yoint" Video"]

Sleep Airway Screening Pulse Oximetry Purchasing
[Patient Safety Inc.](http://www.patientsafetyinc.com)
[ ![](https://drdroter.com/wp-content/uploads/2019/03/SleepSat_On-Hand-300x196.jpg) ](https://drdroter.com/wp-content/uploads/2019/03/SleepSat_On-Hand.jpg)

Living Tree Dental Lab
ArrowPath Sleep Orthotics
[https://www.livingtreelab.com](https://www.livingtreelab.com)

![](https://drdroter.com/wp-content/uploads/2023/03/APS-products.001-1024x512.jpeg)

**▸ Links & media:**

**Links (in order):**

- "Patient Safety Inc." → http://www.patientsafetyinc.com — *checked 2026-10-13: HTTP 200 → redirects to https://www.marketing.patientsafetyinc.com/*
- "[image]" → https://drdroter.com/wp-content/uploads/2019/03/SleepSat_On-Hand.jpg — *checked 2026-10-13: HTTP 200*
- "https://www.livingtreelab.com" → https://www.livingtreelab.com — *checked 2026-10-13: HTTP 200*

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2019/03/SleepSat_On-Hand-300x196.jpg — alt="" — links to: https://drdroter.com/wp-content/uploads/2019/03/SleepSat_On-Hand.jpg; displayed 197×129
- https://drdroter.com/wp-content/uploads/2023/03/APS-products.001-1024x512.jpeg — alt="" — largest srcset: https://drdroter.com/wp-content/uploads/2023/03/APS-products.001-2048x1024.jpeg; displayed 1024×512

**Embeds:**

- iframe: https://www.youtube.com/embed/nH8KG3fIoBM?feature=oembed — title="TMJ Anatomy "The Yoint" Video"

**▸ Capture notes:**

- **Lists "Living Tree Dental Lab" for "ArrowPath Sleep Orthotics"**, which contradicts apsleep.com (Great Lakes Dental).
- The YouTube embed is "TMJ Anatomy "The Yoint" Video" (video ID nH8KG3fIoBM).
- **Text inside `APS-products.001-1024x512.jpeg`** (transcribed from the image, downloaded to `scratchpad/extra-assets/`): the APS logo ("APS / ArrowPath Sleep") and the Living Tree Dental Lab logo · "Nate Brock, CDT / (865) 509-4509 / connect@livingtreelab.com" · "3D Printed Orthotics" · four product panels: "D-PAS / Diagnostic- / Palatal Anterior Stop" · "Brux-PAS / with lower Essix" · "Hard Lower Posterior Stop / with upper essix" · "Hard Lower Full Coverage / Centric Relation Orthotic". This is the only place that expands **D-PAS** ("Diagnostic-Palatal Anterior Stop"). The 2026 Products page names "Lower Hard CR Orthotic", which matches "Hard Lower Full Coverage Centric Relation Orthotic", and does not list "Hard Lower Posterior Stop".
- patientsafetyinc.com now redirects to marketing.patientsafetyinc.com.

---

## Pankey TMD 2026 — https://drdroter.com/pankey-tmd-2026/

- **Source URL:** https://drdroter.com/pankey-tmd-2026/
- **HTML `<title>`:** Pankey TMD 2026 | John R. Droter, DDS
- **Approx. length:** ~16 words (main content)

**▸ Verbatim copy (reading order):**

### Pankey TMD 2026

Day 4 Version

[Pankey TMD 2026v2.key-sm](https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf)[Download](https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf)

[Gill Ortho Ceph Analysis Extract.key](https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf)[Download](https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf)

**▸ Links & media:**

**Links (in order):**

- "Pankey TMD 2026v2.key-sm" → https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf — *checked 2026-10-13: HTTP 200*
- "Download" → https://drdroter.com/wp-content/uploads/2026/06/Pankey-TMD-2026v2.key-sm.pdf — *checked 2026-10-13: HTTP 200*
- "Gill Ortho Ceph Analysis Extract.key" → https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf — *checked 2026-10-13: HTTP 200*
- "Download" → https://drdroter.com/wp-content/uploads/2026/06/Gill-Ortho-Ceph-Analysis-Extract.key.pdf — *checked 2026-10-13: HTTP 200*

**▸ Capture notes:**

- **Not password-protected.** Both PDFs are public (HTTP 200). They are WordPress File blocks, each with a filename link plus a "Download" button.
- "Day 4 Version" is the only body text.

---

## Contact — https://drdroter.com/contact/

- **Source URL:** https://drdroter.com/contact/
- **HTML `<title>`:** Contact | John R. Droter, DDS
- **Approx. length:** ~21 words (main content)

**▸ Verbatim copy (reading order):**

### Contact

John R. Droter, DDS

4000 Mitchellville Road
Suite 330B
Bowie Maryland, 20716

301-805-9400

![IMG_3287-1](https://drdroter.com/wp-content/uploads/2016/07/IMG_3287-1-300x66.jpg)       mac.com

{google_map}4000 Mitchellville Rd., Bowie, MD, 20716{/google_map}

**▸ Links & media:**

**Images (in order):**

- https://drdroter.com/wp-content/uploads/2016/07/IMG_3287-1-300x66.jpg — alt="IMG_3287-1" — largest srcset: https://drdroter.com/wp-content/uploads/2016/07/IMG_3287-1-1024x225.jpg; displayed 255×56

**▸ Capture notes:**

- **The email address is an image** (`IMG_3287-1`, handwritten "drdroter@" in blue ink), followed by the text "      mac.com", which reads as drdroter@mac.com.
- `{google_map}4000 Mitchellville Rd., Bowie, MD, 20716{/google_map}` is an **unrendered shortcode** that no active plugin processes, so the live page shows it as literal text.
- There is no contact form.

---

## Seminar Downloads — https://apsleep.com/seminar-downloads/

- **Source URL:** https://apsleep.com/seminar-downloads/
- **HTML `<title>`:** Seminar Downloads – APSleep
- **Approx. length:** ~2 words (main content)

**▸ Verbatim copy (reading order):**

### Seminar Downloads

**▸ Links & media:**

- (none in main content)

**▸ Capture notes:**

- Published page with a title only and no body content.

---

## Seminar Downloads — https://drdroter.com/seminar-downloads/

- **Source URL:** https://drdroter.com/seminar-downloads/
- **HTML `<title>`:** Seminar Downloads | John R. Droter, DDS
- **Approx. length:** ~24 words (main content)

**▸ Verbatim copy (reading order):**

### Protected: Seminar Downloads

This content is password-protected. To view it, please enter the password below.

Password: [input type=password name="post_password" required]

[input type=submit name="Submit" value="Enter"]

**▸ Links & media:**

- (none in main content)

**▸ Capture notes:**

- **Password-protected.** The content cannot be retrieved without the password. Captured here as served to the public.
