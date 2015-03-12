

/**
@type {string}
*/
Element.prototype.readyState;


/** @type {boolean} */
Event.prototype.propagationStopped;


/** @type {boolean} */
Event.prototype.defaultPrevented;


TextRange.prototype.select = function() {};


/**
@param {string} unit
@param {number} count
@return {number}
*/
TextRange.prototype.moveEnd = function(unit, count) {};


/**
@param {string} unit
@param {number} count
@return {number}
*/
TextRange.prototype.moveStart = function(unit, count) {};


/** @type {string} */
CSSStyleDeclaration.prototype.filter;


/** @type {(string|number)} */
CSSStyleDeclaration.prototype.opacity;


/** @type {string} */
Element.prototype.nodeName;


/**
@param {string} string
@return {string}
*/
String.trim = function(string) {};


/**
@param {string} string
@return {string}
*/
String.trimLeft = function(string) {};


/**
@param {string} string
@return {string}
*/
String.trimRight = function(string) {};


/**
@param {string} string
@return {*}
*/
window.JSON.parse = function(string) {};
