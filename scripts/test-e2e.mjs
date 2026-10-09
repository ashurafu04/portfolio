// End-to-end checks against the production build (run `npm run build` first).
//
// Guards the invariants the site's SEO and accessibility depend on:
//   - Each language URL ships complete, correctly localized HTML (portrait,
//     copy, canonical, hreflang, JSON-LD) before any JavaScript runs.
//   - React hydrates that markup instead of discarding it (a hydration
//     failure silently falls back to a client render and replaces the DOM).
//   - Theme and language work across hydration, switching and history.
//   - Accent text meets WCAG AA contrast in both themes.
//   - The page is complete with JavaScript disabled.
//
// Exits non-zero on any failure.
import { preview } from "vite";
import { chromium } from "playwright";
import en from "../src/i18n/locales/en.js";
import fr from "../src/i18n/locales/fr.js";

const SITE_URL = "https://achrafmalki.dev";
const PORTRAIT = "/achraf-malki.png";
const PAGES = [
  { path: "/", lang: "en", dict: en },
  { path: "/fr/", lang: "fr", dict: fr },
];
const failures = [];

function check(condition, message) {
  console.log(`${condition ? "PASS" : "FAIL"}  ${message}`);
  if (!condition) failures.push(message);
}

function trackErrors(page, baseUrl) {
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
  return errors;
}

