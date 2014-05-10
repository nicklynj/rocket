

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

@test {true} Clone an Object with circular references.
var foo = {};
var bar = {};

foo.foo = bar;
bar.bar = foo;

rocket.equal(foo, rocket.clone(foo));

*/
rocket.clone = function(obj) {

  return rocket.clone.clone_(obj, [], []);

};


/**
Clone heler.

@private
@param {Object} obj
@param {Array.<Object>} references
@param {Array.<Object>} copies
@return {Object}
*/
rocket.clone.clone_ = function(obj, references, copies) {

  var clone;

  if (obj === null || typeof obj !== 'object') {

    return obj;

  }

  var pos = rocket.indexOf(references, obj);

  if (pos !== -1) {

    return copies[pos];

  }

  if (rocket.isArray(obj)) {

    clone = [];

    references.push(obj);
    copies.push(clone);

    for (var i = 0, len = /** @type {Array} */ (obj).length; i < len; ++i) {
      clone.push(rocket.clone.clone_(obj[i], references, copies));
    }

  } else {

    clone = {};

    references.push(obj);
    copies.push(clone);

    for (var i in obj) {
      clone[i] = rocket.clone.clone_(obj[i], references, copies);
    }

  }

  return clone;

};
