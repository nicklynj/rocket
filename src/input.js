


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
@type {boolean}
@private
*/
rocket.Input.prototype.input_displayed_ = false;


/**
@return {boolean}
*/
rocket.Input.prototype.getInputDisplayed = function() {
  return this.input_displayed_;
};


/**
@return {rocket.Elements}
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
@return {rocket.Elements}
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
@param {rocket.Elements} input
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
dispose
*/
rocket.Input.prototype.disposeInternal = function() {

  if (this.input_displayed_) {

    this.hide();

  }

  this.getInputElement().removeEventListener('.Input');
  this.input_remove_document_listener_();

};


/**
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
@final
*/
rocket.Input.prototype.enter = function() {

  this.enterInternal();

  this.dispatchEvent('enter');

};


/**
@final
*/
rocket.Input.prototype.up = function() {
  this.upInternal();
};


/**
@final
*/
rocket.Input.prototype.down = function() {
  this.downInternal();
};


/**
@final
*/
rocket.Input.prototype.pageUp = function() {
  this.pageUpInternal();
};


/**
@final
*/
rocket.Input.prototype.pageDown = function() {
  this.pageDownInternal();
};


/**
@final
*/
rocket.Input.prototype.change = function() {
  this.changeInternal();
};


/**
Override me.
*/
rocket.Input.prototype.changeInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.showInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.hideInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.enterInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.upInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.downInternal = function() {};


/**
Override me.
*/
rocket.Input.prototype.pageUpInternal = function() {
  for (var i = 0; i < 5; ++i) {
    this.up();
  }
};


/**
Override me.
*/
rocket.Input.prototype.pageDownInternal = function() {
  for (var i = 0; i < 5; ++i) {
    this.down();
  }
};
