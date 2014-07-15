

/**
Returns whether the given Object is an Array.

This does not strictly check if the Object is an instance of Array.

An object with a integer length property is considered an Array.

However, with one exception, a string is not considered to be an Array.

@param {(Object|{length: number})} obj The Object.
@return {boolean} Whether the object is an Array.

@test {true} An empty Array.
rocket.isArray([]);

@test {true} An Object with a length property that is a number.
rocket.isArray({'length': 0});

@test {false} A string.
rocket.isArray('foo');

@test {false} A function.
rocket.isArray(function(){});

*/
rocket.isArray = function(obj) {

  return (
      (obj &&
          (typeof /** @type {{length: (number|undefined)}} */
              (obj).length === 'number') &&
                  (typeof obj === 'object')) ||
      false
  );


};
