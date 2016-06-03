var assert = require('chai').assert;

// ----- _classList ----- //

var _classList = require('../js/lib/_classList');

describe('_classList', function() {
  describe('_classList', function () {
    it('must be an object', function () {
      assert.typeOf(_classList, 'object');
    });
  });

  describe('add', function () {
    it('must be a function', function () {
      assert.typeOf(_classList.add, 'function');
    });
  });

  describe('remove', function () {
    it('must be a function', function () {
      assert.typeOf(_classList.remove, 'function');
    });
  });

  describe('toggle', function () {
    it('must be a function', function () {
      assert.typeOf(_classList.toggle, 'function');
    });
  });

  describe('has', function () {
    it('must be a function', function () {
      assert.typeOf(_classList.has, 'function');
    });
  });
});
