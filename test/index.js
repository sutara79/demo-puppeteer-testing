const connect = require('connect');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');

const runHttpServer = () => {
  const server = connect();
  server.use(serveStatic('./'));
  console.log('Server running on 8080');
  return new Promise((resolve, reject) => {
    server.listen(8080, () => {
      return resolve(server)
    });
  });
};

const runTest = async () => {
  const appUrl = 'http://localhost:8080/test/e2e/index.html';
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(appUrl, {waitUntil: 'load'});

  // const result = await page.evaluate((selector) => {
  //   return document.querySelector(selector).textContent;
  // }, '#mocha');
  // const result = await page.$$('#mocha');

  // console.log(result);

  var result = await page.evaluate((selector) => {
    if (document.querySelector(selector) == null) {
      return 'OK';
    } else {
      return 'Fail';
    }
  }, '#mocha .fail');
  console.log(result);


  browser.close();
};

(async () => {
  await runHttpServer();
  await runTest();
  process.exit();
})();
