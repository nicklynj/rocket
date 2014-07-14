

/**
Searches the document and returns a new rocket.Elements object of the Elements
that match the given query.

For browsers that don't natively support document.querySelectorAll, the only
supported queries are #id, nodeName, .className, and nodeName.className.

For documents that do natively support document.querySelectorAll, any
natively supported query is also supported within this function.

If the optional context is not specified, then the document body is assumed.

Only the first Element of the optional context is used.

@param {(Window|string|Element|Array.<Element>|NodeList|rocket.Elements|Array.<rocket.Elements>|undefined|null)} query
  The query used to match Elements.
@param {(HTMLDocument|string|Element|Array.<Element>|NodeList|rocket.Elements)=} opt_context
  The parent container within which to constrain queries.
@return {rocket.Elements}
  A new rocket.Elements object containing the matched Elements.

@test {document.body} The string "body".
rocket.$('body')[0];

@test {document.body} The HTMLBodyElement.
rocket.$(document.body)[0];

@test {document.body} The HTMLBodyElement in an Array.
rocket.$([document.body])[0];

@test {1} The HTMLBodyElement length.
rocket.$('body').length;

@test {0} No parameters.
rocket.$().length;

@test {0} Empty Array.
rocket.$([]).length;

*/
rocket.$ = function(query, opt_context) {

  /** @type {(Array.<Element>|NodeList)} */
  var elements;

  if (typeof query === 'string') {
    if (arguments.length === 1) {
      if (query.charAt(0) === '#' && query.match(/^#[\w\d]+$/)) {
        var element = document.getElementById(query.substr(1));
        if (element) {
          elements = [element];
        } else {
          elements = [];
        }
      } else {
        elements = rocket.querySelectorAll(query, document);
      }
    } else {
      if (typeof opt_context === 'string') {
        elements =
            rocket.querySelectorAll(
                query,
                rocket.querySelectorAll(opt_context)[0]
            );
      } else {
        if (opt_context.nodeType) {
          elements =
              rocket.querySelectorAll(
                  query,
                  /** @type {(HTMLDocument|Element)} */ (opt_context)
              );
        } else {
          elements = rocket.querySelectorAll(query, opt_context[0]);
        }
      }
    }


  } else {

    if (query) {
      if (query.nodeType || query === window) {
        elements = [query];
      } else {
        if (rocket.isArray(query[0])) {
          elements = [];
          for (var i = 0; query[i]; ++i) {
            for (var j = 0; query[i][j]; ++j) {
              elements.push(query[i][j]);
            }
          }
        } else {
          elements = /** @type {(Array.<Element>|NodeList)} */ (query);
        }
      }
    } else {
      elements = [];
    }

  }

  return new rocket.Elements(/** @type {(Array.<Element>|NodeList)} */
      (elements)
  );

};
