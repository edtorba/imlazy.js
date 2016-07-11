const _classList = require('./lib/_classList');
const _debounce = require('./lib/_debounce');

class Imlazy {
  constructor() {
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
  processImages() {
    for(var i = 0, t = this.images.length; i < t; i++) {
      let image = this.images[i];
      if (this.isElemInView(image)) {
        this.loadImage(image);
      }
    }
  }

  /**
   * Extracts `imlazy` data attribute, analyzes it and sets image to an element.
   * @param  {[obj]} image [Node obj.]
   */
  loadImage(node) {
    let jsonData = node.getAttribute('data-imlazy'),
    windowWidth = window.innerWidth,
    nearest = null;

    // Extract `imlazy` data from data attribute.
    let breakpoints = this.parseJson(jsonData);

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

        node.onload = function(evt) {
          // Place `is-loaded` class on node.
          _classList.add(node, 'is-loaded');
        };
      } else {
        node.style.backgroundImage = 'url('+ breakpoints[nearest] +')';

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
  isElemInView(elem) {
    let elemTop = elem.getBoundingClientRect().top,
    elemBottom = elem.getBoundingClientRect().bottom;

    return elemTop < window.innerHeight && elemBottom >= 0;
  }

  /**
   * Tells if a js object is an Image or not.
   * @param  {[obj]}  elem [javascript dom object].
   * @return {Boolean}
   */
  isImage(elem) {
    return elem instanceof HTMLImageElement;
  }

  /**
   * Parse JSON, if failes throw error messege to console.
   * @param  {[string]} string [JSON string].
   * @return {[obj/arr]} [Returns object or array].
   */
  parseJson(string) {
    try {
      return JSON.parse(string);
    } catch(e) {
      console.error("parseJson error: %s", e);
    }
  }
}

// Replace/Create the global namespace
window.Imlazy = Imlazy;
