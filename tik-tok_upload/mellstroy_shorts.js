const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");
const axios = require("axios");
const fs = require("fs");
const postShorts = require("./index");

const tiktokUrls = [
  ' https://www.tiktok.com/@bestbet012/video/7365163179460152609',
  'https://www.tiktok.com/@bestbet012/video/7365935877052271905',
  'https://www.tiktok.com/@bestbet012/video/7365162754900004128',
  'https://www.tiktok.com/@bestbet012/video/7388132458270625057',
  'https://www.tiktok.com/@bestbet012/video/7388131380082855200',
  'https://www.tiktok.com/@bestbet012/video/7388129684485115168',
  'https://www.tiktok.com/@bestbet012/video/7387021202293935393',
  'https://www.tiktok.com/@bestbet012/video/7387018410942680353'
]



// Текущий индекс ссылки
let currentIndex = 6;

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


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
      postShorts(videoPath,"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346", './cookies.json', '#reels #reelsvideos #reelsinstagram #mellstroy #меллстрой #главстрой');
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
// Функция для скачивания одного вифдео
function downloadNextVideo() {
  downloadVideo(tiktokUrls[currentIndex]);
}

downloadNextVideo();