

/**
Executes a given function on every value in this Array and returns an Array of
the values where the given function returned true.

@param {(Array|rocket.Elements)} array The Array.
@param {function(this:Object, Object, number, Object):*} fnct
  The function to call for every value in this Array.
@param {Object=} opt_self The value to use as this when executing the function.
@return {Array}
  An Array of values from this Array where the function returned true.
*/
rocket.filter = function(array, fnct, opt_self) {

  if (Array.prototype.filter) {

    rocket.filter = function(array, fnct, opt_self) {
      return Array.prototype.filter.call(array, fnct, opt_self);
    };

  } else {

    rocket.filter = function(array, fnct, opt_self) {

      var i = 0;
      var len = array.length;
      var results = [];

      for (; i < len; ++i) {
        if (fnct.call(opt_self, array[i], i, array)) {
          results.push(array[i]);
        }
      }

      return results;

    };

  }

  return rocket.filter(array, fnct, opt_self);

};
