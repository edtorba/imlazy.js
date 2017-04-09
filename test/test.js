var assert = chai.assert;

describe('Imlazy Class', function() {
  var imlzy;

  beforeEach(function() {
    imlzy = new Imlazy();
  });

  it('create new Imlazy instance', function() {
    assert.typeOf(imlzy, 'object');
  });

  it('setRetinaSuffix should set @2x', function() {
    assert.equal(imlzy.setRetinaSuffix('foo.jpg', 2), 'foo@2x.jpg');
  });

  it('getDevicePixelRation should return DPR', function() {
    // Shim; Chances of a device that runs IE < 11 having a DPR of more than
    //  1 are low enough that this is likely to offer the best reliability.
    if (!window.devicePixelRatio) {
      window.devicePixelRatio = 1;
    }

    assert.equal(imlzy.getDevicePixelRation(), window.devicePixelRatio);
  });

  describe('events', function() {
    it('should have method `on`', function() {
      assert.typeOf(imlzy.on, 'function');
    });

    it('should have method `off`', function() {
      assert.typeOf(imlzy.on, 'function');
    });
  });

  describe('api', function() {
    it('should have method `fetch`', function() {
      assert.typeOf(imlzy.fetch, 'function');
    });

    describe('data', function() {
      it('should have method `data`', function() {
        assert.typeOf(Imlazy.data, 'function');
      });

      it('should return imlazy instance', function() {
        var image = document.querySelector('[data-imlazy]');
        var instance = Imlazy.data(image);
        assert.typeOf(instance, 'object');
      });
    });

    describe('imagesLoaded', function() {
      it('should have method `imagesLoaded`', function() {
        assert.typeOf(imlzy.imagesLoaded, 'function');
      });

      it('should lazyload 3 group B images', function() {
        var imagesB = document.querySelectorAll('.js-group-b');
        imlzy.imagesLoaded(imagesB, function(nodeList) {
          assert.equal(nodelist.length, 3);
        });
      });

      it('should lazyload 1 group A image', function() {
        var imagesB = document.querySelectorAll('.js-group-b');
        imlzy.imagesLoaded(imagesB, function(nodeList) {
          assert.equal(nodelist.length, 1);
        });
      });
    });
  });
});
