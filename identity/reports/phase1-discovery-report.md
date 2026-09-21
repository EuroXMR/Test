# Phase 1 — Digital Identity Discovery Report
**Subject:** Santiago Puig Asensio
**Date:** 2026-09-20
**Status:** Discovery only. Nothing published, no access requested, no
accounts created. Awaiting Santiago's review before Phase 2.

---

## 0. Tooling limitations in this session (read first)

This session could run **web search** but its **direct page-fetch tool was
blocked by the network egress policy for every external domain tested**,
including sk1.au, polarvector.uk, mepa.ngo, UK Companies House, Cyprus
Registry, and even en.wikipedia.org (control test). So this report is built
entirely from **search-engine snippets**, not from directly reading page
HTML/source.

Consequences:
- No robots.txt / sitemap / canonical-tag / structured-data / Open Graph /
  broken-link / mobile-usability audit was possible for SK1.au, PolarVector.uk
  or MEPA.ngo (Section 13 of the brief). What's below on those sites is
  inferred from indexed snippets only.
- Companies House and Cyprus Registry entries could not be opened directly,
  so appointment details (company names, dates, role titles) are **not**
  confirmed here — only that matching officer records exist.
- No reliable WHOIS/registrar check was possible for personal-domain
  availability (Section 8) — the search-index result below is a weak signal,
  not a real availability check.
- No image search or authenticated-platform search (LinkedIn behind login,
  Instagram private content, etc.) was available.

**To complete a real Section 13 technical audit and a real domain-availability
check, this needs to run from an environment with broader outbound access, or
Santiago can supply page exports / WHOIS results directly.**

---

## 1. Search-result findings

### 1.1 "Santiago Puig Asensio" (exact name)

- **sk1.au** — appears consistently and prominently across nearly every
  query variant (plain name, "designer", "mining", "SK1", "PolarVector",
  "MEPA"). Search-engine-generated summaries describe the site as a
  portfolio for a creative professional doing photography, videography and
  design, "blending British–Spanish influences with global experience,"
  with emphasis on typography, and international work referencing Spain,
  Switzerland, Chile and the US. A `site:sk1.au` search also surfaced a
  `/skills` page, and one summary stated the person is "currently located in
  Australia with full Australian working rights."
  → **Classification: A (confirmed)** — this is very likely Santiago's own
  site; the biographical texture (Spain, international work, design/
  photography, .au domain) lines up with the brief's known context. Worth
  Santiago double-checking the exact wording of any auto-generated summary
  before treating it as verbatim site copy — only Santiago's own published
  text should be treated as fact.

- **UK Companies House — "Santiago PUIG ASENSIO personal appointments"**
  (find-and-update.company-information.service.gov.uk): an officer record
  exists under this exact name.
  → **Classification: B (official record) for existence only.** Could not
  open the page to confirm which company/companies, role, or appointment
  dates — **needs direct verification** (either re-run with broader egress,
  or Santiago confirms/denies the association). Do not assume this is
  SK1, PolarVector, or MEPA without checking.

- **CyprusRegistry.com — "SANTIAGO PUIG ASENSIO"**: an officials record
  exists under this exact name.
  → **Classification: C (unverified) for role details** — the search
  summary for this one was unreliable (returned a nonsensical "0 roles"
  description). The page itself needs to be opened directly to see what,
  if anything, it actually lists. **Flag: verify before relying on this
  at all**, including confirming it's the same Santiago Puig Asensio and
  not a namesake.

- **LinkedIn**: no LinkedIn profile was found under the exact full name
  "Santiago Puig Asensio." A profile "Santiago Puig — Barcelona, Catalonia,
  Spain" turned up in a related query, plus a generic directory page
  ("80+ 'Santiago Puig' profiles").
  → **Classification: C (unclear)** — cannot confirm the Barcelona profile
  is Santiago without his confirmation; do not link it as his until
  verified. **Gap: no confirmed LinkedIn presence found under the full
  name** — worth deciding whether Santiago has one, wants one, or wants
  the Barcelona profile checked.

### 1.2 Name-variant / platform noise (mostly not Santiago)

Searches for "Santiago Puig" (without "Asensio") and image/photo-platform
searches returned many unrelated people sharing the surname combination:

