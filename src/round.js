

/**
Round a number to a given number of decimals.

@param {number} x The number to round.
@param {number} decimals The number of decimals.
@return {number} The rounded number.

@test {1235} Rounding to zero decimal places.
rocket.round(1234.5678, 0);

@test {1234.57} Rounding to two decimal places.
rocket.round(1234.5678, 2);

@test {1200} Rounding to negative two decimal places.
rocket.round(1234.5678, -2);

@test {-10} Rounding to zero decimal places.
rocket.round(-10.5, 0);
*/
rocket.round = function(x, decimals) {

  if (decimals) {

    var pow = Math.pow(10, decimals);
    return Math.round(x * pow) / pow;

  } else {

    return Math.round(x);

  }

};
