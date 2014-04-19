

/**
Loads an external javascript source file.

@param {string} url The url of the source file to load.
@param {function()=} opt_callback The function to call when complete.
@example
rocket.load('js/foo.js', function(){
  alert('loaded foo.js!');
});
*/
rocket.load = function(url, opt_callback) {

  var head;
  var heads;
  var scripts;
  var script;

  var head_i;
  var script_i;

  if (document.head) {
    head = document.head;
  } else {
    head = /** @type {HTMLHeadElement} */
        (document.getElementsByTagName('head')[0]);
  }

  script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = url;

  script.onload = script.onreadystatechange = function() {

    var ready_state =
        /** @type {Element} */ (rocket.load.elements_[script_i]).readyState;

    if (!ready_state ||
        ready_state === 'loaded' ||
        ready_state === 'complete') {

      if (opt_callback) {
        opt_callback();
      }

      rocket.load.elements_[head_i].removeChild(
          rocket.load.elements_[script_i]
      );

      delete rocket.load.elements_[head_i];
      delete rocket.load.elements_[script_i];

    }

  };

  head.insertBefore(script, head.firstChild);

  head_i = ++rocket.load.guid_;
  script_i = ++rocket.load.guid_;

  rocket.load.elements_[head_i] = head;
  rocket.load.elements_[script_i] = script;

  head = null;
  script = null;

};


/**
Guid used to prevent leaks to head or script.

@private
*/
rocket.load.guid_ = 0;


/**
Storage for pointers to Elements to prevent leaks.

@private
@type {Object.<number, (Element|Node)>}
*/
rocket.load.elements_ = {};
