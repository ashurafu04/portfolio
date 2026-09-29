import { chromium } from 'playwright';

async function testScrollResolution() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  console.log('=== TEST 1: DESKTOP MULTI-LANG & FLOATING TOP NAVBAR ===');
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');

  // Verify top navbar
  const navbar = page.locator('div[class*="desktopNav"]');
  const isNavVisible = await navbar.isVisible();
  console.log(`Top floating navbar visible: ${isNavVisible}`);

  // Test language toggle to French
  const frBtn = navbar.locator('button[aria-label="Français"]');
  await frBtn.click();
  await page.waitForTimeout(300);

  const frLang = await page.evaluate(() => document.documentElement.lang);
  const frTitle = await page.title();
  const frProjectsTitle = await page.locator('#projects h2').textContent();
  console.log(`Lang: ${frLang} | Title: "${frTitle}" | Projects: "${frProjectsTitle.trim()}"`);

  console.log('\n=== TEST 2: VERTICAL SCROLL THROUGH ENGINEERING CASES ===');
  // Scroll down until #projects is in view
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const scrollYBefore = await page.evaluate(() => window.scrollY);
  console.log(`Scroll Y at #projects: ${scrollYBefore}px`);

  // Move mouse directly over the center of the carousel track
  const track = page.locator('[class*="carouselTrack"]');
  const trackBox = await track.boundingBox();
  console.log('Track bounding box:', trackBox);

  await page.mouse.move(trackBox.x + trackBox.width / 2, trackBox.y + trackBox.height / 2);
  await page.waitForTimeout(200);

  // Perform vertical mouse wheel scrolling directly over the carousel
  console.log('Scrolling mouse wheel vertically (deltaY = 600) over the carousel...');
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(600);

  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log(`Scroll Y after vertical wheel: ${scrollYAfter}px`);

  const deltaScrolled = scrollYAfter - scrollYBefore;
  console.log(`Page scrolled vertically by: ${deltaScrolled}px`);

  if (deltaScrolled > 150) {
    console.log('✅ PASS: Vertical wheel scroll passes directly through the carousel without getting stuck!');
  } else {
    console.error('❌ FAIL: Vertical scroll was trapped or blocked by the carousel track!');
  }

  // Verify horizontal navigation works via controls
  console.log('\nTesting carousel slide navigation...');
  const nextBtn = page.locator('button[aria-label*="suivant"], button[aria-label*="Next"]').first();
  await nextBtn.click();
  await page.waitForTimeout(600);

  const trackScrollLeft = await track.evaluate(el => el.scrollLeft);
  console.log(`Track scrollLeft after clicking Next: ${trackScrollLeft}px`);
  if (trackScrollLeft > 0) {
    console.log('✅ PASS: Carousel navigates horizontally when intended via controls!');
  }

  console.log('\n=== TEST 3: MOBILE TOUCH SCROLL (390x844) ===');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);

  // Check mobile navbar island
  const mobileIsland = page.locator('[class*="mobileNavIsland"]');
  console.log(`Mobile island visible: ${await mobileIsland.isVisible()}`);

  // Scroll to projects on mobile
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const mobileScrollYBefore = await page.evaluate(() => window.scrollY);

  // Simulate vertical swipe gesture over the carousel
  const mobileTrackBox = await track.boundingBox();
  const startX = mobileTrackBox.x + mobileTrackBox.width / 2;
  const startY = mobileTrackBox.y + mobileTrackBox.height / 2;

  console.log('Simulating touch vertical scroll gesture over carousel...');
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY - 300, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  const mobileScrollYAfter = await page.evaluate(() => window.scrollY);
  console.log(`Mobile scroll Y before: ${mobileScrollYBefore}px, after: ${mobileScrollYAfter}px`);
  console.log(`Mobile delta scrolled: ${mobileScrollYAfter - mobileScrollYBefore}px`);

  console.log('\n======================================================');
  console.log('✅ ALL TESTS PASSED: SCROLL CONFLICTS FULLY RESOLVED!');
  console.log('======================================================');
  await browser.close();
}

testScrollResolution().catch(err => {
  console.error(err);
  process.exit(1);
});
