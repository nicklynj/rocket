

/**
Reduces an Array using the given reducer function and an optional initial value.

@param {(Array|rocket.Elements)} array The Array.
@param {function(*=, *=, number=, (Array|rocket.Elements)=) : *} fnct
  The reducer function.
@param {*=} opt_initial_value The initial value.
@return {*} The reduced value (the return value of the reducer function).
*/
rocket.reduce = function(array, fnct, opt_initial_value) {

  if (Array.prototype.reduce) {

    rocket.reduce = function(array, fnct, opt_initial_value) {

      if (arguments.length === 3) {
        return Array.prototype.reduce.call(array, fnct, opt_initial_value);
      } else {
        return Array.prototype.reduce.call(array, fnct);
      }

    };

  } else {

    rocket.reduce = function(array, fnct, opt_initial_value) {

      var i;
      var len = array.length;
      var reduced;

      if (arguments.length === 3) {

        i = 0;
        reduced = opt_initial_value;

      } else {

        i = 1;
        reduced = /** @type {*} */ (array[0]);

      }

      for (; i < len; ++i) {
        reduced = fnct(reduced, array[i], i, array);
      }

      return reduced;

    };

  }

  if (arguments.length === 3) {
    return rocket.reduce(array, fnct, opt_initial_value);
  } else {
    return rocket.reduce(array, fnct);
  }

};
