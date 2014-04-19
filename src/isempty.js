

/**
Returns whether a given Object is empty.

Returns whether the given Object does not contain any properties.

@param {(Object|null|undefined)} obj The object.
@return {boolean} Whether the given Object is empty.
@example
rocket.isEmpty([]);
// returns
true;

rocket.isEmpty({});
// returns
true;

rocket.isEmpty({'foo': 'bar'});
// returns
false;
*/
rocket.isEmpty = function(obj) {

  for (var i in obj) {
    return false;
  }

  return true;

};
