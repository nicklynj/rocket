

/**
Trims the end of a string.

@param {string} str The string to be trimmed.
@return {string} The trimmed string.
*/
rocket.trimRight = function(str) {

  if (String.trimRight) {

    rocket.trimRight = String.trimRight;

  } else {

    rocket.trimRight = function(str) {
      return str && str.replace(/\s+$/, '');
    };

  }

  return rocket.trimRight(str);

};
