/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Globally unique identifiers.
	var GUID = 0;
	
	// List of imlazy instances.
	var instances = {};
	
	var Imlazy = function () {
	  function Imlazy(config) {
	    _classCallCheck(this, Imlazy);
	
	    this.config = Object.assign({
	      offset: document.documentElement.clientHeight,
	      retina: false
	    }, config);
	
	    // Initial properties.
	    this.events = {};
	
	    // Create GUID and push it to instances object.
	    this.guid = GUID++;
	    instances[this.guid] = this;
	
	    // Limit the rate at which a function can fire.
	    this.onChange = this.debounce(this.onChange, 250);
	
	    this.addEventListeners();
	
	    this.run();
	  }
	
	  _createClass(Imlazy, [{
	    key: 'run',
	    value: function run() {
	      var _this = this;
	
	      this.windowWidth = document.documentElement.clientWidth;
	      this.imageList = document.querySelectorAll('[data-imlazy]');
	
	      // As NodeList.forEach is not supported in IE, we'll use
	      //  Array.prototype.forEach instead.
	      [].forEach.call(this.imageList, function (image) {
	        // Add GUID to imlazy images.
	        image.imlazyGUID = _this.guid;
	
	        if (_this.isElementVisible(image)) _this.load(image);
	      });
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      window.addEventListener('resize', this.onChange);
	      window.addEventListener('scroll', this.onChange);
	      document.body.addEventListener('scroll', this.onChange);
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange() {
	      var _this2 = this;
	
	      this.windowWidth = document.documentElement.clientWidth;
	
	      [].forEach.call(this.imageList, function (image) {
	        if (_this2.isElementVisible(image)) _this2.load(image);
	      });
	    }
	
	    /**
	     * Load image on supplied element.
	     *
	     * @param {HTMLElement} target [HTML element.]
	     */
	
	  }, {
	    key: 'load',
	    value: function load(target) {
	      var _this3 = this;
	
	      var jsonString = target.getAttribute('data-imlazy'),
	          data = void 0;
	
	      try {
	        data = JSON.parse(jsonString);
	      } catch (e) {
	        console.error('[imlazy] JSON.parse: %s', e);
	        return; // run forest, run!
	      }
	
	      // Find nearest breakpoint.
	      var nearestBreakpoint = void 0;
	
	      for (var value in data) {
	        var breakpoint = parseInt(value, 10);
	        if (breakpoint <= this.windowWidth) nearestBreakpoint = breakpoint;
	      }
	
	      var imageURL = data[nearestBreakpoint];
	
	      if (this.config.retina) {
	        var DPR = this.getDevicePixelRation();
	        if (this.isHighDensity()) {
	
	          if (this.config.retina === 3) {
	            if (DPR >= 3) {
	              imageURL = this.setRetinaSuffix(imageURL, 3);
	            } else {
	              imageURL = this.setRetinaSuffix(imageURL, 2);
	            }
	          } else {
	            imageURL = this.setRetinaSuffix(imageURL, 2);
	          }
	        }
	      }
	
	      if (target instanceof HTMLImageElement) {
	        // Image.
	
	        // Ensure that we have not loaded same image previously.
	        if (target.getAttribute('src') === imageURL) return;
	        target.setAttribute('src', imageURL);
	
	        target.onload = function (evt) {
	          target.classList.add('is-loaded');
	          _this3.dispatchEvent('loaded', [evt, target]);
	        };
	
	        target.onerror = function (evt) {
	          console.error('[imlazy] A resource failed to load: %s', imageURL);
	          _this3.dispatchEvent('loaded', [evt, target]);
	        };
	      } else {
	        // Other HTML element.
	
	        // Ensure that we have not loaded same image previously.
	        if (target.style.backgroundImage.slice(4, -1).replace(/"/g, "") === imageURL) return;
	
	        // Create fake image to use its `load` and `error` events.
	        var image = new Image();
	        image.setAttribute('src', imageURL);
	
	        // Place image on HTML element at the same time.
	        target.style.backgroundImage = 'url(' + imageURL + ')';
	
	        image.onload = function (evt) {
	          target.classList.add('is-loaded');
	          _this3.dispatchEvent('loaded', [null, target]);
	        };
	
	        image.onerror = function (evt) {
	          console.error('[imlazy] A resource failed to load: %s', imageURL);
	          _this3.dispatchEvent('loaded', [null, target]);
	        };
	      }
	    }
	  }, {
	    key: 'setRetinaSuffix',
	    value: function setRetinaSuffix(string, value) {
	      return string.substring(0, string.lastIndexOf(".")) + '@' + value + 'x' + string.substring(string.lastIndexOf("."));
	    }
	
	    /**
	     * Detect high density screens.
	     * @source http://stackoverflow.com/a/19690464
	     */
	
	  }, {
	    key: 'isHighDensity',
	    value: function isHighDensity() {
	      if (window.matchMedia) {
	        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
	        return mq && mq.matches || window.devicePixelRatio > 1;
	      }
	
	      return false;
	    }
	
	    /**
	     * Check whether element is in view.
	     * @param  {HTMLElement}  element [DOM node.]
	     * @return {Boolean} [Test results.]
	     */
	
	  }, {
	    key: 'isElementVisible',
	    value: function isElementVisible(element) {
	      var top = element.getBoundingClientRect().top,
	          bottom = element.getBoundingClientRect().bottom;
	
	      if (this.config.offset) {
	        return bottom > 0 - this.config.offset && top < document.documentElement.clientHeight + this.config.offset;
	      } else {
	        return bottom > 0 && top < document.documentElement.clientHeight;
	      }
	    }
	
	    /**
	     * Return device pixel ratio.
	     * @return {decimal} [DPR.]
	     */
	
	  }, {
	    key: 'getDevicePixelRation',
	    value: function getDevicePixelRation() {
	      // Shim; Chances of a device that runs IE < 11 having a DPR of more than
	      //  1 are low enough that this is likely to offer the best reliability.
	      if (!window.devicePixelRatio) {
	        window.devicePixelRatio = 1;
	      }
	
	      return window.devicePixelRatio;
	    }
	
	    /**
	     * Bind event listener.
	     *
	     * @param  {string} name [String representing the event type to listen for.]
	     * @param  {function} listener [The object that receives a notification.]
	     */
	
	  }, {
	    key: 'on',
	    value: function on(type, listener) {
	      if (this.events.hasOwnProperty(type)) {
	        this.events[type].push(listener);
	      } else {
	        this.events[type] = [listener];
	      }
	    }
	
	    /**
	     * Unbind event listener.
	     *
	     * @param  {string} name [String representing the event type to listen for.]
	     * @param  {function} listener [The object that receives a notification.]
	     */
	
	  }, {
	    key: 'off',
	    value: function off(type, listener) {
	      if (!this.events.hasOwnProperty(type)) return;
	
	      var index = this.events[type].indexOf(listener);
	      if (index !== -1) this.events[type].splice(index, 1);
	    }
	
	    /**
	     * Dispatch the event.
	     *
	     * @param  {string} name [String representing the event type to listen for.]
	     * @param  {array} args [Adding custom data to be retured to listener.]
	     */
	
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(type, args) {
	      if (!this.events.hasOwnProperty(type)) return;
	
	      if (!args || !args.length) args = [];
	
	      var events = this.events[type];
	      for (var i = 0, t = events.length; i < t; i++) {
	        events[i].apply(null, args);
	      }
	    }
	
	    /**
	     * Creates a debounced function that delays invoking func until after wait
	     *  milliseconds have elapsed since the last time the debounced function was
	     *  invoked.
	     *
	     * @param  {function} func [Function to debounce.]
	     * @param  {integer} wait [To to wait.]
	     * @param  {boolean} immediate [Immediately invode function.]
	     * @return {function} [Debounced function.]
	     */
	
	  }, {
	    key: 'debounce',
	    value: function debounce(func, wait, immediate) {
	      var _arguments = arguments,
	          _this4 = this;
	
	      var timeout = void 0;
	
	      return function () {
	        var args = _arguments,
	            callNow = immediate && !timeout;
	
	        clearTimeout(timeout);
	
	        timeout = setTimeout(function () {
	          timeout = null;
	
	          if (!immediate) func.apply(_this4, args);
	        }, wait);
	
	        if (callNow) func.apply(_this4, args);
	      };
	    }
	  }]);
	
	  return Imlazy;
	}();
	
	/**
	 * Get imlazy instance via it's element.
	 *
	 * @param {HTMLElement} element [HTML element.]
	 * @return {Imlazy} [Imlazy instance.]
	 */
	
	
	Imlazy.data = function (element) {
	  // Make sure it's not empty.
	  if (element !== null) {
	    var id = element.imlazyGUID;
	    return instances[id];
	  } else {
	    console.error('[imlazy] could not get Imlazy instance from %s', element);
	  }
	};
	
	// Replace/Create the global namespace
	window.Imlazy = Imlazy;
	
	exports.default = Imlazy;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Polyfill for `object.assign`.
	 *
	 * @link https://polyfill.io/v2/docs/features/#Object_assign
	 */
	if (!('assign' in Object)) {
	  Object.assign = function assign(target, source) {
	    // eslint-disable-line no-unused-vars
	    for (var index = 1, key, src; index < arguments.length; ++index) {
	      src = arguments[index];
	
	      for (key in src) {
	        if (Object.prototype.hasOwnProperty.call(src, key)) {
	          target[key] = src[key];
	        }
	      }
	    }
	
	    return target;
	  };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=imlazy.pkgd.js.map