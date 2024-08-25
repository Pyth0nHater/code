const TelegramBot = require('node-telegram-bot-api');

// Вставьте сюда свой токен, полученный от BotFather
const token = '6367374872:AAHdjQNVzrC-WyVp-_4sQDDU8PQ7mpvkoA8';

// Создайте экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Массив приватных каналов и их ссылки-приглашения
const channels = [
  { id: '@tes432432432', inviteLink: 'https://t.me/tes432432432' },
  { id: '-1002154691681', inviteLink: 'https://t.me/+YLrA4Z9LcmM0N2My' },
];

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    let allSubscribed = true;

    for (const channel of channels) {
      // Проверяем статус пользователя в каждом канале
      const chatMember = await bot.getChatMember(channel.id, userId);
      const status = chatMember.status;

      if (status !== 'member' && status !== 'administrator' && status !== 'creator') {
        allSubscribed = false;
        break;
      }
    }

    if (allSubscribed) {
      // Если пользователь подписан на все каналы, отправляем ссылку
      const responseText = 'Спасибо за подписку на все каналы!';
      bot.sendMessage(chatId, responseText);
    } else {
      // Если пользователь не подписан на один или несколько каналов, отправляем ссылки-приглашения
      const options = {
        reply_markup: {
          inline_keyboard: [
            ...channels.map(channel => [
              {
                text: `Присоединиться к каналу`,
                url: channel.inviteLink
              }
            ]),
            [
              {
                text: 'Я присоединился ко всем каналам',
                callback_data: 'check_subscription'
              }
            ]
          ]
        }
      };

      bot.sendMessage(chatId, 'Пожалуйста, присоединитесь ко всем нашим каналам, чтобы получить доступ к ссылке:', options);
    }
  } catch (error) {
    console.error('Ошибка при проверке подписки:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при проверке подписки. Пожалуйста, попробуйте позже.');
  }
});

// Обработчик нажатия на кнопку "Я присоединился ко всем каналам"
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;

  if (data === 'check_subscription') {
    try {
      let allSubscribed = true;

      for (const channel of channels) {
        // Повторная проверка статуса пользователя в каждом канале
        const chatMember = await bot.getChatMember(channel.id, userId);
        const status = chatMember.status;

        if (status !== 'member' && status !== 'administrator' && status !== 'creator') {
          allSubscribed = false;
          break;
        }
      }

      if (allSubscribed) {
        // Если пользователь подписан на все каналы, отправляем ссылку
        const responseText = 'Спасибо за присоединение ко всем каналам!';
        bot.sendMessage(chatId, responseText);
      } else {
        // Если пользователь все еще не присоединился ко всем каналам
        bot.sendMessage(chatId, 'Вы пока не присоединились ко всем каналам. Пожалуйста, присоединитесь и попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка при повторной проверке подписки:', error);
      bot.sendMessage(chatId, 'Произошла ошибка при проверке подписки. Пожалуйста, попробуйте позже.');
    }
  }
});

console.log('Бот запущен...');