| Result | Platform | Note | Classification |
|---|---|---|---|
| @santipuigrdz_ | Instagram | Regional Manager, Xcape México, Puebla | **D — different person** |
| @asensiosantiago | Instagram | 1 follower, near-empty | **C — unclear, likely not him** |
| Santi Puig Muns (@santipuig) | Instagram | Unrelated bio signals | **D — different person** |
| Santiago Puig (santiago.puig) | Facebook | No confirming detail found | **C — unclear** |
| Santiago Puig | Saatchi Art | Different creative profile, no link to design/mining/SK1 context | **C — unclear** |
| Santiago Puig (E) | RacingSportsCars.com | Motorsport driver | **D — different person** |
| Santiago Puig (santiago_puig) | Pinterest | No confirming detail | **C — unclear** |
| Genís Asensio Puig | EHF (handball) | Different name order/person | **D — different person** |
| Marco Asensio, Antonio Asensio, Max Puig, etc. (Wikipedia) | Wikipedia | Unrelated notable people who share a surname | **D — different person** |

**Takeaway: there is real name-collision noise.** Anyone searching "Santiago
Puig" without "Asensio" will hit several unrelated people before anything
related to Santiago. This matters for the AI-search-optimization goal in the
brief (Section 22) — consistent use of the full name "Santiago Puig Asensio"
on his own properties, plus site-level disambiguation, will matter more than
usual here.

### 1.3 SK1

- Site exists at **sk1.au**, live, indexed by search engines, has at least a
  homepage and a `/skills` page. Content themes: design, typography,
  photography, videography, international work.
- No independent third-party source (press, directory, other site) was found
  in this session's searches describing SK1 or confirming Santiago's
  relationship to it — **the only source found is the site itself.**
  → Per the brief (Section 3/39), the "founded/created by Santiago" framing
  should stay Source A (Santiago-confirmed) until the site itself states it
  explicitly and/or Santiago confirms the exact legal/founder relationship.

### 1.4 PolarVector

- Site exists at **polarvector.uk**, live, indexed. Tagline found in the
  index: **"Data Insights, Clear Decisions"** — consistent with the brief's
  description of it as a technology / situational-awareness / information
  platform.
- **No search result — direct or `site:` — surfaced Santiago Puig Asensio's
  name anywhere on polarvector.uk.** This doesn't mean he isn't associated
  with it, only that the association is **not currently visible in what's
  indexed**. This is a real gap against the brief's own success condition
  (Section 41: "what PolarVector is" should be understandable alongside who
  runs it).
  → **Action needed, not yet taken:** confirm with Santiago the exact
  public-facing role he wants stated (founder / creator / other), then
  verify whether the live site currently states it at all — this requires
  either direct page access or Santiago pasting the About/Team page content.

### 1.5 MEPA

- Site exists at **mepa.ngo** (and **www.mepa.ngo**), live, indexed. Search
  summaries describe it as an independent NGO doing environmental
  monitoring, investigation and public reporting on pollution/environmental
  violations across the Mediterranean — consistent with "Mediterranean
  Environmental Protection Agency," matching the brief's framing.
- **Important disambiguation risk:** the acronym "MEPA" collides heavily in
  search with the **Malta Environment and Planning Authority** (a Maltese
  government body, Wikipedia-notable) and with an unrelated Massachusetts
  state process also abbreviated MEPA. A `site:mepa.ngo` search surfaced
  those alongside the real result. **This is a real SEO/identity risk**: it
  will take deliberate on-site disambiguation (full name on every page,
  distinct branding, `sameAs`/structured data pointing away from the
  Maltese authority) to keep AI/search systems from conflating the two.
- As with PolarVector, **no search result surfaced Santiago Puig Asensio's
  name on mepa.ngo.** Same gap and same required next step: confirm his
  actual public role (founder/director/other) with Santiago before stating
  anything, and check whether the live site names him at all.

### 1.6 Education / international background

- No search result connected "Santiago Puig" to Sogang University or a
  specific Madrid design school. This section of the brief's "known context"
  remains **unverified (Source D)** from open search — needs Santiago's own
  CV/confirmation before any bio text states it as fact.

### 1.7 Personal domain

- `santiagopuigasensio.com` did not appear in search results at all (no
  indexed content, no parked-page listing, nothing). That's a **weak signal**
  it may be unregistered or simply has no content/links pointing to it — **it
  is not a real availability check.** A real WHOIS/registrar lookup is
  needed before presenting this as an option, and this session couldn't
  perform one (see Section 0).

---

## 2. Identity audit table (partial — search-snippet based)

