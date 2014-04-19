

/**
Handles iteration of stepping or animation functions.

The parameters passed to the given handler function are the percentage
completion of the animation and the sinusoidal slope.  Both of these values
range from greater than zero to less than or equal to one.  Neither value will
ever be zero.  The last arguments passed to the given handler function will
always both be the number one.

The first parameter to given handler function is the percentage completion,
the second is the sinusoidal slope.

Skips to the last iteration once the opt_duration has been exceeded.

The return value can be passed to clearInterval to pre-maturely terminate the
step.  Doing this could possibly cause the function to not be called with the
final number one arguments and could also prevent the callback from being
executed.

Stopping a stepped function with clearInterval that has already completed
will not throw any errors.

@param {function(number, number)} fnct The iterating function.
@param {number=} opt_duration
  The duration of the animation.
@param {function()=} opt_callback
  The function to call when the animation is complete.
@param {number=} opt_fps
  The frames per second value at which to execute this step.
@return {number} The setInterval return value; used to terminate the step.
*/
rocket.step = function(fnct, opt_duration, opt_callback, opt_fps) {

  var fps = opt_fps || rocket.step.fps_;
  var duration = opt_duration || rocket.step.duration_;
  var begin_time = rocket.now();

  var interval = setInterval(function() {

    var percentage_complete = (rocket.now() - begin_time) / duration;

    if (percentage_complete > 1) {
      percentage_complete = 1;
    }

    fnct(
        percentage_complete,
        0.5 - Math.cos(Math.PI * percentage_complete) / 2
    );

    if (percentage_complete === 1) {

      clearInterval(interval);

      if (opt_callback) {
        opt_callback();
      }

    }

  }, 1000 / fps);

  return interval;

};


/**
The default duration, in milliseconds, for steps.

@private
@type {number}
*/
rocket.step.duration_ = 300;


/**
The default frames per second, fps, for steps.

@private
@type {number}
*/
rocket.step.fps_ = 20;
