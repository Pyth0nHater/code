const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");
const axios = require("axios");
const fs = require("fs");
const postReels = require("./index");

const tiktokUrls = [
    "https://vt.tiktok.com/ZSF5Gqu47/",
    "https://vt.tiktok.com/ZSF5GquTE/",
    "https://vt.tiktok.com/ZSF5GXUJp/",
    "https://vt.tiktok.com/ZSF5Gqe6d/",
    "https://vt.tiktok.com/ZSF5G4Fhb/",
    "https://vt.tiktok.com/ZSF5Gg3eu/",
    "https://vt.tiktok.com/ZSF5GCyLE/",
    "https://vt.tiktok.com/ZSF5GcAks/",
    "https://vt.tiktok.com/ZSFm6XwQs/",
    "https://vt.tiktok.com/ZSFm66wwr/",
    "https://vt.tiktok.com/ZSFm6UyaN/",
    "https://vt.tiktok.com/ZSFm6kCVY/",
    "https://vt.tiktok.com/ZSFm6uE7t/",
    "https://vt.tiktok.com/ZSFm6X2ms/",
    "https://vt.tiktok.com/ZSFm66M2f/",
    "https://vt.tiktok.com/ZSFm6hb51/",
    "https://vt.tiktok.com/ZSFm62DYU/",
    "https://vt.tiktok.com/ZSFm69rAs/",
    "https://vt.tiktok.com/ZSFm6c2jp/",
    "https://vt.tiktok.com/ZSFm6qq2J/",
    "https://vt.tiktok.com/ZSFm64jVA/",
    "https://vt.tiktok.com/ZSFm6qBXU/",
    "https://vt.tiktok.com/ZSFm6ghu4/",
    "https://vt.tiktok.com/ZSFmMRat4/",
    "https://vt.tiktok.com/ZSFm6EQwh/",
    "https://vt.tiktok.com/ZSFmMRHEo/",
    "https://vt.tiktok.com/ZSFmMep7G/",
    "https://vt.tiktok.com/ZSFm642p6/",
    "https://vt.tiktok.com/ZSFm6nE1a/",
    "https://vt.tiktok.com/ZSF5Gt2fR/",
    "https://vt.tiktok.com/ZSF5G4HXu/",
    "https://vt.tiktok.com/ZSF5Gnsfr/",
    "https://vt.tiktok.com/ZSF5GPasC/",
    "https://vt.tiktok.com/ZSF5GqhTT/",
    "https://vt.tiktok.com/ZSF5GvtNM/",
    "https://vt.tiktok.com/ZSF5G4R15/",
    "https://vt.tiktok.com/ZSFHxpfra/",
    "https://vt.tiktok.com/ZSFHxP91U/",
    "https://vt.tiktok.com/ZSFHxqdFW/",
    "https://vt.tiktok.com/ZSFHxaSQA/",
    "https://vt.tiktok.com/ZSFHxareY/",
    "https://vt.tiktok.com/ZSFHxxtx9/",
    "https://vt.tiktok.com/ZSFHxpSbW/",
    "https://vt.tiktok.com/ZSFHx5V7u/",
    "https://vt.tiktok.com/ZSFHxnpWG/",
    "https://vt.tiktok.com/ZSFHxnY9T/",
    "https://vt.tiktok.com/ZSFHx9h6n/",
    "https://vt.tiktok.com/ZSFHxVbMR/",
    "https://vt.tiktok.com/ZSFHx4xSh/",
    "https://vt.tiktok.com/ZSFHxXBK7/",
    "https://vt.tiktok.com/ZSFHxvDcu/",
    "https://vt.tiktok.com/ZSFHxnTVf/",
    "https://vt.tiktok.com/ZSFHxVdMx/",
    "https://vt.tiktok.com/ZSFHxPD1s/",
    "https://vt.tiktok.com/ZSFHx5sns/",
    "https://vt.tiktok.com/ZSFHxH1X6/",
    "https://vt.tiktok.com/ZSFHxnm9D/",
    "https://vt.tiktok.com/ZSFHxcUEH/",
    "https://vt.tiktok.com/ZSFHxH5xc/",
    "https://vt.tiktok.com/ZSFHxWMk8/",
    "https://vt.tiktok.com/ZSFHxqQPX/",
    "https://vt.tiktok.com/ZSFHxqfSE/",
    "https://vt.tiktok.com/ZSFHx46PK/",
    "https://vt.tiktok.com/ZSFHxxW78/",
    "https://vt.tiktok.com/ZSFHQJoYB/",
    "https://vt.tiktok.com/ZSFHQMDgW/",
    "https://vt.tiktok.com/ZSFHQMBc3/",
    "https://vt.tiktok.com/ZSFHxKHym/",
    "https://vt.tiktok.com/ZSFHQRPbv/",
    "https://vt.tiktok.com/ZSFHxEsBm/",
    "https://vt.tiktok.com/ZSFHxEd1F/",
    "https://vt.tiktok.com/ZSFHQBerT/",
    "https://vt.tiktok.com/ZSFHQr1sD/",
    "https://vt.tiktok.com/ZSFHQSHst/",
    "https://vt.tiktok.com/ZSFHQ881M/",
    "https://vt.tiktok.com/ZSFHQL1su/",
    "https://vt.tiktok.com/ZSFHxoJW1/",
    "https://vt.tiktok.com/ZSFHQJaqJ/",
    "https://vt.tiktok.com/ZSFHxTxyv/",
    "https://vt.tiktok.com/ZSFHQR47c/",
    "https://vt.tiktok.com/ZSFHQregu/",
    "https://vt.tiktok.com/ZSFHxE7CG/",
    "https://vt.tiktok.com/ZSFHQFu57/",
    "https://vt.tiktok.com/ZSFHQeRuj/",
    "https://vt.tiktok.com/ZSFHxguxb/",
    "https://vt.tiktok.com/ZSFHxpTax/",
    "https://vt.tiktok.com/ZSFHxsNaw/",
    "https://vt.tiktok.com/ZSFHxujSX/",
    "https://vt.tiktok.com/ZSFHxHFKk/",
    "https://vt.tiktok.com/ZSFHxqW9H/",
    "https://vt.tiktok.com/ZSFHxvRJt/",
    "https://vt.tiktok.com/ZSFHxuUyn/",
    "https://vt.tiktok.com/ZSFHx7WeX/",
    "https://vt.tiktok.com/ZSFHx9U8H/",
    "https://vt.tiktok.com/ZSFHxbQMe/",
    "https://vt.tiktok.com/ZSFHxuY9F/",
    "https://vt.tiktok.com/ZSFHx7HcP/",
    "https://vt.tiktok.com/ZSFHx9m6b/",
    "https://vt.tiktok.com/ZSFHx4j2W/",
    "https://vt.tiktok.com/ZSFHxnUv3/",
    "https://vt.tiktok.com/ZSFHxQd1c/",
    "https://vt.tiktok.com/ZSFHxvPvs/",
    "https://vt.tiktok.com/ZSFHxmm5n/",
    "https://vt.tiktok.com/ZSFHxc3Cj/",
    "https://vt.tiktok.com/ZSFHxpqSF/",
    "https://vt.tiktok.com/ZSFHx7ULX/",
    "https://vt.tiktok.com/ZSFHxsqsF/",
    "https://vt.tiktok.com/ZSFHxnXYb/",
    "https://vt.tiktok.com/ZSFHxsVXa/",
];


