

/**
Returns a function that limits or throttles a function's executions
regardless of how many times it's called.

Returns a function that will execute handler immediately after the returned
function has been called, but not again, regardless of how many times the
returned function is called, until opt_period milliseconds have passed.

Will preserve arguments and the value of this in the function.

@param {number} period The number of milliseconds to wait between calls.
@param {function(this:Object, ...):(Object|undefined)} handler
  The function to throttle.
@return {function(this:Object, ...)} The throttled function.
@example
// call the function resize_something immediately;
// then at most 20 times per second regardless of actual calls
// (or once per 50 milliseconds)
rocket.$(window).addEventListener(
    'resize',
    rocket.throttle(50, resize_something)
);
*/
rocket.throttle = function(period, handler) {

  var throttling = false;
  var self;
  var args;
  var called_while_throttling = false;

  var throttling_complete = function() {

    throttling = false;

    if (called_while_throttling) {
      called_while_throttling = false;
      handler.apply(self, args);
    }

  };

  return /** @this {Object} */ (function() {

    if (throttling) {

      called_while_throttling = true;

    } else {

      throttling = true;

      setTimeout(
          throttling_complete,
          period
      );

      self = this;
      args = arguments;

      handler.apply(this, arguments);

    }

  });

};
