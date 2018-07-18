const puppeteer = require('puppeteer');
const assert = require("assert");

describe('TODOアプリのテスト', () => {
  const appUrl = 'http://localhost:8080/index.html';
  let browser, page;

  before(async () => {
    // CIとlocalでpuppeteerの起動パラメータを切り替える
    // const params = process.env.CI ? {
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // } : {
    //   headless: false,
    //   slowMo: 250
    // };
    const params = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    browser = await puppeteer.launch(params);
    page = await browser.newPage();
    page.on('console', console.log);
  });

  describe('画面遷移時', () => {
    before(async () => {
      await page.goto(appUrl, {waitUntil: 'networkidle2'});
    });

    it('タスクが2つ表示されていること', async () => {
      const tasks = await page.$$('.tasks li');
      assert.equal(tasks.length, 2);
    });
  });
  
  describe('新規タスク入力後', () => {

    const newTaskValue = '勉強するぞ！';

    before(async () => { 
      await page.type('.newTask', newTaskValue);
      await page.click('input[type=submit]');
    });

    it('タスクが3つ表示されること', async () => {
      const tasks = await page.$$('li');
      assert.equal(tasks.length, 3);
    });

    it('新規タスク入力フィールドが空になっていること', async () => {
      const val = await page.evaluate(() => 
        document.querySelector('.newTask').value
      );
      assert.equal(val, '');
    });

    it('最終行に表示されたタスクが新規入力したタスクと一致すること', async () => {
      const val = await page.evaluate(() => {
        const list = document.querySelectorAll('.tasks li');
        return list.length ? list[list.length-1].innerText : '';
      });
      assert.equal(val, newTaskValue);
    });

  });

  after(async () => {
    browser.close();
  });
});
