

/**
Executes a given function on every value in the given Array and returns an Array
of the return values of that given function.

@param {(Array|rocket.Elements)} array The Array.
@param {function(this:Object, Object, number, Object):Object} fnct
  The function to call for every value in this Array.
@param {Object=} opt_self The value to use as this when executing the function.
@return {Array} An array of the returns of the given function.
*/
rocket.map = function(array, fnct, opt_self) {

  if (Array.prototype.map) {

    rocket.map = function(array, fnct, opt_self) {
      return Array.prototype.map.call(array, fnct, opt_self);
    };

  } else {

    rocket.map = function(array, fnct, opt_self) {

      var i = 0;
      var len = array.length;
      var results = [];

      for (; i < len; ++i) {
        results[i] = fnct.call(opt_self, array[i], i, array);
      }

      return results;
    };

  }

  return rocket.map(array, fnct, opt_self);
};
