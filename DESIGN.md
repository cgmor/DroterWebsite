---
name: APSleep
description: The Airway Bite and Dr. Droter's TMD education, for dentists first and patients second.
colors:
  white: "#ffffff"
  porcelain: "#dcdcdc"
  mist: "#f2f3f5"
  night: "#0b1526"
  night-2: "#13213a"
  night-3: "#1c2d4b"
  ink: "#15191e"
  ink-2: "#2b3139"
  slate: "#56606b"
  slate-porcelain: "#4a5460"
  on-night: "#f2f5fa"
  on-night-2: "#a6b3c9"
  signal: "#2a6fdb"
  signal-hover: "#1f5cc0"
  signal-ink: "#1f5cc0"
  signal-night: "#8fb2f2"
  signal-wash: "rgb(42 111 219 / 0.07)"
  hair: "rgb(21 25 30 / 0.12)"
  hair-strong: "rgb(21 25 30 / 0.24)"
  hair-night: "rgb(214 226 255 / 0.14)"
  hair-night-strong: "rgb(214 226 255 / 0.28)"
  control: "#7d858f"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 4.6vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline-lg:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.55rem + 3.3vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 3.25rem)"
    fontWeight: 350
    lineHeight: 1.06
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.55vw, 1.75rem)"
    fontWeight: 450
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  title-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.3vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.006em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-prose:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.006em"
  measure:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1.0625rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
rounded:
  soft: "6px"
  inner: "12px"
  card: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4.2vw, 56px)"
  col-gap: "clamp(20px, 2.4vw, 40px)"
  head-gap: "clamp(40px, 5vw, 72px)"
  section-sm: "clamp(40px, 4.5vw, 72px)"
  section-md: "clamp(64px, 7vw, 112px)"
  section-lg: "clamp(88px, 10vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0"
    height: "44px"
  button-quiet-hover:
    textColor: "{colors.signal-ink}"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  segmented-option-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  audience-option:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    rounded: "{rounded.pill}"
    padding: "0 15px"
    height: "34px"
  audience-option-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  image-card-media:
    backgroundColor: "{colors.porcelain}"
    rounded: "{rounded.card}"
  figure-plate:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "clamp(10px, 1.6vw, 20px)"
  practice-panel:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(24px, 4vw, 52px)"
  tutorial-console:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.card}"
    padding: "8px 8px 2px"
  disclosure-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 7px"
    height: "48px"
  header:
    backgroundColor: "{colors.white}"
    height: "76px"
---

# Design System: APSleep

## Overview

**Creative North Star: "The Clinical Instrument on Porcelain"**

This is the category standard, played straight. It aims for the clinical authority of a premium implant maker and the rendered-product polish of a sleep-tech brand. The ground is white. The device and its animation stills sit on the animation's own porcelain grey, so renders and frames bleed edge to edge with no visible box. A cool mist band carries the quiet sections. One deep night-blue family holds the sleep and airway moments. Graphite ink and slate do the reading work. A single signal blue marks what you can press and draws the airway line.

Type is one family. Geist is large and light for display, with tight tracking, and the same family runs UI and body. Geist Mono shows up only where a number is a measurement, a timecode or a spec value. Structure comes from hairline rules and spec-sheet rows, not from boxes. Cards are image cards with 20px corners, and the whole card is the link. Dr. Droter's lecture slides appear as framed figure plates on a white mat, like specimens. His portrait dissolves into the porcelain field rather than sitting in a frame. Each page has one authored motion moment. Everything else settles in from an already-visible state on an exponential ease-out, and reduced motion is honoured throughout.

The system rejects the dental-supplier template (stock smiles, tooth icons, teal gradients, icon-card rows) and the AI-editorial look (a cream-and-serif journal with kicker labels over every heading).

**Key Characteristics:**
- White ground, porcelain media fields, mist bands, one night family.
- One accent, signal blue, used for interaction and the airway line.
- Geist light display (300–350) at tight tracking; Geist Mono only for measurements.
- Hairline spec rows and ruled lists instead of boxed cards.
- 20px image cards, 12px inner frames, pill controls.
- Lecture slides as matted figure plates; the device as transparent renders on porcelain.
- One authored motion per page, expo ease-out, honest reduced-motion fallback.

