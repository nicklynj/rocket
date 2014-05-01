

/**
Creates an array of strings from a string.

If an array is passed, this returns the passed array.

Splits a string around spaces, commas, or any white space characters.

@param {(string|Array.<string>)} str The string to split into an Array.
@return {Array.<string>} The Array representation of the given string.

@test {['foo', 'bar', 'baz']} A String transforms into an Array.
// A String with either or both commas and or spaces.
rocket.arrayify('foo,bar baz');

@test {['foo', 'bar', 'baz', 'baz']} A String transforms into an Array.
// A String with either or both commas and or whitespace.
rocket.arrayify('foo,bar baz' + "\n" + 'baz');

@test {['foo', 'bar']} A String with padding transforms into an Array.
// A String with leading and trailing white space
rocket.arrayify(' foo, bar');

@test {[]} A empty String transforms into an empty Array.
// An empty String.
rocket.arrayify('');

@test {[]} A String with whitespace transforms into an empty Array.
// An empty String.
rocket.arrayify(' ');

@test {['foo', 'bar,baz', 'baz baz']} An Array is not changed.
// regardless if its contents contains commas or spaces
rocket.arrayify(['foo', 'bar,baz', 'baz baz']);

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
