

/**
Returns whether the given Object is an Array.

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
