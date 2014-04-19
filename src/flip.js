

/**
Flips an Object's keys and values.

@param {Object} obj The Object.
@return {Object} The flipped Object.
@example
// given
var foo = {'a': 'b', 'c': 'd', 'e': 'd'};

rocket.flip(foo);
// returns
{'b': 'a', 'd': 'e'};
*/
rocket.flip = function(obj) {

  var results = {};

  for (var i in obj) {
    results[obj[i]] = i;
  }

  return results;

};
