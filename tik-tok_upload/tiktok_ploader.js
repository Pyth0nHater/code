const puppeteer = require('puppeteer-extra');
const fs = require('fs').promises;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { createCursor, installMouseHelper } = require("ghost-cursor");
puppeteer.use(StealthPlugin());

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function postReels() {
    //Генерируем уникальный идентификатор для каталога userDataDir
    const username = 'modeler_1WbLXp';
    const password = 'GKkQimw6pE2N';

    const browser = await puppeteer.launch({
        args: [
         '--no-sandbox',
         `--proxy-server=http://192.36.27.85:12375`,
        ],
        headless: false,
        
        executablePath: executablePath()
    });
    const page = await browser.newPage();
    await page.authenticate({
        username: username,
        password: password,
    });
    const cursor = createCursor(page);
    await installMouseHelper(page)
    await cursor.toggleRandomMove(true);

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    const cookies = JSON.parse(await fs.readFile('./cookies.json'));
    await page.setCookie(...cookies);

    await page.goto("https://www.tiktok.com/creator-center/");
    await sleep(5000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    await page.waitForSelector('#root > div > div > div.css-11nu78w.eosfqul1 > div.css-1etoy54.e27dty615 > div > div.css-t3jqia.e27dty612 > button')
    await cursor.move('#root > div > div > div.css-11nu78w.eosfqul1 > div.css-1etoy54.e27dty615 > div > div.css-t3jqia.e27dty612 > button')
    await cursor.click('#root > div > div > div.css-11nu78w.eosfqul1 > div.css-1etoy54.e27dty615 > div > div.css-t3jqia.e27dty612 > button')
    await sleep(10000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    // const elementHandle = await page.$('input[type="file"]');
    // await elementHandle.uploadFile('./video.mp4');
    await page.evaluate(() => {
        document.querySelector('input[type="file"]').click();
      });
    // await cursor.click('input[type="file"]'); 
    await sleep(5000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    

    console.log("Successfully posted");

}


postReels()