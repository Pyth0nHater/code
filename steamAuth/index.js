exports.config = {
  runner: 'local',
  port: 4723,
  path: '/wd/hub',
  specs: [
      './test/specs/**/*.js'
  ],
  capabilities: [{
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '11.0',
      'appium:app': '<путь_к_вашему_apk>',
      'appium:automationName': 'UiAutomator2'
  }],
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
      ui: 'bdd',
      timeout: 60000
  }
}
describe('Мой первый тест Appium', () => {
  it('должен открыть приложение и показать главный экран', async () => {
      const homeScreen = await $('~homeScreen');
      await expect(homeScreen).toBeDisplayed();
  });
});
