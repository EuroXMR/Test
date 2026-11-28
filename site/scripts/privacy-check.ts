// Fails the build if anything personal or employer-identifying slips into the
// site (brief §3.2, §3.8, §10). Scans the site's own source and public files.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const scan = ["src", "public", "scripts", "CREDITS.md", "BUILD_LOG.md", "TODO.md", "README.md", "wrangler.jsonc", "astro.config.mjs"];
const textExt = /\.(ts|mjs|astro|md|csv|txt|svg|xml|json|jsonc|css|py)$/;
const self = "scripts/privacy-check.ts";

const ALLOWED_EMAILS = new Set(["santiago@sk1.au"]);
// Certification and unit codes look like IDs but are public course codes.
const CODE_PREFIXES = /^(BSB|CPCC|RII|TLILIC|STCW|SMP|DEMO)/;

const rules: [string, RegExp][] = [
  ["phone number", /(\+61|\+\d{2})[\s\d]{8,}|\b04\d{2}[\s-]?\d{3}[\s-]?\d{3}\b/g],
  ["street address", /\b\d{1,4}\s+[A-Z][a-z]+\s+(Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Terrace|Tce)\b/g],
  ["home postcode", /\b(6158|6003)\b/g],
  ["mine site name", /\b(Mt\.? Weld|Mount Weld|Gruyere|Tanami)\b/gi],
  ["personal email", /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g],
  ["possible hole ID", /\b[A-Z]{2,6}\d{3,5}\b/g],
];

function walk(p: string): string[] {
  const st = statSync(p, { throwIfNoEntry: false });
  if (!st) return [];
  if (st.isDirectory()) return readdirSync(p).flatMap((f) => walk(join(p, f)));
  return textExt.test(p) ? [p] : [];
}

const hits: string[] = [];
for (const file of scan.flatMap((s) => walk(join(root, s)))) {
  const rel = relative(root, file);
  if (rel === self) continue;
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const [what, re] of rules) {
      for (const m of line.matchAll(re)) {
        const v = m[0];
        if (what === "personal email" && (ALLOWED_EMAILS.has(v) || /@(example|anthropic)\.com$/.test(v))) continue;
        if (what === "possible hole ID" && CODE_PREFIXES.test(v)) continue;
        hits.push(`${rel}:${i + 1}  ${what}: "${v}"`);
      }
    }
  });
}
if (hits.length) {
  console.error(`Privacy check failed (${hits.length}):\n` + hits.join("\n"));
  process.exit(1);
}
console.log("Privacy check: clean");
