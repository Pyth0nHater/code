const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");
const axios = require("axios");
const fs = require("fs");
const postReels = require("./index");

const tiktokUrls = [
  "https://vt.tiktok.com/ZSF5Gqe6d/",
  "https://vt.tiktok.com/ZSF5G4Fhb/",
  "https://vt.tiktok.com/ZSF5Gg3eu/",
  "https://vt.tiktok.com/ZSF5GCyLE/",
  "https://vt.tiktok.com/ZSF5GcAks/",
  "https://vt.tiktok.com/ZSF5Gt2fR/",
  "https://vt.tiktok.com/ZSF5G4HXu/",
  "https://vt.tiktok.com/ZSF5Gnsfr/",
  "https://vt.tiktok.com/ZSF5G4may/",
  "https://vt.tiktok.com/ZSF5GPasC/",
  "https://vt.tiktok.com/ZSF5GqhTT/",
  "https://vt.tiktok.com/ZSF5GvtNM/",
  "https://vt.tiktok.com/ZSF5G4R15/",
  "https://vt.tiktok.com/ZSF5Gqu47/",
  "https://vt.tiktok.com/ZSF5GquTE/",
  "https://vt.tiktok.com/ZSF5GXUJp/"
];


// Текущий индекс ссылки
let currentIndex = 0;

// Функция для скачивания одного видео
function downloadVideo(url) {
  TiktokDownloader(url, {
    version: "v3" //  version: "v1" | "v2" | "v3"
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

      // Публикация видео после скачивания
      //postReels(videoPath,"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346", './cookies2.json', '#reels #reelsvideos #reelsinstagram #mellstroy #меллстрой #главстрой');

      // Увеличение индекса для следующего видео
      currentIndex = (currentIndex + 1) % tiktokUrls.length; // Обновляем индекс, учитывая кольцевой порядок
    }).catch(error => {
      console.error('Ошибка при скачивании видео:', error);
    });
  }).catch((error) => {
    console.error('Ошибка:', error);
  });
}


function downloadNextVideo() {
  downloadVideo(tiktokUrls[currentIndex]);
}

const timeToPostData = fs.readFileSync('TimeToPost.json', 'utf-8');
const TimeToPost = JSON.parse(timeToPostData).TimeToPost;
setInterval(downloadNextVideo, TimeToPost)
// Начало скачивания
downloadNextVideo();