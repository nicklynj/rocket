

/**
Returns the last index at which a given property can be found in the given
Array, or the number negative one if the given property is not present in the
given Array.

@param {(Array|rocket.Elements)} array The Array.
@param {*} needle Property to locate in the Array.
@param {number=} opt_offset The position from which to start the search.
@return {number}
  The index of the located property or the number negative one if the property
  was not found.
*/
rocket.lastIndexOf = function(array, needle, opt_offset) {

  if (Array.prototype.lastIndexOf) {

    rocket.lastIndexOf = function(array, needle, opt_offset) {

      return Array.prototype.lastIndexOf.apply(
          array,
          Array.prototype.slice.call(arguments, 1)
      );

    };

  } else {

    rocket.lastIndexOf = function(array, needle, opt_offset) {

      var i;
      var len = array.length - 1;

      if (arguments.length === 2) {

        i = len;

      } else {

        i = Math.min(len, opt_offset);

      }

      for (; i > -1; --i) {
        if (needle === array[i]) {
          return i;
        }
      }

      return -1;

    };

  }

  return rocket.lastIndexOf.apply(window, arguments);

};
