

/**
Generates a random integer inclusively between a min and max value.

When called with no parameters, returns a random number between 0 and 2^31 - 1.

@param {number=} opt_min_max
  The minimum number to generate or if this is the only given parameter,
  zero is assumed for the min and this is used as the max.
@param {number=} opt_max The maximum.
@return {number} The random number.

@test {true} No parameters; greater than or equal to zero.
(rocket.random() >= 0);

@test {true} No parameters; less than 2^31.
(rocket.random() < 2147483647);

@test {true} One parameter; one.
var rand = rocket.random(1);
((rand === 0) || (rand === 1))

@test {true} One parameter; five.
var rand = rocket.random(5);
(rocket.indexOf([0, 1, 2, 3, 4, 5], rand) !== -1);

@test {0} One parameter; zero.
rocket.random(0);

@test {true} Two parameters; zero, five.
var rand = rocket.random(0, 5);
(rocket.indexOf([0, 1, 2, 3, 4, 5], rand) !== -1);

@test {true} Two parameters; one, six.
var rand = rocket.random(1, 6);
(rocket.indexOf([1, 2, 3, 4, 5, 6], rand) !== -1);
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
