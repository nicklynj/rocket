

/**
Returns the safely escaped html string representation of the given string.

@param {string} str The string.
@return {string} The escaped string.
*/
rocket.htmlEntities = function(str) {

  var element = document.createElement('span');

  element.innerText = element.textContent = str;

  return element.innerHTML;

};
