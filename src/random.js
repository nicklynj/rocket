

/**
Generates a random integer inclusively between a min and max value.

When called with no parameters, returns a random number between 0 and 2^31 - 1.

@param {number=} opt_min_max
  The minimum number to generate or if this is the only given parameter,
  zero is assumed for the min and this is used as the max.
@param {number=} opt_max The maximum.
@return {number} The random number.
@example
rocket.random(1); // returns zero or one
rocket.random(6); // returns zero thru six

// the following all produce the same result
// a random number between 0 and 2147483647
rocket.random();
rocket.random(2147483647);
rocket.random(0, 2147483647);
*/
rocket.random = function(opt_min_max, opt_max) {

  if (arguments.length === 2) {

    return Math.floor(
        Math.random() * (opt_max - opt_min_max + 1)
    ) + opt_min_max;

  } else if (arguments.length === 1) {

    return rocket.random(0, opt_min_max);

  } else {

    return rocket.random(0, 2147483647);

  }

};
