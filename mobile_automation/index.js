const wd = require('wd');

// Настройки сервера
const serverConfig = {
    host: '77.91.87.68',
    port: 4723,
    path: '/'  // Используйте корневой путь для Appium v2.x
};

// Желаемые возможности (W3C формат)
const w3cCaps = {
    alwaysMatch: {
        platformName: 'Android',
        platformVersion: '11.0',
        deviceName: 'emulator-5554',
        automationName: 'UiAutomator2',
        app: 'C:\\path\\to\\your\\app.apk'  // путь к приложению на вашем ПК
    },
    firstMatch: [{}]
};

// Инициализация драйвера
const driver = wd.promiseChainRemote(serverConfig);

driver.init(w3cCaps)
  .then(() => {
      console.log('Appium session started');
      // Добавьте сюда ваши тесты
  })
  .catch(err => {
      console.error('Error:', err);
  });
