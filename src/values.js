

/**
Returns an array of all of the values of an object.

@param {Object} object The Object or Array over which to iterate.
@return {Array.<Object>} The values of the object.

@test {["bara", "barb"]} An Object.
rocket.values ({"fooa": "bara", "foob": "barb"});

@test {[1, 2, 3]} An Array.
rocket.values([1, 2, 3]);

@test {[]} null.
rocket.values(null);

@test {[]} An empty Object.
rocket.values({});

@test {[]} undefined.
rocket.values(undefined);

@test {[]} No arguments.
rocket.values();

*/
rocket.values = function(object) {

  var values = [];

  for (var i in object) {
    values.push(object[i]);
  }

  return values;

};
