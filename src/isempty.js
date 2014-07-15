

/**
Returns whether a given Object is empty.

Returns whether the given Object does not contain any properties.

@param {(Object|null|undefined)} obj The object.
@return {boolean} Whether the given Object is empty.

@test {true} An empty Array.
rocket.isEmpty([]);

@test {true} An empty Object.
rocket.isEmpty({});

@test {false} A non empty Array.
rocket.isEmpty(['foo']);

@test {false} A non empty Object.
rocket.isEmpty({'foo': 'bar'});

@test {false} A non empty Object.
rocket.isEmpty({'foo': 'bar'});

@test {true} No arguments.
rocket.isEmpty();

@test {true} null.
rocket.isEmpty(null);

@test {true} undefined.
rocket.isEmpty(undefined);

@test {true} false.
rocket.isEmpty(false);

@test {true} true.
rocket.isEmpty(true);

@test {false} A string.
rocket.isEmpty("foo");

@test {true} An empty string.
rocket.isEmpty("");

*/
rocket.isEmpty = function(obj) {

  for (var i in obj) {
    return false;
  }

  return true;

};
