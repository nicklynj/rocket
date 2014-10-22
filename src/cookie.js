

/**
Sets/gets cookie values.

@param {(string|Object.<string, string>)=} opt_values
  Value to get or key/values to set.
@param {string=} opt_value Value to set.
@param {number=} opt_days The number of days after which the cookie expires.
@return {(Object.<string, string>|string)} The cookie.

@test {'bar'} Set and get the value of foo.
rocket.cookie('foo', 'bar');
rocket.cookie('foo');

@test {'bar'} Set and get the value of foo to expire tomorrow.
rocket.cookie('foo', 'bar', 1);
rocket.cookie('foo');

@test {'foo'} Set and get the value of bar.
rocket.cookie({'bar': 'foo'});
rocket.cookie('bar');

@test {'bar=foo;'} Set and get the value of "foo=bar;".
rocket.cookie({'foo=bar;': 'bar=foo;'});
rocket.cookie('foo=bar;');

*/
rocket.cookie = function(opt_values, opt_value, opt_days) {

  var key_value_obj;
  var expires = '';

  switch (arguments.length) {

    case 3:
      expires = '; expires=' +
          (new Date(rocket.now() + opt_days * 86400000)).toUTCString();

    case 2:
      key_value_obj = {};
      key_value_obj[opt_values] = opt_value;
      break;

    case 1:

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
              encodeURIComponent(key_value_obj[key]) +
                  expires;
    }

  }

  return rocket.cookie.parse_cookie_();

};


/**
@private
@return {Object.<string, string>}
*/
rocket.cookie.parse_cookie_ = function() {

  var cookie = document.cookie;
  var ret = {};

  if (cookie) {

    cookie = cookie.split('; ');

    for (var i = 0, len = cookie.length; i < len; ++i) {

      var pos = cookie[i].indexOf('=');
      ret[decodeURIComponent(cookie[i].substr(0, pos))] =
          decodeURIComponent(cookie[i].substr(pos + 1));

    }

  }

  return ret;

};
