

/**
Compare two Objects and determines if they contain identical properties.

Descends recursively into Objects.

@param {Object} a An Object to compare.
@param {Object} b An Object to compare.
@return {boolean} Whether the given Objects contain identical properties.

@test {true} Objects with same properties.
rocket.equal({'a': 'b', 'c': [0, 1]}, {'a': 'b', 'c': [0, 1]});

@test {false} Objects tested with equal operator.
({'a': 'b', 'c': [0, 1]} === {'a': 'b', 'c': [0, 1]});

@test {false} Objects without same properties.
rocket.equal({'a': 'b'}, {'a': 'b', 'c': [0, 1]});

@test {true} Equivalent HTMLDivElement (except in IE; uniqueID attribute).
if (window.navigator.userAgent.indexOf('MSIE') === -1) {
  rocket.equal(document.createElement('div'), document.createElement('div'));
} else {
  true;
}

@test {false} Equivalent HTMLDivElement but appended to another Element.
var foo = document.createElement('div');
var bar = document.createElement('div');
var baz = document.createElement('div');
baz.appendChild(foo);
baz.appendChild(bar);
rocket.equal(foo, bar);

@test {false} Two different HTMLElement.
rocket.equal(document.createElement('div'), document.createElement('span'));

@test {true} Circular references that are equal.
var foo = {};
var bar = {};
var baz = {};

foo.foo = baz;
bar.foo = baz;

baz.foo = foo;
baz.bar = bar;

baz.baz = 'baz';

rocket.equal(foo, bar);

@test {false} Circular references that are not equal.
var foo = {};
var bar = {};
var baz = {};

foo.foo = baz;
bar.foo = bar; // self circular reference

baz.foo = foo;
baz.bar = bar;

baz.baz = 'baz';

rocket.equal(foo, bar);

@test {true} HTMLDocumentElement.
rocket.equal(document, document);

@test {false} HTMLDocumentElement and HTMLBodyElement.
rocket.equal(document.body, document);

@test {false} HTMLDocumentElement and HTMLBodyElement.
rocket.equal(document, document.body);

@test {true} HTMLBodyElement.
rocket.equal(document.body, document.body);

@test {true} Same Date.
var date = new Date();
rocket.equal(date, date);

@test {false} Different Date.
var foo = new Date('1900-01-01');
var bar = new Date('2000-01-0');
rocket.equal(foo, bar);

*/
rocket.equal = function(a, b) {

  return rocket.equal.equal_(a, b, [], []);

};


/**
Equal function with reference Array.

@private
@param {Object} a
@param {Object} b
@param {Array.<Object>} as
@param {Array.<Object>} bs
@return {boolean}
*/
rocket.equal.equal_ = function(a, b, as, bs) {

  if (a === b) {
    return true;
  }

  for (var i = 0; as[i]; ++i) {
    if ((as[i] === a) && (bs[i] === b)) {
      return true;
    }
  }

  if (
      a === null || typeof a !== 'object' ||
      b === null || typeof b !== 'object'
  ) {

    return a === b;

  } else {

    if (('' + a) !== ('' + b)) {
      return false;
    }

    var a_is_array = rocket.isArray(a);
    var b_is_array = rocket.isArray(b);

    if (
        (a_is_array && !b_is_array) ||
        (!a_is_array && b_is_array)
    ) {
      return false;
    }

    as.push(a);
    bs.push(b);

    for (var i in a) {

      if (!rocket.equal.equal_(a[i], b[i], as, bs)) {
        return false;
      }

    }

    for (var i in b) {
      if (!(i in a)) {
        return false;
      }
    }

  }

  return true;

};
