

/**
JSON namespace.

@const
@namespace
*/
rocket.JSON = {};


/**
Converts a given JSON string into an Object.

@param {string} str The String.
@return {*} The Object.

@test {{}} An empty Object.
rocket.JSON.parse("{}");

@test {true} true.
rocket.JSON.parse("true");

@test {"foo"} The string "foo".
rocket.JSON.parse('"foo"');

@test {[1,"false",false]} An Array.
rocket.JSON.parse('[1,"false",false]');

@test {{"x":5}} An Object.
rocket.JSON.parse('{"x": 5}');

*/
rocket.JSON.parse = function(str) {

  if (window.JSON && window.JSON.parse) {

    rocket.JSON.parse = window.JSON.parse;

  } else {

    rocket.JSON.parse = function(json_string) {
      return eval('(' + json_string + ')');
    };

  }

  return rocket.JSON.parse(str);

};


/**
Quotes a string.

@private
@param {string} str The string to quote.
@return {string} The quoted string.
*/
rocket.JSON.quote_ = function(str) {

  rocket.JSON.quote_.escapable_.lastIndex = 0;

  if (rocket.JSON.quote_.escapable_.test(str)) {

    return '"' +
        str.replace(
            rocket.JSON.quote_.escapable_,
            rocket.JSON.quote_.replacer_
        ) +
        '"';

  } else {

    return '"' + str + '"';

  }

};


/**
Regular expression of escapable characters.

@private
@param {string} str The string to be replaced.
@return {string} The replaced string.
*/
rocket.JSON.quote_.replacer_ = function(str) {

  return rocket.JSON.quote_.meta_[str] ||
      '\\u' + ('0000' + str.charCodeAt(0).toString(16)).slice(-4);

};


/**
Regular expression of escapable characters.

@private
@type {RegExp}
*/
rocket.JSON.quote_.escapable_ =
    /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;


/**
Character substitutions.

@private
@type {Object.<string, string>}
*/
rocket.JSON.quote_.meta_ = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"' : '\\"',
  '\\': '\\\\'
};


/**
Converts an object to a JSON string.

@param {*} object The object.
@return {(string|undefined)} The JSON string.

@test {"{}"} An empty Object.
rocket.JSON.stringify({});

@test {"true"} true.
rocket.JSON.stringify(true);

@test {'"foo"'} The string "foo".
rocket.JSON.stringify("foo");

@test {'[1,"false",false]'} An Array.
rocket.JSON.stringify([1, "false", false]);

@test {'{"x":5}'} An Object.
rocket.JSON.stringify({"x": 5});

*/
rocket.JSON.stringify = function(object) {

  if (window.JSON && window.JSON.stringify) {

    rocket.JSON.stringify = window.JSON.stringify;

  } else {

    rocket.JSON.stringify = function(object) {

      var i;
      var len;
      var string;
      var type;

      if (object === undefined) {

        return undefined;

      } else {

        type = typeof object;

        if (type === 'string') {

          return rocket.JSON.quote_(/** @type {string} */ (object));

        } else if (type === 'number' || type === 'boolean' || object === null) {

          return '' + object;

        } else if (
            typeof /** @type {{length: number}} */
                (object).length === 'number') {

          len = /** @type {{length: number}} */ (object).length;
          i = 0;
          string = [];

          for (; i < len; ++i) {

            if (object[i] === undefined) {
              string[i] = 'null';
            } else {
              string[i] = rocket.JSON.stringify(object[i]);
            }

          }

          return '[' + string.join(',') + ']';

        } else {

          string = [];

          for (i in object) {

            if (object[i] !== undefined) {

              string.push(
                  rocket.JSON.quote_(i) + ':' +
                      rocket.JSON.stringify(object[i])
              );

            }

          }

          return '{' + string.join(',') + '}';

        }
      }

    };

  }

  return rocket.JSON.stringify(object);

};
