

/**
Returns an array of all of the values of an object.

@param {Object} object The Object or Array over which to iterate.
@return {Array.<Object>} The values of the object.
@example
rocket.values({'foo':'bar','foofoo':'barbar'});
// returns
['bar','barbar']
*/
rocket.values = function(object) {

  var values = [];

  for (var i in object) {
    values.push(object[i]);
  }

  return values;

};
