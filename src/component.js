


/**
A helper class for creating classes that interact with the DOM.

The intention is that children classes will inherit this class and override
the decorate/create prototype methods.

If necessary, a child class can override this prototype dispose method.

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
rocket.Component.prototype.component_rendered_;


/**
@return {boolean}
*/
rocket.Component.prototype.rendered = function() {
  return this.component_rendered_;
};


/**
@private
@type {boolean}
*/
rocket.Component.prototype.component_disposed_ = false;


/**
@private
@type {rocket.Elements}
*/
rocket.Component.prototype.component_element_;


/**
@return {rocket.Elements}
*/
rocket.Component.prototype.create = function() {
  return rocket.createElement('div');
};


/**
@param {rocket.Elements} element
*/
rocket.Component.prototype.decorate = function(element) {};


/**
@param {rocket.Elements=} opt_parent
*/
rocket.Component.prototype.render = function(opt_parent) {

  this.component_rendered_ = true;

  this.component_element_ = this.create();

  this.decorate(this.component_element_);

  if (arguments.length) {

    opt_parent.appendChild(this.component_element_);

  } else {

    new rocket.Elements([document.body]).appendChild(this.component_element_);

  }

};


/**
dispose
*/
rocket.Component.prototype.dispose = function() {

  if (!this.component_disposed_) {

    this.component_disposed_ = true;

    if (this.component_rendered_) {
      this.component_element_.parentNode().removeChild(this.component_element_);
    }

    delete this.component_element_;

    this.removeEventListener();

  }

};
