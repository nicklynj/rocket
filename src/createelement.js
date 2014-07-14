

/**
Shortcut method for creating a rocket.Elements object that contains only a newly
created Element.

@param {string} tag_name
  The tagName of the DOM element to create.
@return {rocket.Elements} The new rocket.Elements containing the newly created
Element.
@example
rocket.createElement('div');

@test {"DIV"} Create an HTMLDivElement.
rocket.createElement('div')[0].nodeName;

@test {1} The rocket.Elements has a length of one.
rocket.createElement('div').length
*/
rocket.createElement = function(tag_name) {
  return new rocket.Elements([document.createElement(tag_name)]);
};
