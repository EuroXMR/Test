# CLAUDE CODE BRIEF — Deo's portfolio / living-CV website

> Paste this whole file into Claude Code (or save it as `CLAUDE.md` in the repo root).
> It is the single source of truth: the goal, the rules, all the facts, the copy, the demos and the tech plan.

---

## 0. Instructions for Claude Code

- Read the whole file before writing any code.
- Work through the phases in section 12, in order. At the end of each phase, stop and show me what changed before moving on.
- **Never invent facts, numbers, dates, clients or results.** If something is missing, put a visible `[TODO: ...]` in the site and add it to `TODO.md`.
- If a fact here seems contradictory, ask me instead of guessing.
- Keep a short build log in `BUILD_LOG.md` (date, decision, what went wrong, fix). It becomes the "How I built this" page.

---

## 1. Goal

A personal website that works as a living CV, mainly for applications to **Anthropic** (and other AI companies).
It must **show** what Deo does rather than describe it:
1. real AI applications in an industry where almost nobody uses AI (mining),
2. ventures he has founded,
3. **working demos** a recruiter can try in 30 seconds.

**Audience:** recruiters and hiring managers. They see hundreds of polished CVs and value evidence, honesty and judgment over self-promotion.

**Role families this supports (framing only — do NOT list job titles on the site):**
- Beneficial Deployments / AI Outcomes / Activation (getting organisations to actually adopt Claude)
- Partnerships and community roles in ANZ (Partner Account Manager ANZ, Community Engagement Manager – Data Centres Australia)
- Data-centre operations (Data Center Facility Operations Lead, Sydney)
- IT Support Engineer (Dublin)
- Longer term: AI safety / security

---

## 2. Core message and positioning

**Headline:**
> **I bring AI into places nobody else is using it — and get people to adopt it.**

**Sub-headline:**
> Field operator, designer and founder. From diamond drilling rigs in Western Australia to offshore platforms in Norway and luxury design in Madrid.

