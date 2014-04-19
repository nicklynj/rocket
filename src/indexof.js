

/**
Returns the first index at which a given property can be found in the given
Array, or the number negative one if the given property is not present in the
given Array.

@param {(Array|rocket.Elements)} array The Array.
@param {*} needle Property to locate in the Array.
@param {number=} opt_offset The position from which to start the search.
@return {number}
  The index of the located property or the number negative one if the property
  was not found.
*/
rocket.indexOf = function(array, needle, opt_offset) {

  if (Array.prototype.indexOf) {

    rocket.indexOf = function(array, needle, opt_offset) {
      return Array.prototype.indexOf.call(array, needle, opt_offset);
    };

  } else {

    rocket.indexOf = function(array, needle, opt_offset) {

      var i = opt_offset || 0;
      var len = array.length;

      for (; i < len; ++i) {
        if (needle === array[i]) {
          return i;
        }
      }

      return -1;

    };

  }

  return rocket.indexOf(array, needle, opt_offset);

};
