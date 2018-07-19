/**
 * @file Config for testing
 */
module.exports = {
  set: function () {
    process.env.MY_PORT     = 8080;
    process.env.MY_UNIT_URL = `http://localhost:${process.env.MY_PORT}/test/unit/`;
    process.env.MY_E2E_URL  = `http://localhost:${process.env.MY_PORT}/`;
    process.env.MY_E2E_FILE = './test/e2e/test.js';
  }
};