

/**
Executes the given function on every value in the given Array.

@param {(Array|rocket.Elements)} array The Array.
@param {function(this:Object, Object, number, Object)} fnct
  The function to call for every value in this Array.
@param {Object=} opt_self
  The value to use as this when executing the given function.
*/
rocket.forEach = function(array, fnct, opt_self) {

  if (Array.prototype.forEach) {

    rocket.forEach = function(array, fnct, opt_self) {
      Array.prototype.forEach.call(array, fnct, opt_self);
    };

  } else {

    rocket.forEach = function(array, fnct, opt_self) {

      var i = 0;
      var len = array.length;

      for (; i < len; ++i) {
        fnct.call(opt_self, array[i], i, array);
      }

    };

  }

  rocket.forEach(array, fnct, opt_self);

};

