

/**
Returns the current client's unix time in milliseconds.

@return {number} The current client's unix time in milliseconds.
*/
rocket.now = function() {

  if (Date.now) {

    rocket.now = Date.now;

  } else {

    rocket.now = function() {
      return new Date().getTime();
    };

  }

  return rocket.now();

};
