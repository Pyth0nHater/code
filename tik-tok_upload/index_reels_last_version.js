// const allow_cookie = 'button[class="_a9-- _ap36 _a9_0"]'
// await cursor.move(allow_cookie)
// await cursor.click(allow_cookie)

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

async function postReels(videoPath, botToken, chatId, caption) {
    const bot = new TelegramBot(botToken);
    //Генерируем уникальный идентификатор для каталога userDataDir
    const username = 'TwhzCm';
    const password = 'ycKFoF';

    const browser = await puppeteer.launch({
        args: [
         '--no-sandbox',
         `--proxy-server=http://85.195.81.160:11838`,
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

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');


    await page.goto("https://www.instagram.com/", { waitUntil: 'domcontentloaded', headless: "new" });
    await sleep(1500000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await sleep(5000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '1.png', bot, chatId);

    const turnoff_btn = 'button[class="_a9-- _ap36 _a9_1"]'
    await cursor.move(turnoff_btn)
    await cursor.click(turnoff_btn)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '2.png', bot, chatId);


    const repeat = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    for (let i = 0; i < repeat; i++) {
    await page.evaluate(() => {
        window.scrollTo(0, 100000000);
    });
    await sleep(3000 + Math.floor(Math.random() * (3000 - 500 + 1)) + 500);
    }

    const newpost_btn = 'svg[aria-label="New post"]'
    await cursor.move(newpost_btn)
    await cursor.click(newpost_btn)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '3.png', bot, chatId);

    const post_btn = 'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1uhb9sk x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1"]'
    await cursor.move(post_btn)
    await cursor.click(post_btn)
    await sleep(10000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '4.png', bot, chatId);

    const elementHandle = await page.$('input[type="file"]');
    await elementHandle.uploadFile('./video.mp4');

    await sleep(15000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '5.png', bot, chatId);

    const ok_btn = 'button[class=" _acan _acap _acaq _acas _acav _aj1- _ap30"]'
    await cursor.move(ok_btn)
    await cursor.click(ok_btn)
    await sleep(7000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    const chooseFormat_btn = 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div > div > div.xdl72j9.x1iyjqo2.xs83m0k.x15wfb8v.x3aagtl.xqbdwvv.x6ql1ns.x1cwzgcd > div.x6s0dn4.x78zum5.x5yr21d.xl56j7k.x1n2onr6.xh8yej3 > div > div > div > div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.x10l6tqk.x1ey2m1c.x17qophe.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 > div > div:nth-child(2) > div > button > div > svg'
    await cursor.move(chooseFormat_btn)
    await cursor.click(chooseFormat_btn)
    await sleep(4000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)

    const original_btn = 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div > div > div.xdl72j9.x1iyjqo2.xs83m0k.x15wfb8v.x3aagtl.xqbdwvv.x6ql1ns.x1cwzgcd > div.x6s0dn4.x78zum5.x5yr21d.xl56j7k.x1n2onr6.xh8yej3 > div > div > div > div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.x10l6tqk.x1ey2m1c.x17qophe.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 > div > div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 > div > div:nth-child(1) > div'
    await cursor.move(original_btn)
    await cursor.click(original_btn)
    await sleep(4000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '6.png', bot, chatId);

    const next_btn = 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div > div > div._ap97 > div > div > div > div._ac7b._ac7d > div > div'
    await cursor.move(next_btn)
    await cursor.click(next_btn)
    await sleep(7000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '7.png', bot, chatId);

    const next2_btn = 'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div > div > div._ap97 > div > div > div > div._ac7b._ac7d > div > div'
    await cursor.move(next2_btn)
    await cursor.click(next2_btn)
    await sleep(7000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '8.png', bot, chatId);

    await page.type('div[aria-label="Write a caption..."]', caption, {delay: 100});
    await sleep(10000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '9.png', bot, chatId);

    const share_btn =  'body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div > div > div > div._ap97 > div > div > div > div._ac7b._ac7d > div > div'
    await cursor.move(share_btn)
    await cursor.click(share_btn)
    await sleep(30000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '10.png', bot, chatId);
    console.log("Successfully posted");
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

postReels('./reels_video_1.mp4',"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346", 'Link in bio #crypto #signals #profit #guide #binance #easycrypto');