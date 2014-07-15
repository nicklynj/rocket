


/**
A helper class for creating components that improve an HTMLInputElement.

The intention is that children components will inherit this class and override
the *Internal methods: showInternal, hideInternal, upInternal, downInternal,
changeInternal, enterInternal, pageUpInternal, and pageDownInternal.

@constructor
@extends {rocket.Component}
*/
rocket.Input = function() {};
rocket.inherits(rocket.Input, rocket.Component);


/**
@type {boolean}
@private
*/
rocket.Input.prototype.input_displayed_ = false;


/**
Returns whether this HTMLInputElement currently has focus; whether the child
class should currently have its helper functionality displayed.

@return {boolean} Whether its displayed.
*/
rocket.Input.prototype.getInputDisplayed = function() {
  return this.input_displayed_;
};


/**
Returns the HTMLInputElement represented.

@return {rocket.Elements} A rocket.Elements containing the HTMLInputElement.
*/
rocket.Input.prototype.getInputElement = function() {
  return this.getComponentElement();
};


/**
@private
@type {function(Event)}
*/
rocket.Input.prototype.input_document_listener_;


/**
@private
@type {string}
*/
rocket.Input.prototype.input_value_;


/**
Overridden method from the Component helper class.

@return {rocket.Elements} A rocket.Elements containing the HTMLInputElement.
*/
rocket.Input.prototype.createElementInternal = function() {
  return rocket.createElement('input');
};


/**
@private
*/
rocket.Input.prototype.input_add_document_listener_ = function() {

  if (!this.input_document_listener_) {

    var self = this;

    this.input_document_listener_ = /** @param {Event} e */ (function(e) {
      self.hide();
    });

  }

  new rocket.Elements([document]).addEventListener(
      ['mousedown.Input', 'touchstart.Input'],
      this.input_document_listener_
  );

};


/**
@private
*/
rocket.Input.prototype.input_remove_document_listener_ = function() {

  new rocket.Elements([document]).removeEventListener(
      ['mousedown.Input', 'touchstart.Input'],
      this.input_document_listener_
  );

};


/**
Overridden method from the Component helper class.

@param {rocket.Elements} input
  A rocket.Elements containing the HTMLInputElement.
*/
rocket.Input.prototype.decorateInternal = function(input) {

  var self = this;

  input
      .addEventListener(
          'keyup.Input',
          /** @param {Event} e */
          function(e) {
            if (e.which === rocket.KEY.tab) {
              self.show();
            }
          }
      )
      .addEventListener(
          ['mousedown.Input', 'touchstart.Input'],
          /** @param {Event} e */
          function(e) {

            e.stopPropagation();

            if (!self.input_displayed_) {

              (new rocket.Elements([document]))
                  .dispatchEvent('mousedown')
                  .dispatchEvent('touchstart');

              self.show();

            }

          }
      )
      .addEventListener(
          ['afterkeydown.Input', 'cut.Input', 'paste.Input'],
          /** @param {Event} e */
          function(e) {

            if (
                (e.which !== rocket.KEY.enter) &&
                (e.which !== rocket.KEY.tab) &&
                (e.which !== rocket.KEY.shift)
            ) {

              self.show();

            }

            if (e.type === 'keydown') {

              if (e.which === rocket.KEY.down) {

                self.show();
                self.down();

              } else if (e.which === rocket.KEY.up) {

                self.show();
                self.up();

              } else if (e.which === rocket.KEY.pageDown) {

                self.show();
                self.pageDown();

              } else if (e.which === rocket.KEY.pageUp) {

                self.show();
                self.pageUp();

              } else if (e.which === rocket.KEY.escape) {

                self.hide();

              } else if (e.which === rocket.KEY.enter) {

                self.enter();

                self.hide();

              } else if (e.which === rocket.KEY.tab) {

                self.hide();

              }

            }

          }
      );

};


/**
Overridden method from the Component helper class.
*/
rocket.Input.prototype.disposeInternal = function() {

  if (this.input_displayed_) {

    this.hide();

  }

  this.getInputElement().removeEventListener('.Input');
  this.input_remove_document_listener_();

};


/**
Calls showInternal when focus is given to this HTMLInputElement.

@final
*/
rocket.Input.prototype.show = function() {

  if (!this.input_displayed_) {

    this.input_displayed_ = true;
    this.input_add_document_listener_();
    this.showInternal();

    this.dispatchEvent('show');

  }

  var input_value = /** @type {string} */ (this.getInputElement().value());

  if (this.input_value_ !== input_value) {

    this.input_value_ = input_value;
    this.change();

  }

};


/**
Calls hideInternal when focus is taken from this HTMLInputElement.

@final
*/
rocket.Input.prototype.hide = function() {

  if (this.input_displayed_) {

    this.input_displayed_ = false;
    this.input_remove_document_listener_();
    this.hideInternal();

    this.dispatchEvent('hide');

  }

};


/**
Calls enterInternal when the user presses the enter key.

@final
*/
rocket.Input.prototype.enter = function() {

  this.enterInternal();

  this.dispatchEvent('enter');

};


/**
Calls upInternal when the user presses the up key.

@final
*/
rocket.Input.prototype.up = function() {
  this.upInternal();
};


/**
Calls downInternal when the user presses the down key.

@final
*/
rocket.Input.prototype.down = function() {
  this.downInternal();
};


/**
Calls pageUpInternal when the user presses the pageUp key.

@final
*/
rocket.Input.prototype.pageUp = function() {
  this.pageUpInternal();
};


/**
Calls pageDownInternal when the user presses the pageDown key.

@final
*/
rocket.Input.prototype.pageDown = function() {
  this.pageDownInternal();
};


/**
Calls changeInternal when the user changes the value of the HTMLInputElement.

@final
*/
rocket.Input.prototype.change = function() {
  this.changeInternal();
};


/**
Override this method in a child class to handle the user
changing the value of this HTMLInputElement.
*/
rocket.Input.prototype.changeInternal = function() {};


/**
Override this method in a child class to handle the user giving focus
to this HTMLInputElement.
*/
rocket.Input.prototype.showInternal = function() {};


/**
Override this method in a child class to handle the user removing focus
from this HTMLInputElement.
*/
rocket.Input.prototype.hideInternal = function() {};


/**
Override this method in a child class to handle the user pressing
the enter key.
*/
rocket.Input.prototype.enterInternal = function() {};


/**
Override this method in a child class to handle the user pressing
the up key.
*/
rocket.Input.prototype.upInternal = function() {};


/**
Override this method in a child class to handle the user pressing
the down key.
*/
rocket.Input.prototype.downInternal = function() {};


/**
Override this method in a child class to handle the user pressing
the pageUp key.
*/
rocket.Input.prototype.pageUpInternal = function() {
  for (var i = 0; i < 5; ++i) {
    this.up();
  }
};


/**
Override this method in a child class to handle the user pressing
the pageDown key.
*/
rocket.Input.prototype.pageDownInternal = function() {
  for (var i = 0; i < 5; ++i) {
    this.down();
  }
};
