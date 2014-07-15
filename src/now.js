

/**
Returns the current client's unix time in milliseconds.

@return {number} The current client's unix time in milliseconds.

@test {true} Greater than September 9th, 2001.
(rocket.now() >= 1 * Math.pow(10, 12))

@test {true} Less than January 19th, 2038.
(rocket.now() <= 2 * Math.pow(10, 12))

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
