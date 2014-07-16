

/**
@typedef
    {{key: (string|number), desc: boolean, type: string, null: boolean}}
*/
rocket.SortKey_;


/**
@typedef {(string|number|rocket.SortKey_)}
*/
rocket.SortArg_;


/**
Sorts an Array of Objects by a key or keys that exists in each Object.

This method changes the original Array.

Supported types are: number, money, date, static, and string.  If not specified
or not a supported type, string comparison is used.  Static comparison forces
no casting to happen before comparison.

Setting null to true causes null values to be sorted first instead of last.

A column is an object with the properties: key, desc, type, and null.

@param {Array.<Object>} arr The Array of Objects.
@param {...(rocket.SortArg_|Array.<rocket.SortArg_>)} var_args
  The key that exists within each Object, a column,
  or an Array of keys or columns.
@return {Array.<Object>} The sorted Array of Objects.

@test {[{'a':1,'b':1},{'a':2,'b':1},{'a':2,'b':2},{'a':3,'b':1}]}
  Sort the Array using variable arguments.
var foo = [{'a':3,'b':1},{'a':1,'b':1},{'a':2,'b':2},{'a':2,'b':1}];
rocket.sort(foo, 'a', 'b');

@test {[{'a':1,'b':1},{'a':2,'b':1},{'a':2,'b':2},{'a':3,'b':1}]}
  Sort the Array using a column in variable arguments.
var foo = [{'a':3,'b':1},{'a':1,'b':1},{'a':2,'b':2},{'a':2,'b':1}];
rocket.sort(foo, {'key': 'a'}, 'b');

@test {[{'a':1,'b':1},{'a':2,'b':1},{'a':2,'b':2},{'a':3,'b':1}]}
  Sort the Array using an Array in variable arguments with a column.
var foo = [{'a':3,'b':1},{'a':1,'b':1},{'a':2,'b':2},{'a':2,'b':1}];
rocket.sort(foo, [{'key': 'a'}, 'b']);

@test {[{'a':1,'b':1},{'a':2,'b':1},{'a':2,'b':2},{'a':3,'b':1}]}
  Sort the Array using an Array in variable arguments with a column with type.
var foo = [{'a':3,'b':1},{'a':1,'b':1},{'a':2,'b':2},{'a':2,'b':1}];
rocket.sort(foo, [{'key': 'a', 'desc': false, 'type': 'string'}, 'b']);

@test {[{'a':3,'b':1},{'a':2,'b':1},{'a':2,'b':2},{'a':1,'b':1}]}
  Sort the Array using an Array in variable arguments with a column descending.
var foo = [{'a':3,'b':1},{'a':1,'b':1},{'a':2,'b':2},{'a':2,'b':1}];
rocket.sort(foo, [{'key': 'a', 'desc': true, 'type': 'string'}, 'b']);

@test {[{'a': 1}, {'a': 2}, {'a': 3}, {'a': null}]}
  Sort the Array using variables arguments.
var foo = [{'a': null}, {'a': 3}, {'a': 2}, {'a': 1}];
rocket.sort(foo, [{'key': 'a'}]);

@test {[{'a': null}, {'a': 1}, {'a': 2}, {'a': 3}]}
  Sort the Array using variables arguments.
var foo = [{'a': null}, {'a': 3}, {'a': 2}, {'a': 1}];
rocket.sort(foo, [{'key': 'a', 'null': true}]);

@test {[{'a': '1'}, {'a': '200'}, {'a': '3'}]}
  Sort the Array using string comparison.
var foo = [{'a': '200'}, {'a': '1'}, {'a': '3'}];
rocket.sort(foo, {'key': 'a', 'type': 'string'});

@test {[{'a': '1'}, {'a': '3'}, {'a': '200'}]}
  Sort the Array using number comparison.
var foo = [{'a': '200'}, {'a': '1'}, {'a': '3'}];
rocket.sort(foo, {'key': 'a', 'type': 'number'});

@test {[{'a': '01/01/2038'}, {'a': '01/02/1970'}, {'a': '02/01/2000'}]}
  Sort the Array using string comparison.
var foo = [{'a': '01/01/2038'}, {'a': '02/01/2000'}, {'a': '01/02/1970'}];
rocket.sort(foo, {'key': 'a', 'type': 'string'});

@test {[{'a': '01/02/1970'}, {'a': '02/01/2000'}, {'a': '01/01/2038'}]}
  Sort the Array using date comparison.
var foo = [{'a': '01/01/2038'}, {'a': '02/01/2000'}, {'a': '01/02/1970'}];
rocket.sort(foo, {'key': 'a', 'type': 'date'});

@test {[{'a': '$10.00'}, {'a': '$200.00'}, {'a': '$30'}]}
  Sort the Array using string comparison.
var foo = [{'a': '$200.00'}, {'a': '$10.00'}, {'a': '$30'}];
rocket.sort(foo, {'key': 'a', 'type': 'string'});

@test {[{'a': '$10.00'}, {'a': '$30'}, {'a': '$200.00'}]}
  Sort the Array using money comparison.
var foo = [{'a': '$200.00'}, {'a': '$10.00'}, {'a': '$30'}];
rocket.sort(foo, {'key': 'a', 'type': 'money'});

@test {[{'a': '-$300'}, {'a': '($200.00)'}, {'a': '($10.00)'}]}
  Sort the Array using money comparison.
var foo = [{'a': '($200.00)'}, {'a': '($10.00)'}, {'a': '-$300'}];
rocket.sort(foo, {'key': 'a', 'type': 'money'});

*/
rocket.sort = function(arr, var_args) {

  var columns = [];

  for (var i = 1; arguments[i]; ++i) {

    if (rocket.isArray(arguments[i])) {

      for (var j = 0; arguments[i][j]; ++j) {

        if (
            (typeof arguments[i][j] === 'string') ||
            (typeof arguments[i][j] === 'number')
        ) {

          columns.push({
            'key': arguments[i][j]
          });

        } else {

          columns.push(arguments[i][j]);

        }

      }

    } else if (
        (typeof arguments[i] === 'string') ||
        (typeof arguments[i] === 'number')
    ) {

      columns.push({
        'key': arguments[i]
      });

    } else {

      columns.push(arguments[i]);

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
          return column.desc ? 1 : -1;
        } else if (right === null) {
          return column.desc ? -1 : 1;
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

  return arr;

};
