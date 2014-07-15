

/**
Adds a CSSStyleRule to this document.

@param {string} rule The rule.
@test {20} Check the affects of a CSSStyleRule on an inserted element.

var random = rocket.random();

rocket.insertRule('#foo' + random + ' {padding: 10px}');

var foo = rocket.createElement('div');
foo.setAttribute({'id': 'foo' + random});

rocket.$('body').appendChild(foo);

var rect = foo.getBoundingClientRect();

rocket.$('body').removeChild(foo);

rect.height;

*/
rocket.insertRule = function(rule) {

  var style_element = document.createElement('style');
  style_element.type = 'text/css';

  if (document.head) {
    document.head.appendChild(style_element);
  } else {
    /** @type {HTMLHeadElement} */ (document.getElementsByTagName('head')[0])
        .appendChild(style_element);
  }

  var style_sheet = /** @type {CSSStyleSheet} */
      (document.styleSheets[document.styleSheets.length - 1]);

  if (style_sheet.insertRule) {

    rocket.insertRule = function(rule) {
      style_sheet.insertRule(rule, 0);
    };

  } else {

    rocket.insertRule = function(rule) {
      var pos = rule.indexOf('{');
      style_sheet.addRule(
          rule.substr(0, pos),
          rule.substr(pos + 1, rule.lastIndexOf('}') - pos - 1)
      );
    };

  }

  rocket.insertRule(rule);

};
