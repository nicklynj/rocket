

/**
Plucks one key attribute from each Object in an Array of Objects and
returns those attributes in an Array.

This does not filter or remove undefined or falsey values.

@param {Array} array The Array.
@param {string} key The key in the given Array.
@return {Array} An Array of the key values from the given Array.

@test {['foo', 'bar']} Pluck "foo" from an Array.
rocket.pluck([{'foo': 'foo'}, {'foo': 'bar'}], 'foo');

@test {[]} Pluck "foo" from an empty Array.
rocket.pluck([], 'foo');

@test {['foo', 'bar', undefined]}
  Pluck "foo" from an Array containing an Object without the key "foo".
rocket.pluck([{'foo': 'foo'}, {'foo': 'bar'}, {'bar': 'bar'}], 'foo');

@test {['a', 'd', 'g']}
  Pluck "0" from an Array of Array.
rocket.pluck([['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']], '0');

*/
rocket.pluck = function(array, key) {

  var results = [];

  for (var i in array) {
    results.push(array[i][key]);
  }

  return results;

};
