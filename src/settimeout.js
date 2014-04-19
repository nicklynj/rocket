

/**
Calls a given Function after delay milliseconds.

Returns a number that can be used to prevent the given Function
from being called.

The given Function will be called unless prevented with clearTimeout.

Allows variables to be bound to the Function when called.

@param {function(...)} set_function The function to delay.
@param {number} delay The delay in milliseconds.
@param {...} var_args Arguments to pass to the given function.
@return {number} Timeout number used for clearTimeout.
@see {rocket.setInterval}
@example
rocket.setTimeout(alert, 1000, 'foo');
// will cause an alert with the text "foo" to
// display after one second

// this is equivalent to creating a closure and passing the variables
setTimeout(function(){
  alert('foo');
}, 1000);
*/
rocket.setTimeout = function(set_function, delay, var_args) {

  rocket.setTimeout = function(set_function, delay, var_args) {

    if (arguments.length < 3) {

      return setTimeout(set_function, delay);

    } else {

      var args = Array.prototype.slice.call(arguments, 2);

      return setTimeout(
          function() {
            set_function.apply(window, args);
          },
          delay
      );

    }

  };

  // Use the built-in setTimeout if it supports var_arg parameters.
  window.setTimeout(
      function() {

        if (arguments[0] === true) {
          rocket.setTimeout = setTimeout;
        }

      },
      0,
      true
  );

  return rocket.setTimeout.apply(window, arguments);

};
