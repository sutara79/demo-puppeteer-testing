/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

describe('index.html', function () {
  const appUrl = 'http://localhost:8080/';
  let browser, page;

  before(async function () {
    browser = await puppeteer.launch();
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