**The real story (the site's emotional core):**
Deo isn't a specialist with one deep track. He's a generalist who learns any environment fast, gets people to trust him, closes agreements and makes new things actually get implemented. Every place he works, he quietly introduces AI to fix slow, error-prone processes.

**Tone:** confident, direct, warm. Every claim is backed by a fact, a number or a demo.
**Not allowed:** "I can revolutionise your company", "rockstar", "passionate visionary", "10x" and the like. Let the evidence carry the confidence.

---

## 3. Hard rules

1. **No invented facts.** Unknowns stay as `[TODO]`.
2. **No real employer or client data anywhere.** No hole IDs, site names, client names, coordinates or real lab data. Demos use synthetic data or public images only.
3. No skill bars, percentage ratings, logo walls of tools, buzzword clouds or generic AI-sounding filler.
4. Use honest job titles. Don't call Deo a "software engineer"; his programming is self-taught scripting plus AI-assisted development.
5. Label future work clearly as **"In development"** or **"Concept"**, and negotiations as **"Under negotiation"**.
6. The Claude API key **never** reaches the browser: serverless functions only, with rate limiting and size limits.
7. Performance and accessibility: fast, WCAG AA, mobile-first, honour `prefers-reduced-motion`, keyboard-navigable.
8. Personal privacy: city only (Perth, WA). No home address, phone number or document numbers.
9. All copy in plain English. Spanish version is phase 7 (optional toggle).

---

## 4. Fact sheet (use only these facts)

### Identity
- Goes by **Deo**. Full name: `[TODO]`
- Based in **Perth, Western Australia**
- Citizenships: **Spain** (EU work rights) and **Chile**. Show only: "EU work rights · Open to relocation".
- Languages: Spanish (native), English `[TODO: level]`, others `[TODO]`
- Has lived, studied or worked in: Spain, Australia, Norway, South Korea, Italy, Malta, Cyprus

### Current work — mining (Western Australia)
- **Geology Technician / Diamond Drilling Offsider**, West Core Drilling · Apr 2025–present · FIFO `[TODO: confirm dates]`
- Works on a **grade control drilling program**.

### AI in the mining job (the key evidence)
- **Problem:** drilling data entry is manual, slow and error-prone. Metres drilled and depths are typed by hand into Excel, and **laboratory dispatch lists** are also built by hand.
- **What Deo does:** he strips all private information (hole IDs etc.) so Claude / Codex only see numbers and standard sample codes. He then uses them to check the sheets for discrepancies and physically impossible metres or depths before the data reaches the geologists.
- **Result:** catches at least **1–2 errors per hole, roughly 1 error every 30 m drilled.**
  `[TODO: holes per program or per week, to show total scale]` `[TODO: one anonymised example of a typical error]`
- Also uses AI to help **identify lithology** from core. `[TODO: how it's used alongside the geologist; any accuracy observations]`
- **Concept / in development:** Meta-style AR glasses so geologists can log core hands-free, with the assistant fed from the project's own documentation.

### Previous field work
- **Junior Roughneck / Roustabout** — Goliat oil platform, Norway · `[TODO: dates, employer]`
- **Deckhand** — offshore supply vessel *Outer Limit*, Australia · `[TODO: dates]`
- **Deckhand & Engineering Assistant** — M/Y *Tribu* · `[TODO: dates]`
- Themes: safety-critical operations, strict procedures, heavy equipment, multidisciplinary crews, remote and harsh conditions.
- Studying **Cert IV WHS** units (BSBWHS412, BSBWHS413, BSBWHS414).

### Ventures (founder / director)
- **MEPA** — non-governmental organisation founded by Deo. Has **won cleaning contracts** `[TODO: number / scale]`. A **contract with the Australian Government is under negotiation.** `[TODO: one-line mission of MEPA]`
- **Polar Vector Limited (UK)** — cybersecurity company, director and owner, incorporated ~2024 `[TODO: exact date + company number]` `[TODO: what it does / clients / status]`
  - Related project: **PolarVector platform**, a situational-awareness / risk-analysis tool (anomaly detection, entity relationships, compliance signals) `[TODO: current status]`
- **Saint & Saint Studio (Cyprus)** — director; real-estate project in Cyprus.
- **Websites for local businesses (Perth)** — finds local businesses, builds their sites with Claude Code and sells them in person, as a sole trader.

### Design
- **Degree in Visual Design**, Madrid `[TODO: official institution name + year]`, including **one year at Sogang University, Seoul, South Korea**.
- Design work with **Balenciaga Madrid** `[TODO: exact role, dates]`
- Art direction, photography, branding (does his own).
- Tools: Unreal Engine, Twinmotion, SketchUp, 3ds Max, Adobe Dimension, Autodesk Alias, AutoCAD (list these as plain text, not a logo wall).

### Tech and local AI (supports the IT / infrastructure angle)
- Self-taught: Python scripting, APIs, automation, AI-assisted development with Claude Code.
- Runs local LLMs on his own hardware (e.g. Qwen, DeepSeek models) `[TODO: confirm models and setup]`.
- Hardware: several GPUs, including an AMD RX 9070 build, NVIDIA Quadro and GTX 970 `[TODO: confirm exact list]`.
- **Security investigation (in progress):** network-behaviour analysis of an off-brand smart projector `[TODO: status — only publish once written up]`.

---

## 5. Visual concept — "The Core"

The whole site is a **diamond drill core**. Scrolling = drilling deeper. Each section is a depth **interval**, like lithology on a core log.

- **Left rail (desktop) / top strip (mobile):** a vertical core column that "fills" as you scroll, with depth markers (0 m, 10 m, 20 m…).
- **Hero:** a Three.js core cylinder, slowly rotating, with a subtle stone texture and lighting. Lazy-loaded. SVG fallback.
- **Section headers** look like core-log entries:
  `INTERVAL 01 · 0.0–12.4 m · AI IN THE FIELD`
  Set in a monospace / technical typeface (e.g. JetBrains Mono, IBM Plex Mono).
- **Body text:** a clean, editorial sans or serif (e.g. Inter, or Source Serif for headings).
- **Colour:** each interval gets one muted rock-tone accent (iron-oxide red, basalt grey, quartz white, sandstone ochre, slate blue). Background off-white or near-black (design both and pick one).
- **The core is the only gimmick.** Everything else stays quiet, with lots of whitespace.
- **Reduced motion:** no rotation and no scroll animation; show a static stacked core-log graphic.
- **Easter egg (optional, small):** the footer reads `END OF HOLE (EOH) · total depth [n] m`.

---

## 6. Site structure and copy

### 0 m — Hero
- `DEO [TODO: surname]`
- Headline + sub-headline (section 2)
- Three buttons: **Try the demos** · **Case studies** · **Download CV (PDF)**
- A small "currently" line: `Currently: Geology Technician, Western Australia · Building with Claude`

### Interval 01 — AI in the field *(the most important section)*
Intro copy:
> Mining runs on spreadsheets typed by hand at the end of long shifts. I started using AI to check our own data, and it now catches errors that used to slip through.

**Case card A — Drilling data validation**
- Big stat: **~1 error every 30 m**
- Problem: manual data entry of metres and depths in a grade control program.
- What I did: strip private data → AI checks for discrepancies and impossible values → errors are fixed before they reach the geologists.
- Result: 1–2 errors per hole caught. `[TODO scale]`
- Note: "Private data is removed before anything reaches an AI model: it only sees numbers and standard sample codes."
- Button: **Try a version of this →** (links to Demo 1)

**Case card B — Lab dispatch lists**
- Problem: dispatch lists to the lab are built by hand, with the same error risk.
- What I did: `[TODO: confirm the check, e.g. cross-checking sample codes against the drilling log before dispatch]`

**Case card C — Lithology identification**
- AI vision as a second pair of eyes on core. `[TODO details]`
- Button: **Try it →** (Demo 2)

**Case card D — Concept: AR core logging** *(badge: CONCEPT)*
- Hands-free logging through smart glasses, with an assistant that knows the project's procedures and documents.
- Show a simple storyboard or mock-up (3 frames), designed by Deo.

### Interval 02 — Live demos
See section 7.

### Interval 03 — Ventures
Intro copy:
> I start things and get people to sign. Some of what I've built:

Cards: MEPA · Polar Vector Limited · Saint & Saint Studio · Perth web studio.
Each card shows: **What it is · My role · Status (badge) · One proof point.**

### Interval 04 — Field operations
Vertical timeline, with the most recent role at the top. Short and factual.
Callout: "Safety-critical environments: offshore oil & gas, supply vessels, diamond drilling. Studying Cert IV WHS."

### Interval 05 — Design
- Degree + Sogang + Balenciaga.
- Gallery of 4–6 pieces `[TODO: images + captions]`.
- One line: "Design is how I explain things: I make complex ideas visible."

### Interval 06 — Local AI lab *(short)*
- Photo of the hardware setup `[TODO]` + what runs on it.
- Helps for IT Support / infrastructure readers.

### Interval 07 — How I built this site
Generated from `BUILD_LOG.md`: how Deo directed Claude Code, key decisions, what broke and how it was fixed, and why the demos are privacy-first.

### Interval 08 — Currently learning
An honest short list `[TODO: confirm]`, e.g. Python fundamentals, the Claude API, data-centre / critical-facilities fundamentals.

### EOH — Contact
- Email `[TODO]` · LinkedIn `[TODO]` · Download CV
- "Perth, WA · EU work rights · Open to relocation"
- Languages and countries list.

---

## 7. Demos (Claude API)

General:
- Serverless functions (Vercel). Use the current Sonnet model (`claude-sonnet-5-5`), with the model name in an env var.
- Rate limit: e.g. 10 requests per IP per hour. Max upload 2 MB. Clear error messages.
- A banner on each demo: "Demo with synthetic data. Don't upload confidential company data."
- Don't store uploads. Delete them after the response.

### Demo 1 — Drill log validator
**Approach:** do the deterministic checks **in code first**, then use Claude to explain the findings in plain language and spot anything unusual the rules missed. (Rules where rules work, AI where judgment helps; mention this in the case study.)

**Input:** CSV/XLSX upload, or the **"Load sample data"** button.

**Synthetic sample file** (`/public/sample-drill-log.csv`). Columns:
`hole_id, from_m, to_m, interval_m, sample_id, sample_type, recovery_pct`
- `hole_id`: fake IDs like `DEMO-001`
- `sample_type`: `PRIMARY`, `DUPLICATE`, `STANDARD`, `BLANK`
- About 3 holes and 120 rows, with **deliberate planted errors**:
  1. an interval where `to_m < from_m`
  2. `interval_m` not matching `to_m - from_m`
  3. a gap between consecutive intervals
  4. overlapping intervals
  5. a duplicate `sample_id`
  6. sample IDs out of sequence
  7. `recovery_pct` > 100
  8. a hole deeper than its stated end-of-hole depth
  9. a missing QA/QC sample where the insertion pattern expects one (e.g. a standard every 20 samples) `[TODO: Deo to confirm a realistic insertion rate]`

**Output:** a results table (row · issue · severity · explanation), a summary line ("9 issues found in 120 rows"), and a download of the flagged CSV.

### Demo 2 — Lithology helper
- Upload a core photo or pick one of 3–4 **public-domain / openly licensed** sample images (record the source and licence in `CREDITS.md`).
- Claude returns the likely lithology, the visual features it relied on (colour, grain size, texture, veining) and a confidence level, as structured JSON rendered as a card.
- Fixed disclaimer: "An assistant, not a geologist. Always verified by a qualified person."

---

## 8. CV PDF

- Generate a **one-page PDF** from the same content source (single source of truth), at `/cv.pdf`.
- Sections: summary (2 lines), AI in the field (3 bullets with numbers), experience, ventures, education, skills/tools (plain text), languages.
- Clean typography, ATS-friendly text (no text inside images).

---

## 9. Tech stack

- **Astro** + TypeScript (content in Markdown/MDX or a single `content.ts`, so the site and the PDF share one source)
- **Tailwind CSS**
- **Three.js** for the core (lazy-loaded, behind an IntersectionObserver), SVG fallback
- **Vercel** for hosting + serverless functions (`/api/validate`, `/api/lithology`)
- `@anthropic-ai/sdk` on the server only
- SheetJS (or Papaparse) to parse CSV/XLSX
- Plausible (or Vercel Analytics), with no cookies
- PDF: generated at build time (e.g. Playwright printing a `/cv` route)

**Suggested repo structure**
```
/src
  /content      → content.ts (all facts + copy, with TODOs)
  /components   → Core3D, CoreRail, IntervalHeader, CaseCard, VentureCard, Timeline, DemoValidator, DemoLithology
  /pages        → index.astro, cv.astro, how-i-built-this.astro
/api            → validate.ts, lithology.ts
/public         → sample-drill-log.csv, sample images, cv.pdf
CLAUDE.md  TODO.md  BUILD_LOG.md  CREDITS.md
```

**Env vars:** `ANTHROPIC_API_KEY`, `CLAUDE_MODEL`, `RATE_LIMIT_PER_HOUR`

---

## 10. Quality bar (done when)

- Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO, on both mobile and desktop
- Works without JavaScript (except the demos) and with reduced motion
- Both demos work end to end with the sample data and handle bad input gracefully
- No `[TODO]` is hidden: every one appears both on the site and in `TODO.md`
- No real company data anywhere in the repo (grep for anything that looks like a real hole ID or site name before deploy)
- Open Graph image (the core graphic) and proper meta title/description

---

## 11. Optional extras (only after everything else works)

- Spanish language toggle (ES/EN)
- A "Core log" view: the whole CV rendered as a technical core-log sheet (a fun printable)
- Short Loom-style video `[TODO: Deo records]` walking through Demo 1 in 60 seconds

---

## 12. Phases

1. **Setup** — Astro + Tailwind + Vercel config, `content.ts` with all facts and TODOs, `TODO.md`, `BUILD_LOG.md`.
2. **Static site** — all sections with real copy and placeholders, mobile-first, no 3D yet.
3. **The Core** — core rail + 3D hero + interval headers + reduced-motion fallback.
4. **Demo 1** — rule engine + synthetic CSV + Claude explanation + rate limit.
5. **Demo 2** — lithology helper with public sample images.
6. **CV PDF + polish** — PDF generation, SEO/OG, Lighthouse pass, privacy check, deploy.
7. **Extras** — Spanish toggle, core-log view, "How I built this" page from the build log.

After each phase: summarise what was done, list the new TODOs and wait for my OK.

---

## 13. Open TODOs for Deo (fill these in to make the site land)

1. Full name, email, LinkedIn
2. **Scale of the drilling validation** (holes per program/week) + one typical error example
3. What exactly the AI checks in the lab dispatch lists
4. Lithology: how you use it, and any results
5. MEPA: one-line mission + number/scale of cleaning contracts won
6. Polar Vector Limited: company number, incorporation date, what it does, clients/status
7. PolarVector platform status
8. Degree: official institution name + year; Balenciaga role + dates
9. Dates for Goliat, *Outer Limit* and *Tribu*
10. English level + other languages
11. 4–6 design portfolio images
12. Photo of your hardware setup + the local models you run
13. Your "Currently learning" list
