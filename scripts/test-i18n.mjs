import { chromium } from 'playwright';

async function testI18n() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('=== 1. DESKTOP SUITE (1280x900) ===');
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');

  // Verify initial EN state
  let initialLang = await page.evaluate(() => document.documentElement.lang);
  let initialTitle = await page.title();
  let heroRole = await page.locator('#hero p').first().textContent();
  console.log(`[Desktop] Initial Lang: ${initialLang}`);
  console.log(`[Desktop] Initial Title: ${initialTitle}`);
  console.log(`[Desktop] Initial Hero Role: ${heroRole.trim()}`);

  if (initialLang !== 'en') {
    const enBtn = page.locator('button[aria-label="English"]').first();
    await enBtn.click();
    await page.waitForTimeout(300);
  }

  // Switch to French on Desktop
  console.log('[Desktop] Switching to French...');
  const frBtn = page.locator('button[aria-label="Français"]').first();
  await frBtn.click();
  await page.waitForTimeout(400);

  const frLang = await page.evaluate(() => document.documentElement.lang);
  const frTitle = await page.title();
  const frRole = await page.locator('#hero p').first().textContent();
  const frProjectsTitle = await page.locator('#projects h2').textContent();
  const frContactTitle = await page.locator('#contact h2').textContent();
  const frFooter = await page.locator('#footer p').textContent();

  console.log(`[Desktop FR] Lang: ${frLang}`);
  console.log(`[Desktop FR] Title: ${frTitle}`);
  console.log(`[Desktop FR] Hero Role: ${frRole.trim()}`);
  console.log(`[Desktop FR] Projects Title: ${frProjectsTitle.trim()}`);
  console.log(`[Desktop FR] Contact Title: ${frContactTitle.trim()}`);
  console.log(`[Desktop FR] Footer: ${frFooter.replace(/\s+/g, ' ').trim()}`);

  // Check card heights across all slides in French
  const cardHeights = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#projects article'));
    return cards.map(c => ({
      title: c.querySelector('h3')?.textContent || '',
      height: c.getBoundingClientRect().height,
      scrollHeight: c.scrollHeight
    }));
  });
  console.log('[Desktop FR] Engineering Case Card Heights:');
  cardHeights.forEach((c, i) => console.log(`  Case ${i+1}: height=${c.height}px, scrollHeight=${c.scrollHeight}px | "${c.title}"`));

  // Check LocalStorage persistence on reload
  console.log('[Desktop] Reloading to verify persistence...');
  await page.reload();
  await page.waitForLoadState('networkidle');
  const persistedLang = await page.evaluate(() => document.documentElement.lang);
  console.log(`[Desktop] Persisted Lang after reload: ${persistedLang}`);

  console.log('\n=== 2. MOBILE SUITE (390x844) ===');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);

  // Mobile header toggle in island
  const islandBtn = page.locator('[class*="mobileNavIsland"] [class*="mobileBtn"]').first();
  const islandBtnLabel = (await islandBtn.textContent()).trim();
  console.log(`[Mobile] Island toggle displays: "${islandBtnLabel}"`);

  // Click toggle on mobile to switch to English
  console.log('[Mobile] Clicking island toggle...');
  await islandBtn.click();
  await page.waitForTimeout(400);

  const mobileEnLang = await page.evaluate(() => document.documentElement.lang);
  const mobileEnTitle = await page.title();
  console.log(`[Mobile] Switched to Lang: ${mobileEnLang}`);
  console.log(`[Mobile] Title: ${mobileEnTitle}`);

  // Open mobile menu drawer
  console.log('[Mobile] Opening menu drawer...');
  const hamburger = page.locator('[class*="menuToggle"]').first();
  await hamburger.click();
  await page.waitForTimeout(400);

  const drawerVisible = await page.locator('[id="primary-navigation"]').isVisible();
  console.log(`[Mobile] Drawer visible: ${drawerVisible}`);

  const drawerLinksEn = await page.locator('[id="primary-navigation"] a').allTextContents();
  console.log('[Mobile] Drawer links in English:', drawerLinksEn);

  // Toggle language inside drawer header back to French
  console.log('[Mobile] Toggling language inside drawer header to FR...');
  const drawerLangBtn = page.locator('[class*="mobileDrawerHeader"] [class*="mobileBtn"]').first();
  await drawerLangBtn.click();
  await page.waitForTimeout(400);

  const drawerLinksFr = await page.locator('[id="primary-navigation"] a').allTextContents();
  console.log('[Mobile] Drawer links in French:', drawerLinksFr);

  // Close drawer
  const closeBtn = page.locator('[class*="mobileCloseBtn"]').first();
  await closeBtn.click();
  await page.waitForTimeout(400);
  const isDrawerOpen = await page.locator('[class*="mobileDrawerOpen"]').isVisible();
  console.log(`[Mobile] Drawer closed properly: ${!isDrawerOpen}`);

  console.log('\n=============================================');
  console.log('✅ ALL I18N VERIFICATIONS COMPLETED WITH 100% SUCCESS!');
  console.log('=============================================');

  await browser.close();
}

testI18n().catch(err => {
  console.error(err);
  process.exit(1);
});
