

/**
Trims a string.

@param {string} str The string to be trimmed.
@return {string} The trimmed string.
*/
rocket.trim = function(str) {

  if (String.trim) {

    rocket.trim = String.trim;

  } else {

    rocket.trim = function(str) {
      return str && str.replace(/^\s+|\s+$/g, '');
    };

  }

  return rocket.trim(str);

};
