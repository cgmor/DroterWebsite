# APSleep.com site system (`src/components/site`)

One world for /v1, /v2, /v3. Routes live in `src/app/[v]/…`; the layout already renders ReviewBar, `Header`, `<main id="main">`, `Footer` and imports `aps.css`. Pages get `params: Promise<{ v: string }>`; narrow it with `isVersion(v)`. Child dynamic segments (e.g. `conditions/[slug]`) need their own `generateStaticParams` (the `[v]` layout sets `dynamicParams = false`). Copy comes from `@/content/aps` and `@/content/tmd` only. No eyebrow/kicker labels, no 01/02/03 (except real steps), mono only for measurements, timecodes and spec values.

Import from `@/components/site` (barrel) or the file directly. Server components unless marked (client).

## Layout and type
| Component | Props | Usage |
|---|---|---|
| `Section` | `tone?: "white"\|"mist"\|"porcelain"\|"night"`, `width?: "wide"\|"text"\|"full"`, `space?: "lg"\|"md"\|"sm"\|"none"`, `flush?: "top"\|"bottom"\|"both"`, `id`, `labelledBy`, `as`, `className` | `<Section tone="mist" labelledBy="x-title">…</Section>` |
| `SectionHead` | `title`, `id?`, `lead?`, `actions?`, `as?: "h1"\|"h2"\|"h3"`, `size?: "display"\|"h1"\|"h2"\|"h3"`, `layout?: "stack"\|"split"` | `<SectionHead id="x-title" title="…" lead="…" layout="split" />` |
| `Prose` | `children` | Read-mode column (18px, 68ch, h2/h3/ul/ol styled): `<Prose><h2>…</h2><p>…</p></Prose>` |
| `Hero` | `title`, `lead?`, `actions?`, `media` (node), `below?`, `tone?` (porcelain), `mediaSide?`, `size?: "display"\|"h1"`, `tall?`, `id?` | `<Hero title="…" media={<Image className="hero-render" …/>} below={<SpecStrip items={airwaySpecStrip}/>} />` |
| `Button` / `ButtonLink` | `variant?: "primary"\|"secondary"\|"quiet"`, `size?: "md"\|"sm"`, `icon?: "arrow"\|"external"\|"down"\|"play"\|"download"\|"phone"\|"none"`, `block?`; link: `href`, `external?`, `plain?` | `<ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>` (http opens new tab with ↗) |
| `Reveal` (client) | `as?`, `delay?`, `className`, `id` | Settles content in from an already-visible state: `<Reveal><ApplianceGuide v={v}/></Reveal>` |
| `Loop` (client) | `name: "airwayOpening"\|"kitReveal"\|"stepsMontage"`, `alt`, `className?`, `sizes?`, `preload?` | Silent 1920×816 loop; poster under reduced motion: `<Loop name="kitReveal" alt="…" />` |

## Content pieces
| Component | Props | Usage |
|---|---|---|
| `Figure` (client) | `src, alt, width, height, caption?`, `variant?: "plate"\|"inline"`, `sizes?`, `preload?` | Lecture slide as a framed plate, click to enlarge: `<Figure {...understanding.definition.figure} />` |
| `ImageCard` | `href`, `image: {src, alt}`, `title`, `line?`, `meta?`, `ratio?: "4/3"\|"16/10"\|"3/2"\|"1/1"\|"4/5"`, `fit?: "cover"\|"contain"`, `field?: "porcelain"\|"mist"\|"white"\|"night"`, `external?`, `as?` | 20px card, whole card links: `<ImageCard href={href(v, routes.condition(g.slug))} image={g.hero!} title={g.title} line={g.plainName} fit="contain" field="white" />` |
| `SpecRows` | `rows: { label, value, mono?, note?, extra? }[]` | Hairline spec sheet: `<SpecRows rows={[{ label: "Anterior stop", value: "4 mm", mono: true }]} />` |
| `SpecStrip` | `items: { value, label }[]` | Millimetre row: `<SpecStrip items={airwaySpecStrip} />` |
| `Disclosure` (client) | `children` (full version), `summary?`, `label?` ("Expand the full version"), `collapseLabel?`, `defaultOpen?` | `<p>{g.summary}</p><Disclosure>{full}</Disclosure>` |
| `PracticePanel` | `surface?: "mist"\|"white"`, `portrait?`, `id?` | Light-touch Bowie panel with phone: `<Section space="md"><PracticePanel /></Section>` |
| `SignsChecklist` (client) | `showHeading?`, `id?` | `understanding.signs` as checkboxes + gentle count: `<Section tone="mist"><SignsChecklist /></Section>` |

