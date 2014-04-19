

/**
Creates an array of strings from a string.

If an array is passed, this returns the passed array.

Splits a string around spaces, commas, or any white space characters.

@param {(string|Array.<string>)} str The string to split into an Array.
@return {Array.<string>} The Array representation of the given string.
@example
rocket.arrayify('foo,bar baz');
// returns
['foo','bar','baz']

rocket.arrayify(['foo','bar,baz'];
// returns
['foo','bar,baz']
*/
rocket.arrayify = function(str) {

  if (typeof str !== 'string') {
    return str || [];
  }

  str = rocket.trim(str);

  if (str === '') {
    return [];
  }

  if (str.indexOf(',') === -1) {

    if (str.indexOf('  ') === -1 &&
        str.indexOf('\r') === -1 &&
        str.indexOf('\n') === -1 &&
        str.indexOf('\t') === -1) {

      return str.split(' ');

    } else {
      return str.split(/\s+/);
    }

  } else {
    return str.split(/[\s,]+/);
  }
};
