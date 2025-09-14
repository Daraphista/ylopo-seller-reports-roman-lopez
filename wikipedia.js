const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const sessionFile = 'ylopo-session.json';
  const context = await browser.newContext({ storageState: sessionFile });
  const page = await context.newPage();
  await page.goto('https://www.wikipedia.org/');

  await page.waitForLoadState('networkidle');


  // get page title
  const pageTitle = await page.title();
  console.log("Page Title:", pageTitle); // Should print "Wikipedia"
  

  await context.close();
  await browser.close();
})();
