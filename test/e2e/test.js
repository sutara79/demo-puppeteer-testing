/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

describe('index.html', function () {
  // const appUrl = 'http://localhost:8080/';
  const appUrl = process.env.MY_E2E_URL;
  let browser, page;

  before(async function () {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    page = await browser.newPage();
    page.on('console', console.log);
    await page.goto(appUrl, {waitUntil: 'load'});
  });

  after(async function () {
    browser.close();
  });

  describe('Page load', function () {
    it('should empty', async function () {
      let year = await page.evaluate(() => {
        return document.querySelector('#year').textContent;
      });
      assert.equal(year, '');
    });
  });
  
  describe('Clicking button', function () {
    it('should get year', async function() {
      await page.click('#btn');
      let year = await page.evaluate(() => {
        return document.querySelector('#year').textContent;
      });
      assert(year.length == 4);
    });
  });
});
