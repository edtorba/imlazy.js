/*!
 * Imlazy.js PACKAGED v1.1.0
 * A lightweight vanilla JS plugin to lazy load images.
 *
 * Licensed MIT License (MIT)
 *
 * http://edtorba.com
 * Copyright 2016 Eduards Torba
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var _classList = require('./lib/_classList');
    var _debounce = require('./lib/_debounce');

    var Imlazy = function () {
      function Imlazy() {
        _classCallCheck(this, Imlazy);

        // Get all images.
        this.images = document.querySelectorAll('[data-imlazy]');

        // Load images.
        this.processImages();

        // Bind `this` to processImages and store it.
        this.processImages = this.processImages.bind(this);

        // Make this.processImages function debounce invoking.
        this.processImages = _debounce(this.processImages, 20);

        // Add event listener to load up corrent image on window resize.
        window.addEventListener('resize', this.processImages, false);

        // Add event listener to load up images on window scroll.
        window.addEventListener('scroll', this.processImages, false);
      }

      /**
       * Iterate through `this.images`, passing individual object to `loadImage`.
       */


      _createClass(Imlazy, [{
        key: "processImages",
        value: function processImages() {
          for (var i = 0, t = this.images.length; i < t; i++) {
            var image = this.images[i];
            if (this.isElemInView(image)) {
              this.loadImage(image);
            }
          }
        }

        /**
         * Extracts `imlazy` data attribute, analyzes it and sets image to an element.
         * @param  {[obj]} image [Node obj.]
         */

      }, {
        key: "loadImage",
        value: function loadImage(node) {
          var jsonData = node.getAttribute('data-imlazy'),
              windowWidth = window.innerWidth,
              nearest = null;

          // Extract `imlazy` data from data attribute.
          var breakpoints = this.parseJson(jsonData);

          // Check if extraction process was successfull.
          if (breakpoints !== undefined) {

            // Find nearest breakpoint.
            for (var key in breakpoints) {
              // Breakpoint was passed as string, parse it to integer.
              var breakpoint = parseInt(key, 10);

              if (breakpoint <= windowWidth) nearest = key;
            }

            // Set image.
            if (this.isImage(node)) {
              node.setAttribute('src', breakpoints[nearest]);

              node.onload = function (evt) {
                // Place `is-loaded` class on node.
                _classList.add(node, 'is-loaded');
              };
            } else {
              node.style.backgroundImage = 'url(' + breakpoints[nearest] + ')';

              // Place `is-loaded` class on node.
              _classList.add(node, 'is-loaded');
            }
          }
        }

        /**
         * Check if element is in view.
         * @param  {[obj]}  elem [Node obj.]
         * @return {Boolean}
         */

      }, {
        key: "isElemInView",
        value: function isElemInView(elem) {
          var elemTop = elem.getBoundingClientRect().top,
              elemBottom = elem.getBoundingClientRect().bottom;

          return elemTop < window.innerHeight && elemBottom >= 0;
        }

        /**
         * Tells if a js object is an Image or not.
         * @param  {[obj]}  elem [javascript dom object].
         * @return {Boolean}
         */

      }, {
        key: "isImage",
        value: function isImage(elem) {
          return elem instanceof HTMLImageElement;
        }

        /**
         * Parse JSON, if failes throw error messege to console.
         * @param  {[string]} string [JSON string].
         * @return {[obj/arr]} [Returns object or array].
         */

      }, {
        key: "parseJson",
        value: function parseJson(string) {
          try {
            return JSON.parse(string);
          } catch (e) {
            console.error("parseJson error: %s", e);
          }
        }
      }]);

      return Imlazy;
    }();

    // Replace/Create the global namespace


    window.Imlazy = Imlazy;
  }, { "./lib/_classList": 2, "./lib/_debounce": 3 }], 2: [function (require, module, exports) {
    /**
     * Class helper functions.
     */
    module.exports = {
      /**
       * Adds CSS class name to specified DOM element.
       * @param {[object]} elem      [DOM]
       * @param {[string]} className [CSS class name]
       */
      add: function add(elem, className) {
        if (elem.classList) {
          elem.classList.add(className);
        } else {
          elem.className += ' ' + className;
        }
      }
    };
  }, {}], 3: [function (require, module, exports) {
    /**
     * Debounce
     *
     * Creates a debounced function that delays invoking func until after wait
     * milliseconds have elapsed since the last time the debounced function was
     * invoked.
     *
     * @param  {[func]} func [Function to debounce.]
     * @param  {[int]} wait [To to wait.]
     * @param  {[bool]} immediate [Immediately invode function.]
     * @return {[func]} [Debounced function.]
     */
    function debounce(func, wait, immediate) {
      var timeout;

      return function () {
        var context = this,
            args = arguments;
        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(function () {
          timeout = null;

          if (!immediate) {
            func.apply(context, args);
          }
        }, wait);

        if (callNow) func.apply(context, args);
      };
    }

    module.exports = debounce;
  }, {}] }, {}, [1]);