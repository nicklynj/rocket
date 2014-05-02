

/**
Clones or deep copies an Object.

Returns the clone or deep copy of the Object.

@param {Object} obj The Object to clone or deep copy.
@return {Object} The clone or deep copy of the Object.
@see {rocket.equal}

@test {{'a': 'b', 'c': [0, 1]}} Clone an Object.
rocket.clone({'a': 'b', 'c': [0, 1]});

@test {false} Cloned objects containing the same properties are not equal.
var foo = {'a': 'b', 'c': [0, 1]};
(foo === rocket.clone(foo));

@test {false} Object properties on cloned objects are not equal.
var foo = {'a': 'b', 'c': [0, 1]};
(foo.c === rocket.clone(foo).c);

@test {true} rocket.equal could be used to compare cloned objects.
var foo = {'a': 'b', 'c': [0, 1]};
rocket.equal(foo, rocket.clone(foo));

*/
rocket.clone = function(obj) {

  var clone;

  if (obj === null || typeof obj !== 'object') {

    return obj;

  } else if (rocket.isArray(obj)) {

    clone = [];

    for (var i = 0, len = /** @type {Array} */ (obj).length; i < len; ++i) {
      clone.push(obj[i]);
    }

    return clone;

  } else {

    clone = {};

    for (var i in obj) {
      clone[i] = rocket.clone(obj[i]);
    }

    return clone;

  }

};
