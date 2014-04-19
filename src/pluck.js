

/**
Plucks one key attribute from each Object in an Array of Objects and
returns those attributes in an Array.

@param {Array} array The Array.
@param {string} key The key in the given Array.
@return {Array} An Array of the key values from the given Array.
@example
rocket.pluck([{'foo':'bar1'},{'foo':'bar2'}], 'foo');
// returns
['bar1','bar2']
*/
rocket.pluck = function(array, key) {

  var results = [];

  for (var i in array) {
    results.push(array[i][key]);
  }

  return results;

};
