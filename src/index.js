import './shim/object.assign';

// Globally unique identifiers.
let GUID = 0;

// List of imlazy instances.
let instances = {};

class Imlazy {
  constructor(config) {
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
    this.onChange = this.debounce(this.onChange, 100);

    // Register listeners.
    this.addEventListeners();

    // Fetch imlazy DOM nodes.
    this.fetch();
  }

  /**
   * Get imlazy DOM nodes, and lazyload images.
   * @return {void}
   */
  fetch() {
    this.windowWidth = document.documentElement.clientWidth;
    this.windowHeight = document.documentElement.clientHeight;
    this.imageList = document.querySelectorAll('[data-imlazy]');

    // As NodeList.forEach is not supported in IE, we'll use
    //  Array.prototype.forEach instead.
    [].forEach.call(this.imageList, image => {
      // Add GUID to imlazy images.
      image.imlazyGUID = this.guid;

      if (this.isElementVisible(image)) this.load(image);
    });
  }

  /**
   * Register event listeners.
   * @return {void}
   */
  addEventListeners() {
    window.addEventListener('resize', this.onChange);
    window.addEventListener('scroll', this.onChange);
    document.body.addEventListener('scroll', this.onChange);
  }

  /**
   * On change event listener, checks if images are in view and loads them if
   *  needed.
   * @return {void}
   */
  onChange() {
    this.windowWidth = document.documentElement.clientWidth;
    this.windowHeight = document.documentElement.clientHeight;

    [].forEach.call(this.imageList, image => {
      if (this.isElementVisible(image)) this.load(image);
    });
  }

  /**
   * Load image on supplied element.
   *
   * @param {HTMLElement} target [HTML element.]
   * @return {void}
   */
  load(target) {
    let jsonString = target.getAttribute('data-imlazy'),
    data;

    try {
      data = JSON.parse(jsonString);
    } catch(e) {
      console.error('[imlazy] JSON.parse: %s', e);
      return; // run forest, run!
    }

    // Find nearest breakpoint.
    let nearestBreakpoint;

    for (let value in data) {
      let breakpoint = parseInt(value, 10);
      if (breakpoint <= this.windowWidth) nearestBreakpoint = breakpoint;
    }

    let imageURL = data[nearestBreakpoint];

    if (this.config.retina) {
      if (this.isHighDensity()) {
        let DPR = this.getDevicePixelRation();
        DPR = Math.round(DPR);

        if (DPR !== 1) {
          if (DPR > this.config.retina && typeof this.config.retina !== 'boolean') {
            imageURL = this.setRetinaSuffix(imageURL, this.config.retina);
          } else {
            imageURL = this.setRetinaSuffix(imageURL, DPR);
          }
        }
      }
    }

    if (target instanceof HTMLImageElement) {
      // Image.

      // Ensure that we have not loaded same image previously.
      if (target.getAttribute('src') === imageURL) return;
      target.setAttribute('src', imageURL);

      target.onload = (evt) => {
        target.classList.add('is-loaded');
        this.dispatchEvent('loaded', [ evt, target ]);
      };

      target.onerror = (evt) => {
        console.error('[imlazy] A resource failed to load: %s', imageURL);
        this.dispatchEvent('loaded', [ evt, target ]);
      };
    } else {
      // Other HTML element.

      // Ensure that we have not loaded same image previously.
      if (target.style.backgroundImage.slice(4, -1).replace(/"/g, "") === imageURL) return;

      // Create fake image to use its `load` and `error` events.
      const image = new Image();
      image.setAttribute('src', imageURL);

      // Place image on HTML element at the same time.
      target.style.backgroundImage = 'url('+ imageURL +')';

      image.onload = (evt) => {
        target.classList.add('is-loaded');
        this.dispatchEvent('loaded', [ null, target ]);
      };

      image.onerror = (evt) => {
        console.error('[imlazy] A resource failed to load: %s', imageURL);
        this.dispatchEvent('loaded', [ null, target ]);
      };
    }
  }

  /**
   * Add suffix to image url string.
   * @param {string} string [Image url.]
   * @param {string} value  [Suffix to add.]
   * @return {string} [String with suffix.]
   */
  setRetinaSuffix(string, value) {
    return string.substring(0, string.lastIndexOf(".")) + '@' + value + 'x' + string.substring(string.lastIndexOf("."));
  }

  /**
   * Detect high density screens.
   * @source http://stackoverflow.com/a/19690464
   * @return {void}
   */
  isHighDensity() {
    if (window.matchMedia) {
      var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      return (mq && mq.matches || (window.devicePixelRatio > 1));
    }

    return false;
  }

  /**
   * Check whether element is in view.
   * @param  {HTMLElement}  element [DOM node.]
   * @return {boolean} [Test results.]
   */
  isElementVisible(element) {
    const top = element.getBoundingClientRect().top,
    bottom = element.getBoundingClientRect().bottom;

    if (this.config.offset) {
      return bottom > (0 - this.config.offset) && top < (this.windowHeight + this.config.offset);
    } else {
      return bottom > 0 && top < this.windowHeight;
    }
  }

  /**
   * Return device pixel ratio.
   * @return {decimal} [DPR.]
   */
  getDevicePixelRation() {
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
   * @return {void}
   */
  on(type, listener) {
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
   * @return {void}
   */
  off(type, listener) {
    if (!this.events.hasOwnProperty(type)) return;

    let index = this.events[type].indexOf(listener);
    if (index !== -1) this.events[type].splice(index, 1);
  }

  /**
   * Dispatch the event.
   *
   * @param  {string} name [String representing the event type to listen for.]
   * @param  {array} args [Adding custom data to be retured to listener.]
   * @return {void}
   */
  dispatchEvent(type, args) {
    if (!this.events.hasOwnProperty(type)) return;

    if (!args || !args.length) args = [];

    let events = this.events[type];
    for (let i = 0, t = events.length; i < t; i++) {
      events[i].apply(null, args);
    }
  }

  /**
   * Detect when images have been loaded.
   * @param  {array, element, nodeList, string} element [Array, Element, NodeList, String.]
   * @param  {Function} callback [Function triggered after all images have been loaded.]
   * @return {void}
   */
  imagesLoaded(element, callback) {
    let imageCounter = 0;

    // Use element as selector string.
    if (typeof element === 'string') {
      element = document.querySelectorAll(element);
    }

    this.on('loaded', function(evt, target) {
      [].forEach.call(element, node => {
        if (node === target) {
          imageCounter++;

          if (element.length === imageCounter) {
            callback.apply(null, [element]);
            imageCounter = 0;
          }
        }
      });
    });
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
  debounce(func, wait, immediate) {
    let timeout;

    return () => {
      let args = arguments,
      callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        timeout = null;

        if (!immediate) func.apply(this, args);
      }, wait);

      if (callNow) func.apply(this, args);
    };
  }
}

/**
 * Get imlazy instance via it's element.
 *
 * @param {element, string} element [Element, String.]
 * @return {Imlazy} [Imlazy instance.]
 */
Imlazy.data = function(element) {
  // Use element as selector string.
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  // Make sure it's not empty.
  if (element !== null) {
    let id = element.imlazyGUID;
    return instances[id];
  } else {
    console.error('[imlazy] could not get Imlazy instance from %s', element);
  }
};

// Replace/Create the global namespace
window.Imlazy = Imlazy;

export default Imlazy;
