// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// Static by default. Only the demo API routes (src/pages/api/*) opt out of
// prerendering and run in the Cloudflare Worker, so the API key stays server-side.
export default defineConfig({
  site: "https://sk1.au",
  output: "static",
  adapter: cloudflare({ imageService: "passthrough" }),
  vite: { plugins: [tailwindcss()] },
  // One small stylesheet: inline it so first paint needs no extra request.
  build: { inlineStylesheets: "always" },
});