// Текущий индекс ссылки
let currentIndex = 54;
function downloadVideo(url) {
  TiktokDownloader(url, {
    version: "v3"
  }).then((result) => {
    console.log(`Скачивание видео ${url}`);
    axios({
      url: result.result.video1,
      method: 'GET',
      responseType: 'stream'
    }).then(response => {
      const fileName = `video.mp4`; // Уникальное имя файла с использованием временной метки
      const videoPath = `./${fileName}`;
      response.data.pipe(fs.createWriteStream(videoPath));
      console.log(`Видео успешно сохранено в файл ${fileName}`);
      const UserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

      //(videoPath, botToken, chatId, login, password, cookieFile, caption)
     // postReels(videoPath,"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346",'mellstroys_reels', 'Ii1492004', './cookies.json', '#reels #reelsvideos #reelsinstagram #mellstroy #меллстрой #главстрой');
     postReels(videoPath,"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346", './cookies.json', '#reels #reelsvideos #reelsinstagram #mellstroy #меллстрой #главстрой');
      currentIndex = (currentIndex + 1) % tiktokUrls.length; // Увеличение индекса для следующего видео
      console.log(currentIndex)
    }).catch(error => {
      console.error('Ошибка при скачивании видео:', error);
      // Можно добавить обработку ошибок здесь
    });
  }).catch((error) => {
    console.error('Ошибка:', error);
    // Можно добавить обработку ошибок здесь
  });
}
// Функция для скачивания одного видео
function downloadNextVideo() {
  downloadVideo(tiktokUrls[currentIndex]);
}

let TimeToPost = Math.floor(Math.random() * ((4 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000) + 1)) + (3 * 60 * 60 * 1000)
console.log(TimeToPost)
setInterval(downloadNextVideo, TimeToPost)
// Начало скачивания
downloadNextVideo();

let additionalTime = Math.floor(Math.random() * (7 * 60 * 1000 - 5 * 60 * 1000 + 1)) + 5 * 60 * 1000;

TimeToPost += additionalTime
// Функция для скачивания одного видео
const data = {
    TimeToPost: TimeToPost
};

// Преобразуем объект в формат JSON
const jsonData = JSON.stringify(data);

// Записываем JSON-строку в файл
fs.writeFile('TimeToPost.json', jsonData, (err) => {
    if (err) {
        console.error('Ошибка при записи в файл:', err);
        return;
    }
    console.log('Переменная TimeToPost успешно записана в файл TimeToPost.json.');
});