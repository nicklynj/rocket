

/**
Returns an Array of all of the keys of the given Object.

An Array will be handled as an Object; therefore, its numeric integer keys
will be cast to strings.

@param {!Object} object The Object or Array over which to iterate.
@return {Array.<string>} The keys of the given Object or Array.

@test {["fooa", "foob"]} An Object.
rocket.keys ({"fooa": "bara", "foob": "barb"});

@test {["0", "1", "2"]} An Array.
rocket.keys([1, 2, 3]);

@test {[]} null.
rocket.keys(null);

@test {[]} An empty Object.
rocket.keys({});

@test {[]} undefined.
rocket.keys(undefined);

@test {[]} No arguments.
rocket.keys();

*/
rocket.keys = function(object) {

  if (Object.keys) {

    rocket.keys = function(object) {

      if ((object !== null) && (typeof object === 'object')) {

        return Object.keys(object);

      } else {

        var keys = [];

        for (var i in object) {
          keys.push(i);
        }

        return keys;

      }

    };

  } else {

    rocket.keys = function(object) {

      var keys = [];

      for (var i in object) {
        keys.push(i);
      }

      return keys;

    };

  }

  return rocket.keys(object);

};
