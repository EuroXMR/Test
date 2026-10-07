// Renders proposal.html to an A4 PDF with headless Chromium.
// Usage: node render.cjs [output.pdf]
const { chromium } = require('playwright');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const out = process.argv[2] ?? path.join(__dirname, 'HSBC-Expat-Seamless-Device-Access.pdf');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(__dirname, 'proposal.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log(out);
})();
