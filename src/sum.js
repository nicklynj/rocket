

/**
Sums the arguments passed to it.

@param {...number} var_args The numbers to sum.
@return {number} The sum.
*/
rocket.sum = function(var_args) {

  var len = arguments.length;
  var sum = 0;

  while (len--) {
    sum += /** @type {number} */ (arguments[len]);
  }

  return sum;

};
