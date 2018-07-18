const assert = require('assert');

const b = require('./before.js');

describe('My test', () => {
  let foo;
  b.b();
  it('should be true', () =>{
    assert(foo == 2);
  });
});
