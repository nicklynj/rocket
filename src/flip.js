

/**
Flips an Object's keys and values.

@param {Object} obj The Object.
@return {Object} The flipped Object.

@test {{'b': 'a', 'd': 'e'}} Flip an Object.
rocket.flip({'a': 'b', 'c': 'd', 'e': 'd'});

@test {{'1': 'b'}} Flip an Object with duplicate values.
rocket.flip({'a': 1, 'b': 1});

@test {{}} Flip an empty Object.
rocket.flip({});

*/
rocket.flip = function(obj) {

  var results = {};

  for (var i in obj) {
    results[obj[i]] = i;
  }

  return results;

};
