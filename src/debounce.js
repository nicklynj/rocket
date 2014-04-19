

/**
Returns a function that limits or debounces a function's executions
regardless of how many times it's called.

Returns a function that will not execute the given handler function until the
returned function has been called once but has not been called again for at the
the very least the given period of milliseconds.

Preserves both arguments and the value of this in the given function.

@param {number} period The period in milliseconds during which to ignore
repeated attempts to execute the given function.
@param {function(...):(Object|undefined)} handler
  The bouncing handler function.
@return {function(this:Object, ...)} The debounced function.
@example
// calls resize_something after it's been called once but
// not called again for another 1000 milliseconds
rocket.$(window).addEventListener(
    'resize',
    rocket.debounce(1000, resize_something)
);
*/
rocket.debounce = function(period, handler) {

  var time_out;

  return /** @this {*} */ (function() {

    clearTimeout(time_out);

    var self = this;
    var args = arguments;

    time_out =
        setTimeout(
            function() {
              handler.apply(self, args);
            },
            period
        );

  });
};
