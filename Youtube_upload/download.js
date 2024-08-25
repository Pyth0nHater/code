const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

// Функция для загрузки и обработки видео
async function downloadAndProcessVideo(link) {
    try {
        // Получаем информацию о видео
        const info = await ytdl.getInfo(link);
        const videoLength = parseInt(info.videoDetails.lengthSeconds); // Длительность видео в секундах

        const videoPath = `video_${link}.mp4`; // Путь к загруженному видео

        // Загружаем видео с YouTube и сохраняем его в файл
        await new Promise((resolve, reject) => {
            ytdl(link).pipe(fs.createWriteStream(videoPath))
                .on('finish', resolve)
                .on('error', reject);
        });

        console.log("Downloaded"); // Выводим сообщение о завершении загрузки

        const numSegments = Math.ceil(videoLength / 60); // Количество сегментов
        const lastPart = videoLength % 60; // Длительность последнего видео

        // Создаем папку "видеос", если она не существует
        if (!fs.existsSync('videos')) {
            fs.mkdirSync('videos');
        }

        // Проходимся по всем сегментам
        for (let i = 0; i < numSegments; i++) {
            const startTime = i * 60; // Время начала текущего сегмента
            let duration = 60; // Длительность сегмента по умолчанию

            // Для последнего сегмента корректируем длительность, если он короче 60 секунд
            if (i === numSegments - 1) {
                // Проверяем, что последний сегмент длится 5 секунд или более
                if (lastPart >= 5) {
                    duration = lastPart;
                } else {
                    continue; // Пропускаем создание последнего сегмента, если он короче 5 секунд
                }
            }

            const cutFilePath = `videos/part_${i + 1}.mp4`; // Путь для сохранения обработанного сегмента

            // Используем ffmpeg для обрезки и сохранения сегмента в файл
            await new Promise((resolve, reject) => {
                ffmpeg(videoPath)
                    .setStartTime(startTime)
                    .duration(duration)
                    .on('error', reject)
                    .on('end', resolve)
                    .saveToFile(cutFilePath);
            });

            console.log(`Processed segment ${i + 1} of ${numSegments}`); 
            console.log("POST")

            // Ожидаем 4 часа перед следующей публикацией (кроме последнего сегмента)
            if (i !== numSegments - 1) {
                await new Promise(resolve => setTimeout(resolve, TimeToPost))
            }
        }
        console.log("Processing done for", link);
        fs.unlinkSync(videoPath); // Удаляем загруженное видео после обработки

        return { link, numSegments };
    } catch (error) {
        console.error("Error:", error); // Выводим сообщение об ошибке, если она произошла
        return null; // Возвращаем null в случае ошибки
    }
}

async function main() {
    try {
        // Читаем ссылки из файла и удаляем лишние пробелы
        const links = fs.readFileSync('links.txt', 'utf-8').split('\n').map(link => link.trim());
        console.log("Links to process:", links); // Выводим список ссылок для обработки

        // Обрабатываем каждую ссылку
        for (let link of links) {
            await downloadAndProcessVideo(link);
            fs.unlinkSync(`video_${link}.mp4`)
        }
    } catch (error) {
        console.error("Error:", error); // Выводим сообщение об ошибке, если она произошла
    }
}

main(); // Вызываем главную функцию
