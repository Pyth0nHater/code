const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

async function tiltVideo() {
    await new Promise((resolve, reject) => {
        ffmpeg()
            .input('./reels_video.mp4')
            .outputOptions('-map_metadata -1') // Remove all metadata
            .audioCodec('copy')
            .videoFilters('setpts=PTS*1.0,rotate=0.5*PI/180') // Tilt the video by 1 degree
            .output('./video_result.mp4')
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
}

tiltVideo()
    .then(() => {
        console.log('Video tilt complete');
    })
    .catch((error) => {
        console.error('Error tilting video:', error);
    });
