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

async function postReels(videoPath, botToken, chatId, cookiePath, caption, customUA) {
    const bot = new TelegramBot(botToken);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: 'new',
        executablePath: executablePath()
    });
    const page = await browser.newPage();
    const cursor = createCursor(page);
    await installMouseHelper(page)
    await cursor.toggleRandomMove(true);

    await page.setUserAgent(customUA);

    const cookies = JSON.parse(await fs.readFile(cookiePath));
    await page.setCookie(...cookies);

    await page.goto("https://www.instagram.com/", { waitUntil: 'domcontentloaded', headless: "new" });
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '1.png', bot, chatId);

    const turnoff_btn = 'button[class="_a9-- _ap36 _a9_1"]'
    await cursor.move(turnoff_btn)
    await cursor.click(turnoff_btn)
    await sleep(3000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '2.png', bot, chatId);

    for (let i = 0; i < 10; i++) {
    await page.evaluate(() => {
        window.scrollTo(0, 100000000);
    });
    await sleep(3000 + Math.floor(Math.random() * (3000 - 500 + 1)) + 500);
}

    const newpost_btn = 'svg[aria-label="New post"]'
    await cursor.move(newpost_btn)
    await cursor.click(newpost_btn)
    await sleep(4000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '3.png', bot, chatId);

    const post_btn = 'a[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1dm5mii x16mil14 xiojian x1yutycm x1lliihq x193iq5w xh8yej3"]'
    const elementExist = await page.$(post_btn)
    if (elementExist){
      await cursor.move(post_btn)
      await cursor.click(post_btn)
    }
    await sleep(5000+Math.floor(Math.random() * (3000 - 500 + 1)) + 500)
    await takeScreenshot(page, '4.png', bot, chatId);

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        await cursor.move('button[class=" _acan _acap _acas _aj1- _ap30"]'),
        await cursor.click('button[class=" _acan _acap _acas _aj1- _ap30"]')
    ]);
    await fileChooser.accept([videoPath]);
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

module.exports = postReels;