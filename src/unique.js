

/**
Removes duplicates from an Array.

Removes strictly equal values from the Array.

@param {Array} arr The Array.
@return {Array} An Array with duplicate values removed.
@example
// given
var foo = [0,0,1,1,2,2,3,"3"];

rocket.unique(foo);
// returns
[0, 1, 2, 3, "3"]
*/
rocket.unique = function(arr) {

  var results = [];

  for (var i = 0, len = arr.length; i < len; ++i) {
    if (rocket.indexOf(results, arr[i]) === -1) {
      results.push(arr[i]);
    }
  }

  return results;

};
