

/**
Returns an object with a key and value attribute.

@param {string} key The key.
@param {*} value The value.
@return {Object.<string, *>} The object.
@example
// this resolves a three line issue with javascript

// given a variable to be used as a key
var key = 'foo';

// without rocket.object
var bar = {};
bar[key] = 'foo';
do_something_with(bar);

// transforms instead into
do_something_with(rocket.object(key, 'foo'));
*/
rocket.object = function(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
};
