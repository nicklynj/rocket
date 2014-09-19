

/**
Round a number to a given number of decimals.

@param {(number|string)} number The number to round.
@param {number} number_of_decimals The number of decimals.
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
rocket.round = function(number, number_of_decimals) {

  if (number_of_decimals < 0) {

    var rnd = Math.pow(10, Math.abs(number_of_decimals));
    return Math.floor(number / rnd) * rnd;

  } else {

    return parseFloat((+number).toFixed(number_of_decimals));

  }


};
