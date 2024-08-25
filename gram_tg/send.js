const { Api, TelegramClient, Logger } = require("telegram");
const { StringSession } = require("telegram/sessions");
const prompts = require('prompts');
const fs = require('fs');
const log = require('loglevel');
const input = require('input'); // Убедитесь, что у вас установлен модуль 'input' для ввода

const CONFIG_FILE = 'config.json';

// Утилита для ожидания
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Функция для очистки пути от кавычек и лишних пробелов
const cleanPath = (path) => {
  return path.replace(/['"]/g, '').trim();
};

// Функция для отправки сообщений партиями
const sendMessagesInBatches = async (client, usernames, batchSize, waitTime, message) => {
  for (let i = 0; i < usernames.length; i += batchSize) {
    const batch = usernames.slice(i, i + batchSize);
    for (const username of batch) {
      try {
        const entity = await client.getEntity(username);

        await sleep(1000); // Пауза между сообщениями
        await client.invoke(
          new Api.messages.SendMessage({
            peer: entity,
            message: message, // Сообщение передается как аргумент функции
            randomId: BigInt(-Math.floor(Math.random() * 1e12)), // Уникальный случайный ID
            noWebpage: true,
            noforwards: true,
          })
        );

        console.log(`Сообщение отправлено: ${username}`);
      } catch (error) {
        if (error.errorMessage === 'FLOOD') {
          console.error(`Не удалось отправить сообщение ${username}: Включен режим медленной отправки. Подождите ${error.seconds} секунд.`);
        } else {
          console.error(`Не удалось отправить сообщение ${username}:`, error);
        }
      }
    }

    if (i + batchSize < usernames.length) {
      console.log(`Ожидание ${waitTime / 1000} секунд перед следующей партией...`);
      await sleep(waitTime);
    }
  }
};

// Функция для проверки наличия файла accounts.json и его содержимого
const ensureAccountsFile = async () => {
  const filePath = 'Accounts.json';

  // Создать файл, если он не существует
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ apiId: null, apiHash: null, sessions: [] }, null, 2));
    console.log('Создан новый файл Accounts.json.');
  }

  const accountData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let { apiId, apiHash, sessions } = accountData;

  if (!apiId || !apiHash) {
    // Запросить API учетные данные, если они отсутствуют
    const apiResponse = await prompts([
      {
        type: 'number',
        name: 'apiId',
        message: 'Введите ваш api ID:'
      },
      {
        type: 'text',
        name: 'apiHash',
        message: 'Введите ваш api Hash:'
      }
    ]);
    apiId = apiResponse.apiId;
    apiHash = apiResponse.apiHash;

    // Обновить accounts.json с новыми API учетными данными
    fs.writeFileSync(filePath, JSON.stringify({ apiId, apiHash, sessions }, null, 2));
    console.log('Обновлен файл Accounts.json');
  }

  return { apiId, apiHash, sessions };
};

// Функция для добавления новой сессии
const addSession = async (apiId, apiHash) => {
  console.log("Запуск процесса добавления новой учетной записи...");

  const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
    baseLogger: new Logger('warn'),
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("Введите ваш номер телефона: "),
    password: async () => await input.text("Введите ваш пароль: "),
    phoneCode: async () => await input.text("Введите код, который вы получили: "),
    onError: (err) => console.error(err),
  });

  console.log("Вы должны быть теперь подключены.");
  const sessionString = client.session.save(); // Сохраните эту строку, чтобы не заходить в систему снова

  // Запросить имя учетной записи
  const { accountName } = await prompts({
    type: 'text',
    name: 'accountName',
    message: 'Введите имя для этой учетной записи:'
  });

  const accountData = JSON.parse(fs.readFileSync('Accounts.json', 'utf-8'));
  accountData.sessions.push({ name: accountName, session: sessionString });
  fs.writeFileSync('Accounts.json', JSON.stringify(accountData, null, 2));
  console.log('Добавлена новая сессия в файл Accounts.json.');
};

// Функция для получения актуальных сессий из файла accounts.json
const getSessions = () => {
  const accountData = JSON.parse(fs.readFileSync('Accounts.json', 'utf-8'));
  return accountData.sessions;
};

