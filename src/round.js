

/**
Round a number to a given number of decimals.

@param {(number|string)} x The number to round.
@param {number} decimals The number of decimals.
@return {number} The rounded number.

@test {1235} Rounding to zero decimal places.
rocket.round(1234.5678, 0);

@test {1234.57} Rounding to two decimal places.
rocket.round(1234.5678, 2);

@test {1200} Rounding to negative two decimal places.
rocket.round(1234.5678, -2);

@test {1} Round up to one.
rocket.round(0.5, 0);

@test {-1} Round down to negative one.
rocket.round(-0.5, 0);

*/
rocket.round = function(x, decimals) {

  return parseFloat((+x).toFixed(decimals));

};
