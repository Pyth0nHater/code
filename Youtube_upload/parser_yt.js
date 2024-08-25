const puppeteer = require('puppeteer-extra');
const fs = require('fs').promises;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { executablePath } = require('puppeteer')

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    const customUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
    await page.setUserAgent(customUA);
   
    await page.goto("https://www.youtube.com/@SuperKratkiy/videos");
    await page.evaluate(async() => {
        const sleep = (milliseconds) => {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        for(let i = 0; i< 10; i++){
        await window.scrollTo(0, 100000000000000000000000000000);
        await sleep(3000)
        }
    });

    // Получаем HTML-код страницы
    const html = await page.content();

    // Создаем регулярное выражение для поиска всех ссылок
    var regex = /href="([^"]*)"/g;

    // Ищем все ссылки в HTML-строке
    var matches = [];
    var match;
    while ((match = regex.exec(html)) !== null) {
        matches.push(match[1]);
    }

    // Удаление "/watch?v=" из каждой ссылки
    const modifiedLinks = matches.map(link => link.replace('/watch?v=', ''));

    // Записываем найденные ссылки в файл
    try {
        await fs.writeFile('modified_links.txt', modifiedLinks.join('\n'));
        console.log('Уникальные ссылки успешно записаны в файл modified_links.txt');
    } catch (error) {
        console.error('Ошибка при записи в файл:', error);
    }

    // await browser.close();
}

main();


// const fs = require('fs');

// // Чтение ссылок из файла
// fs.readFile('links.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Ошибка при чтении файла:', err);
//     return;
//   }

//   // Разделение строки на массив ссылок
//   const links = data.trim().split('\n');

//   // Удаление подстроки "/watch?v=" из каждой ссылки
//   const modifiedLinks = links.map(link => link.replace('/watch?v=', ''));

//   // Запись обновленных ссылок обратно в файл
//   fs.writeFile('modified_links.txt', modifiedLinks.join('\n'), (err) => {
//     if (err) {
//       console.error('Ошибка при записи в файл:', err);
//       return;
//     }
//     console.log('Ссылки были модифицированы и записаны в файл "modified_links.txt".');
//   });
// });

// const fs = require('fs');

// // Чтение ссылок из файла
// fs.readFile('links.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Ошибка при чтении файла:', err);
//     return;
//   }

//   // Разделение строки на массив ссылок
//   const links = data.trim().split('\n');

//   // Преобразование в Set для удаления дубликатов, затем обратное преобразование в массив
//   const uniqueLinks = [...new Set(links)];

//   // Запись обновленных ссылок обратно в файл
//   fs.writeFile('unique_links.txt', uniqueLinks.join('\n'), (err) => {
//     if (err) {
//       console.error('Ошибка при записи в файл:', err);
//       return;
//     }
//     console.log('Уникальные ссылки были записаны в файл "unique_links.txt".');
//   });
// });