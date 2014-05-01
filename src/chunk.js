

/**
Splits an Array into an Array of smaller Arrays.

Each smaller Array has at most the given number of values.

@param {Array} arr The Array.
@param {number} chunk The maximum number of values of each chunk.
@return {Array} An Array of the smaller Arrays.

@test {[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]]} Chunking an Array into four.
rocket.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  3);

@test {[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]} Chunking an Array into one.
rocket.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  11);

@test {[[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]}
  Chunking an Array into ten.
rocket.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  1);

*/
rocket.chunk = function(arr, chunk) {

  var results = [];

  for (var i = 0, len = arr.length; i < len; i += chunk) {
    results.push(arr.slice(i, i + chunk));
  }

  return results;

};
