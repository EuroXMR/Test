/**
 * Single source of truth for every fact and every line of copy on the site
 * and in the CV PDF. Rules (see CLAUDE.md §3–4):
 *  - Only facts from the brief's fact sheet. Nothing invented.
 *  - Anything unknown is a literal TODO-marker string (square brackets, "TODO:", text). Components render it
 *    visibly, and `npm run todos` collects every one into TODO.md.
 *  - No employer/client data, no addresses, phone or document numbers.
 */

export type Status = "Active" | "Pilot under way" | "In trial" | "In development" | "Concept" | "Under negotiation" | "Tender in progress" | "[TODO: status]";

export interface CaseCard {
  id: string;
  title: string;
  badge?: Status;
  stat?: string;
  problem: string;
  whatIDid: string;
  result?: string;
  note?: string;
  cta?: { label: string; href: string };
}

export interface Venture {
  name: string;
  whatItIs: string;
  role: string;
  status: Status;
  proof: string;
  link?: { label: string; href: string };
}

export interface Role {
  title: string;
  org: string;
  place: string;
  dates: string;
  notes?: string[];
}

export interface Interval {
  n: string; // "01"
  slug: string;
  label: string;
  accent: "iron" | "basalt" | "quartz" | "ochre" | "slate";
  from: number; // depth in metres, used for the core log + rail
  to: number;
}

// ---------------------------------------------------------------- identity
export const identity = {
  // Confirmed 2026-11-27: his name is Santiago. ("Deo" in the original brief was wrong.)
  shortName: "Santiago",
  displayName: "Santiago Puig",
  fullName: "Santiago Puig",
  location: "Perth, Western Australia",
  locationShort: "Perth, WA",
  workRights: "EU work rights · Open to relocation",
  // Forwarding address on sk1.au → Gmail (Cloudflare Email Routing). No LinkedIn: not used.
  email: "santiago@sk1.au",
  emailNote: "[TODO: activate santiago@sk1.au forwarding in Cloudflare before launch]",
  languages: [
    "Spanish (native)",
    "English (fluent)",
    "Italian (A2)",
  ],
  countries: ["Spain", "Australia", "Norway", "South Korea", "Italy", "Malta", "Cyprus"],
};

// ---------------------------------------------------------------- hero
export const hero = {
  headline: "I bring AI into places nobody else is using it — and get people to adopt it.",
  subheadline:
    "Field operator, designer and founder. From diamond drilling rigs in Western Australia to offshore platforms in Norway and luxury design in Madrid.",
  currently: "Now: Lead Geology Technician, Western Australia · Founder, MEPA and PolarVector · Director, Saint & Saint Studio · Building with Claude",
  ctas: [
    { label: "Try the demos", href: "#demos" },
    { label: "Case studies", href: "#field" },
    { label: "Download CV (PDF)", href: "/cv.pdf" },
  ],
};

// ---------------------------------------------------------------- intervals
// Depth ranges are a design device (the site is a drill hole), not facts.
export const intervals: Interval[] = [
  { n: "01", slug: "field", label: "AI in the field", accent: "iron", from: 0, to: 12.4 },
  { n: "02", slug: "demos", label: "Live demos", accent: "slate", from: 12.4, to: 21.8 },
  { n: "03", slug: "ventures", label: "Ventures", accent: "ochre", from: 21.8, to: 33.0 },
  { n: "04", slug: "operations", label: "Field operations", accent: "basalt", from: 33.0, to: 47.6 },
  { n: "05", slug: "design", label: "Design", accent: "quartz", from: 47.6, to: 55.2 },
  { n: "06", slug: "lab", label: "Local AI lab", accent: "slate", from: 55.2, to: 60.9 },
  { n: "07", slug: "built", label: "How I built this site", accent: "basalt", from: 60.9, to: 68.3 },
  { n: "08", slug: "learning", label: "Currently learning", accent: "ochre", from: 68.3, to: 72.0 },
];

