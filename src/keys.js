

/**
Returns an Array of all of the keys of the given Object.

@param {!Object} object The Object or Array over which to iterate.
@return {Array.<string>} The keys of the given Object or Array.
@example
rocket.keys({'foo':'bar','foofoo':'barbar'});
// returns
['foo','foofoo']
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
