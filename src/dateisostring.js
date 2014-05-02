

/**
Returns the ISO-8601 string date format of either the optionally given Date or
of the current Date if one is not given.

@param {Date=} opt_date The date.
@return {string} The ISO-8601 string date format.

@example
rocket.dateISOString();

// could return

"2014-03-18T01:15:22.030Z"

@test {1} Use a RegExp to match the dateISOString.
var regexp = /^\d{4}\-\d\d\-\d\dT\d\d\:\d\d\:\d\d\.\d{3}Z$/;
rocket.dateISOString().match(regexp).length;

*/
rocket.dateISOString = function(opt_date) {

  var date = opt_date || new Date();

  if (date.toISOString) {

    rocket.dateISOString = function(opt_date) {
      return (opt_date || new Date()).toISOString();
    };

  } else {

    rocket.dateISOString = function(opt_date) {

      var date = opt_date || new Date();

      return date.getUTCFullYear() + '-' +
          rocket.padLeft((date.getUTCMonth() + 1) + '', 2, '0') + '-' +
          rocket.padLeft(date.getUTCDate() + '', 2, '0') + 'T' +
          rocket.padLeft(date.getUTCHours() + '', 2, '0') + ':' +
          rocket.padLeft(date.getUTCMinutes() + '', 2, '0') + ':' +
          rocket.padLeft(date.getUTCSeconds() + '', 2, '0') + '.' +
          rocket.padLeft(date.getUTCMilliseconds() + '', 3, '0') + 'Z';

    };

  }

  return rocket.dateISOString(date);

};