// ---------------------------------------------------------------- 01 AI in the field
export const field = {
  intro:
    "Mining runs on spreadsheets typed by hand at the end of long shifts. I started using AI to check our own data, and it now catches errors that used to slip through.",
  cases: [
    {
      id: "validation",
      title: "Drilling data validation",
      badge: "In trial",
      stat: "~1 error every 30 m",
      problem: "Manual data entry of metres and depths in a grade control program.",
      whatIDid:
        "Strip private data → AI checks for discrepancies and impossible values → errors are fixed before they reach the geologists.",
      result:
        "1–2 errors per hole caught. More detail once the trial allows it.",
      note: "Private data is removed before anything reaches an AI model: it only sees numbers and standard sample codes.",
      cta: { label: "Try a version of this →", href: "#demo-validator" },
    },
    {
      id: "dispatch",
      title: "Lab dispatch lists",
      problem: "Dispatch lists to the lab are built by hand, with the same error risk.",
      whatIDid:
        "[TODO: confirm the check, e.g. cross-checking sample codes against the drilling log before dispatch]",
    },
    {
      id: "lithology",
      title: "Lithology identification",
      problem: "Identifying lithology from core.",
      whatIDid:
        "AI vision as a second pair of eyes on core. [TODO: how it's used alongside the geologist; any accuracy observations]",
      cta: { label: "Try it →", href: "#demo-lithology" },
    },
    {
      id: "ar",
      title: "AR core logging",
      badge: "Concept",
      problem: "[TODO: one-line problem statement for the AR concept]",
      whatIDid:
        "Hands-free logging through smart glasses, with an assistant that knows the project's procedures and documents.",
      note: "[TODO: 3-frame storyboard / mock-up designed by Santiago]",
    },
  ] satisfies CaseCard[],
};

// ---------------------------------------------------------------- 02 demos
export const demos = {
  banner: "Demo with synthetic data. Don't upload confidential company data.",
  validator: {
    title: "Drill log validator",
    blurb:
      "Rules where rules work, AI where judgment helps: deterministic checks run in code first, then Claude explains the findings in plain language and flags anything unusual the rules missed.",
  },
  lithology: {
    title: "Lithology helper",
    blurb:
      "Upload a core photo or pick a public sample image. Claude returns the likely lithology, the visual features it relied on and a confidence level.",
    disclaimer: "An assistant, not a geologist. Always verified by a qualified person.",
  },
};

// ---------------------------------------------------------------- 03 ventures
export const ventures = {
  intro: "I start things and get people to sign. Some of what I've built:",
  items: [
    {
      // Source: mepa.ngo (about, funders, projects, team pages), read 2026-11-27.
      name: "MEPA",
      whatItIs:
        "Mediterranean Environmental Protection Agency: an independent not-for-profit in Perth (incorporated association, WA). It's building a system that uses satellite radar, ship tracking and AI-assisted screening to find marine pollution and illegal fishing, then hands verified evidence to the authorities who can act.",
      role: "Founder · Director and Principal Investigator",
      status: "Pilot under way",
      proof:
        "Radar screening of the shipping lanes south of Cyprus, with an analyst reviewing every strong detection, under way since October 2026. Bidding on an Australian Government tender for technology to monitor compliance in marine parks [TODO: confirm tender status: in preparation or submitted]. [TODO: brief said MEPA 'has won cleaning contracts' — confirm number/scale, or drop]",
      link: { label: "mepa.ngo", href: "https://www.mepa.ngo" },
    },
    {
      // Source: polarvector.uk/company + Companies House, read 2026-11-27.
      name: "PolarVector (UK)",
      whatItIs:
        "Investigative intelligence for companies, people, vessels and events: connecting maritime, corporate, sanctions and open-source data into one entity graph, with on-the-ground verification when the record isn't enough. Also does security testing.",
      role: "Founder and director",
      status: "Active",
      proof:
        "PolarVector Limited, registered in England and Wales on 2 April 2024 (company no. 15608431). Investigations partner to MEPA for vessel, ownership and sanctions research. [TODO: clients or engagements you can mention]",
      link: { label: "polarvector.uk", href: "https://polarvector.uk" },
    },
    {
      name: "Saint & Saint Studio (Cyprus)",
      whatItIs: "Real-estate project in Cyprus.",
      role: "Director",
      status: "Active",
      proof: "[TODO: one proof point, e.g. units, stage or sales]",
      link: { label: "Project site: hermesvillas.com", href: "https://hermesvillas.com" },
    },
    {
      name: "Perth web studio",
      whatItIs:
        "Websites for local businesses: I find them, build their sites with Claude Code and sell them in person.",
      role: "Sole trader",
      status: "Active",
      proof: "[TODO: number of sites sold / one example]",
    },
  ] satisfies Venture[],
};