## Colors

A cool, near-neutral clinical palette in which one saturated blue does all the signalling.

### Primary
- **Signal Blue** (`signal`): primary buttons, focus rings, the active nav underline, selected states, the range-scale target, the caret and the 22×2px airway line. Darker **Signal Ink** (`signal-ink`, also `signal-hover`) is the hover fill and the colour of small accent text and link hovers on light grounds. **Signal Night** (`signal-night`) does the same job on night fields. **Signal Wash** (`signal-wash`) is the 7% tint behind active rows.

### Neutral
- **White** (`white`): the page ground, the header, sheet menus, plate mats and the selected thumb of segmented controls.
- **Porcelain** (`porcelain`): the media field. It is the animation's own grey, so stills, renders, video frames, the hero, the "in detail" model section and card media all sit on it seamlessly. Inside a porcelain section, secondary text shifts to **Slate on Porcelain** (`slate-porcelain`, 5.6:1).
- **Mist** (`mist`): the secondary band for quiet sections. That means the tutorial, the condition indexes, the practice panel, the footer and the audience-switch track. It is always set through the token or `tone="mist"`, never as a raw hex.
- **Night** (`night`, `night-2`, `night-3`): the field family for sleep and airway moments ("How far forward?", the airway bridge and band, the tutorial console). `night-2` is a raised surface inside night. `night-3` is hover on night. A night section carries a faint signal-tinted radial glow (11% alpha, top right), and that glow is the only non-interactive appearance of the signal hue.
- **Ink** (`ink`) and **Ink 2** (`ink-2`): graphite text and the resting colour of nav links.
- **Slate** (`slate`): secondary text, credentials, meta and footer links (6.4:1 on white).
- **On Night** (`on-night`, `on-night-2`): primary and secondary text on night (8.6:1 for the secondary).
- **Hairlines** (`hair`, `hair-strong`, `hair-night`, `hair-night-strong`): rules, card insets and spec rows. Strong is for row dividers, regular is for insets.
- **Control** (`control`): checkbox and control borders, kept at 3:1 or better.

### Named Rules
**The One Signal Rule.** Signal blue means "interactive" or "airway." It never decorates a heading, a number, an icon tile or a background block.

**The Contextual Ground Rule.** Sections set a tone (white, mist, porcelain, night), and the tone re-points the contextual roles: background, foreground, secondary foreground, line, strong line, accent text, surface, track and control. Page CSS uses those roles, never raw grounds, so components work on any field.

**The Porcelain Is the Animation Rule.** Every still, render and video frame is shown on porcelain (or the transparent render sits on it) so the image edge disappears. Don't place stills on white or mist.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist
**Mono Font:** Geist Mono (with ui-monospace, SF Mono, Menlo)

**Character:** This is one grotesk at two temperatures. It is light and tightly tracked at display size, giving a quiet, expensive authority, and it is plain and steady at reading size. The mono is a measuring instrument, not a style.

### Hierarchy
- **Display** (300, 48–96px, 0.98 line-height, −0.035em): home hero headlines only, kept to about 13ch.
- **Headline Large** (300, 40–72px, 1.02): page h1s on inner pages.
- **Headline** (350, 32–52px, 1.06): section titles, kept to about 22ch.
- **Title** (450, 22–28px, 1.2): sub-sections and card groups. Image-card titles use 20px at 450.
- **Title Small** (500, 19px, 1.3): list item titles, panel heads and library rows.
- **Lead** (400, 19–22px, 1.5, slate): the standfirst under a heading, kept to about 42ch.
- **Body** (400, 17px, 1.6): the default.
- **Body Prose** (400, 18px, 1.7, 68ch): Read-mode columns. Prose h2s are 350 weight and 28–38px.
- **Small** (400, 15px, 1.55): meta, captions, spec labels and notes.
- **Label** (500, 16px; 15px small): buttons, nav (15px, 400) and controls. It is sentence case, with no uppercase and no positive tracking.
- **Measure** (Geist Mono 400, 17px in spec rows, tabular): millimetre values, timecodes and spec values only.

