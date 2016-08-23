


/**
XMLHttpRequest class.

@constructor
@extends {rocket.EventTarget}
@param {XMLHttpRequest=} opt_request A request to use.
*/
rocket.XMLHttpRequest = function(opt_request) {

  this.request_ = opt_request || new XMLHttpRequest();
  this.headers_ = {};

};
rocket.inherits(rocket.XMLHttpRequest, rocket.EventTarget);


/**
Request url.

@private
@type {string}
*/
rocket.XMLHttpRequest.prototype.url_;


/**
Request method.

@private
@type {string}
*/
rocket.XMLHttpRequest.prototype.method_;


/**
Data string, object, or object returning function.

@type {(string|Object.<string, string>|function():(string|Object.<string, string>))}
*/
rocket.XMLHttpRequest.prototype.data;


/**
Data string before last sent request.

@private
@type {string}
*/
rocket.XMLHttpRequest.prototype.saved_data_;


/**
The XMLHttpRequest to use.

@private
@type {XMLHttpRequest}
*/
rocket.XMLHttpRequest.prototype.request_;


/**
The XMLHttpRequest headers.

@private
@type {Object.<string, string>}
*/
rocket.XMLHttpRequest.prototype.headers_;


/**
The onabort function.

@type {function()}
*/
rocket.XMLHttpRequest.prototype.onabort;


/**
The onreadystatechange function.

@type {function()}
*/
rocket.XMLHttpRequest.prototype.onreadystatechange;


/**
This readyState.

@type {number}
*/
rocket.XMLHttpRequest.prototype.readyState = 0;


/**
This status.

@type {number}
*/
rocket.XMLHttpRequest.prototype.status = 0;


/**
This responseText.

@type {string}
*/
rocket.XMLHttpRequest.prototype.responseText = '';


/**
This guid.

@private
@type {number}
*/
rocket.XMLHttpRequest.prototype.request_key_;


/**
Returns a string by looping through an object and using encodeURIComponent.

@private
@param {(Object|string)} object The object.
@return {string} The URI encoded string.
*/
rocket.XMLHttpRequest.prototype.uri_encode_ = function(object) {

  if (typeof object === 'string') {
    return object;
  }

  var encoded_string = [];

  for (var property in object) {

    encoded_string.push(
        encodeURIComponent(property) +
        '=' +
        encodeURIComponent(object[property])
    );

  }

  return encoded_string.join('&').replace(/%20/g, '+');
};


/**
Open a this rocket.XMLHttpRequest.

@param {string} method The method: "GET" or "POST".
@param {string} url The url.
*/
rocket.XMLHttpRequest.prototype.open = function(method, url) {

  this.method_ = method;
  this.url_ = url;

  var is_get = (method.toUpperCase() === 'GET');

  if (is_get) {
    this.init_data_();
  }

  this.request_.open(
      method,
      url +
          (is_get && this.saved_data_ ?
              (url.indexOf('?') === -1 ? '?' : '&') + this.saved_data_ :
              ''),
      true
  );

  this.init_ready_state_change_();

  this.headers_ = {};
  this.readyState = 1;
  this.status = 0;
  this.responseText = '';

  this.removeEventListener();
  delete this.onreadystatechange;
  delete this.onabort;

};


/**
Send this XHR request.

@param {string=} opt_data The data to send.
*/
rocket.XMLHttpRequest.prototype.send = function(opt_data) {

  var is_post = this.method_ && (this.method_.toUpperCase() === 'POST');

  if (opt_data) {

    this.request_.send(opt_data);

  } else {

    this.request_.send(
        (this.method_.toUpperCase() === 'POST') ? this.init_data_() : ''
    );

  }

  if (this.onreadystatechange) {

    this.onreadystatechange();

  }

  this.dispatchEvent('readystatechange');



};


/**
Sets headers

@param {string} header The header.
@param {string} value The value.
*/
rocket.XMLHttpRequest.prototype.setRequestHeader = function(header, value) {

  this.headers_[header] = value;

  this.request_.setRequestHeader(header, value);

};


/**
Abort this request.
*/
rocket.XMLHttpRequest.prototype.abort = function() {

  if (this.readyState) {

    if (this.request_ && typeof this.request_.abort === 'function') {

      this.request_.abort();

    }

    if (this.onabort) {

      this.onabort();

    }

    this.dispatchEvent('abort');

    this.removeEventListener();
    delete this.onreadystatechange;
    delete this.onabort;

    this.headers_ = {};
    this.readyState = 0;
    this.status = 0;
    this.responseText = '';

  }

};


/**
Internal function for data initialization.

Initializes this.saved_data_ from this.data.

@private
@return {string} This saved data.
*/
rocket.XMLHttpRequest.prototype.init_data_ = function() {

  var data;

  if (this.data) {

    if (typeof this.data === 'string') {

      this.saved_data_ = this.data;

    } else {

      if (typeof this.data === 'function') {

        data = /** @type {function():(string|Object.<string, string>)} */
            (this.data)();

      } else {

        data = this.data;

      }

      this.saved_data_ = this.uri_encode_(data);

    }

  } else {

    this.saved_data_ = '';

  }

  return this.saved_data_;

};


/**
Internal function for readystatechange initialization.

Initializes this.request_.onreadystatechange.

@private
*/
rocket.XMLHttpRequest.prototype.init_ready_state_change_ = function() {

  var request_key_ = ++rocket.XMLHttpRequest.request_key_;
  rocket.XMLHttpRequest.requests_[request_key_] = this;

  this.request_.onreadystatechange = function() {

    var self = rocket.XMLHttpRequest.requests_[request_key_];

    if (self) {

      self.readyState = self.request_.readyState;

      if (self.readyState === 4) {

        self.status = self.request_.status;

        if (self.status === 200) {

          self.responseText = self.request_.responseText;

          /** @type {function():(string|Object.<string, string>)} */
          self.data;

          if (typeof self.data === 'function' &&
                  self.saved_data_ !== self.uri_encode_(self.data())
          ) {
            self.dispatchEvent('change');
          } else {
            self.dispatchEvent('nochange');
          }

          self.dispatchEvent('success');

        } else if (self.status !== 0) {

          self.dispatchEvent('error');

        }

        self.dispatchEvent('complete');

      }

      if (self.onreadystatechange) {
        self.onreadystatechange();
      }

      self.dispatchEvent('readystatechange');

      if (self.readyState === 4) {

        self.removeEventListener();

        delete self.onreadystatechange;
        delete self.onabort;

        self = null;

        delete rocket.XMLHttpRequest.requests_[request_key_];

      }

    }

  };

};


/**
Guid to prevent request leaks.

@private
*/
rocket.XMLHttpRequest.request_key_ = 0;


/**
Storage of requests to prevent leaks.

@private
@type {Object.<number, rocket.XMLHttpRequest>}
*/
rocket.XMLHttpRequest.requests_ = {};
