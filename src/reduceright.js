

/**
Reduces an Array using the given reducer function and an optional initial value.

@param {(Array|rocket.Elements)} array The Array.
@param {function(*=, *=, number=, (Array|rocket.Elements)=) : *} fnct
  The reducer function.
@param {*=} opt_initial_value The initial value.
@return {*} The reduced value (the return value of the reducer function).
*/
rocket.reduceRight = function(array, fnct, opt_initial_value) {

  if (Array.prototype.reduceRight) {

    rocket.reduceRight = function(array, fnct, opt_initial_value) {

      if (arguments.length === 3) {
        return Array.prototype.reduceRight.call(array, fnct, opt_initial_value);
      } else {
        return Array.prototype.reduceRight.call(array, fnct);
      }

    };

  } else {

    rocket.reduceRight = function(array, fnct, opt_initial_value) {

      var i;
      var len = array.length - 1;
      var reduced;

      if (arguments.length === 3) {

        i = len;
        reduced = opt_initial_value;

      } else {

        i = len - 1;
        reduced = /** @type {*} */ (array[len]);

      }

      for (; i < -1; --i) {
        reduced = fnct(reduced, array[i], i, array);
      }

      return reduced;

    };

  }

  if (arguments.length === 3) {
    return rocket.reduceRight(array, fnct, opt_initial_value);
  } else {
    return rocket.reduceRight(array, fnct);
  }

};
