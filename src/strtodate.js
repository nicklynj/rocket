

/**
Parses a date from a given string.

@param {string} str The string to be parsed.
@return {?Date} The parsed Date or null on error.

@test {new Date(1973, 1, 1)} Full date.
rocket.strToDate('2/1/1973');

*/
rocket.strToDate = function(str) {

  var year;
  var month;
  var date;

  var now = new Date();

  var len = str.length;
  var segments;

  if (str === str.replace(/\D+/g, '')) {

    if (len < 3) {

      date = str;

    } else if (len === 3 || len === 5 || len === 7) {

      month = str.substr(0, 1);
      date = str.substr(1, 2);
      year = str.substr(3, 4);

    } else if (len < 9) {

      month = str.substr(0, 2);
      date = str.substr(2, 2);
      year = str.substr(4, 4);

    }

  } else {

    segments = str.replace(/^\D+|\D+$/g, '').split(/\D+/);

    if (segments.length < 4) {

      if (str.indexOf('-') === -1) {

        month = segments[0];
        date = segments[1];
        year = segments[2];

      } else {

        year = segments[0];
        month = segments[1];
        date = segments[2];

      }

    }

  }

  if (!date) {

    return null;

  }

  if (!year) {

    year = now.getFullYear();

  } else if (year < 100) {

    if (year < rocket.strToDate.century_divider_) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }

  }

  if (!month) {

    month = now.getMonth() + 1;

  }

  return new Date(year, month - 1, date);

};


/**
Divider between assuming 19th or 20th century.

@private
*/
rocket.strToDate.century_divider_ = (new Date()).getFullYear() - 2000 + 10;
