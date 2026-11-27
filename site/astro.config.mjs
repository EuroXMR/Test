// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Static by default. Only the demo API routes (src/pages/api/*) opt out of
// prerendering and run as Vercel serverless functions, so the API key stays server-side.
export default defineConfig({
  site: "https://sk1.au",
  output: "static",
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
});
