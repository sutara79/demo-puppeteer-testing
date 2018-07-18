const puppeteer = require('puppeteer');

module.exports = {
  /**
   * Get element from web page
   *
   * @param  {String} url
   * @param  {String} selector
   * @return {Object}         ElementHandle
   */
  getElement: async (url, selector) => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load'});
    const result = await page.$$(selector);
    browser.close();

    return result;
  }
};