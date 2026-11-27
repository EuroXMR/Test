// Per-IP hourly limit for the demo endpoints, stored in Workers KV.
// KV is eventually consistent, so the limit is approximate under bursts —
// fine for protecting a demo's API budget, not meant as a security boundary.
export interface Limit { ok: boolean; remaining: number; retryAfterMin: number }

const memory = new Map<string, number>(); // fallback when no KV binding (local dev)

export async function checkLimit(kv: KVNamespace | undefined, route: string, ip: string, perHour: number): Promise<Limit> {
  const now = new Date();
  const hour = now.toISOString().slice(0, 13); // e.g. 2026-11-27T07
  const key = `rl:${route}:${ip}:${hour}`;
  const used = Number((kv ? await kv.get(key) : memory.get(key)) ?? 0);
  const retryAfterMin = 60 - now.getUTCMinutes();
  if (used >= perHour) return { ok: false, remaining: 0, retryAfterMin };
  if (kv) await kv.put(key, String(used + 1), { expirationTtl: 3700 });
  else memory.set(key, used + 1);
  return { ok: true, remaining: perHour - used - 1, retryAfterMin };
}

export const clientIp = (req: Request) =>
  req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
