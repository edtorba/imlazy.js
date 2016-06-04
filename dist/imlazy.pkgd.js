/*!
 * Imlazy.js PACKAGED v1.0.0
 * A lightweight vanilla js plugin to lazy load images.
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

    var Imlazy = function () {
      /**
       * TODO: unit tests
       */

      function Imlazy(selector) {
        _classCallCheck(this, Imlazy);

        // Get all images
        this.images = document.querySelectorAll(selector);

        // Load images
        this.processImages();

        // Add event listener to load up corrent image on window resize.
        window.addEventListener('resize', this.processImages.bind(this), false);

        // Add event listener to load up images on window scroll.
        window.addEventListener('scroll', this.processImages.bind(this), false);
      }

      /**
       * Runs through `this.images` - passing individual elem object to `loadImage`.
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
      }, {
        key: "loadImage",
        value: function loadImage(image) {
          var imlazyData = image.getAttribute('data-imlazy'),
              windowWidth = window.innerWidth,
              nearest = null;

          // Extracting `imlazy` data from data attribute.
          var breakpoints = this.parseJson(imlazyData);

          // Check if extraction process was successfull.
          if (breakpoints !== undefined) {

            // Find nearest breakpoint.
            for (var key in breakpoints) {
              // As breakpoint was passed as string, we have to parse it to integer.
              var breakpoint = parseInt(key, 10);

              if (breakpoint <= windowWidth) nearest = key;
            }

            // Set image to elem object.
            if (this.isImage(image)) {
              image.setAttribute('src', breakpoints[nearest]);
            } else {
              image.style.backgroundImage = 'url(' + breakpoints[nearest] + ')';
            }

            // Add `is-loaded`
            _classList.add(image, 'is-loaded');
          }
        }

        /**
         * Check if element is in view.
         * @param  {[obj]}  elem [javascript dom object].
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
         * @return {[obj/arr]}       [Returns object or array].
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
  }, { "./lib/_classList": 2 }], 2: [function (require, module, exports) {
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
  }, {}] }, {}, [1]);