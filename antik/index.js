const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

async function main() {
    const proxyURL = 'PSFr2s:EaGb7n@217.29.63.2:12310';
    let proxyUrl_split = proxyURL.split('@')
    let login_pass = proxyUrl_split[0].split(':')

    const proxyUsername = login_pass[0]
    const proxyPassword = login_pass[1]

    // Генерируем уникальный идентификатор для каталога userDataDir

    const browser = await puppeteer.launch({
        args: [
            `--proxy-server=http://${proxyUrl_split[1]}`,
            '--no-sandbox'
        ],
            userDataDir: "C:\\Users\\korol\\AppData\\Local\\Google\\Chrome\\User Data",
            headless: false,
    });
    const page = await browser.newPage();

    await page.authenticate({
        username: proxyUsername,
        password: proxyPassword,
    });

    const customUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

    await page.setUserAgent(customUA);

    await page.goto("https://app.getgrass.io/register/?referralCode=132V2lWkATo0e5c");
}

main();
