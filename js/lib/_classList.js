/**
 * Class helper functions.
 */
module.exports = {
  /**
   * Adds CSS class name to specified DOM element.
   * @param {[object]} elem      [DOM]
   * @param {[string]} className [CSS class name]
   */
  add: function(elem, className) {
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
  remove: function(elem, className) {
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
  toggle: function(elem, className) {
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
  has: function(elem, className) {
    if (elem.classList) {
      return elem.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
    }
  }
};
