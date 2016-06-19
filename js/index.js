const _classList = require('./lib/_classList');
const _utils = require('./lib/_utils');

class Imlazy {
  constructor() {
    // Get all images
    this.images = document.querySelectorAll('[data-imlazy]');

    // Load images
    this.processImages();

    // Bind `this` to processImages and store it.
    this.processImages = this.processImages.bind(this);

    // Make this.processImages function debounce invoking.
    this.processImages = _utils.debounce(this.processImages, 20);

    // Add event listener to load up corrent image on window resize.
    window.addEventListener('resize', this.processImages, false);

    // Add event listener to load up images on window scroll.
    window.addEventListener('scroll', this.processImages, false);
  }

  /**
   * Runs through `this.images` - passing individual elem object to `loadImage`.
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
   * @param  {[obj]} image [javascript dom object].
   */
  loadImage(image) {
    let imlazyData = image.getAttribute('data-imlazy'),
    windowWidth = window.innerWidth,
    nearest = null;

    // Extracting `imlazy` data from data attribute.
    let breakpoints = this.parseJson(imlazyData);
    
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
        image.style.backgroundImage = 'url('+ breakpoints[nearest] +')';
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
   * @return {[obj/arr]}       [Returns object or array].
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
