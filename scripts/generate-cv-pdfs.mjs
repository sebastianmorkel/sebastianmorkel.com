import { createServer } from "node:http";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sirv from "sirv";

const DIST = path.resolve("dist");
const OUT = path.join(DIST, "cv");
const PORT = 4399;
const DISCIPLINES = ["softwaredev", "ai", "webdev"];

// Linux CI (Cloudflare) sets CV_PDF_SERVERLESS=1 to self-contained Chromium.
// Local (Windows) leaves it unset to normal Playwright and the browser you installed.
const serverless = process.env.CV_PDF_SERVERLESS === "1";

async function launchBrowser() {
  if (serverless) {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { chromium: pw } = await import("playwright-core");
    return pw.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { chromium } = await import("playwright");
  return chromium.launch();
}

async function main() {
  await mkdir(OUT, { recursive: true }); // create dist/cv/ if absent

  // serve the built static site
  const serve = sirv(DIST, { dev: false, single: false });
  const server = createServer((req, res) =>
    serve(req, res, () => {
      res.statusCode = 404;
      res.end("not found");
    })
  );
  await new Promise((r) => server.listen(PORT, r));

  const browser = await launchBrowser();
  const page = await browser.newPage();

  for (const d of DISCIPLINES) {
    await page.goto(`http://localhost:${PORT}/${d}/cv`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready); // wait for self-hosted fonts
    await page.pdf({
      path: path.join(OUT, `${d}.pdf`),
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", right: "14mm", bottom: "16mm", left: "14mm" },
    });
    console.log(`✓ cv/${d}.pdf`);
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});