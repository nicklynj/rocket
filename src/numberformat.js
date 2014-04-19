

/**
Formats a number or a string into a human readable string.

Adds commas, a decimal point, and sets the preceision of the given number or
string.

@param {(number|string)} number The number.
@param {number=} opt_number_of_decimals
  The number of decimals; defaults to 0.
@param {string=} opt_decimal_point
  The decimal point; defaults to '.'.
@param {string=} opt_thousands_separator
  The thousands separator; defaults to ','.
@return {string} The formatted string.
*/
rocket.numberFormat =
    function(
        number,
        opt_number_of_decimals,
        opt_decimal_point,
        opt_thousands_separator) {


  var number_of_decimals = opt_number_of_decimals;
  var decimal_point = opt_decimal_point;
  var thousands_separator = opt_thousands_separator;

  var formatted;
  var i;
  var decimal_point_index;
  var mod;
  var is_negative;

  switch (arguments.length) {

    case 1:
      number_of_decimals = 0;

    case 2:
      decimal_point = '.';

    case 3:
      thousands_separator = ',';

  }

  if (number_of_decimals) {

    mod = 0;

  } else {

    mod = 2;

  }

  number = parseFloat(number);

  is_negative = number < 0;

  number = number.toFixed(number_of_decimals);

  formatted = ('' + number).split('');

  if (formatted[0] === '-') {

    formatted.splice(0, 1);

  }

  decimal_point_index = formatted.length - 1 - number_of_decimals;

  if (number_of_decimals) {

    formatted[decimal_point_index] = /** @type {string} */ (decimal_point);

  }

  if (thousands_separator) {

    for (i = decimal_point_index - 1; i > 0; --i) {

      if (((decimal_point_index - i) % 3) === mod) {

        formatted.splice(i, 0, thousands_separator);

      }

    }

  }

  return (is_negative ? '-' : '') + formatted.join('');

};
