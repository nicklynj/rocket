

/**
Pads the beginning of a string.

The optional padding string can be more than one character in length.

@param {(string|number)} str The string to be padded.
@param {number} len The minimum length to make the string.
@param {string=} opt_pad The string to use to pad or a space is used.
@return {string} The padded string.

@test {'foo'} No padding; with negative length.
rocket.padLeft('foo', -1);

@test {'foo'} No padding; with zero length.
rocket.padLeft('foo', 0);

@test {'foo'} No padding; with zero length and space.
rocket.padLeft('foo', 0, ' ');

@test {'foo'} No padding; with equal length and space.
rocket.padLeft('foo', 3, ' ');

@test {' foo'} One space padding.
rocket.padLeft('foo', 4);

@test {'afoo'} One padding of the string "a".
rocket.padLeft('foo', 4, 'a');

@test {'aaafoo'} Three padding of the string "a".
rocket.padLeft('foo', 6, 'a');

@test {'bfoo'} One padding of the string "bar".
rocket.padLeft('foo', 4, 'bar');

@test {'bafoo'} Two padding of the string "bar".
rocket.padLeft('foo', 5, 'bar');

@test {'barfoo'} Three padding of the string "bar".
rocket.padLeft('foo', 6, 'bar');

@test {'barbfoo'} Four padding of the string "bar".
rocket.padLeft('foo', 7, 'bar');

@test {'barbafoo'} Five padding of the string "bar".
rocket.padLeft('foo', 8, 'bar');

@test {'barbarfoo'} Nine padding of the string "bar".
rocket.padLeft('foo', 9, 'bar');

*/
rocket.padLeft = function(str, len, opt_pad) {

  str += '';

  var length = len - str.length;

  return (length > 0) ?
      new Array(length + 1).join(opt_pad || ' ').substr(0, length) + str :
      str;

};
