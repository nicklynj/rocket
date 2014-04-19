

/**
Parses a string and returns a human readable time.

@param {string} str
@return {?string}
  Human readable time string in the form: hour, colon, minute, space, meridian.
*/
rocket.strToTime = function(str) {

  var hour;
  var minute;
  var meridian;

  var meridian_divider = 6;

  if (str.indexOf('p') !== -1) {
    meridian = 'pm';
  } else if (str.indexOf('a') !== -1) {
    meridian = 'am';
  }

  str = str.replace(/[^\d\:]/g, '');

  if (str.indexOf(':') !== -1) {

    hour = str.split(':')[0];
    minute = str.split(':')[1];

  } else {

    var len = str.length;

    if (len === 1 || len === 3) {

      hour = str.substr(0, 1);
      minute = str.substr(1);

    } else if (len === 2 || len === 4) {

      hour = str.substr(0, 2);
      minute = str.substr(2);

    }

  }

  if (hour) {

    if (!meridian) {
      if (hour > 11 || hour < meridian_divider) {
        meridian = 'pm';
      } else {
        meridian = 'am';
      }
    }

    hour = rocket.padLeft('' + (hour % 12 || 12), 2, '0');
    minute = rocket.padLeft('' + minute, 2, '0');

    return hour + ':' + minute + ' ' + meridian;

  } else {

    return null;

  }

};
