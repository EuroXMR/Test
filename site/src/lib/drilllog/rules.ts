/**
 * Deterministic drill-log checks. Rules where rules work: everything here is
 * plain arithmetic and bookkeeping, so it runs instantly, in the browser and on
 * the server, without any AI. Claude is only asked to explain the findings and
 * look for anything these rules can't express.
 *
 * Input columns: hole_id, from_m, to_m, interval_m, sample_id, sample_type,
 * recovery_pct, and optionally eoh_m (the stated end-of-hole depth).
 */

export const REQUIRED_COLUMNS = [
  "hole_id", "from_m", "to_m", "interval_m", "sample_id", "sample_type", "recovery_pct",
] as const;
export const OPTIONAL_COLUMNS = ["eoh_m"] as const;
export const SAMPLE_TYPES = ["PRIMARY", "DUPLICATE", "STANDARD", "BLANK"] as const;

/** Example rule for the demo, not a real program's QA/QC plan. */
export const DEFAULT_STANDARD_EVERY = 20;
export const MAX_ROWS = 5000;
const TOL = 0.01; // metres; values are typed to the centimetre

export type Severity = "error" | "warning";
export type IssueCode =
  | "to_before_from" | "interval_mismatch" | "gap" | "overlap" | "duplicate_id"
  | "id_out_of_sequence" | "recovery_out_of_range" | "deeper_than_eoh"
  | "missing_standard" | "bad_value";

export interface Issue {
  /** Line number in the file (header is line 1), so it matches a spreadsheet. */
  line: number;
  hole: string;
  code: IssueCode;
  severity: Severity;
  issue: string;
  explanation: string;
}

export type RawRow = Record<string, string>;

export interface Row {
  line: number;
  hole: string;
  from: number | null;
  to: number | null;
  interval: number | null;
  sampleId: string;
  type: string;
  recovery: number | null;
  eoh: number | null;
}

export interface Result {
  rows: Row[];
  issues: Issue[];
  holes: string[];
  standardEvery: number;
}

export class InputError extends Error {}

const num = (v: string | undefined): number | null => {
  if (v === undefined) return null;
  const t = v.trim();
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
};
const m = (n: number) => `${Number(n.toFixed(2))} m`;

/** Turn parsed CSV/XLSX records into typed rows, or throw a readable InputError. */
export function normalise(records: RawRow[]): Row[] {
  if (!records.length) throw new InputError("The file has no data rows.");
  if (records.length > MAX_ROWS) {
    throw new InputError(`The file has ${records.length} rows; the demo accepts up to ${MAX_ROWS}.`);
  }
  const cols = Object.keys(records[0]).map((c) => c.trim().toLowerCase());
  const missing = REQUIRED_COLUMNS.filter((c) => !cols.includes(c));
  if (missing.length) {
    throw new InputError(
      `Missing column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}. ` +
      `Expected: ${REQUIRED_COLUMNS.join(", ")} (and optionally eoh_m).`,
    );
  }
  return records.map((r, i) => {
    const get = (k: string) => {
      const key = Object.keys(r).find((c) => c.trim().toLowerCase() === k);
      return key === undefined ? undefined : String(r[key] ?? "");
    };
    return {
      line: i + 2,
      hole: (get("hole_id") ?? "").trim(),
      from: num(get("from_m")),
      to: num(get("to_m")),
      interval: num(get("interval_m")),
      sampleId: (get("sample_id") ?? "").trim(),
      type: (get("sample_type") ?? "").trim().toUpperCase(),
      recovery: num(get("recovery_pct")),
      eoh: num(get("eoh_m")),
    };
  });
}

/** Trailing integer of a sample ID ("SMP-10023" → 10023), or null. */
const idNumber = (id: string) => {
  const mm = id.match(/(\d+)\s*$/);
  return mm ? Number(mm[1]) : null;
};

