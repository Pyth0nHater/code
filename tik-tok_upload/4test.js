const puppeteer = require('puppeteer');

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  for(let i = 0;i<1000; i++){
  const page = await browser.newPage();
  page.goto('https://docs.google.com/forms/d/e/1FAIpQLScRxFk8g2xj14jeNbo7NeGQ_OVXTbtAAmDkF912degtI-LAhw/viewform')

  await sleep(1000)
  await page.click('#i5 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i30 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i40 > div.vd3tt > div');
  await sleep(100)

  await page.type('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(4) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input', 'Прошел опрос')
  await sleep(100)

  await page.click('#i54 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i73 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i83 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i97 > div.uHMk6b.fsHoPb');
  await sleep(100)

  await page.click('#i113 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i132 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i151 > div.vd3tt > div');
  await sleep(100)

  await page.type('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(12) > div > div > div.AgroKb > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea', 'как и просили')
  await sleep(100)

  await page.click('#i171 > div.vd3tt > div');
  await sleep(100)

  await page.click('#i191 > div.uHMk6b.fsHoPb');
  await sleep(100)

  await page.click('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span');
  await sleep(100)

}
})();