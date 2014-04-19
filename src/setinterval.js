

/**
Calls a given Function every interval milliseconds.

Returns a number that can be used to stop the given Function from
continuing to be called.

The given Function will be continuously called unless
stopped with clearInterval.

Allows variables to be bound to the Function when called

@param {function(...)} set_function The function to interval.
@param {number} interval The interval in milliseconds.
@param {...} var_args Arguments to pass to the given function.
@return {number} Interval number used for clearInterval.
@see {rocket.setTimeout}
@example
rocket.setInterval(alert, 1000, 'foo');
// will cause an alert with the text "foo" to
// display once per second

// this is equivalent to creating a closure and passing the variables
setInterval(function(){
  alert('foo');
}, 1000);
*/
rocket.setInterval = function(set_function, interval, var_args) {

  rocket.setInterval = function(set_function, interval, var_args) {

    if (arguments.length < 3) {

      return setInterval(set_function, interval);

    } else {

      var args = Array.prototype.slice.call(arguments, 2);

      return setInterval(
          function() {
            set_function.apply(window, args);
          },
          interval
      );

    }

  };

  // Use the built-in setInterval if it supports var_arg parameters.
  window.setTimeout(
      function() {

        if (arguments[0] === true) {
          rocket.setInterval = setInterval;
        }

      },
      0,
      true
  );

  return rocket.setInterval.apply(window, arguments);

};
