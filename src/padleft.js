

/**
Pads the beginning of a string.

The optional padding string can be more than one character in length.

@param {(string|number)} str The string to be padded.
@param {number} len The minimum length to make the string.
@param {string=} opt_pad The string to use to pad or a space is used.
@return {string} The padded string.
*/
rocket.padLeft = function(str, len, opt_pad) {

  str += '';

  var length = len - str.length;

  return length > 0 ?
      new Array(length + 1).join(opt_pad || ' ').substr(0, length) + str :
      str;

};
