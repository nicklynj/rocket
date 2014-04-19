

/**
Returns an Array of Elements or a NodeList of Elements that match the given
query.

Used by rocket.$.

@param {string} query
  The query used to match Elements.
@param {(HTMLDocument|Element)=} opt_context
  The context within which to constrain queries.
@return {(NodeList|Array.<Element>)}
  The Array of Elements or a NodeList of Elements that match the given query.
*/
rocket.querySelectorAll = function(query, opt_context) {

  if (arguments.length === 2 && !opt_context) {
    return [];
  } else {
    return rocket.querySelectorAll.helper_(query, opt_context);
  }

};


/**
Query the DOM for a CSS selector string.

@private
@param {string} query The query string.
@param {(HTMLDocument|Element)=} opt_context The context.
@return {(NodeList|Array.<Element>)} The matching Elements.
*/
rocket.querySelectorAll.helper_ = function(query, opt_context) {

  if (document.querySelectorAll) {

    rocket.querySelectorAll.helper_ = function(query, opt_context) {
      return (opt_context || document).querySelectorAll(query);
    };

  } else {

    rocket.querySelectorAll.helper_ = function(query, opt_context) {

      if (query.indexOf(',') !== -1) {
        var queries = query.split(',');
        var results = [];
        for (var i = 0; queries[i]; ++i) {
          var elements =
              rocket.querySelectorAll.helper_(queries[i], opt_context);
          for (var j = 0; elements[j]; ++j) {
            results.push(elements[j]);
          }
        }
        return results;
      }

      if (query.charAt(0) === '#') {
        if (!opt_context || opt_context === document) {
          var results = document.getElementById(query.substr(1));
          return results && [results] || [];
        } else {
          var elements = opt_context.getElementsByTagName('*');
          var results = [];
          for (var i = 0; elements[i]; ++i) {
            if (/** @type {Element} */ (elements[i]).id === query.substr(1)) {
              results.push(elements[i]);
            }
          }
          return results;
        }
      } else {

        var dot_pos = query.indexOf('.');
        if (dot_pos === -1) {

          return (opt_context || document).getElementsByTagName(query);

        } else {

          var node_name = query.substr(0, dot_pos);
          var class_name = query.substr(dot_pos + 1);
          var matches = [];
          var memo = {};
          var elements =
              (opt_context || document).getElementsByTagName(node_name || '*');

          for (var i = 0; elements[i]; ++i) {
            var this_class_name =
                /** @type {Element} */ (elements[i]).className;
            if (!(this_class_name in memo)) {
              var this_class_names = rocket.arrayify(this_class_name);
              memo[this_class_name] = false;
              for (var j = 0; this_class_names[j]; ++j) {
                if (this_class_names[j] === class_name) {
                  memo[this_class_name] = true;
                  break;
                }
              }
            }
            if (memo[this_class_name]) {
              matches.push(elements[i]);
            }
          }

          return matches;

        }

      }

    };

  }

  return rocket.querySelectorAll.helper_(query, opt_context);

};
