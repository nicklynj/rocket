

/**
Clamps a given number between a minimum and maximum limit.

If the given x is less than min, then return min.

Else if the given x is greater than max, then return max.

Else return x.

@param {number} x The number to clamp.
@param {number} min The minimum number to return.
@param {number} max The maximum number to return.
@return {number} The clamped value of x.
@example
rocket.clamp(1, 3, 5); // returns 3
rocket.clamp(4, 3, 5); // returns 4
rocket.clamp(6, 3, 5); // returns 6

// 'a' is not less than zero and 'a' is not greater than 9
rocket.clamp('a', 0, 9); // returns 'a'
*/
rocket.clamp = function(x, min, max) {
  return ((x < min) ? min : ((x > max) ? max : x));
};
