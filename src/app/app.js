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
    this.onChange = this.debounce(this.onChange, 250);

    this.addEventListeners();

    this.run();
  }

  run() {
    this.windowWidth = document.documentElement.clientWidth;
    this.imageList = document.querySelectorAll('[data-imlazy]');

    this.imageList.forEach(image => {
      // Add GUID to imlazy images.
      image.imlazyGUID = this.guid;

      if (this.isElementVisible(image)) this.load(image);
    });
  }

  addEventListeners() {
    window.addEventListener('resize', this.onChange);
    window.addEventListener('scroll', this.onChange);
    document.body.addEventListener('scroll', this.onChange);
  }

  onChange() {
    this.windowWidth = document.documentElement.clientWidth;

    this.imageList.forEach(image => {
      if (this.isElementVisible(image)) this.load(image);
    });
  }

  /**
   * Load image on supplied element.
   *
   * @param {HTMLElement} image [HTML element.]
   */
  load(image) {
    let jsonString = image.getAttribute('data-imlazy'),
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
      const DPR = this.getDevicePixelRation();
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

    if (image instanceof HTMLImageElement) {
      // Image.

      // Ensure that we have not loaded same image previously.
      if (image.getAttribute('src') === imageURL) return;
      image.setAttribute('src', imageURL);

      image.onload = (evt) => {
        image.classList.add('is-loaded');
        this.dispatchEvent('lazyload', [ evt, image ]);
      };

      image.onerror = (evt) => {
        console.error('[imlazy] A resource failed to load: %s', imageURL);
        this.dispatchEvent('lazyload', [ evt, image ]);
      };
    } else {
      // Other HTML element.

      // Ensure that we have not loaded same image previously.
      if (image.style.backgroundImage.slice(4, -1).replace(/"/g, "") === imageURL) return;

      // Create fake image to use its `load` and `error` events.
      const fakeImage = new Image();
      fakeImage.setAttribute('src', imageURL);

      // Place image on HTML element at the same time.
      image.style.backgroundImage = 'url('+ imageURL +')';

      fakeImage.onload = (evt) => {
        image.classList.add('is-loaded');
        this.dispatchEvent('lazyload', [ evt, image ]);
      };

      fakeImage.onerror = (evt) => {
        console.error('[imlazy] A resource failed to load: %s', imageURL);
        this.dispatchEvent('lazyload', [ evt, image ]);
      };
    }
  }

  setRetinaSuffix(string, value) {
    return string.substring(0, string.lastIndexOf(".")) + '@' + value + 'x' + string.substring(string.lastIndexOf("."));
  }

  /**
   * Detect high density screens.
   * @source http://stackoverflow.com/a/19690464
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
   * @return {Boolean} [Test results.]
   */
  isElementVisible(element) {
    const top = element.getBoundingClientRect().top,
    bottom = element.getBoundingClientRect().bottom;

    if (this.config.offset) {
      return bottom > 0 - this.defaults.preload && top < (document.documentElement.clientHeight + this.config.offset);
    } else {
      return bottom > 0 && top < document.documentElement.clientHeight;
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
 * @param {HTMLElement} element [HTML element.]
 * @return {Imlazy} [Imlazy instance.]
 */
Imlazy.data = function(element) {
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
