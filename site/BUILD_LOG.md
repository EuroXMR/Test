# Build log

Short entries: date · decision · what went wrong · fix. This file becomes the "How I built this" page (Interval 07).

## 2026-11-27 · Phase 1 — Setup

- **Decision:** the site lives in `site/` inside this repo, not at the root. The repo already holds unrelated documents; a subfolder keeps them separate. On Vercel, set *Root Directory* to `site`.
- **Decision:** Astro 7 + Tailwind 4 (via the Vite plugin) + `@astrojs/vercel`. Output is static; only the demo endpoints will opt out of prerendering and run as serverless functions. That keeps the site fast, lets it work without JavaScript, and keeps the Claude API key on the server.
- **Decision:** demo endpoints will live at `src/pages/api/validate.ts` and `src/pages/api/lithology.ts` (served at `/api/validate`, `/api/lithology`) instead of a root `/api` folder. Same URLs as the brief; Astro's adapter deploys them as Vercel functions.
- **Decision:** one `src/content/content.ts` holds every fact and line of copy. The site and the CV PDF will both read from it.
- **Decision:** unknown facts are written as literal `[TODO: …]` text. `npm run todos` scans the source and regenerates `TODO.md`, and runs before every build, so a TODO can't exist on the site without also being on the list.
- **Went wrong:** the TODO scanner picked up the example marker in a code comment and listed "..." as a TODO. **Fix:** reworded the comments so only real markers match.
- **Went wrong:** `astro check` failed on the scanner script (no Node type definitions). **Fix:** added `@types/node`.
- **Decision:** removed two things that weren't in the fact sheet: a problem statement for the AR concept and a status badge for MEPA. Both are TODOs now rather than guesses.
