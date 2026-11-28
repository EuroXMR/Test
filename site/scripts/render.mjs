// After `astro build`: print /cv to /cv.pdf (must fit one A4 page) and
// screenshot /og to /og.png. Serves dist/client on a throwaway local port.
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const root = new URL("../dist/client/", import.meta.url).pathname;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".woff": "font/woff", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".csv": "text/csv" };
const server = createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); } catch { file += ".html"; }
  try { res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

// SwiftShader gives headless Chromium WebGL, so the OG image can show the 3D core.
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
  const page = await browser.newPage();
  await page.goto(`${base}/cv/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  await writeFile(join(root, "cv.pdf"), pdf);
  console.log(`cv.pdf: ${pages} page(s), ${Math.round(pdf.length / 1024)} KB`);
  if (pages !== 1) { console.error("CV must fit on one page."); process.exitCode = 1; }

  const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await og.goto(`${base}/og/`, { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  // Wait for the 3D core if WebGL is available; otherwise the static SVG is used.
  await og.waitForFunction(() => document.querySelector("[data-core3d] canvas")?.style.opacity === "1", null, { timeout: 8000 }).catch(() => console.log("og: WebGL unavailable, using the static core"));
  await og.waitForTimeout(300);
  await og.locator("#og").screenshot({ path: join(root, "og.png") });
  console.log("og.png: 1200×630");
} finally {
  await browser.close();
  server.close();
}
