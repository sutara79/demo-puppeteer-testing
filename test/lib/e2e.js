/**
 * @file Preparation for E2E testing
 */
const Mocha = require('mocha');

module.exports = {
  /**
   * Run E2E testing
   *
   * @return {String}         Report of testing
   */
  report: function () {
    console.log('\n# E2E testing');

    const mocha = new Mocha({
      timeout: 5000,
      ui: 'bdd',
      reporter: 'spec'
    });
    mocha.addFile('./test/e2e/test.js');
    return new Promise((resolve, reject) => {
      mocha.run(failures => {
        resolve(failures);
      });
    });
  }
};
