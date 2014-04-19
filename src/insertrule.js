

/**
Adds a class to this document.

@param {string} rule The rule.
@example
$.insertRule('body {padding: 10px}');
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
