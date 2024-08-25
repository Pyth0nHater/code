const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
require('dotenv').config();

// Токен вашего бота
const token = process.env.BOT_TOKEN;

// Создание экземпляра бота
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware для статических файлов React
app.use(express.static(path.join(__dirname, '..', 'build')));

// Маршрут для основного веб-приложения
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Запуск веб-сервера
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const url = 'https://<YOUR_NGROK_URL>';

  bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть веб-приложение.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть веб-приложение',
            web_app: { url: url }
          }
        ]
      ]
    }
  });
});

console.log('Bot is running');
