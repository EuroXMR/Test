/// <reference path="../worker-configuration.d.ts" />
// Binding types come from `wrangler types --include-runtime=false`. The full
// Workers runtime types are left out on purpose: they redefine DOM globals
// (Element, Response…) and break the browser scripts' types.

// Secrets aren't in wrangler.jsonc, so declare them here.
declare namespace Cloudflare {
  interface Env {
    ANTHROPIC_API_KEY?: string;
  }
}

// The slice of the KV API this site uses.
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

declare module "cloudflare:workers" {
  export const env: Cloudflare.Env;
}
