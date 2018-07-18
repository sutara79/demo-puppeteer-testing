const connect = require('connect');
const serveStatic = require('serve-static');
const Mocha = require('mocha');

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

const runTest = () => {
  const mocha = new Mocha({
    timeout: 5000,
    ui: 'bdd',
    reporter: 'spec'
  });
  mocha.addFile('./test/todo.spec.js');
  return new Promise((resolve, reject) => {
    mocha.run(failures => {
      resolve(failures);
    });
  });
};

(async () => {
  const server = await runHttpServer();
  const failures = await runTest();
  console.log('failures', failures);
  process.exit();
})();
