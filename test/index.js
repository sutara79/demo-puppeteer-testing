const server = require('./lib/http-server.js');
const page = require('./lib/web-page.js');

let port = 8080;
let url = `http://localhost:${port}/test/e2e/index.html`;

(async () => {
  await server.start(port);
  console.log(await page.getElement(url, '#mocha'));
  process.exit();
})();
