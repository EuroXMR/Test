export const MAX_BODY_BYTES = 2 * 1024 * 1024; // brief §7: max upload 2 MB

export const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });

/** Read the body with a hard size cap, without trusting Content-Length. */
export async function readCapped(req: Request): Promise<string | null> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return null;
  const buf = await req.arrayBuffer();
  if (buf.byteLength > MAX_BODY_BYTES) return null;
  return new TextDecoder().decode(buf);
}
