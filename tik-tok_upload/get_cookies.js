const puppeteer = require('puppeteer-extra');
const fs = require('fs').promises;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
const { createCursor, installMouseHelper } = require("ghost-cursor");
puppeteer.use(StealthPlugin());

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function getCookies(botToken, chatId, login, pass, cookieFile) {
    const bot = new TelegramBot(botToken);

     //Генерируем уникальный идентификатор для каталога userDataDir
     const username = 'modeler_bib0v5';
     const password = '6nGEpcc9FrxN';
  
     const browser = await puppeteer.launch({
         args: [
          '--no-sandbox',
          `--proxy-server=http://46.30.189.50:11313`,
         ],
         headless: false,
         executablePath: executablePath(),
        userDataDir: './instProfile'
     });
     const page = await browser.newPage();
     await page.authenticate({
         username: username,
         password: password,
     });
     const cursor = createCursor(page);
     await installMouseHelper(page)
     await cursor.toggleRandomMove(true);

    const customUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
    await page.setUserAgent(customUA);

    await page.goto("https://www.instagram.com/", { waitUntil: 'domcontentloaded' });
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '1.png', bot, chatId);

    const login_input = '#loginForm > div > div:nth-child(1) > div > label > input'
    await cursor.move(login_input)
    await cursor.click(login_input)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await page.type(login_input, login, {delay: 100});
    await takeScreenshot(page, '2.png', bot, chatId);
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    const password_input = '#loginForm > div > div:nth-child(2) > div > label > input'
    await cursor.move(password_input)
    await cursor.click(password_input)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await page.type(password_input, pass, {delay: 150});
    await takeScreenshot(page, '3.png', bot, chatId);

    const login_btn = '#loginForm > div > div:nth-child(3) > button'
    await cursor.move(login_btn)
    await cursor.click(login_btn)
    await takeScreenshot(page, '4.png', bot, chatId);
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    const cookies = await page.cookies();
    await fs.writeFile(cookieFile, JSON.stringify(cookies, null, 2));
    console.log("successfully auth");
    await browser.close();

}

async function takeScreenshot(page, filename, bot, chatId) {
    const screenshotPath = `./${filename}`;
    await page.screenshot({ path: screenshotPath });
    const screenshot = await fs.readFile(screenshotPath);
    await bot.sendPhoto(chatId, screenshot);
    await fs.unlink(screenshotPath);
}

// module.exports = getCookies;

getCookies("6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs", "819850346", "cryptoeasyprofit", "Ii1492004", "./cookies.json")