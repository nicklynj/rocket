


/**
A helper class for creating components that improve an HTMLInputElement.

This class handles showing/hiding when appropriate.

The intention is that children components will inherit this class and override
the show/hide prototype methods.

@constructor
@extends {rocket.Component}
*/
rocket.Input = function() {};
rocket.inherits(rocket.Input, rocket.Component);


/**
@return {rocket.Elements}
*/
rocket.Input.prototype.create = function() {
  return rocket.createElement('input');
};


/**
@type {rocket.Elements}
@private
*/
rocket.Input.prototype.input_element_;


/**
@return {rocket.Elements}
*/
rocket.Input.prototype.getInput = function() {
  return this.input_element_;
};


/**
@private
@type {function(Event)}
*/
rocket.Input.prototype.input_document_listener_;


/**
@param {rocket.Elements} input
*/
rocket.Input.prototype.decorate = function(input) {

  this.input_element_ = input;

  var self = this;

  this.input_document_listener_ = /** @param {Event} e */ (function(e) {
    self.hide(e);
    self.dispatchEvent('hide');
  });

  new rocket.Elements([document]).addEventListener(
      'mousedown.Input',
      this.input_document_listener_
  );

  input
      .addEventListener(
          ['keyup.Input', 'mousedown.Input'],
          /** @param {Event} e */
          function(e) {

            if (e.type === 'mousedown') {
              new rocket.Elements([document]).dispatchEvent('mousedown');
              e.stopPropagation();
            }

            if (e.type === 'mousedown' || e.which === rocket.KEY.tab) {
              self.show(e);
              self.dispatchEvent('show');
            }

          }
      )
      .addEventListener(
          ['afterkeydown.Input', 'cut.Input', 'paste.Input'],
          /** @param {Event} e */
          function(e) {

            if (e.type === 'keydown' &&
                (e.which === rocket.KEY.enter || e.which === rocket.KEY.tab)) {

              self.hide(e);
              self.dispatchEvent('hide');

            } else if (e.type !== 'keyup' || e.which !== rocket.KEY.enter) {

              self.show(e);
              self.dispatchEvent('show');

            }

          }
      );

};


/**
@param {Event} e
*/
rocket.Input.prototype.show = function(e) {};


/**
@param {Event} e
*/
rocket.Input.prototype.hide = function(e) {};


/**
*/
rocket.Input.prototype.dispose = function() {

  if (this.input_element_) {

    this.hide(/** @type {Event} */ ({'type': 'dispose'}));
    this.dispatchEvent('hide');

    this.input_element_.removeEventListener('.Input');
    new rocket.Elements([document]).removeEventListener(
        'mousedown.Input',
        this.input_document_listener_
    );

    if (this.rendered()) {
      this.input_element_.parentNode().removeChild(this.input_element_);
    }

    delete this.input_element_;

  }

};
