/**
 * @file Start point of unit and E2E testing.
 */
const server = require('./lib/server.js');
const unit   = require('./lib/unit.js');
const e2e    = require('./lib/e2e.js');

// NOTE:
// It is not possible to change port and url of E2E testing.
// It is hardcoded.
const port    = 8080;
const urlUnit = `http://localhost:${port}/test/unit/`;

(async () => {
  await server.start(port);
  await unit.report(urlUnit);
  await e2e.report();
  process.exit();
})();
