const TelegramBot = require('node-telegram-bot-api');
const instagramDl = require("@sasmeee/igdl");
const axios = require('axios');
const fs = require('fs');

const tiltVideo = async (inputPath, outputPath) => {
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffmpeg.setFfmpegPath(ffmpegPath);

    await new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputPath)
            .outputOptions('-map_metadata -1') // Удалить всю метаданные
            .audioCodec('copy')
            .videoFilters('setpts=PTS*1.0,rotate=1*PI/180') // Повернуть видео на 0.5 градуса
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
};

const downloadVideo = async (url, videoName) => {
    const dataList = await instagramDl(url);
    const response = await axios({
        url: dataList[0].download_link,
        method: 'GET',
        responseType: 'stream'
    });

    const fileStream = fs.createWriteStream(videoName);
    await new Promise((resolve, reject) => {
        response.data.pipe(fileStream);
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
    });
};

async function main() {
    const token = "6471178130:AAGC6Xu6pUjO1-g9HuKpfToZB1eXiOS7gts";
    const bot = new TelegramBot(token, { polling: false });

    const links = require('./links');

    let currentIndex = 0;
    for (let i = currentIndex; i < links.array_3.length; i++) {
        const videoName = 'download_video_1.mp4';
        await downloadVideo(links.array_3[i], videoName);
        await tiltVideo(videoName, './reels_video_1.mp4');
        const caption = `Видео ${i}`;
        await bot.sendVideo("819850346", `./reels_video_1.mp4`, { caption });
        
    }
}

// main()
//     .then(() => {
//         console.log('Все видео отправлены.');
//     })
//     .catch((error) => {
//         console.error('Ошибка:', error);
//     });
downloadVideo("https://www.instagram.com/reel/C6q_y5ONRQ6/?igsh=Ym1zNzUyeWY2endj", 'download_video_1.mp4');