"use strict";

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
      },
      /**
       * Removes CSS class name from specified DOM element.
       * @param {[object]} elem      [DOM]
       * @param {[string]} className [CSS class name]
       */
      remove: function remove(elem, className) {
        if (elem.classList) {
          elem.classList.remove(className);
        } else {
          elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      },
      /**
       * Toggles CSS class on specified DOM element.
       * @param {[object]} elem      [DOM]
       * @param {[string]} className [CSS class name]
       */
      toggle: function toggle(elem, className) {
        if (elem.classList) {
          elem.classList.toggle(className);
        } else {
          var classes = elem.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
          } else {
            classes.push(className);
          }

          elem.className = classes.join(' ');
        }
      },
      /**
       * Checks if DOM element has specified CSS class name.
       * @param {[object]} elem      [DOM]
       * @param {[string]} className [CSS class name]
       */
      has: function has(elem, className) {
        if (elem.classList) {
          return elem.classList.contains(className);
        } else {
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
        }
      }
    };
  }, {}] }, {}, [1]);