

/**
Lexicographical analyzer.

Parses javascript code and returns an Array of Objects each containing
a string part of the code and the type of that string.

This is not a full stack based parser/interpreter.  It cannot check for errors.

There is a minor (will not fix) known issue with two division operators
appearing on the same line being incorrectly interpreted as a
regular expression. e.g. "var foo = 5 / 5 / 5;"

@param {string} string String of JavaScript code.
@return {Array.<{type: string, value: string}>} The interpreted JavaScript.

@test {rocket.lexeme("var foo = 'bar';")} Lexicographically analyze a string.
[
    {"type":"word","value":"var"},
    {"type":"whitespace","value":" "},
    {"type":"identifier","value":"foo"},
    {"type":"whitespace","value":" "},
    {"type":"operator","value":"="},
    {"type":"whitespace","value":" "},
    {"type":"string","value":"'bar'"},
    {"type":"operator","value":";"}
]

@test {rocket.lexeme("var foo = 5;")} Variable assignment with semicolon.
[
    {"type":"word","value":"var"},
    {"type":"whitespace","value":" "},
    {"type":"identifier","value":"foo"},
    {"type":"whitespace","value":" "},
    {"type":"operator","value":"="},
    {"type":"whitespace","value":" "},
    {"type":"number","value":"5"},
    {"type":"operator","value":";"}
]

@test {rocket.lexeme("var foo = 5")} Variable assignment without semicolon.
[
    {"type":"word","value":"var"},
    {"type":"whitespace","value":" "},
    {"type":"identifier","value":"foo"},
    {"type":"whitespace","value":" "},
    {"type":"operator","value":"="},
    {"type":"whitespace","value":" "},
    {"type":"number","value":"5"}
]

@test {rocket.lexeme("var foo = 5 / 5 / 5;")}
  Multiple division operator on a single line.
[
    {"type":"word","value":"var"},
    {"type":"whitespace","value":" "},
    {"type":"identifier","value":"foo"},
    {"type":"whitespace","value":" "},
    {"type":"operator","value":"="},
    {"type":"whitespace","value":" "},
    {"type":"number","value":"5"},
    {"type":"whitespace","value":" "},
    {"type":"regexp","value":"/ 5 /"},
    {"type":"whitespace","value":" "},
    {"type":"number","value":"5"},
    {"type":"operator","value":";"},
]

*/
rocket.lexeme = function(string) {

  var position = 0;
  var len = string.length;
  var results = [];
  var character;
  var initial_position;
  var type;
  var value;

  while (character = string.charAt(position++)) {

    initial_position = position;

    if (character >= 'a' && character <= 'z' ||
        character >= 'A' && character <= 'Z' ||
        character === '$' || character === '_') {

      do {
        character = string.charAt(position++);
      } while (character >= 'a' && character <= 'z' ||
          character >= 'A' && character <= 'Z' ||
          character === '$' || character === '_' ||
          character >= '0' && character <= '9');

      type = 'identifier';
      --position;

    } else if (character === '/') {

      if (string.charAt(position) === '*') {

        do {
          character = string.charAt(position++);
        } while (position < len &&
            (character !== '*' || string.charAt(position) !== '/'));

        type = 'comment';
        ++position;

      } else if (string.charAt(position) === '/') {

        do {
          character = string.charAt(position++);
        } while (position < len && character !== '\n');

        type = 'comment';

        if (position !== len) {
          --position;
        }

      } else {

        do {
          character = string.charAt(position++);
        } while (position < len && character !== '\n' &&
            (character !== '/' ||
                string.charAt(position - 2) === '\\' &&
                    string.charAt(position - 3) !== '\\'));

        if (character === '\n' || position === len) {
          position = initial_position;
          type = 'operator';
        } else {
          type = 'regexp';
        }

      }
    } else if (character in rocket.lexeme.operators_) {

      type = 'operator';

    } else if (character === '\'' || character === '"') {

      var terminator = character;
      do {
        character = string.charAt(position++);
      } while (position < len &&
          (character !== terminator ||
          string.charAt(position - 2) === '\\' &&
          string.charAt(position - 3) !== '\\'));

      type = 'string';

    } else if (character >= '0' && character <= '9' ||
        character === '.' &&
            string.charAt(position + 1) >= '0' &&
                string.charAt(position + 1) <= '9') {

      do {
        character = string.charAt(position++);
      } while (
          (character >= '0' && character <= '9' ||
          character === '.' || character === 'x' || character === 'e'));

      type = 'number';

      --position;

    } else {

      do {
        character = string.charAt(position++);
      } while (character === ' ' ||
          character === '\t' || character === '\r' || character === '\n');

      type = 'whitespace';

      --position;

    }

    value =
        string.substr(initial_position - 1, position - initial_position + 1);

    results.push({
      'type':
          (type === 'identifier' && value in rocket.lexeme.words_) ?
              'word' :
              type,
      'value': value
    });

  }

  return results;

};


/**
@private
@type {Object.<string, number>}
*/
rocket.lexeme.operators_ = {
  '!': 1,
  '#': 1,
  '%': 1,
  '&': 1,
  '(': 1,
  ')': 1,
  '*': 1,
  '+': 1,
  ',': 1,
  '-': 1,
  '.': 1,
  '/': 1,
  ':': 1,
  ';': 1,
  '<': 1,
  '=': 1,
  '>': 1,
  '?': 1,
  '@': 1,
  '[': 1,
  ']': 1,
  '^': 1,
  '{': 1,
  '|': 1,
  '}': 1
};


/**
@private
@type {Object.<string, number>}
*/
rocket.lexeme.words_ = {
  'true': 1,
  'false': 1,
  'break': 1,
  'case': 1,
  'catch': 1,
  'continue': 1,
  'debugger': 1,
  'default': 1,
  'delete': 1,
  'do': 1,
  'else': 1,
  'finally': 1,
  'for': 1,
  'function': 1,
  'if': 1,
  'in': 1,
  'instanceof': 1,
  'new': 1,
  'null': 1,
  'return': 1,
  'switch': 1,
  'this': 1,
  'throw': 1,
  'try': 1,
  'typeof': 1,
  'var': 1,
  'void': 1,
  'while': 1,
  'with': 1,
  'undefined': 1,
  'prototype': 1,
  'arguments': 1
};
