

/**
Creates an Array of numbers.

@param {number} start_or_count
  The first number in the range or if this is the only given parameter, zero
  is assumed for the start and this is used as the count.
@param {number=} opt_stop The last number in the range.
@param {number=} opt_step The step of the range.
@return {Array.<number>} The Array of numbers.
@example
// the following all produce the same result
rocket.range(10);
rocket.range(0,9);
rocket.range(0,9,1);
// returns
[0,1,2,3,4,5,6,7,8,9]
*/
rocket.range = function(start_or_count, opt_stop, opt_step) {

  var start;
  var stop;
  var step = opt_step || 1;

  if (arguments.length === 1) {
    start = 0;
    stop = start_or_count;
  } else {
    start = start_or_count;
    stop = opt_stop + 1;
  }

  var results = [];
  for (var i = start; i < stop; i += step) {
    results.push(i);
  }

  return results;

};
