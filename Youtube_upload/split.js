const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg({source:'video_yt.mp4'})
.setStartTime(60)
.duration(10)
.on('start', function(commandLine){
    console.log("Processing started")
})
.on('error', function(err){
    console.log(err)
})
.on('end',function(err){
    console.log("processing done")
})
.saveToFile("cut.mp4")