## Airway Bite pieces
| Component | Props | Usage |
|---|---|---|
| `AirwayBiteInDetail` | `id?` ("in-detail"), `title?`, `showOrder?` | Required on every version. Renders its own porcelain Section: rotating GLB + Orbit/Front/Side/Top + spec sheet + 0–12 mm `RangeScale`. `<AirwayBiteInDetail />` |
| `HowFarForward` (client) | `id?` ("how-far"), `title?`, `tone?: "night"\|"mist"\|"white"` | Renders its own Section: three airway stills, the third swapped by Not enough / Just right / Too far. `<HowFarForward />` |
| `TutorialPlayer` (client) | `withSteps?`, `id?` ("tutorial"), `preload?` | Video + chapter track + chapter list. `withSteps`: chairside layout, sticky player, 4 phases × 9 IFU steps that seek the video, phone jump bar, IFU panels; sets `#steps`, `#step-1…9`, `#phase-fit…`. Place in a Section. Use one `withSteps` per page. |
| `ApplianceGuide` | `v`, `showOrder?` | Indication → appliance matrix; MAD row links to the Airway Bite. Place in a Section. |
| `KitCallouts` | `className?` | Kit still with leader-line callouts; bleeds, so use `<Section tone="porcelain" width="full" flush="bottom">`. |
| `ModelStage`, `RangeScale` | — | The two halves of the detail section, if a page needs them alone. |

## Helpers (`links.ts`, `specs.ts`, `icons.tsx`, `motion.ts`)
- `href(v, path)` → version-relative URL: `href("v2", routes.airwayBite + "#steps")` = `/v2/airway-bite#steps`. `routes`: `home, airwayBite, appliances, understanding, conditions, condition(slug), library, about`. Also `NAV`, `AUDIENCES`, `isVersion`, `tel(phone)`.
- `airwayNumbers` (`anteriorStop` 4 mm, `range` 10–12 mm, `target` ≈ 50%, `chairside` ≈ 5 min, `envelope`), `airwaySpecStrip`, `kitItems`: every number traced to its source. Do not invent others. `airwaySpecStrip` is millimetres only (4 mm · 10–12 mm · 14.6 × 22.0 × 13.8 mm); the target and the chairside time go in running text, in body type, never in a mono row.
- `Icons.*`: ArrowRight, ArrowUpRight, ArrowDown, Play, Download, Plus, Minus, Menu, Close, Rotate, Phone, Expand, Check, Document (20-grid, 1.5 stroke).
- `useReducedMotion()` (client only).

## Classes
`t-display` (48–96px, 300), `t-h1`, `t-h2`, `t-h3`, `t-h4`, `t-lead`, `t-small`, `t-quiet`, `mono` (Geist Mono, measurements only), `num` (tabular), `wrap`, `wrap-text`, `actions`, `grid-2`, `grid-3`, `lnk` + `lnk-icon` (inline link), `note` (soft panel), `seg` + `seg-opt[aria-pressed]` (segmented control), `airway-line`, `hero-render` (a render inside `Hero`), `sr-only`.

## Tokens (CSS custom properties on `.aps`)
Grounds `--white #fff`, `--porcelain #dcdcdc` (stills/renders ground), `--mist #f2f3f5` (the secondary band field: tutorial, conditions, practice panel, footer; always `var(--mist)` / `tone="mist"`, never the hex), `--night #0b1526`, `--night-2 #13213a`, `--night-3 #1c2d4b`. Ink `--ink #15191e`, `--ink-2 #2b3139`, `--slate #56606b`, `--slate-porcelain #4a5460`, `--on-night #f2f5fa`, `--on-night-2 #a6b3c9`. Signal (interaction, active, airway line only) `--signal #2a6fdb`, `--signal-hover`/`--signal-ink #1f5cc0`, `--signal-night #8fb2f2`, `--signal-wash`. Lines `--hair`, `--hair-strong`, `--hair-night`, `--hair-night-strong`.
Contextual (re-pointed by each `.tone-*`; use these in page CSS): `--bg`, `--fg`, `--fg-2`, `--line`, `--line-strong`, `--accent-text`, `--surface`, `--track`, `--control`.
Type `--font-sans` (Geist), `--font-mono` (Geist Mono). Layout `--gutter`, `--maxw 1320px`, `--textw 46rem`, `--col-gap`, `--space-lg|md|sm`, `--hd-h`. Shape `--r-card 20px`, `--r-inner 12px`, `--r-pill`, `--shadow-1`, `--shadow-2`. Motion `--ease-out` (expo), `--dur-1|2|3` (160/320/640ms).
Tailwind v4 works alongside: `bg-(--porcelain)`, `text-(--fg-2)`, `rounded-(--r-card)`. Component styles sit in `@layer components`, so utilities override them.

## Images
next/image allows quality 75 only. For the hero image use `loading="eager" fetchPriority="high"` (not `preload`). Stills are 1920×816 on #DCDCDC; renders are 2000×2000 transparent PNGs; IFU panels 1600×800.
