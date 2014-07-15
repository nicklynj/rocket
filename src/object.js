

/**
Returns an object with a key and value attribute.

@param {string} key The key.
@param {*} value The value.
@return {Object.<string, *>} The object.

@test {true} Two equivalent objects.
var key = 'foo';
var val = 'bar';

var foo = {};
foo[key] = val;

var bar = rocket.object(key, val);

rocket.equal(foo, bar);

*/
rocket.object = function(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
};
