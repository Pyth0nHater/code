const instagramDl = require("@sasmeee/igdl");
const axios = require('axios');
const postReels = require("./index");
const fs = require('fs');

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const tiltVideo = async () => {
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffmpeg.setFfmpegPath(ffmpegPath);

    await new Promise((resolve, reject) => {
        ffmpeg()
            .input('./download_video.mp4')
            .outputOptions('-map_metadata -1') // Remove all metadata
            .audioCodec('copy')
            .videoFilters('setpts=PTS*1.0,rotate=0.5*PI/180') // Tilt the video by 0.5 degree
            .output('./reels_video.mp4')
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
};

async function main() {
    const links = require('./links');

     for (const [index, url] of links.array_1.entries()) {
        console.log(`Processing video at index ${index} with URL: ${url}`);
        const dataList = await instagramDl(url);
        const response = await axios({
            url: dataList[0].download_link,
            method: 'GET',
            responseType: 'stream'
        });

        const fileStream = fs.createWriteStream('download_video.mp4');
        await new Promise((resolve, reject) => {
            response.data.pipe(fileStream);
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });

        await tiltVideo();

        await postReels('./reels_video.mp4',"6807558708:AAEapTJk9thUr6NIIUxn8WRxpx1aoI7pnhs","819850346", './cookies/cookies_0.json', '#crypto #signals #profit #guide #binance #easycrypto');

        let NextVideoTimer = Math.floor(Math.random() * ((6 * 60 * 60 * 1000) - (5 * 60 * 60 * 1000) + 1)) + (5 * 60 * 60 * 1000);
        await sleep(NextVideoTimer);
    }
}

main()
    .then(() => {
        console.log('All videos processed.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
