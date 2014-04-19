

/**
Compare two Objects and determines if they contain identical properties.

Descends recursively into Objects.

@param {Object} a An Object to compare.
@param {Object} b An Object to compare.
@return {boolean} Whether the given Objects contain identical properties.
@test {true} Objects tested with rocket.equal.
rocket.equal({'a': 'b', 'c': [0, 1]}, {'a': 'b', 'c': [0, 1]});
@test {false} Objects tested with equal operator.
({'a': 'b', 'c': [0, 1]} === {'a': 'b', 'c': [0, 1]});
*/
rocket.equal = function(a, b) {

  if (
      a === null || typeof a !== 'object' ||
      b === null || typeof b !== 'object'
  ) {

    return a === b;

  } else {

    var a_is_array = rocket.isArray(a);
    var b_is_array = rocket.isArray(b);

    if (
        (a_is_array && !b_is_array) ||
        (!a_is_array && b_is_array)
    ) {
      return false;
    }

    for (var i in a) {
      if (!rocket.equal(a[i], b[i])) {
        return false;
      }
    }

    for (var i in b) {
      if (!(i in a)) {
        return false;
      }
    }

  }

  return true;

};
