

/**
Trims the beginning of a string.

@param {string} str The string to be trimmed.
@return {string} The trimmed string.
*/
rocket.trimLeft = function(str) {

  if (String.trimLeft) {

    rocket.trimLeft = String.trimLeft;

  } else {

    rocket.trimLeft = function(str) {
      return str && str.replace(/^\s+/, '');
    };

  }

  return rocket.trimLeft(str);

};
