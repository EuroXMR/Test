// Generates public/sample-drill-log.csv: fully synthetic, 3 fake holes, with
// exactly one planted error of each kind the validator checks (brief §7).
// Deterministic, so the demo always shows the same 9 issues.
import { writeFileSync } from "node:fs";

let seed = 42;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const rec = () => (92 + rand() * 8).toFixed(0);

type R = { hole: string; from: string; to: string; interval: string; id: string; type: string; rec: string; eoh: string };
const rows: R[] = [];
let ticket = 10001;
const f = (n: number) => n.toFixed(1);

function hole(name: string, primaries: number, opts: { standardsAt: number[]; dupAfter: number; blankAt: number; tweak?: (i: number, from: number) => { from: number; len: number } }) {
  const start = rows.length;
  let depth = 0;
  let nonStd = 0;
  for (let i = 0; i < primaries; i++) {
    const t = opts.tweak?.(i, depth) ?? { from: depth, len: 1 };
    const from = t.from, to = from + t.len;
    rows.push({ hole: name, from: f(from), to: f(to), interval: f(t.len), id: `SMP-${ticket++}`, type: "PRIMARY", rec: rec(), eoh: "" });
    nonStd++;
    if (i === opts.dupAfter) { rows.push({ hole: name, from: f(from), to: f(to), interval: f(t.len), id: `SMP-${ticket++}`, type: "DUPLICATE", rec: rec(), eoh: "" }); nonStd++; }
    if (i === opts.blankAt) { rows.push({ hole: name, from: "", to: "", interval: "", id: `SMP-${ticket++}`, type: "BLANK", rec: "", eoh: "" }); nonStd++; }
    if (opts.standardsAt.includes(i)) { rows.push({ hole: name, from: "", to: "", interval: "", id: `SMP-${ticket++}`, type: "STANDARD", rec: "", eoh: "" }); nonStd = 0; }
    depth = to;
  }
  for (const r of rows.slice(start)) r.eoh = f(depth);
  return { start, end: rows.length };
}

// Standards placed so no run exceeds 20 samples, except where planted.
const h1 = hole("DEMO-001", 36, { standardsAt: [15, 30], dupAfter: 8, blankAt: 22 });
const h2 = hole("DEMO-002", 36, {
  standardsAt: [15, 30], dupAfter: 10, blankAt: 24,
  tweak: (i, from) => i === 12 ? { from: from + 1, len: 1 }      // (3) gap of 1 m
                    : i === 25 ? { from: from - 0.5, len: 1.5 }   // (4) 0.5 m overlap
                    : { from, len: 1 },
});
const h3 = hole("DEMO-003", 36, { standardsAt: [12], dupAfter: 20, blankAt: 30 }); // (9) only one standard

const at = (h: { start: number }, hole: string, n: number) =>
  rows.filter((r, i) => i >= h.start && r.hole === hole && r.type === "PRIMARY")[n];

// (1) to < from: depths typed in the wrong columns.
{ const r = at(h1, "DEMO-001", 4); [r.from, r.to] = [r.to, r.from]; }
// (2) interval_m doesn't match.
at(h1, "DEMO-001", 19).interval = "1.6";
// (7) recovery over 100 %.
at(h1, "DEMO-001", 27).rec = "112";
// (5) duplicate sample ID: a DEMO-002 bag reuses a DEMO-001 ticket.
at(h2, "DEMO-002", 5).id = at(h1, "DEMO-001", 10).id;
// (6) two adjacent tickets swapped in DEMO-003.
{ const a = at(h3, "DEMO-003", 6), b = at(h3, "DEMO-003", 7); [a.id, b.id] = [b.id, a.id]; }
// (8) stated EOH shallower than the last sample.
for (const r of rows) if (r.hole === "DEMO-003") r.eoh = "34.0";

const header = "hole_id,from_m,to_m,interval_m,sample_id,sample_type,recovery_pct,eoh_m";
const csv = [header, ...rows.map((r) => [r.hole, r.from, r.to, r.interval, r.id, r.type, r.rec, r.eoh].join(","))].join("\n") + "\n";
writeFileSync(new URL("../public/sample-drill-log.csv", import.meta.url), csv);
console.log(`sample-drill-log.csv: ${rows.length} rows`);
