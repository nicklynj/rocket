

/**
Shorcut method for creating a rocket.Elements object that contains only a newly
created Element.

@param {string} tag_name
  The tagName of the DOM element to create.
@return {rocket.Elements} The new rocket.Elements containing the newly created
Element.
*/
rocket.createElement = function(tag_name) {
  return new rocket.Elements([document.createElement(tag_name)]);
};