Headings default to 400 weight, −0.015em tracking and balanced wrapping. Paragraphs use pretty wrapping.

### Named Rules
**The Mono Is a Ruler Rule.** Geist Mono sets measurements (4 mm, 10–12 mm, 14.6 × 22.0 × 13.8 mm), timecodes and spec values, and nothing else. Approximate figures (≈ 50%, ≈ 5 min) and counts stay in body type.

**The No Eyebrow Rule.** No headline gets a label above it. Section heads are a title, optionally a lead, and optionally actions. Numerals appear only on real sequences, such as the four protocol phases, the nine IFU steps and Dr. Droter's ordered categories.

**The Light Display Rule.** Display and headline sizes stay at 300–350 weight. Weight rises as size falls (450–500 at title), never the reverse.

## Layout

Content sits in a 1320px column with a fluid gutter (20–56px). Read-mode text sits in a 46rem column, and prose is capped at 68ch. Column gaps run 20–40px. Section padding comes in three steps: `section-lg` is the default rhythm, `section-md` is for panels and bands, and `section-sm` is for tight follow-ons. Sections can be flushed top or bottom when two of the same tone meet. A section head always has more space above it (the section padding) than below it (`head-gap`), and it can stack or split 7:5 with the lead and actions bottom-aligned on the right.

Asymmetric splits recur: 7:5 for the head, the "in detail" model and its spec sheet, and the footer top, plus 11:13 for the hero copy and media. In the "in detail" section, the model column sticks below the header while the spec column scrolls. Grids go from one column to two at 640px and to three at 1000px. The header is 64px tall, 76px from 1180px, and the full nav appears at 1180px. Below that a full-screen white sheet menu takes over, with large light links (26–36px, 300) staggered in.

Breakpoints are 520, 560, 640, 900, 1000, 1024 and 1180px. Heroes are full-bleed on porcelain with a minimum height of `min(100svh − header − 36px, 1040px)`. Media bleeds past the gutter on the media side.

### The three home compositions
There is one world, composed three ways. Every version keeps "Airway Bite, in detail", the full education depth and the practice panel close.
- **V1, Airway Bite first:** the device hero on porcelain (the render bleeds roughly a tenth off the right and bottom, with the millimetre strip under the copy). Then the night "How far forward?", the porcelain detail, advantages, the tutorial, and a turn to diagnosis, the conditions as ruled rows, the appliance guide, the man, the library and the practice.
- **V2, Dr. Droter first:** a full-height portrait on porcelain whose backdrop dissolves into the field through a gradient mask. His thesis is the h1, and a floating white Airway Bite card sits in the same viewport. Then his approach, an airway bridge on night, the detail, a tutorial teaser, his lectures on mist, and a condition index.
- **V3, education first:** the healthy and damaged TMJ plates as the hero, with a wipe toggle and two ruled entry links ("For patients", "For dentists"). An airway band on night follows within the first scroll, then the signs checklist on mist, a condition gallery of image cards, the detail, the library and the man.

## Elevation & Depth

Depth here is mostly tonal. Grounds change instead of surfaces lifting. Shadows are soft, low-contrast and night-tinted (`rgb(11 21 38)`), and they appear in only a few roles: a matted plate, a floating card on a field, the tutorial console, a selected segment thumb and the header once the page scrolls. Hairline insets (`inset 0 0 0 1px`) do the edge work that borders would do elsewhere.

