// Checks the validator finds exactly the 9 planted errors in the sample, one of
// each kind, and copes with bad input. Run: npm test
import { readFileSync } from "node:fs";
import Papa from "papaparse";
import { normalise, validate, summarise, InputError } from "../src/lib/drilllog/rules.ts";

let failed = 0;
const check = (cond: boolean, msg: string) => { console.log(`${cond ? "ok  " : "FAIL"} ${msg}`); if (!cond) failed++; };

const csv = readFileSync(new URL("../public/sample-drill-log.csv", import.meta.url), "utf8");
const parsed = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
const res = validate(normalise(parsed.data));
for (const i of res.issues) console.log(`     line ${i.line} ${i.hole} ${i.severity} ${i.code}: ${i.explanation}`);
const expected = ["to_before_from", "interval_mismatch", "gap", "overlap", "duplicate_id", "id_out_of_sequence", "recovery_out_of_range", "deeper_than_eoh", "missing_standard"];
check(res.issues.length === 9, `9 issues (got ${res.issues.length})`);
for (const c of expected) check(res.issues.filter((i) => i.code === c).length === 1, `exactly one ${c}`);
check(res.rows.length >= 110 && res.rows.length <= 130, `about 120 rows (got ${res.rows.length})`);
console.log("     " + summarise(res));

const throws = (f: () => unknown, msg: string) => { try { f(); check(false, msg); } catch (e) { check(e instanceof InputError, `${msg}: "${(e as Error).message}"`); } };
throws(() => normalise([]), "empty file is rejected");
throws(() => normalise([{ foo: "1" }]), "missing columns are named");
const bad = validate(normalise([{ hole_id: "X", from_m: "abc", to_m: "1", interval_m: "1", sample_id: "S1", sample_type: "PRIMARY", recovery_pct: "90" }]));
check(bad.issues.length === 1 && bad.issues[0].code === "bad_value", "non-numeric depth is reported, not crashed on");
process.exit(failed ? 1 : 0);
