// POST /api/lithology — { image: base64, mediaType } → Claude's reading of a
// core photo. The image only exists in this request's memory; nothing is stored.
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import Anthropic from "@anthropic-ai/sdk";
import { readCore, ALLOWED_TYPES, type ImageType } from "../../lib/lithology";
import { checkLimit, clientIp } from "../../lib/ratelimit";
import { json, readCapped, MAX_BODY_BYTES } from "../../lib/http";

export const prerender = false;

/** Check the bytes really are the image type claimed, not just the label. */
function sniff(b64: string): ImageType | null {
  let head: string;
  try { head = atob(b64.slice(0, 24)); } catch { return null; }
  const c = (i: number) => head.charCodeAt(i);
  if (c(0) === 0xff && c(1) === 0xd8 && c(2) === 0xff) return "image/jpeg";
  if (head.startsWith("\x89PNG")) return "image/png";
  if (head.startsWith("RIFF") && head.slice(8, 12) === "WEBP") return "image/webp";
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await readCapped(request);
  if (body === null) return json(413, { error: "That image is over the 2 MB limit for this demo." });

  let image: string, mediaType: string;
  try {
    ({ image, mediaType } = JSON.parse(body) as { image: string; mediaType: string });
    if (typeof image !== "string" || typeof mediaType !== "string") throw new Error();
  } catch {
    return json(400, { error: "Couldn't read the request. Reload the page and try again." });
  }
  if (!(ALLOWED_TYPES as readonly string[]).includes(mediaType) || sniff(image) !== mediaType) {
    return json(415, { error: "Please use a JPEG, PNG or WebP photo." });
  }
  if ((image.length * 3) / 4 > MAX_BODY_BYTES) return json(413, { error: "That image is over the 2 MB limit for this demo." });

  if (!env.ANTHROPIC_API_KEY) {
    return json(503, { error: "The AI reading isn't switched on for this deployment yet." });
  }
  const limit = await checkLimit(env.RATE_LIMIT, "lithology", clientIp(request), Number(env.RATE_LIMIT_PER_HOUR) || 10);
  if (!limit.ok) {
    return json(429, { error: `You've used this hour's readings. Try again in about ${limit.retryAfterMin} min.` },
      { "retry-after": String(limit.retryAfterMin * 60) });
  }

  try {
    const reading = await readCore(env.ANTHROPIC_API_KEY, env.CLAUDE_MODEL || "claude-sonnet-5-5", image, mediaType as ImageType);
    return json(200, { reading, remaining: limit.remaining });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json(503, { error: "The AI service is busy. Try again in a minute." });
    if (e instanceof Anthropic.APIError) {
      console.error("anthropic", e.status, e.message);
      return json(502, { error: "The reading failed this time. Try again." });
    }
    console.error("lithology", e);
    return json(502, { error: e instanceof Error && e.message.startsWith("The ") ? e.message : "The reading came back in an unexpected shape. Try again." });
  }
};

export const ALL: APIRoute = () => json(405, { error: "Use POST." }, { allow: "POST" });
