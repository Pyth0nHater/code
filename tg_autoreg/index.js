const puppeteer = require('puppeteer');
const { createCursor, installMouseHelper } = require("ghost-cursor");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  const cursor = createCursor(page);
  await installMouseHelper(page)
  await cursor.toggleRandomMove(true); 
  await page.goto('https://www.npmjs.com/package/ghost-cursor');
  const selector = 'a[id="signup"]'; // Define selector

})();