async function checkStaticHtml(baseUrl) {
  for (const { path, lang, dict } of PAGES) {
    const html = await (await fetch(new URL(path, baseUrl))).text();
    const tag = `[html ${path}]`;
    const pageUrl = `${SITE_URL}${path}`;

    check(html.includes(`<html lang="${lang}">`), `${tag} <html lang="${lang}">`);
    check(
      new RegExp(`<img[^>]+src="${PORTRAIT.replace(".", "\\.")}"[^>]+alt="${dict.hero.portraitAlt.replace("'", "&#x27;")}"`).test(html),
      `${tag} contains the portrait <img> with localized alt text`
    );
    check(html.includes(dict.hero.role.replace("&", "&amp;")), `${tag} hero copy is in the page language`);
    check((html.match(/<h1[\s>]/g) || []).length === 1, `${tag} exactly one <h1>`);
    check(!/<!--app-(html|head)-->/.test(html), `${tag} prerender placeholders were replaced`);
    check(html.includes(`<link rel="canonical" href="${pageUrl}" />`), `${tag} self-referencing canonical`);
    for (const alt of PAGES) {
      check(
        html.includes(`<link rel="alternate" hreflang="${alt.lang}" href="${SITE_URL}${alt.path}" />`),
        `${tag} hreflang alternate for ${alt.lang}`
      );
    }
    check(html.includes(`hreflang="x-default" href="${SITE_URL}/"`), `${tag} hreflang x-default`);

    const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const graph = jsonLd["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
    check(person.image.contentUrl === `${SITE_URL}${PORTRAIT}`, `${tag} Person.image is the canonical portrait`);
    check(profilePage.url === pageUrl && profilePage.inLanguage === lang, `${tag} ProfilePage matches the URL and language`);
    check(profilePage.primaryImageOfPage["@id"] === person.image["@id"], `${tag} ProfilePage.primaryImageOfPage is the portrait`);
  }

  const portrait = await fetch(new URL(PORTRAIT, baseUrl));
  check(portrait.status === 200 && portrait.headers.get("content-type") === "image/png", `${PORTRAIT} is served as image/png`);

  const sitemap = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
  for (const { path } of PAGES) {
    check(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`), `sitemap lists ${path}`);
  }
  check(sitemap.includes(`<image:loc>${SITE_URL}${PORTRAIT}</image:loc>`), "sitemap lists the portrait");
}

async function checkHydration(browser, baseUrl, { name, path = "/", storage = {}, expect }) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
  }, storage);
  const page = await context.newPage();
  const errors = trackErrors(page, baseUrl);

  // Hold the app bundle so the prerendered DOM can be captured before React runs.
  let releaseBundle;
  const bundleHeld = new Promise((resolve) => (releaseBundle = resolve));
  await page.route(/\/assets\/index-[^/]+\.js$/, async (route) => {
    await bundleHeld;
    await route.continue();
  });

  await page.goto(new URL(path, baseUrl).href, { waitUntil: "commit" });
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

async function checkLanguageSwitch(browser, baseUrl) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const errors = trackErrors(page, baseUrl);
  await page.goto(new URL("/#skills", baseUrl).href, { waitUntil: "networkidle" });
  await page.evaluate(() => (window.__noReload = true));

  await page.click('nav [class*="desktopNav"] a[hreflang="fr"]');
  await page.waitForFunction(() => document.documentElement.lang === "fr");
  check(new URL(page.url()).pathname === "/fr/" && new URL(page.url()).hash === "#skills", "[switch] FR link moves to /fr/ and keeps the #section");
  check(await page.evaluate(() => window.__noReload === true), "[switch] language changes without a page reload");
  check(await page.title() === fr.meta.title, "[switch] document title is French");
  check((await page.textContent("#hero p")).trim() === fr.hero.role, "[switch] page copy is French");

  await page.goBack();
  await page.waitForFunction(() => document.documentElement.lang === "en");
  check((await page.textContent("#hero p")).trim() === en.hero.role, "[switch] browser Back restores English");
  check(errors.length === 0, `[switch] no console errors${errors.length ? `:\n      ${errors.join("\n      ")}` : ""}`);

  await context.close();
}

// Text colour is blended with the element's opacity before measuring, so
// de-emphasised text is judged by what is actually painted.
const CONTRAST_TARGETS = {
  "hero tagline": { selector: '#hero [class*="tagline"]' },
  "case subtitle": { selector: '#projects [class*="subtitle"]' },
  "certification Verify link": { selector: '#certifications [class*="verifyLink"]' },
  "certification meta text": { selector: '#certifications [class*="certMeta"]' },
  "active language pill": { selector: '[class*="pillSegmentActive"]', onOwnBackground: true },
};

async function checkContrast(browser, baseUrl) {
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: theme });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    const results = await page.evaluate((targets) => {
      const channels = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
      const luminance = (rgb) => {
        const [r, g, b] = rgb.map((v) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const canvas = channels(getComputedStyle(document.body).backgroundColor);

      return Object.fromEntries(
        Object.entries(targets).map(([label, { selector, onOwnBackground }]) => {
          const style = getComputedStyle(document.querySelector(selector));
          const background = onOwnBackground ? channels(style.backgroundColor) : canvas;
          const opacity = Number(style.opacity);
          const text = channels(style.color).map((c, i) => c * opacity + background[i] * (1 - opacity));
          const [hi, lo] = [luminance(text), luminance(background)].sort((x, y) => y - x);
          return [label, (hi + 0.05) / (lo + 0.05)];
        })
      );
    }, CONTRAST_TARGETS);

    for (const [label, value] of Object.entries(results)) {
      check(value >= 4.5, `[contrast ${theme}] ${label} ${value.toFixed(2)}:1 >= 4.5:1`);
    }
    await context.close();
  }
}

async function checkSections(browser, baseUrl) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const certLinks = await page.$$eval("#certifications a", (links) => links.map((link) => link.href));
  check(certLinks.length === 8 && new Set(certLinks).size === 8, "[certifications] 8 credentials, each linked once");

  await page.locator("#projects").scrollIntoViewIfNeeded();
  const box = await page.locator('[class*="carouselTrack"]').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(600);
  check(await page.evaluate(() => window.scrollY) - before > 150, "[carousel] vertical wheel over the carousel scrolls the page");

  await context.close();
}

async function checkWithoutJavaScript(browser, baseUrl) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  for (const { path, dict } of PAGES) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "load" });
    check(await page.isVisible("#hero h1"), `[no-js ${path}] hero heading is visible`);
    check(
      await page.$eval(`#hero img[src="${PORTRAIT}"]`, (img) => img.complete && img.naturalWidth > 0),
      `[no-js ${path}] portrait image loads`
    );
    check(
      (await page.textContent("#projects h2")).trim() === dict.projects.sectionTitle,
      `[no-js ${path}] engineering cases are present and localized`
    );
  }

  await context.close();
}

const server = await preview({ preview: { port: 4173, open: false }, logLevel: "warn" });
const baseUrl = server.resolvedUrls.local[0];
const browser = await chromium.launch();

try {
  await checkStaticHtml(baseUrl);
  await checkHydration(browser, baseUrl, { name: "en/light", expect: { theme: "light", lang: "en" } });
  await checkHydration(browser, baseUrl, { name: "en/dark", storage: { theme: "dark" }, expect: { theme: "dark", lang: "en" } });
  await checkHydration(browser, baseUrl, { name: "fr/light", path: "/fr/", expect: { theme: "light", lang: "fr" } });
  await checkHydration(browser, baseUrl, { name: "fr/dark", path: "/fr/", storage: { theme: "dark" }, expect: { theme: "dark", lang: "fr" } });
  await checkLanguageSwitch(browser, baseUrl);
  await checkContrast(browser, baseUrl);
  await checkSections(browser, baseUrl);
  await checkWithoutJavaScript(browser, baseUrl);
} finally {
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll end-to-end checks passed.");
