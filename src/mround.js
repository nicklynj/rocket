

/**
Round a number to a given multiple.

@param {number} x The number to round to the nearest multiple.
@param {number} multiple The multiple to which to round x.
@return {number} The rounded number.

@test {10} Round up to ten.
rocket.mround(5, 10);

@test {10} Round down to ten.
rocket.mround(14.9, 10);

@test {-10} Round down to negative ten.
rocket.mround(-5, 10);

@test {1.5} Round up to one and a half.
rocket.mround(1.25, 0.5);

@test {-1.5} Round down to negative one and a half.
rocket.mround(-1.25, 0.5);

*/
rocket.mround = function(x, multiple) {

  return (x / multiple).toFixed(0) * multiple;

};
