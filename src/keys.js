

/**
Returns an Array of all of the keys of the given Object.

An Array will be handled as an Object; therefore, its numeric integer keys
will be cast to strings.

@param {!Object} object The Object or Array over which to iterate.
@return {Array.<string>} The keys of the given Object or Array.

@test {['foo', 'bar']} Return the keys of an Object.
rocket.keys({'foo':'foofoo','bar':'barbar'});

@test {["0", "1", "2"]} Return the keys of an Array.
rocket.keys(['foo', 'bar', 'foobar']);

*/
rocket.keys = function(object) {

  if (Object.keys) {

    rocket.keys = Object.keys;

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