### Shadow Vocabulary
- **Shadow 1** (`box-shadow: 0 1px 2px rgb(11 21 38 / 0.06), 0 6px 16px -8px rgb(11 21 38 / 0.18)`): small floating things such as the zoom button, kit callout pins and the Airway Bite card over the portrait.
- **Shadow 2** (`box-shadow: 0 2px 4px rgb(11 21 38 / 0.05), 0 28px 56px -28px rgb(11 21 38 / 0.38)`): the tutorial console on light grounds.
- **Plate** (`box-shadow: inset 0 0 0 1px <line>, 0 1px 2px rgb(11 21 38 / 0.04), 0 22px 44px -32px rgb(11 21 38 / 0.4)`): figure plates and the joint-plate mat. It reads as a long, low drop under a matted print.
- **Thumb** (`box-shadow: 0 1px 2px rgb(11 21 38 / 0.08), 0 3px 10px -4px rgb(11 21 38 / 0.18)`): the selected option of a segmented control or the audience switch, and protocol step chips on hover.
- **Primary glow** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.16), 0 1px 2px rgb(11 21 38 / 0.14), 0 8px 20px -12px rgb(42 111 219 / 0.7)`): the primary button only.
- **Header lift**: a scroll-linked shadow over the first 120px (`0 1px 0 hair, 0 10px 30px -22px rgb(11 21 38 / 0.35)`). It falls back to a static hairline.

### Named Rules
**The Hairline Before Shadow Rule.** Edges are drawn with 1px insets in the current line colour. A shadow is reserved for something that is genuinely on top: a plate, a floating card, a console or a selected thumb.

## Shapes

The geometry is soft-cornered. Image cards, plates, panels and the tutorial console take 20px. Inner frames (the video inside its console, thumbnails) take 12px. Buttons, segmented controls, the audience switch, the disclosure toggle and the zoom and play buttons are pills. Focus outlines and slide images inside a plate take a 6px corner. Lines are 1px hairlines. The nav underline and the timeline segments are 1.5–2px bars with 1px rounding. Renders are transparent PNGs cut to the device silhouette, never boxed. The device's grounding is a soft elliptical contact shadow under the hero render.

## Components

### Buttons
Calm and exact, with the arrow doing the gesturing.
- **Shape:** full pill (`pill`). The medium size is 52px tall, and the small size is 40px.
- **Primary:** a signal fill with white label text at 500 weight, 24px horizontal padding and the primary glow. It is used for "Order through Great Lakes Dental" and for the single main action of a view.
- **Hover / Focus / Active:** fills deepen to `signal-hover` over 160ms. A trailing icon nudges 3px right. Active presses 1px down. Focus is a 2px signal outline, offset 3px (`signal-night` on night). Disabled drops to 45% opacity.
- **Secondary:** transparent with a `line-strong` 1px border. The border turns to the foreground colour on hover.
- **Quiet:** text with a hairline underline offset 0.32em, 44px hit area. On hover the label turns to accent text and the underline to currentColor.
- **Icons:** a 20-unit grid with 1.5 stroke (arrow, external ↗ for off-site links, down, play, download, phone).

### Segmented control and audience switch
- **Style:** a pill track in `track` (or mist for the audience switch, with a hairline inset) with 3px padding. Options are pills of 500-weight label text in secondary foreground.
- **State:** the selected option becomes a white thumb with ink text and the Thumb shadow. Background moves over 320ms and colour over 160ms. The control is used for model views (Orbit, Front, Side, Top), "How far forward?" (Not enough, Just right, Too far), the healthy and damaged plates, and Dentists | Patients.

### Image Cards
- **Corner Style:** 20px media with the body set beneath it, not inside a box.
- **Background:** the media field is porcelain by default. Mist, white or night can be chosen, and white and mist fields get a hairline inset.
- **Behaviour:** the whole card is the link. On hover the image scales 1.035 over 0.9s and the arrow slides 4px in accent colour. Focus outlines the whole card, offset 6px. A "contain" fit pads the image by 5%.
- **Body:** a 20px/450 title, a secondary line, and an optional meta foot at 14px.

### Spec Sheet and Millimetre Strip
- **Spec rows:** a 1px foreground rule on top, then rows of label (15px, secondary) against value, separated by `line-strong` hairlines. Measurement values are set in mono. The rows stack to one column under 520px.
- **Millimetre strip:** a ruled row of two columns, four from 900px. Values run 22–30px in mono at −0.03em, with labels under them. It is millimetres only.

### Figure Plates
- **Plate:** a lecture slide on a white mat (10–20px padding, 20px corners, Plate shadow), with the slide image at 6px corners and a hairline outline. The cursor is zoom-in, a white pill zoom button fades in on hover, and clicking opens a lightbox.
- **Inline:** porcelain-matted figures with a hairline inset, used for stills.

### Disclosure ("Expand the full version")
A pill button with a 34px filled circular icon (foreground fill, background-coloured glyph) that cross-rotates from plus to minus over 640ms. The panel opens by animating grid rows from 0fr to 1fr, and the content settles in from −8px.

### Navigation
- **Header:** white, sticky, with the logo lockup (24px, 28px desktop). Nav links are 15px ink-2 with a 44px hit area. On hover a 1.5px ink underline wipes in from the left. The current page gets a signal underline. The audience switch and the Order button sit at the end.
- **Mobile:** a 44px menu toggle opens a full-screen white sheet of ruled, large light links. The current link is in signal ink. The audience switch is full width.
- **Footer:** a mist band with a large light tagline (24–34px, 300), the order block, four link columns in slate, and a hairline base row.

### Practice Panel
A 20px mist panel (or white with a hairline inset) with a 16px-cornered square portrait on porcelain, light-touch practice copy and the phone number. It closes every home page.

### Tutorial Console (signature)
A night console with 20px corners and Shadow 2 (on night grounds it is `night-2` with a hairline inset). It frames a 16:9 video at 12px corners on porcelain, a segmented chapter timeline of 2px bars with 3px gaps, and mono timecodes. The chairside variant syncs four phases and nine IFU steps to the video, with a sticky player and a phone jump bar of step chips.

### Airway Bite, in detail (signature)
A porcelain section. The rotating GLB sits left in a 7:5 split, sticky, with a poster image that cross-fades to the live model over 640ms. A segmented view control and a hint sit on a strong rule. The spec sheet and a 0–12 mm range scale sit on the right: an SVG with foreground strokes, a dashed variable range, a signal target and 10px mono numerals.

### How far forward? (signature)
A night section with three airway stills on 20px porcelain media (4:3). The third still cross-fades as a three-way segmented control changes the advancement. A track with a sliding knob marks the choice.

## Do's and Don'ts

### Do:
- **Do** put stills, renders and video on `porcelain` so the image edge disappears. Let the hero render bleed past the gutter.
- **Do** set tone per section and use the contextual roles (`--bg`, `--fg`, `--fg-2`, `--line`, `--accent-text`) in page CSS.
- **Do** keep display type at 300–350 weight with −0.028 to −0.035em tracking.
- **Do** use Geist Mono for millimetres, timecodes and spec values only, with tabular numerals.
- **Do** draw structure with hairline rows (a 1px foreground rule on top, `line-strong` between rows) before reaching for a card.
- **Do** show Dr. Droter's slides as matted figure plates (white mat, 20px, Plate shadow, click to enlarge).
- **Do** give each page one authored motion moment. Otherwise content settles in from 25% opacity and 16px over 0.9–1.1s on `cubic-bezier(0.16, 1, 0.3, 1)`, and reduces to 1ms under reduced motion.
- **Do** mark off-site links with ↗ and open them in a new tab.

### Don't:
- **Don't** put eyebrow or kicker labels above headings, or number things that are not real sequences.
- **Don't** build icon-tile card grids. Lists are ruled rows. Cards are image cards with real imagery.
- **Don't** use gradient text, teal gradients, tooth icons or stock smiles.
- **Don't** use signal blue for decoration, headings, figures or fills other than the primary button and selected and active states.
- **Don't** set approximate figures, counts or prose in Geist Mono.
- **Don't** use uppercase or tracked-out labels. All UI text is sentence case at negative or zero tracking.
- **Don't** write the mist hex directly. Use the token or `tone="mist"`.
- **Don't** invent claims, prices, stats or testimonials to fill a layout slot.
