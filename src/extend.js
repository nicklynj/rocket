

/**
Extends the given target Object with
the properties of the given source Object(s).

Performs a shallow copy that does not recursively descend properties.

@param {Object} target The target Object to receive the source's properties.
@param {...Object} var_args
  The source Object(s) to be extended onto the target Object.
@return {Object} The extended target Object.
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
