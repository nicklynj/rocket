

/**
@typedef
    {{key: (string|number), desc: boolean, type: string, null: boolean}}
*/
rocket.SortKey_;


/**
Sorts an Array of Objects by a key or keys that exists in each Object.

This method changes the original Array.

@param {Array.<Object>} arr The Array of Objects.
@param {(string|number|rocket.SortKey_|Array.<(string|number|rocket.SortKey_)>)} key_columns
  The key that exists within each Object,
  or an Array of keys that exist within the object,
  or an Array of columns (an object with the properties: key, desc, and type).
@param {...string} var_args Additional keys used to sort.
@return {Array.<Object>} The sorted Array of Objects.
@example
// given
var foo = [{'a':3,'b':3},{'a':1,'b':1},{'a':4,'b':1},{'a':2,'b':5}];

// the following methods all produce the same result
rocket.sort(foo, 'a', 'b');
rocket.sort(foo, ['a','b']);
rocket.sort(foo, [{'key': 'a'},{'key': 'b'}]);
rocket.sort(foo, [{'key': 'a', 'type': 'number', 'desc': false},{'key': 'b'}]);

// foo has been transformed into
[{'a':1,'b':1},{'a':2,'b':5},{'a':3,'b':3},{'a':4,'b':1}]
*/
rocket.sort = function(arr, key_columns, var_args) {

  if ((typeof key_columns === 'string') || (typeof key_columns === 'number')) {

    var columns = arguments;
    var len = columns.length;

    arr.sort(function(a, b) {

      for (var i = 1; i < len; ++i) {

        var left = '' + /** @type {*} */ (a[columns[i]]);
        var right = '' + /** @type {*} */ (b[columns[i]]);

        if (left > right) {
          return 1;
        } else if (left < right) {
          return -1;
        }

      }

      return 0;

    });

  } else {

    var columns;

    if (rocket.isArray(key_columns)) {

      columns = key_columns;

    } else {

      columns = [key_columns];

    }

    for (var i = 0; columns[i]; ++i) {
      if (
          (typeof columns[i] === 'string') ||
          (typeof columns[i] === 'number')
      ) {
        columns[i] =
            /** @type {rocket.SortKey_} */
            ({'key': columns[i]});
      }
    }

    var len = columns.length;

    arr.sort(function(a, b) {

      for (var i = 0; i < len; ++i) {

        /** @type {rocket.SortKey_} */
        var column = columns[i];

        var left = /** @type {string} */ (a[column.key]);
        var right = /** @type {string} */ (b[column.key]);

        if (column['null']) {

          if (left === null && right === null) {
            return 0;
          } else if (left === null) {
            return column.desc ? -1 : 1;
          } else if (right === null) {
            return column.desc ? 1 : -1;
          }

        }

        if (column.type === 'number') {

          left = +left;
          right = +right;

        } else if (column.type === 'money') {

          left = +left.replace('(', '-').replace(/[\$,\)]/g, '');
          right = +right.replace('(', '-').replace(/[\$,\)]/g, '');

        } else if (column.type === 'date') {

          left =
              left.split(/\D/)[2] +
              left.split(/\D/)[0] +
              left.split(/\D/)[1];
          right =
              right.split(/\D/)[2] +
              right.split(/\D/)[0] +
              right.split(/\D/)[1];

        } else if (column.type !== 'static') {

          left = '' + left;
          right = '' + right;

        }

        if (left > right) {
          return column.desc ? -1 : 1;
        } else if (left < right) {
          return column.desc ? 1 : -1;
        }

      }

      return 0;

    });

  }

  return arr;

};
