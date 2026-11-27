// POST /api/validate — runs the rule checks server-side (never trusting the
// browser's results), then asks Claude to explain them. Nothing is stored:
// the sheet lives only in this request's memory.
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import Anthropic from "@anthropic-ai/sdk";
import { normalise, validate, InputError, type RawRow } from "../../lib/drilllog/rules";
import { explain } from "../../lib/drilllog/explain";
import { checkLimit, clientIp } from "../../lib/ratelimit";
import { json, readCapped } from "../../lib/http";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await readCapped(request);
  if (body === null) return json(413, { error: "That file is over the 2 MB limit for this demo." });

  let records: RawRow[];
  let standardEvery: number | undefined;
  try {
    const parsed = JSON.parse(body) as { rows?: unknown; standardEvery?: unknown };
    if (!Array.isArray(parsed.rows)) throw new Error();
    records = parsed.rows as RawRow[];
    const se = Number(parsed.standardEvery);
    if (Number.isInteger(se) && se >= 2 && se <= 100) standardEvery = se;
  } catch {
    return json(400, { error: "Couldn't read the request. Reload the page and try again." });
  }

  let result;
  try {
    result = validate(normalise(records), standardEvery);
  } catch (e) {
    if (e instanceof InputError) return json(422, { error: e.message });
    throw e;
  }

  if (!env.ANTHROPIC_API_KEY) {
    return json(503, { error: "The AI review isn't switched on for this deployment. The rule checks above still work." });
  }

  const limit = await checkLimit(env.RATE_LIMIT, "validate", clientIp(request), Number(env.RATE_LIMIT_PER_HOUR) || 10);
  if (!limit.ok) {
    return json(429, { error: `You've used this hour's AI reviews. Try again in about ${limit.retryAfterMin} min. The rule checks still work.` },
      { "retry-after": String(limit.retryAfterMin * 60) });
  }

  try {
    const { review, truncated } = await explain(env.ANTHROPIC_API_KEY, env.CLAUDE_MODEL || "claude-sonnet-5-5", result);
    return json(200, { review, truncated, remaining: limit.remaining });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json(503, { error: "The AI service is busy. Try again in a minute." });
    if (e instanceof Anthropic.APIError) {
      console.error("anthropic", e.status, e.message);
      return json(502, { error: "The AI review failed this time. The rule checks above are unaffected." });
    }
    console.error("review", e);
    return json(502, { error: e instanceof Error && e.message.startsWith("The ") ? e.message : "The AI review returned something unexpected. Try again." });
  }
};

export const ALL: APIRoute = () => json(405, { error: "Use POST." }, { allow: "POST" });
