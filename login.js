const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. You log in manually once
  await page.goto("https://stars.ylopo.com/");

  console.log("👉 Please log in manually, solve reCAPTCHA, and hit Enter in terminal when done.");
  process.stdin.resume();
  process.stdin.on("data", async () => {
    // 2. Save login state after you’ve logged in
    await context.storageState({ path: "ylopo-session.json" });
    console.log("✅ Session saved to ylopo-session.json");
    await browser.close();
    process.exit(0);
  });
})();
