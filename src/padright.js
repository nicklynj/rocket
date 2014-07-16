

/**
Pads the ending of a string.

The optional padding string can be more than one character in length.

@param {(string|number)} str The string to be padded.
@param {number} len The minimum length to make the string.
@param {string=} opt_pad The string to use to pad or a space is used.
@return {string} The padded string.

@test {'foo'} No padding; with negative length.
rocket.padRight('foo', -1);

@test {'foo'} No padding; with zero length.
rocket.padRight('foo', 0);

@test {'foo'} No padding; with zero length and space.
rocket.padRight('foo', 0, ' ');

@test {'foo'} No padding; with equal length and space.
rocket.padRight('foo', 3, ' ');

@test {'foo '} One space padding.
rocket.padRight('foo', 4);

@test {'fooa'} One padding of the string "a".
rocket.padRight('foo', 4, 'a');

@test {'fooaaa'} Three padding of the string "a".
rocket.padRight('foo', 6, 'a');

@test {'foob'} One padding of the string "bar".
rocket.padRight('foo', 4, 'bar');

@test {'fooba'} Two padding of the string "bar".
rocket.padRight('foo', 5, 'bar');

@test {'foobar'} Three padding of the string "bar".
rocket.padRight('foo', 6, 'bar');

@test {'foobarb'} Four padding of the string "bar".
rocket.padRight('foo', 7, 'bar');

@test {'foobarba'} Five padding of the string "bar".
rocket.padRight('foo', 8, 'bar');

@test {'foobarbar'} Nine padding of the string "bar".
rocket.padRight('foo', 9, 'bar');

*/
rocket.padRight = function(str, len, opt_pad) {

  str += '';

  var length = len - str.length;

  return (length > 0) ?
      str + new Array(length + 1).join(opt_pad || ' ').substr(0, length) :
      str;

};
