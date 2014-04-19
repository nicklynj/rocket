

/**
Executes a given function on every value in the given Array and returns false if
the given function never returns true.

@param {(Array|rocket.Elements)} array The Array.
@param {function(this:Object, Object, number, Object):Object} fnct
  The function to call for every value in this Array.
@param {Object=} opt_self
  The value to use as this when executing the given function.
@return {boolean} Whether the given function never returns true.
*/
rocket.some = function(array, fnct, opt_self) {

  if (Array.prototype.some) {

    rocket.some = function(array, fnct, opt_self) {
      return Array.prototype.some.call(array, fnct, opt_self);
    };

  } else {

    rocket.some = function(array, fnct, opt_self) {

      var i = 0;
      var len = array.length;

      for (; i < len; ++i) {
        if (fnct.call(opt_self, array[i], i, array)) {
          return true;
        }
      }

      return false;

    };

  }

  return rocket.some(array, fnct, opt_self);

};