| URL / Source | Platform | Name shown | Identity match | Confidence | Action |
|---|---|---|---|---|---|
| sk1.au | Own site | (site, not third-party) | A — confirmed (Santiago: his, founder) | High | Treat as canonical design profile; verify exact bio wording directly with Santiago before quoting |
| find-and-update.company-information.service.gov.uk (officer page) | UK Companies House | Santiago PUIG ASENSIO | A — confirmed his record; company list still unverified | Medium | Have Santiago confirm which company(ies) it lists, or open directly once egress allows |
| cyprusregistry.com/officials/SANTIAGO_PUIG_ASENSIO | Cyprus Registry | Santiago Puig Asensio | A — confirmed his (director of a Cyprus company, name TBD) | Medium | Get company name from Santiago; open directly to confirm details once egress allows |
| linkedin.com/in/santiago-puig-bb0282244 (Barcelona) | LinkedIn | Santiago Puig | A — confirmed his (states he works at Lynas Rare Earths) | High | Decide on renaming to full "Santiago Puig Asensio" for consistency |
| polarvector.uk | Own site | (no name found in index) | A — confirmed his, via PolarVector Limited (UK, sole shareholder/director) | High | Site itself still doesn't name him publicly — confirm whether/how to add that |
| x.com/polarvectorUK | X (Twitter) | PolarVector | A — confirmed by Santiago | High | Link from personal hub/PolarVector site once built; verify live content when audit tooling allows |
| mepa.ngo | Own site | (no name found in index) | A — confirmed his; site under maintenance | High | Deprioritized — revisit when site is back up |
| instagram.com/santipuigrdz_ | Instagram | Santiago Puig | D — different person | High confidence it's not him | None |
| instagram.com/santipuig (Santi Puig Muns) | Instagram | Santi Puig Muns | D — different person | High | None |
| racingsportscars.com (Santiago Puig E) | Motorsport site | Santiago Puig | D — different person | High | None |
| eurohandball.com (Genís Asensio Puig) | Sports | Genís Asensio Puig | D — different person | High | None |
| Various Wikipedia "Asensio"/"Puig" pages | Wikipedia | Various | D — different people | High | None |
| saatchiart.com/account/profile/2065995 | Saatchi Art | Santiago Puig | C — unclear | Low | Ask Santiago if this is his |
| facebook.com/santiago.puig | Facebook | Santiago Puig | C — unclear | Low | Ask Santiago if this is his |
| pinterest.com/santiago_puig | Pinterest | Santiago Puig | C — unclear | Low | Ask Santiago if this is his |

**No image audit was possible** (no dedicated image-search tool available in
this session) — flagged as an open item for Phase 1 completion.

---

## 3. Website audit (limited — see Section 0)

| Site | Live? | Indexed? | Technical SEO audit | Santiago named on-site (per index)? |
|---|---|---|---|---|
| sk1.au | Yes | Yes (home + /skills seen) | Not possible this session | Implied (bio content matches him) but not confirmed verbatim |
| polarvector.uk | Yes | Yes (home) | Not possible this session | **No** — not found in index |
| mepa.ngo | Yes | Yes (home) | Not possible this session | **No** — not found in index |

None of `robots.txt`, sitemap presence, canonical tags, HTTPS config, title/
meta description text, structured data (schema.org), Open Graph tags, broken
links, or mobile usability could be checked this session — see Section 0.

---

## 4. Inconsistencies / gaps found

1. **PolarVector and MEPA don't visibly name Santiago anywhere indexed.**
   The brief treats the relationship as "potential" — that caution is
   justified; right now it's not publicly legible at all. This is the
   single biggest gap against the brief's own success condition (Section
   41).
2. **MEPA acronym collision** with the Malta Environment and Planning
   Authority is a real disambiguation risk for search/AI systems.
3. **Name-collision noise** for "Santiago Puig" (many unrelated people)
   means consistent use of the full three-part name matters more than usual.
4. **No confirmed LinkedIn profile** under the full name — worth a decision.
5. **Companies House / Cyprus Registry role details are unconfirmed** —
   don't repeat or publish anything from them until opened directly.
6. **Education/international-background claims (Sogang University, Madrid
   design school) are unverified** by open search — need Santiago's CV.
7. **No real domain-availability or trademark check was possible** for
   `santiagopuigasensio.com` or alternatives.
8. **No image audit was possible.**

---

## 5. Confirmed facts (Source A — Santiago-confirmed, 2026-09-21)

