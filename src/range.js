

/**
Creates an Array containing a range of numbers.

@param {number} start_or_count
  The first number in the range or if this is the only given parameter, zero
  is assumed for the start and this is used as the count.
@param {number=} opt_stop The last number in the range.
@param {number=} opt_step The step of the range.
@return {Array.<number>} The Array of numbers.

@test {[0, 1, 2]} A range of numbers from zero to two.
rocket.range(3);

@test {[0, 1, 2]} A range of numbers from zero to two.
rocket.range(0, 2);

@test {[1, 2, 3]} A range of numbers from one to three.
rocket.range(1, 3);

@test {[0, 1, 2, 3]} A range of numbers from zero to three.
rocket.range(0, 3, 1);

@test {[1, 2, 3]} A range of numbers from one to three.
rocket.range(1, 3, 1);

@test {[0, 2]} A range of numbers from zero to three with a step of two.
rocket.range(0, 3, 2);

@test {[1, 3]} A range of numbers from one to three with a step of two.
rocket.range(1, 3, 2);

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
