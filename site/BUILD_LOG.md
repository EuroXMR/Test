# Build log

Short entries: date · decision · what went wrong · fix. This file becomes the "How I built this" page (Interval 07).

## 2026-11-27 · Phase 1 — Setup

- **Decision:** the site lives in `site/` inside this repo, not at the root. The repo already holds unrelated documents; a subfolder keeps them separate. On Vercel, set *Root Directory* to `site`.
- **Decision:** Astro 7 + Tailwind 4 (via the Vite plugin) + `@astrojs/vercel`. Output is static; only the demo endpoints will opt out of prerendering and run as serverless functions. That keeps the site fast, lets it work without JavaScript, and keeps the Claude API key on the server.
- **Decision:** demo endpoints will live at `src/pages/api/validate.ts` and `src/pages/api/lithology.ts` (served at `/api/validate`, `/api/lithology`) instead of a root `/api` folder. Same URLs as the brief; Astro's adapter deploys them as Vercel functions.
- **Decision:** one `src/content/content.ts` holds every fact and line of copy. The site and the CV PDF will both read from it.
- **Decision:** unknown facts are written as literal TODO markers in square brackets. `npm run todos` scans the source and regenerates `TODO.md`, and runs before every build, so a TODO can't exist on the site without also being on the list.
- **Went wrong:** the TODO scanner picked up the example marker in a code comment and listed "..." as a TODO. **Fix:** reworded the comments so only real markers match.
- **Went wrong:** `astro check` failed on the scanner script (no Node type definitions). **Fix:** added `@types/node`.
- **Decision:** removed two things that weren't in the fact sheet: a problem statement for the AR concept and a status badge for MEPA. Both are TODOs now rather than guesses.

## 2026-11-27 · Phase 2 — Static site

- **Decision:** every section is built from `content.ts` through a small `T` component that turns each TODO marker into a visible highlighted `<mark>`. No component prints raw content strings, so nothing unknown can slip through looking like a fact.
- **Decision:** Santiago supplied a full CV. Facts that filled gaps (languages, M/Y Tribu dates, recent mining roles, tickets) went in. Facts that *contradicted* the brief (current role, degree, Cert IV status) were not resolved by guessing: both versions are shown in a "confirm" TODO until he decides.
- **Decision:** mine site names from the CV are left out (brief rule: no site names). Employers are named; the AI case studies don't say which employer they happened at.
- **Decision:** phone number, street postcode and the references list on the CV never enter the repo, and the CV file itself isn't committed.
- **Decision:** a government tender was described as "under negotiation", but it's an open Request for Tender. That label would overstate it, so it's a TODO until the honest status is confirmed.
- **Decision:** light (off-white) palette for now; accent colours have darker "-ink" variants so text meets WCAG AA. Fonts are self-hosted (no Google Fonts request, no cookies).
- **Went wrong:** interval colour chips were missing, because Tailwind can't see class names built from data. **Fix:** generated them explicitly with `@source inline(...)`.
- **Checked:** axe-core (WCAG 2 A/AA + best practice) reports no violations; no horizontal scroll at 390 px.

## 2026-11-27 · Phase 3 — The Core

- **Facts updated** from Santiago's answers: Lead Geology Technician at Lynas (current), Visual Design degree in Madrid with a year at Sogang, Cert IV WHS held, City of Fremantle, MEPA is the entity bidding on the government tender, Saint & Saint Studio project site added.
- **Decision:** the AI case study is labelled **In trial**. Santiago can't disclose details while it runs, so the site says so instead of padding it.
- **Decision:** depths are a design device, not facts. The hole is 72.0 m: each interval owns a fixed depth range stored in `content.ts`, and the headers, rail, 3D core and footer all read from it.
- **Decision:** the rail maps scroll position to depth *within* each section, so the depth readout always agrees with the interval header you're reading.
- **Decision:** the hero shows a static SVG core first. Three.js (about 530 KB) is only fetched once the hero is on screen, motion is allowed and WebGL works. Rendering pauses when the core is off-screen or the tab is hidden.
- **Decision:** the stone texture is generated in the browser, not downloaded: grain, plus contacts and veins drawn as sine waves, because a flat plane cutting a cylinder unrolls to a sine. A fixed seed makes it look the same every visit.
- **Decision:** reduced motion shows the complete static core (no rotation, no scroll-driven fill), and switches over live if the setting changes mid-visit.
- **Went wrong:** the first 3D core ran backwards (0 m on the right) because of how the cylinder's texture coordinates run. **Fix:** remapped them so depth increases left to right, matching the rail.
- **Went wrong:** the footer failed contrast in the dark variant because it used theme colours that flip. **Fix:** the footer uses fixed colours.
- **Designed both themes** (brief §5). The dark one is a `data-theme="dark"` token set; light is the default.

