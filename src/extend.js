

/**
Extends the given target Object with
the properties of the given source Object(s).

Performs a shallow copy that does not recursively descend properties.

@param {Object} target The target Object to receive the source's properties.
@param {...Object} var_args
  The source Object(s) to be extended onto the target Object.
@return {Object} The extended target Object.

@test {{'foo': 'foo', 'bar': 'bar'}} Extend an Object with an Object.
var foo = {'foo': 'foo'};
var bar = {'bar': 'bar'};
rocket.extend(foo, bar);

@test {{'foo': 'foo', 'bar': 'bar', 'baz': 'baz'}}
  Extend an Object with two Object.
var foo = {'foo': 'foo'};
var bar = {'bar': 'bar'};
var baz = {'baz': 'baz'};
rocket.extend(foo, bar, baz);

@test {{'foo': 'bar'}}
  Extend an Object with an Object that overrides it.
var foo = {'foo': 'foo'};
var bar = {'foo': 'bar'};
rocket.extend(foo, bar);

@test {[0, 1, 'c']}
  Extend an Array with an Array that overrides it.
var foo = ['a', 'b', 'c'];
var bar = [0, 1];
rocket.extend(foo, bar);

@test {[0, 1, 2, 3]}
  Extend an Array with an Array that overrides it.
var foo = ['a', 'b', 'c'];
var bar = [0, 1, 2, 3];
rocket.extend(foo, bar);

@test {{'foo': 'bar'}} Extend an Object with nothing.
var foo = {'foo': 'bar'};
rocket.extend(foo);

*/
rocket.extend = function(target, var_args) {

  var source;

  for (var i = 1; source = /** @type {Object} */ (arguments[i]); ++i) {

    for (var option in source) {
      target[option] = source[option];
    }

  }

  return target;

};