export function validate(rows: Row[], standardEvery = DEFAULT_STANDARD_EVERY): Result {
  const issues: Issue[] = [];
  const add = (r: Row, code: IssueCode, severity: Severity, issue: string, explanation: string) =>
    issues.push({ line: r.line, hole: r.hole, code, severity, issue, explanation });

  // --- per-row value checks -------------------------------------------------
  const badRows = new Set<number>();
  for (const r of rows) {
    const problems: string[] = [];
    if (!r.hole) problems.push("hole_id is empty");
    if (!r.sampleId) problems.push("sample_id is empty");
    if (!(SAMPLE_TYPES as readonly string[]).includes(r.type)) {
      problems.push(`sample_type "${r.type || "(empty)"}" is not one of ${SAMPLE_TYPES.join(", ")}`);
    }
    for (const [k, v] of [["from_m", r.from], ["to_m", r.to], ["interval_m", r.interval], ["recovery_pct", r.recovery], ["eoh_m", r.eoh]] as const) {
      if (Number.isNaN(v)) problems.push(`${k} is not a number`);
    }
    const needsDepth = r.type === "PRIMARY" || r.type === "DUPLICATE";
    if (needsDepth && (r.from === null || r.to === null)) problems.push("from_m/to_m are empty");
    if (problems.length) {
      badRows.add(r.line);
      add(r, "bad_value", "error", "Unreadable row", `Can't check this row: ${problems.join("; ")}.`);
    }
  }
  const ok = (r: Row) => !badRows.has(r.line);

  // --- sample IDs across the whole file -------------------------------------
  const seen = new Map<string, number>();
  const dupLines = new Set<number>();
  for (const r of rows.filter(ok)) {
    const first = seen.get(r.sampleId);
    if (first !== undefined) {
      dupLines.add(r.line);
      add(r, "duplicate_id", "error", "Duplicate sample ID",
        `${r.sampleId} is already used on line ${first}. Two bags with one ID means the lab result can be attached to the wrong interval.`);
    } else seen.set(r.sampleId, r.line);
  }
  // Gaps in numbering are normal (voided tickets, pre-printed books). Going
  // backwards is not: it usually means two tickets were swapped.
  let maxId: number | null = null;
  for (const r of rows.filter(ok)) {
    if (dupLines.has(r.line)) continue;
    const n = idNumber(r.sampleId);
    if (n === null) continue;
    if (maxId !== null && n < maxId) {
      add(r, "id_out_of_sequence", "warning", "Sample ID out of sequence",
        `${r.sampleId} comes after a higher ID. Sample tickets should only go up; a backwards step usually means two tickets were swapped between bags.`);
    }
    maxId = maxId === null ? n : Math.max(maxId, n);
  }

  // --- per-hole checks ------------------------------------------------------
  const holes = [...new Set(rows.filter(ok).map((r) => r.hole))];
  for (const hole of holes) {
    const hr = rows.filter((r) => ok(r) && r.hole === hole);

    for (const r of hr) {
      if (r.recovery !== null && (r.recovery < 0 || r.recovery > 100)) {
        add(r, "recovery_out_of_range", "error", "Recovery outside 0–100 %",
          `Recovery is ${r.recovery} %. You can't recover more core than you drilled, so this is a typing error or the run length is wrong.`);
      }
    }

    // Interval geometry: primaries only. Duplicates repeat their parent's
    // interval; standards and blanks have no depth.
    const prim = hr.filter((r) => r.type === "PRIMARY") as (Row & { from: number; to: number })[];
    let lastTo: number | null = null;
    let lastLine = 0;
    for (const r of prim) {
      let lo = r.from, hi = r.to;
      if (r.to < r.from - TOL) {
        add(r, "to_before_from", "error", "to_m is less than from_m",
          `The interval runs backwards (${m(r.from)} → ${m(r.to)}). Most likely the two depths were typed in the wrong columns.`);
        [lo, hi] = [r.to, r.from]; // keep checking continuity with the likely intended interval
      } else if (r.interval !== null && Math.abs(r.interval - (r.to - r.from)) > TOL) {
        add(r, "interval_mismatch", "error", "interval_m doesn't match to_m − from_m",
          `${m(r.to)} − ${m(r.from)} = ${m(r.to - r.from)}, but interval_m says ${m(r.interval)}. One of the three numbers is wrong.`);
      }
      if (lastTo !== null) {
        if (lo > lastTo + TOL) {
          add(r, "gap", "warning", "Gap between intervals",
            `${m(lo - lastTo)} unsampled between ${m(lastTo)} (line ${lastLine}) and ${m(lo)}. Either a sample is missing from the sheet or the depth was mistyped.`);
        } else if (lo < lastTo - TOL) {
          add(r, "overlap", "error", "Overlapping intervals",
            `Starts at ${m(lo)} but the previous interval (line ${lastLine}) ends at ${m(lastTo)}. The same core would be counted twice.`);
        }
      }
      lastTo = hi;
      lastLine = r.line;
    }

    // Stated end-of-hole depth.
    const stated = hr.map((r) => r.eoh).find((v): v is number => v !== null && !Number.isNaN(v));
    if (stated !== undefined && prim.length) {
      const deepest = prim.reduce((a, r) => (Math.max(r.from, r.to) > Math.max(a.from, a.to) ? r : a));
      const depth = Math.max(deepest.from, deepest.to);
      if (depth > stated + TOL) {
        add(deepest, "deeper_than_eoh", "error", "Sampled deeper than end of hole",
          `Samples reach ${m(depth)} but the stated end-of-hole depth is ${m(stated)}. Either EOH or the last depths are wrong.`);
      }
    }

    // QA/QC insertion: a STANDARD at least every N samples.
    let run = 0;
    let runStart: Row | null = null;
    for (const r of hr) {
      if (r.type === "STANDARD") { run = 0; runStart = null; continue; }
      if (run === 0) runStart = r;
      run++;
      if (run === standardEvery + 1) {
        add(r, "missing_standard", "warning", "Expected a standard here",
          `${standardEvery} samples since ${runStart ? `line ${runStart.line}` : "the start of the hole"} without a STANDARD. The insertion plan in this demo expects one every ${standardEvery}.`);
      }
    }
  }

  issues.sort((a, b) => a.line - b.line);
  return { rows, issues, holes, standardEvery };
}

/** One-line summary, e.g. "9 issues found in 123 rows (6 errors, 3 warnings)". */
export function summarise(res: Result) {
  const n = res.issues.length;
  const e = res.issues.filter((i) => i.severity === "error").length;
  const rowsWord = `${res.rows.length} row${res.rows.length === 1 ? "" : "s"}`;
  if (!n) return `No issues found in ${rowsWord}.`;
  return `${n} issue${n === 1 ? "" : "s"} found in ${rowsWord} (${e} error${e === 1 ? "" : "s"}, ${n - e} warning${n - e === 1 ? "" : "s"}).`;
}