// Функция для чтения имен пользователей из .txt файла
const readUsernamesFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  } catch (error) {
    console.error('Ошибка чтения файла с именами пользователей:', error);
    throw error;
  }
};

// Функция для чтения сообщения из .txt файла
const readMessageFromFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8').trim();
  } catch (error) {
    console.error('Ошибка чтения файла с сообщением:', error);
    throw error;
  }
};

// Функция для загрузки конфигурации из файла
const loadConfig = () => {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  }
  return {};
};

// Функция для сохранения конфигурации в файл
const saveConfig = (config) => {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
};

// Основная функция для обработки пользовательских взаимодействий
const main = async () => {
  // Загрузка конфигурации
  const config = loadConfig();

  while (true) {
    // Убедитесь, что файл accounts.json настроен и получите API учетные данные и сессии
    const accountsData = await ensureAccountsFile();
    if (!accountsData) {
      console.error('Пожалуйста, добавьте сессии в файл Accounts.json перед началом рассылки.');
      return;
    }

    const { apiId, apiHash } = accountsData;

    // Главное меню
    while (true) {
      const { value: action } = await prompts({
        type: 'select',
        name: 'value',
        message: 'Выберите действие',
        choices: [
          { title: 'Добавить сессию', value: 'add_session' },
          { title: 'Начать рассылку', value: 'start_mailing', disabled: (getSessions().length === 0) },
          { title: 'Выйти', value: 'exit' }
        ],
        initial: 0
      });

      if (action === 'add_session') {
        await addSession(apiId, apiHash);
        continue; // Вернуться в главное меню после добавления сессии
      }

      if (action === 'exit') {
        console.log('Выход...');
        return; // Выйти из программы
      }

      if (action === 'start_mailing') {
        // Перезагрузить сессии на случай, если они были обновлены
        const sessions = getSessions();

        // Выбрать, какую сессию использовать для рассылки
        const { selectedSession } = await prompts({
          type: 'select',
          name: 'selectedSession',
          message: 'Выберите учетную запись для рассылки:',
          choices: sessions.map((session, index) => ({ title: session.name || `Учетная запись ${index + 1}`, value: session.session })),
          initial: 0
        });

        const client = new TelegramClient(new StringSession(selectedSession), apiId, apiHash, { baseLogger: new Logger('warn') });
        log.setLevel('silent');

        await client.connect();

        // Получить пути к файлам
        const { usernamesFilePath, messageFilePath, batchSize, waitTime } = await prompts([
          {
            type: 'text',
            name: 'usernamesFilePath',
            message: 'Введите путь к .txt файлу с чатами:',
            initial: config.usernamesFilePath || '', // Значение по умолчанию
            validate: path => fs.existsSync(cleanPath(path)) || 'Файл не существует'
          },
          {
            type: 'text',
            name: 'messageFilePath',
            message: 'Введите путь к .txt файлу с сообщением:',
            initial: config.messageFilePath || '', // Значение по умолчанию
            validate: path => fs.existsSync(cleanPath(path)) || 'Файл не существует'
          },
          {
            type: 'number',
            name: 'batchSize',
            message: 'Введите размер партии сообщений (например, 6):',
            initial: 6,
            min: 1
          },
          {
            type: 'number',
            name: 'waitTime',
            message: 'Введите время ожидания между партиями в секундах (например, 900):',
            initial: 900,
            min: 1
          }
        ]);

        // Очистить пути от кавычек
        const cleanedUsernamesFilePath = cleanPath(usernamesFilePath);
        const cleanedMessageFilePath = cleanPath(messageFilePath);

        // Сохранить пути к файлам в конфигурацию
        saveConfig({
          ...config,
          usernamesFilePath: cleanedUsernamesFilePath,
          messageFilePath: cleanedMessageFilePath
        });

        const usernames = readUsernamesFromFile(cleanedUsernamesFilePath);
        const message = readMessageFromFile(cleanedMessageFilePath);

        // Отправить сообщения партиями с задержкой между партиями
        await sendMessagesInBatches(client, usernames, batchSize, waitTime * 1000, message);

        console.log("Все сообщения отправлены.");
      }
    }
  }
};

main().catch(console.error);
