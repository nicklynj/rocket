

/**
Calls the given handler function as soon as possible when the DOM is ready.

@param {function()} handler The function to call when the DOM is ready.
*/
rocket.ready = function(handler) {

  /** @type {Array.<function()>} */
  var handlers;

  var dom_loading;
  var window_rocket;
  var ready_handler;
  var scroll_left_test;
  var interval;

  if (document.readyState === 'complete') {

    rocket.ready = function(handler) {
      handler();
    };

    handler();

  } else {

    window_rocket = new rocket.Elements([window]);
    dom_loading = true;

    handlers = [handler];

    rocket.ready = function(handler) {
      /** @type {Array.<function()>} */ (handlers).push(handler);
    };

    ready_handler = function() {

      var i;
      var len;

      if (dom_loading) {

        dom_loading = false;

        /** @type {rocket.Elements} */ (window_rocket).removeEventListener(
            ['load.ready', 'DOMContentLoaded.ready'],
            ready_handler
        );

        if (interval) {
          clearInterval(interval);
        }

        rocket.ready = function(handler) {
          handler();
        };

        for (i = 0, len = handlers.length; i < len; ++i) {
          handlers[i]();
        }

      }

    };

    window_rocket.addEventListener(
        ['load.ready', 'DOMContentLoaded.ready'],
        ready_handler
    );

    if (document.documentElement && window.frameElement === null) {

      scroll_left_test = function() {

        if (dom_loading) {
          try {
            document.documentElement.doScroll('left');
          } catch (e) {
            return setTimeout(scroll_left_test, 17);
          }

          ready_handler();

        }

      };

      setTimeout(scroll_left_test, 0);

    } else {

      interval = setInterval(function() {
        if (document.readyState === 'complete') {
          ready_handler();
        }
      }, 17);

    }

  }
};
