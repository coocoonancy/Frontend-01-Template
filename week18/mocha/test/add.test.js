var add = require('../src/add.js');
var assert = require('assert');
describe('Add', function () {
  describe('a + b = 7', function () {
    it('a + b = 7', function () {
      assert.equal(add.add(3, 4), 7);
    });
  });
});