// ---------------------------------------------------------------- 04 field operations
export const operations = {
  callout:
    "Safety-critical environments: offshore oil & gas, supply vessels, diamond drilling. Certificate IV in Work Health and Safety.",
  themes: [
    "Safety-critical operations",
    "Strict procedures",
    "Heavy equipment",
    "Multidisciplinary crews",
    "Remote and harsh conditions",
  ],
  // Most recent first. Source: Santiago's CV (2026-11-27) + brief §4.
  // Mine site names are left out on purpose (brief §3.2: no site names).
  roles: [
    {
      title: "Lead Geology Technician",
      org: "Lynas Rare Earths (via Mining International People)",
      place: "Western Australia · FIFO 8/6",
      dates: "06/2026 – present",
      notes: [
        "Ran the RC grade control program on my own, without a Senior Geology Technician, coordinating daily with the geology team.",
        "Managed the full sample chain of custody: pad preparation, sampling, registration, data entry, lab dispatch and follow-up.",
        "Wrote practical procedures to reduce sampling errors.",
      ],
    },
    {
      title: "Geology Technician",
      org: "Gold Fields (via Mining International People)",
      place: "Western Australia · FIFO 8/6",
      dates: "11/2025 – 06/2026",
      notes: ["Core logging (marking, measuring, orienting, cutting, photographing), RC and DD sampling, lab dispatch in acQuire, pit operations."],
    },
    {
      title: "Geology Technician, Exploration",
      org: "Northern Star Resources (via Silverstone)",
      place: "Northern Territory · FIFO 15/12",
      dates: "06/2025 – 10/2025",
      notes: ["RC and DD sample handling and dispatch, RQD and core tray preparation for geologist review."],
    },
    {
      title: "Exploration Driller Offsider (diamond core)",
      org: "West Core Drilling",
      place: "Western Australia · FIFO 2/1",
      dates: "04/2025 – 06/2025",
    },
    {
      title: "Recycling Auditor",
      org: "City of Fremantle",
      place: "Perth, WA",
      dates: "01/2025 – 04/2025",
    },
    {
      title: "Drillers Offsider",
      org: "Dart Mining (MSP contract)",
      place: "Victoria · FIFO 2/1",
      dates: "07/2024 – 01/2025",
    },
    {
      title: "Industrial Inspector / QA Auditor",
      org: "Verify Cargo",
      place: "Remote, multinational · on call",
      dates: "09/2022 – 12/2024",
      notes: ["Cargo and container compliance audits; reports to stakeholders."],
    },
    {
      title: "Offshore Deckhand & Junior Officer",
      org: "M/Y Younan (33 m superyacht)",
      place: "Savona, Italy",
      dates: "01/2024 – 03/2024",
    },
    {
      title: "Offshore Deckhand & Engineering Assistant",
      org: "M/Y Tribu (55 m exploration yacht)",
      place: "Savona, Italy · Europe",
      dates: "08/2023 – 01/2024",
      notes: ["Assisted the Chief Engineer with maintenance, troubleshooting and refits; rigging; bridge watch on international voyages."],
    },
    {
      title: "Junior Roughneck / Roustabout",
      org: "Goliat oil platform · [TODO: employer]",
      place: "Norway",
      dates: "[TODO: dates]",
    },
    {
      title: "Deckhand",
      org: "Offshore supply vessel Outer Limit",
      place: "Australia",
      dates: "[TODO: dates]",
    },
  ] satisfies Role[],
  certifications: [
    "OPITO BOSIET (+ advanced firefighting)",
    "STCW 95 (2010) safety training · STCW cyber security risk",
    "National High Risk Work Licence — forklift (TLILIC0003)",
    "White Card (CPCCWHS2001)",
    "Confined spaces (RIIWHS202E) · Work safely at heights (RIIWHS204E)",
    "Remove non-friable asbestos (CPCCDE3014) · Demolition (CPCCCM2009)",
    "First Aid + CPR · Oil & gas medical",
    "RYA Powerboat Level 2 (2024)",
    "WA driver licence + Heavy Rigid (L-plate)",
  ],
  software: "acQuire, Arena, Imago, MS Office",
  study: "Certificate IV in Work Health and Safety (BSB41419)",
};

