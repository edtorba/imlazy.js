function Imlazy(options) {
  // Defaults.
  this.defaults = {
    preload: 0
  };

  // Override defaults with user specified options.
  this.defaults = Object.assign(this.defaults, options);

  // Get images.
  this.imageBucket = document.querySelectorAll('[data-imlazy]');

  // Bind `this` to `run` function.
  this.run = this.run.bind(this);

  // Run on initial load.
  this.run();

  // Set debounce on `run`.
  this.run = this.debounce(this.run, 20);

  // Event listeners.
  window.addEventListener('resize', this.run, false);
  window.addEventListener('scroll', this.run, false);
}

var proto = Imlazy.prototype;

/**
 * Iterate through image bucket.
 */
proto.run = function() {
  for (var i = 0, t = this.imageBucket.length; i < t; i++) {
    var image = this.imageBucket[i];

    if (this.isElementInView(image)) {
      this.load(image);
    }
  }
};

/**
 * Extract `imlazy` data and set appropriate image.
 *
 * @param {object} node [DOM node.]
 */
proto.load = function(node) {
  var JSONData = node.getAttribute('data-imlazy'),
  windowWidth = window.innerWidth,
  nearestBreakpoint = null;

  // Quit if data is empty.
  if (JSONData === null) {
    console.error('imlazy: Couldn\'t retrieve JSON data for ', node);
    return;
  }

  // Parse JSON.
  var breakpoints = this.parseJSON(JSONData);

  if (breakpoints !== undefined) {

    // Find nearest breakpoint.
    for (var key in breakpoints) {
      var breakpoint = parseInt(key, 10);

      if (breakpoint <= windowWidth) nearestBreakpoint = breakpoint;
    }

    var _this = this;
    // Place image.
    if (this.isImageElement(node)) {
      if (node.getAttribute('src') !== breakpoints[nearestBreakpoint]) {
        node.setAttribute('src', breakpoints[nearestBreakpoint]);

        node.onload = function(evt) {
          // Add `is-loaded` class.
          if (!_this.classlist.contains(node, 'is-loaded'))
            _this.classlist.add(node, 'is-loaded');
        };

        node.onerror = function(evt) {
          console.error('imlazy: Couldn\'t load ', breakpoints[nearestBreakpoint]);
        };
      }
    } else {
      // Not image element.
      if (node.style.backgroundImage.slice(4, -1).replace(/"/g, "") !== breakpoints[nearestBreakpoint]) {
        var image = new Image();
        image.setAttribute('src', breakpoints[nearestBreakpoint]);

        image.onload = function(evt) {
          node.style.backgroundImage = 'url(' + breakpoints[nearestBreakpoint] + ')';

          // Add `is-loaded` class.
          if (!_this.classlist.contains(node, 'is-loaded'))
            _this.classlist.add(node, 'is-loaded');
        };

        image.onerror = function(evt) {
          console.error('imlazy: Couldn\'t load ', breakpoints[nearestBreakpoint]);
        };
      }
    }
  }
};

/**
 * Check if element is in view.
 *
 * @param {object} elem [DOM node.]
 * @return {boolean}
 */
proto.isElementInView = function(elem, preload) {

  var rect = elem.getBoundingClientRect();

  if (this.defaults.preload) {
    return rect.bottom > 0 - this.defaults.preload &&
        rect.top < ((window.innerHeight || document.documentElement.clientHeight) + this.defaults.preload);
  } else {
    return rect.bottom > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }
};

/**
* Check if node is image element or not.
*
* @param {object} node [DOM node.]
* @return {boolean}
*/
proto.isImageElement = function(node) {
  return node instanceof HTMLImageElement;
};

/**
* Parse JSON, if fails throw error messege to console.
*
* @param  {string} string [JSON string.]
* @return {object} [Returns data object.]
*/
proto.parseJSON = function(string) {
  try {
    return JSON.parse(string);
  } catch(e) {
    console.error("parseJson error: %s", e);
  }
};

proto.classlist = {
  /**
   * Add specified class values. If these classes already exist in attribute of
   *   the element, then they are ignored.
   *
   * @example add(elem, 'foo');
   * @example add(elem, 'foo', 'bar');
   *
   * @param {object} elem [DOM node.]
   * @param {rest} classnames [Class value.]
   */
  add: function(elem) {
    for (var _len = arguments.length, classnames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classnames[_key - 1] = arguments[_key];
    }

    if (elem.classList) {
      for (var i = 0, t = classnames.length; i < t; i++) {
        elem.classList.add(classnames[i]);
      }
    } else {
      for (var _i = 0, _t = classnames.length; _i < _t; _i++) {
        elem.className += ' ' + classnames[_i];
      }
    }
  },
  /**
   * Check if classes already exist in attribute of the element.
   *
   * @example contains(elem, 'foo');
   *
   * @param {obj} elem [DOM node.]
   * @param {str} classnames [Class value.]
   */
  contains: function(elem, selector) {
    if (elem.classList) {
      return elem.classList.contains(selector);
    } else {
      return new RegExp('(^| )' + selector + '( |$)', 'gi').test(elem.className);
    }
  }
};

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
proto.debounce = function(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this,
    args = arguments;
    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(function() {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) func.apply(context, args);
  };
};

// Replace/Create the global namespace
window.Imlazy = Imlazy;

/**
 * Polyfill for `object.assign`.
 *
 * @link https://polyfill.io/v2/docs/features/#Object_assign
 */
if (!('assign' in Object)) {
  Object.assign = function assign(target, source) { // eslint-disable-line no-unused-vars
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