- **Decision:** final domain is **sk1.au** (Santiago's personal brand). Registration stays at Squarespace; only the nameservers move to Cloudflare. No registrar transfer needed.

## 2026-11-27 · Between phases — real sources for the ventures

- **Decision:** the site has one audience: Anthropic's hiring team. Everything gets judged on whether it helps them assess Santiago.
- **Decision:** MEPA and PolarVector copy now comes from their own websites (mepa.ngo, polarvector.uk) and Companies House, not from memory. Status labels follow what those sites say: MEPA's Cyprus radar pilot is "under way", the rest is "in progress", and MEPA's own funders page says its example vessel dossiers are illustrations. The CV site uses the most conservative wording.
- **Decision:** no LinkedIn link (old, not used). Contact is a forwarding address on the personal domain.
- **Found:** three versions of the degree in public: Madrid + a Sogang year (Santiago), Sogang "Technology Degree" (CV), and Sogang "Industrial Engineering and Visual Design" (MEPA profile). Flagged for him to align, because a recruiter will cross-check.

## 2026-11-27 · Phase 4 — Demo 1: drill log validator

- **Correction:** his name is **Santiago**, not "Deo" (the original brief was wrong). Changed everywhere; contact is santiago@sk1.au.
- **Decision:** hosting moved from Vercel to **Cloudflare Workers** (Santiago's choice). One account for the domain, DNS, email forwarding, hosting and the demo API. The page stays static; only `/api/validate` runs in the Worker.
- **Decision:** the rule engine is one TypeScript file used in both places. The browser runs it for an instant result that needs no network; the server runs it again on the same rows and never trusts the browser's findings. Claude only sees the sheet *after* the rules have run, and is asked to explain them and look for what rules can't express. That's the "rules where rules work, AI where judgment helps" split.
- **Decision:** Claude returns structured JSON (summary, an explanation per finding, extra observations with a confidence level), so the page can attach each explanation to the right table row. Model comes from `CLAUDE_MODEL` (default `claude-sonnet-5-5`), with the API's server-side refusal fallback switched on.
- **Decision:** the sample file is generated by a script with a fixed seed: 3 fake holes, 119 rows, exactly one planted error of each of the nine kinds. `npm test` fails if the validator finds anything other than those nine.
- **Decision:** added an optional `eoh_m` column. The brief's column list had no end-of-hole depth, but the "deeper than end of hole" check needs one.
- **Decision:** "sample IDs out of sequence" means a ticket number *going backwards* (swapped tickets), not gaps. Gaps are normal: voided tickets, pre-printed books.
- **Decision:** QA/QC rule is "a STANDARD at least every 20 samples", labelled in the UI as an example rule, adjustable, not a real program's plan.
- **Privacy:** nothing is stored. The only thing written anywhere is an hourly per-IP counter (KV) for the 10-per-hour limit. Body capped at 2 MB, rows at 5,000, and the AI sees at most 600 rows.
- **Went wrong:** the Workers runtime types redefine browser globals (`Element.append`), which broke the browser script's types. **Fix:** generate binding-only types and declare the few runtime types used by hand.
- **Went wrong:** a slow AI reply for an earlier file could overwrite the results of a newer one. **Fix:** each run gets an id and stale replies are ignored.
- **Went wrong:** the Cloudflare key saved in the build environment had expired, and the environment's proxy overrides any token sent by hand. Deploy is blocked until it's replaced.
- **Checked:** error paths return 400/405/413/422/503 with readable messages; the limiter blocks the 11th request in an hour; CSV and XLSX give the same result; axe-core clean; no horizontal scroll at 390 px.

## 2026-11-27 · Phase 5 — Demo 2: lithology helper

- **Decision:** four openly licensed core photos from Wikimedia Commons: komatiite with spinifex texture (Widgiemooltha, WA), polymict conglomerate, listwanite (Oman) and dolostone (Ohio). Three are public domain or CC0; the dolostone is CC BY-SA 4.0, so every photo is credited on the page itself, and `CREDITS.md` is generated from the same list.
- **Decision:** after Claude answers, the page shows what the photo's *source* says the rock is. Visitors can judge the answer themselves instead of taking it on trust.
- **Decision:** Claude returns structured JSON: likely lithology, the features it relied on (colour, grain size, texture, veining, other), a confidence with the reason for it, up to three alternatives and why they rank lower, and quick physical checks (acid, scratch, hand lens) that would settle it. A photo that isn't rock is flagged, not forced into a rock name. The disclaimer "An assistant, not a geologist" is always visible.
- **Privacy:** photos are redrawn on a canvas in the browser before upload. That resizes them to 1568 px on the long edge (enough for texture, fewer image tokens) and drops EXIF metadata, including any GPS location a phone adds. Tested: a 4000×3000 photo is sent at 1568×1176 with no EXIF block.
- **Decision:** the 2 MB limit applies to what reaches the server. Originals up to 20 MB are accepted in the browser because they're shrunk before upload, never sent as-is.
- **Decision:** the server checks the image's first bytes, not just its declared type, so a text file renamed `.jpg` is refused with a clear message.
- **Went wrong:** Wikimedia Commons rate-limited this build machine's shared IP (HTTP 429), and only served thumbnails at its standard sizes. **Fix:** used the standard 960 px and 1280 px thumbnails and spaced out requests. The granite photo never got through, so it was dropped rather than replaced with an unverified image.
- **Went wrong:** alt text written before seeing two of the photos was inaccurate ("dark green" core was grey-green). **Fix:** every image was checked by eye and its alt text rewritten from what's actually in it.
- **Not yet tested against Claude:** no API key in the build environment. The result card was checked with a hand-written stub reply (layout only, clearly marked in the test).
