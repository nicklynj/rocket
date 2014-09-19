

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

@test {"1,235"} No optional parameters.
rocket.numberFormat(1234.5678);

@test {"1,235"} Zero decimals.
rocket.numberFormat(1234.5678, 0);

@test {"1,234.57"} Two decimals.
rocket.numberFormat(1234.5678, 2);

@test {"1,200"} Negative two decimals.
rocket.numberFormat(1234.5678, -2);

@test {"1,234.567800"} Six decimals.
rocket.numberFormat(1234.5678, 6);

@test {"1,234.57"} Two decimals with a dot decimal separator.
rocket.numberFormat(1234.5678, 2, ".");

@test {"1,234.57"} Two decimals with a comma thousands separator.
rocket.numberFormat(1234.5678, 2, ".", ",");

@test {"1,200"} Negative two decimals with a dot decimal separator.
rocket.numberFormat(1234.5678, -2, ".");

@test {"1,200"} Negative two decimals with a comma thousands separator.
rocket.numberFormat(1234.5678, -2, ".", ",");

@test {"1,235"} Zero decimals.
rocket.numberFormat(1234.5678, 0);

@test {"123,456,789.10"} Two decimals large number.
rocket.numberFormat(123456789.101112, 2);

@test {"123,456,700"} Negative two decimals.
rocket.numberFormat(123456789.101112, -2);

@test {"12345678910"} Two decimals large number; no separators.
rocket.numberFormat(123456789.101112, 2, '', '');

@test {"123456700"} Negative two decimals; no separators.
rocket.numberFormat(123456789.101112, -2, '', '');


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

  switch (arguments.length) {

    case 1:
      number_of_decimals = 0;

    case 2:
      decimal_point = '.';

    case 3:
      thousands_separator = ',';

  }

  var mod;

  if (number_of_decimals > 0) {

    mod = 0;

  } else {

    mod = 2;

  }

  number = parseFloat(number);

  var is_negative = number < 0;

  if (number_of_decimals < 0) {

    var rnd = Math.pow(10, Math.abs(number_of_decimals));
    number = Math.floor(number / rnd) * rnd;

  } else {

    number = number.toFixed(number_of_decimals);

  }

  var formatted = ('' + number).split('');

  if (formatted[0] === '-') {

    formatted.splice(0, 1);

  }

  var decimal_point_index = formatted.length - 1 - number_of_decimals;

  if (number_of_decimals > 0) {

    formatted[decimal_point_index] = /** @type {string} */ (decimal_point);

  } else {

    decimal_point_index += number_of_decimals;

  }

  if (thousands_separator) {

    for (var i = decimal_point_index - 1; i > 0; --i) {

      if (((decimal_point_index - i) % 3) === mod) {

        formatted.splice(i, 0, thousands_separator);

      }

    }

  }

  return (is_negative ? '-' : '') + formatted.join('');

};
