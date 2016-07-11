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
}

module.exports = debounce;
