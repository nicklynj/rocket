


/**
A helper class for creating classes that interact with the DOM.

The intention is that children classes will inherit this class and override
the createElementInternal, decorateInternal, and disposeInternal methods.

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
@param {rocket.Elements} element
*/
rocket.Component.prototype.setComponentElement = function(element) {
  this.component_element_ = element;
};


/**
@return {rocket.Elements}
*/
rocket.Component.prototype.getComponentElement = function() {
  return this.component_element_;
};


/**
@final
@return {rocket.Elements}
*/
rocket.Component.prototype.createElement = function() {

  if (!this.component_element_created_) {

    this.component_element_created_ = true;

    this.component_element_ = this.createElementInternal();

  }

  return this.component_element_;

};


/**
@final
@param {rocket.Elements} element
*/
rocket.Component.prototype.decorate = function(element) {

  if (!this.component_decorated_) {

    this.component_decorated_ = true;

    this.decorateInternal(element);

  }

};


/**
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
dispose
@final
*/
rocket.Component.prototype.dispose = function() {

  if (this.component_element_created_ && !this.component_disposed_) {

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
Override me.
@return {rocket.Elements}
*/
rocket.Component.prototype.createElementInternal = function() {

  return rocket.createElement('div');

};


/**
Override me.
@param {rocket.Elements} element
*/
rocket.Component.prototype.decorateInternal = function(element) {};


/**
Override me.
*/
rocket.Component.prototype.disposeInternal = function() {};
