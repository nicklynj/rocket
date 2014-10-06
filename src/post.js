

/**
Use an XMLHttpRequest to POST data.

@param {string} url The url to POST.
@param {Object.<string, string>} data The data to POST.
@param {function(string)=} opt_success
  A handler function to call after a successful POST.
@param {function()=} opt_error
  A handler function to call after a failed POST.
@return {rocket.XMLHttpRequest} The request used.
*/
rocket.post = function(url, data, opt_success, opt_error) {

  var request = new rocket.XMLHttpRequest();

  request.open('POST', url);
  request.data = data;
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  if (opt_success) {
    request.addEventListener('success', function() {
      opt_success(request.responseText);
    });
  }

  if (opt_error) {
    request.addEventListener('error', function() {
      opt_error();
    });
  }

  request.send();

  return request;

};
