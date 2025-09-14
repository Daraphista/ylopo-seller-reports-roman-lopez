const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const sessionFile = 'ylopo-session.json';
  const context = await browser.newContext({ storageState: sessionFile });
  const page = await context.newPage();
  await page.goto('https://stars.ylopo.com/lead-detail/851035cd-64e8-4fa4-8534-c14b70bbe454');

  await page.waitForLoadState('networkidle');

  // If you're redirected to login, session expired — handle below
  if (page.url().includes('/login')) {
    console.error('Session not valid / expired. Re-save storageState by logging in manually.');
    await browser.close();
    process.exit(1);
  }


  // small human-like delay
  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.locator('[data-testid="user-action-icon"]:has-text("Create New Seller Alert") [data-testid="user-action-icon-clickable"]').click();

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('textbox', { name: 'Label' }).fill('Home');

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('textbox', { name: 'Label' }).press('Tab');
  await page.getByRole('combobox', { name: 'Address' }).click();

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('combobox', { name: 'Address' }).fill('5100 west us highway ');

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('option', { name: '5100 West US Highway 290' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Weekly' }).click();

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('option', { name: 'Monthly' }).click();

  await page.waitForTimeout(1000 + Math.floor(Math.random() * 2000));
  await page.getByRole('button', { name: 'Create Seller Alert' }).click();

  await page.waitForTimeout(3000 + Math.floor(Math.random() * 2000));
  const rawPath = await page.locator('a.link.add-value-link').first().getAttribute('href');


  // Split by "/" and grab the last piece
  const parts = rawPath.split("/");
  const lastId = parts.pop();  // "8f1fa17b-afec-409e-b699-656748b6da8c"

  // Build the new URL
  const reportUrl = `https://roman.romanlopez.com/seller/report/${lastId}`;


  console.log("Seller Report Link:", reportUrl);

  await context.close();
  await browser.close();
})();