

/**
Binds a context and optionally variables to a function.

This creates and returns a new function.

@param {function(this:Object, ...):(Object|undefined)} unbound
  The unbound function to bind to the given object.
@param {Object} self The value to use for this.
@param {...*} var_args Additional arguments to bind.
@return {function(this:Object, ...):(Object|undefined)} The bound function.
@example
// call document.getElementyById using the document as this
rocket.bind(document.getElementById, document)('id');
@test {document.body} Bind getElementsByTagName and get the HTMLBodyElement.
rocket.bind(document.getElementsByTagName, document)('body')[0];
*/
rocket.bind = function(unbound, self, var_args) {

  if (Function.prototype.bind) {

    rocket.bind = function(unbound, self, var_args) {
      return Function.prototype.bind.apply(
          unbound,
          Array.prototype.slice.call(arguments, 1)
      );
    };

  } else {

    rocket.bind = function(unbound, self, var_args) {

      var bound_arguments;

      if (arguments.length === 2) {

        return function() {
          return unbound.apply(self, arguments);
        };

      } else {

        bound_arguments = Array.prototype.slice.call(arguments, 2);

        return function() {
          return unbound.apply(
              self,
              /** @type {Array} */ (bound_arguments).concat(
                  Array.prototype.slice.call(arguments, 0)
              )
          );

        };

      }

    };

  }

  return rocket.bind.apply(null, arguments);

};
