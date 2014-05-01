

/**
Clamps a given number between a minimum and maximum limit.

If the given x is less than min, then return min.

Else if the given x is greater than max, then return max.

Else return x.

@param {number} x The number to clamp.
@param {number} min The minimum number to return.
@param {number} max The maximum number to return.
@return {number} The clamped value of x.

@test {3} A number less than the min.
rocket.clamp(1, 3, 5);

@test {5} A number greater than the max.
rocket.clamp(6, 3, 5);

@test {4} A number bounded by the min and max.
rocket.clamp(4, 3, 5);

@test {'a'} A string not less than the min and not greater than the max.
rocket.clamp('a', 3, 5);

@test {5} Positive Infinity.
rocket.clamp(Infinity, 3, 5);

@test {true} Not a number, NaN.
isNaN(rocket.clamp(NaN, 3, 5));

*/
rocket.clamp = function(x, min, max) {
  return ((x < min) ? min : ((x > max) ? max : x));
};
