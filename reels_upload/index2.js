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

async function postReels(botToken, chatId, login, password) {
    const bot = new TelegramBot(botToken);
    const username = 'TwhzCm';
    const password = 'ycKFoF';
    
    const browser = await puppeteer.launch({
        args: [
         '--no-sandbox',
         `--proxy-server=http://85.195.81.160:11838`,
        ],
        headless: true,
        executablePath: executablePath(),
        userDataDir: './instProfile',
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

    await page.goto("https://www.instagram.com/", { waitUntil: 'domcontentloaded', headless: "new" });
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
    await page.type(password_input, password, {delay: 150});
    await takeScreenshot(page, '3.png', bot, chatId);

    const login_btn = '#loginForm > div > div:nth-child(3) > button'
    await cursor.move(login_btn)
    await cursor.click(login_btn)
    await takeScreenshot(page, '4.png', bot, chatId);
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    console.log("successfully auth");

    const turnoff_btn = 'button[class="_a9-- _ap36 _a9_1"]'
    const elementExist1 = await page.$(turnoff_btn)
    if (elementExist1){
    await cursor.move(turnoff_btn)
    await cursor.click(turnoff_btn)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '5.png', bot, chatId);
    }

    await browser.close();
    await fs.unlink(videoPath);
}

async function takeScreenshot(page, filename, bot, chatId) {
    const screenshotPath = `./${filename}`;
    await page.screenshot({ path: screenshotPath });
    const screenshot = await fs.readFile(screenshotPath);
    await bot.sendPhoto(chatId, screenshot);
    await fs.unlink(screenshotPath);
}

module.exports = postReels;