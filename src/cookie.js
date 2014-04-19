

/**
Sets/gets cookies.

@param {(string|Object.<string, string>)=} opt_values
  Value to get or key/values to set.
@param {string=} opt_value Value to set.
@return {(Object.<string, string>|string)} The cookie.
*/
rocket.cookie = function(opt_values, opt_value) {

  var key_value_obj;

  if (arguments.length === 2) {

    key_value_obj = {};
    key_value_obj[opt_values] = opt_value;

  } else if (arguments.length === 1) {

    if (typeof opt_values === 'string') {

      return rocket.cookie.parse_cookie_()[opt_values] || '';

    } else {

      key_value_obj = opt_values;

    }

  }

  if (key_value_obj) {

    for (var key in key_value_obj) {
      document.cookie =
          encodeURIComponent(key) + '=' +
              encodeURIComponent(key_value_obj[key]);
    }

  }

  return rocket.cookie.parse_cookie_();

};


/**
@private
@return {Object.<string, string>}
*/
rocket.cookie.parse_cookie_ = function() {

  var cookie = document.cookie.split('; ');
  var ret = {};

  for (var i = 0, len = cookie.length; i < len; ++i) {

    var pos = cookie[i].indexOf('=');
    ret[decodeURIComponent(cookie[i].substr(0, pos))] =
        decodeURIComponent(cookie[i].substr(pos + 1));

  }

  return ret;

};