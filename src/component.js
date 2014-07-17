


/**
A helper class for creating classes that interact with the DOM.

The intention is that children classes will inherit this class and override
the *Internal methods:
createElementInternal, decorateInternal, and disposeInternal.

These methods are final and cannot be overriden:
createElement, decorate, dispose, and render.

@constructor
@implements {rocket.Disposable}
@extends {rocket.EventTarget}
*/
rocket.Component = function() {};
rocket.inherits(rocket.Component, rocket.EventTarget);


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_disposed_ = false;


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_decorated_ = false;


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_rendered_ = false;


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_element_created_ = false;


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_element_referenced_ = false;


/**
Returns true if this component has been rendered.

@return {boolean}
*/
rocket.Component.prototype.getComponentRendered = function() {
  return this.component_rendered_;
};


/**
Returns trus if this component has been disposed.

@return {boolean}
*/
rocket.Component.prototype.getComponentDisposed = function() {
  return this.component_disposed_;
};


/**
@private
@type {rocket.Elements}
*/
rocket.Component.prototype.component_element_;


/**
Set the HTMLElement that this component represents.

@param {rocket.Elements} element
*/
rocket.Component.prototype.setComponentElement = function(element) {
  this.component_element_ = element;
};


/**
Get the HTMLElement that this component represents.

@return {rocket.Elements}
*/
rocket.Component.prototype.getComponentElement = function() {
  return this.component_element_;
};


/**
Create the HTMLElement that this component represents
by calling createElementInternal.

@final
@return {rocket.Elements}
*/
rocket.Component.prototype.createElement = function() {

  if (
      (!this.component_element_created_) &&
      (!this.component_element_referenced_)
  ) {

    this.component_element_created_ = true;

    this.component_element_ = this.createElementInternal();

  }

  return this.component_element_;

};


/**
Decorate the given HTMLElement by calling decorateInternal.

@final
@param {rocket.Elements} element
*/
rocket.Component.prototype.decorate = function(element) {

  if (!this.component_decorated_) {

    if (!this.component_element_created_) {

      this.component_element_referenced_ = true;
      this.component_element_ = element;

    }

    this.decorateInternal(element);

    this.component_decorated_ = true;

  }

};


/**
Render the an HTMLElement created by createElement and decorated by
decorate onto the optionally given parent or the HTMLBodyElement.

Render calls the createElement and the decorate methods; then Render
attaches the decorated HTMLElement to the given parent or the HTMLBodyElement.

@final
@param {rocket.Elements=} opt_parent
*/
rocket.Component.prototype.render = function(opt_parent) {

  this.component_rendered_ = true;

  var element = this.createElement();

  this.decorate(element);

  if (arguments.length) {

    opt_parent.appendChild(element);

  } else {

    new rocket.Elements([document.body]).appendChild(element);

  }

};


/**
Removes any EventListener added to this Component and removes the
HTMLElement from its parent if this Component was rendered.

If this Component was decorated, the HTMLElement is not removed
from its parent when disposed.

@final
*/
rocket.Component.prototype.dispose = function() {

  if (this.component_decorated_ && !this.component_disposed_) {

    this.disposeInternal();

    this.component_disposed_ = true;

    if (this.component_rendered_) {
      this.component_element_.parentNode().removeChild(this.component_element_);
    }

    delete this.component_element_;

    this.removeEventListener();

  }

};


/**
Override this method in a child class to return an HTMLElement.

@return {rocket.Elements}
*/
rocket.Component.prototype.createElementInternal = function() {

  return rocket.createElement('div');

};


/**
Override this method in a child class to decorate or add functionality to
an HTMLElement.

@param {rocket.Elements} element
*/
rocket.Component.prototype.decorateInternal = function(element) {};


/**
Override this method in a child class to remove any added EventListener
or HTMLElement.
*/
rocket.Component.prototype.disposeInternal = function() {};
