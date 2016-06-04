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
  }
};
