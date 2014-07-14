

/**
Returns the safely escaped html string representation of the given string.

@param {string} str The string.
@return {string} The escaped string.

@test {'A "quote" is &lt;b&gt;bold&lt;/b&gt;'} A "quote" is bold.
rocket.htmlEntities('A "quote" is <b>bold</b>');

@test {"A is less (&lt;) than; B is greater than (&gt;)"}
  "A is less (<) than; B is greater than (>)".
rocket.htmlEntities("A is less (<) than; B is greater than (>)");

@test {"Ampersand (&amp;)"} "Ampersand (&)".
rocket.htmlEntities("Ampersand (&)");

*/
rocket.htmlEntities = function(str) {

  var element = document.createElement('span');

  element.innerText = element.textContent = str;

  return element.innerHTML;

};