// ---------------------------------------------------------------- 05 design
export const design = {
  line: "Design is how I explain things: I make complex ideas visible.",
  degree: "Degree in Visual Design, Madrid · [TODO: official institution name + year]",
  exchange: "One year at Sogang University, Seoul, South Korea",
  balenciaga: "Design work with Balenciaga Madrid · [TODO: exact role, dates]",
  practice: "Art direction, photography, branding.",
  tools: ["Unreal Engine", "Twinmotion", "SketchUp", "3ds Max", "Adobe Dimension", "Autodesk Alias", "AutoCAD"],
  gallery: [] as { src: string; alt: string; caption: string }[],
  galleryTodo: "[TODO: 4–6 portfolio images + captions]",
};

// ---------------------------------------------------------------- 06 local AI lab
export const lab = {
  intro: "I run local LLMs on my own hardware.",
  models: "Qwen and DeepSeek models [TODO: confirm models and setup]",
  hardware: "Several GPUs, including an AMD RX 9070 build, NVIDIA Quadro and GTX 970 [TODO: confirm exact list]",
  photo: "[TODO: photo of the hardware setup]",
  skills: "Self-taught: Python scripting, APIs, automation, AI-assisted development with Claude Code.",
  // Security investigation (smart projector) is deliberately NOT shown until written up (brief §4).
};

// ---------------------------------------------------------------- 07 how I built this
export const built = {
  intro:
    "I directed Claude Code to build this site from a written brief. The build log below records the key decisions, what broke and how it was fixed, and why the demos are privacy-first.",
};

// ---------------------------------------------------------------- 08 learning
export const learning = {
  items: [
    "Geology BSc (Hons), enrolled [TODO: institution]",
    "[TODO: confirm the rest of your 'Currently learning' list, e.g. Python fundamentals, the Claude API, data-centre / critical-facilities fundamentals]"],
};

// ---------------------------------------------------------------- EOH
export const contact = {
  footer: "END OF HOLE (EOH) · total depth 72.0 m",
};

// ---------------------------------------------------------------- CV PDF (same source)
export const cv = {
  summary:
    "Field operator, designer and founder who brings AI into places nobody else is using it — and gets people to adopt it. [TODO: confirm 2-line CV summary]",
  aiBullets: [
    "Use AI to validate hand-entered drilling data in a grade control program; catches 1–2 errors per hole, roughly 1 every 30 m drilled.",
    "Remove all private information before data reaches an AI model; it sees only numbers and standard sample codes.",
    "Use AI vision as a second opinion on lithology from core. [TODO: details]",
  ],
  education: [design.degree, design.exchange, operations.study, learning.items[0]],
};
