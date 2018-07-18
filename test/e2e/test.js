/**
 *  @file Unit testing
 *  Do not use ES6 or later.
 */
describe('jquery.set-year.js', function() {
  var int_year;

  beforeEach(function() {
    int_year = $('<div>').setYear().text();
  });

  it('int_year should be above 2000', function() {
    assert(parseInt(int_year, 10) > 2000);
    assert(1 == 1);
  });

  it('length of int_year should be 4', function() {
    assert(int_year.length == 4);
    assert(1 == 1);
  });
});

describe('FOO', () => {
  it('bar1', () => {
    assert(1 == 1);
  });
  describe('Bar', () => {
    it('bar2', () => {
      assert(1 == 1);
    });
  })
});
it('bar1', () => {
  assert(1 == 1);
});