| # | Item | Confirmed |
|---|---|---|
| 1 | SK1.au | Entirely his; he is the founder; it's his design agency. He has direct CMS/host access. |
| 2 | PolarVector.uk | His; operated through **PolarVector Limited**, a UK company where he is **sole shareholder and director**. |
| 3 | PolarVector — X/Twitter | Confirmed: **@polarvectorUK**. |
| 4 | MEPA | His; confirmed the site is **just under maintenance** — not dormant, no other clarification needed. Deprioritized for now per Santiago ("ignore it for now"); revisit when the site is back up. |
| 5 | UK Companies House record | Confirmed his. (Which company/companies it lists — presumably PolarVector Limited at minimum — still not directly verified since this session's fetch tool is blocked; treat as A for identity, unconfirmed for exact company list.) |
| 6 | Cyprus Registry record | Confirmed his; he is director of a Cyprus business. (Name of that business not yet stated — separate from SK1/PolarVector/MEPA unless he says otherwise.) |
| 7 | LinkedIn `linkedin.com/in/santiago-puig-bb0282244` (Barcelona) | Confirmed his ("Santiago Puig," not "Santiago Puig Asensio" — a name-consistency gap worth deciding on). He states it lists him as working at **Lynas Rare Earths**. A follow-up search this session did not surface a Lynas connection on any indexed "Santiago Puig" LinkedIn profile — likely just not indexed/visible to search; not a contradiction, just unverified externally. Lynas Rare Earths is a genuine ASX-listed rare-earths miner with Australian operations, consistent with the brief's "mining" context. |
| 8 | Education (Madrid design study, Sogang University / Korea) | Confirmed correct as described in the brief. |

**Note on item 3:** the handle @polarvectorUK didn't surface in this session's earlier search pass (low-visibility/new account, or just not indexed the way I searched for it) — now recorded directly from Santiago rather than search.

## 6. Open questions (remaining, after 2026-09-21 confirmation round)

Most of Section 6's original questions are now answered — see Section 5.
MEPA and the PolarVector X handle are resolved. What's still open:

1. **Companies House — exact company list** — confirmed the record is his;
   still don't have the actual company name(s)/role/dates it lists (only
   that PolarVector Limited is presumably one of them). Does he want this
   pulled and stated on his own properties, or left as background-only
   (it's already public via Companies House, but repeating it on his own
   site is a separate choice)?
2. **Cyprus company name** — he's confirmed he's a director of a Cyprus
   business; what's it called, and should it be part of the public entity
   map at all, or stays background?
3. **Name consistency** — the confirmed LinkedIn profile is under "Santiago
   Puig," not the full "Santiago Puig Asensio." Keep it as-is, or rename it
   for consistency with the canonical identity?
4. **Technical SEO / WHOIS access** — this session's page-fetch tool is
   still blocked (confirmed again on 2026-09-21, including a retest after
   Santiago enabled a VPN on his own end — that has no effect on this
   session's sandbox, whose network policy is set at the environment level,
   not the client's). Real options: reconfigure this Claude Code
   environment's network egress policy, or Santiago sends page
   exports/CMS access/a WHOIS result directly.

---

## 7. Access that would be needed for Phase 2 (not requested yet)

Per the brief's access-request protocol — listed here for Santiago's review
only, nothing has been requested or used:

| Service | Access needed | Why | Permission level | Reversible? |
|---|---|---|---|---|
| SK1.au CMS/host or repo | Read (for audit), write only after approval | Verify current bio/meta content, later apply approved fixes | Editor, minimum needed | Yes, with backup first |
| PolarVector.uk CMS/repo | Read first | Confirm current About/Team content before any claim is published | Read-only initially | N/A |
| MEPA.ngo CMS/repo | Read first | Same as above | Read-only initially | N/A |
| Domain registrar / WHOIS tool | Read-only lookup | Real availability check for personal domain | Query-only | N/A |
| Google Search Console (each site) | Read | Real indexing/technical-SEO data instead of inferred search snippets | Read-only initially | N/A |

No CMS, DNS, hosting, or registrar credentials should be shared in plain
text; delegated/role-based access is preferred per the brief.

---

## 8. Recommended next step

Section 5's confirmations clear most of the identity ambiguity from Phase 1.
Remaining before Phase 2 (access requests) or Phase 3 (foundation changes):
- resolve the MEPA status question (Section 6.1) before any public MEPA
  content or claim,
- decide on the LinkedIn name-consistency question (Section 6.5),
- decide whether to re-run the technical/WHOIS portions of this audit in a
  session with broader network access, or supply that information directly
  (page exports, screenshots, or CMS access).

No public content, profiles, or claims should be created from this report as-is.
