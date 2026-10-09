// Verifies the prerendered production build (run `npm run build` first).
//
// Guards the invariants the image-indexing fix depends on:
//   1. The HTML the server sends already contains the canonical portrait.
//   2. React hydrates that markup instead of discarding it (a hydration
//      failure silently falls back to a client render and replaces the DOM).
//   3. Dark-theme and French visitors hydrate without mismatches.
//   4. The page is complete with JavaScript disabled.
//
// Exits non-zero on any failure.
import { preview } from "vite";
import { chromium } from "playwright";
import en from "../src/i18n/locales/en.js";
import fr from "../src/i18n/locales/fr.js";

const PORTRAIT = "/achraf-malki.png";
const failures = [];

function check(condition, message) {
  console.log(`${condition ? "PASS" : "FAIL"}  ${message}`);
  if (!condition) failures.push(message);
}

async function checkStaticHtml(baseUrl) {
  const html = await (await fetch(baseUrl)).text();

  check(
    new RegExp(`<img[^>]+src="${PORTRAIT.replace(".", "\\.")}"[^>]+alt="${en.hero.portraitAlt}"`).test(html),
    "server HTML contains the portrait <img> with its alt text"
  );
  check((html.match(/<h1[\s>]/g) || []).length === 1, "server HTML has exactly one <h1>");
  check(!html.includes("<!--app-html-->"), "prerender placeholder was replaced");
  check(!html.includes("<noscript>"), "legacy <noscript> shell is gone");

  const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const graph = jsonLd["@graph"];
  const person = graph.find((node) => node["@type"] === "Person");
  const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
  check(person.image.contentUrl === `https://achrafmalki.dev${PORTRAIT}`, "Person.image points at the canonical portrait");
  check(profilePage.primaryImageOfPage["@id"] === person.image["@id"], "ProfilePage.primaryImageOfPage references the portrait");

  const portrait = await fetch(new URL(PORTRAIT, baseUrl));
  check(
    portrait.status === 200 && portrait.headers.get("content-type") === "image/png",
    `${PORTRAIT} is served as image/png`
  );

  const sitemap = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
  check(sitemap.includes(`<image:loc>https://achrafmalki.dev${PORTRAIT}</image:loc>`), "sitemap lists the portrait");
}

async function checkHydration(browser, baseUrl, { name, storage = {}, expect }) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
  }, storage);
  const page = await context.newPage();

  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.url().startsWith(baseUrl) && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  // Hold the app bundle so the prerendered DOM can be captured before React runs.
  let releaseBundle;
  const bundleHeld = new Promise((resolve) => (releaseBundle = resolve));
  await page.route(/\/assets\/index-[^/]+\.js$/, async (route) => {
    await bundleHeld;
    await route.continue();
  });

  await page.goto(baseUrl, { waitUntil: "commit" });
  const heading = await page.waitForSelector("#hero h1", { state: "attached" });
  const portrait = await page.$(`#hero img[src="${PORTRAIT}"]`);
  await page.waitForFunction(() =>
    [...document.styleSheets].some((sheet) => sheet.href?.includes("/assets/index-"))
  );

  const visibleIconVariant = () =>
    page.$eval('#hero a[href*="github"]', (link) =>
      [...link.querySelectorAll("img")]
        .filter((img) => getComputedStyle(img).display !== "none")
        .map((img) => img.dataset.themeOnly)
        .join(",")
    );

  check(await visibleIconVariant() === expect.theme, `[${name}] before hydration: only the ${expect.theme} icon is visible`);

  releaseBundle();
  await page.waitForFunction(() =>
    Object.keys(document.querySelector("#hero h1")).some((key) => key.startsWith("__reactFiber"))
  );
  // Let post-hydration re-renders (stored theme/language) and recoverable errors settle.
  await page.waitForTimeout(800);

  check(await heading.evaluate((node) => node.isConnected), `[${name}] React hydrated the server <h1> instead of replacing it`);
  check(portrait && (await portrait.evaluate((node) => node.isConnected)), `[${name}] React hydrated the server portrait <img>`);
  check(await visibleIconVariant() === expect.theme, `[${name}] after hydration: only the ${expect.theme} icon is visible`);

  const dict = expect.lang === "fr" ? fr : en;
  check(await page.evaluate(() => document.documentElement.lang) === expect.lang, `[${name}] <html lang> is ${expect.lang}`);
  check((await page.textContent("#hero p")).trim() === dict.hero.role, `[${name}] hero role is in ${expect.lang}`);
  const themeLabel = expect.theme === "dark" ? dict.nav.themeLight : dict.nav.themeDark;
  check(
    await page.getAttribute("nav [class*='themeButton']", "aria-label") === themeLabel,
    `[${name}] theme toggle label matches the ${expect.theme} theme`
  );
  check(errors.length === 0, `[${name}] no console errors${errors.length ? `:\n      ${errors.join("\n      ")}` : ""}`);

  await context.close();
}

async function checkWithoutJavaScript(browser, baseUrl) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "load" });

  check(await page.isVisible("#hero h1"), "[no-js] hero heading is visible");
  check(
    await page.$eval(`#hero img[src="${PORTRAIT}"]`, (img) => img.complete && img.naturalWidth > 0),
    "[no-js] portrait image loads"
  );
  check(await page.$$eval("#projects article", (cards) => cards.length) === 6, "[no-js] all 6 engineering cases are in the page");

  await context.close();
}

const server = await preview({ preview: { port: 4173, open: false }, logLevel: "warn" });
const baseUrl = server.resolvedUrls.local[0];
const browser = await chromium.launch();

try {
  await checkStaticHtml(baseUrl);
  await checkHydration(browser, baseUrl, { name: "light/en", expect: { theme: "light", lang: "en" } });
  await checkHydration(browser, baseUrl, { name: "dark", storage: { theme: "dark" }, expect: { theme: "dark", lang: "en" } });
  await checkHydration(browser, baseUrl, { name: "fr", storage: { portfolio_lang: "fr" }, expect: { theme: "light", lang: "fr" } });
  await checkWithoutJavaScript(browser, baseUrl);
} finally {
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll prerender checks passed.");
