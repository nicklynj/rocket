

/**
Executes a given function on every value in the given array and returns true if
and only if that given function never returns false.

@param {(Array|rocket.Elements)} array The Array.
@param {function(this:Object, Object, number, Object):Object} fnct
  The function to call for every value in this array.
@param {Object=} opt_self The value to use as this when executing the function.
@return {boolean} Whether the function never returns false.
*/
rocket.every = function(array, fnct, opt_self) {

  if (Array.prototype.every) {

    rocket.every = function(array, fnct, opt_self) {
      return Array.prototype.every.call(array, fnct, opt_self);
    };

  } else {

    rocket.every = function(array, fnct, opt_self) {

      var i = 0;
      var len = array.length;

      for (; i < len; ++i) {
        if (!fnct.call(opt_self, array[i], i, array)) {
          return false;
        }
      }

      return true;

    };

  }

  return rocket.every(array, fnct, opt_self);

};
