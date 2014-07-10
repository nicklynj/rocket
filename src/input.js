


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
@param {rocket.Elements} input
*/
rocket.Input.prototype.decorate = function(input) {

  var self = this;

  this.input_document_listener_ = /** @param {Event} e */ (function(e) {
    if (self.input_displayed_) {
      self.input_displayed_ = false;
      self.hide();
    }
  });

  new rocket.Elements([document]).addEventListener(
      ['mousedown.Input', 'touchstart.Input'],
      this.input_document_listener_
  );

  this.input_value_ = input.value();

  input
      .addEventListener(
          'keyup.Input',
          /** @param {Event} e */
          function(e) {

            if (e.which === rocket.KEY.tab) {
              if (!self.input_displayed_) {

                self.input_displayed_ = true;
                self.input_value_ = input.value();
                self.show();

              }
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

              self.input_displayed_ = true;
              self.input_value_ = input.value();
              self.show();

            }

          }
      )
      .addEventListener(
          ['afterkeydown.Input', 'cut.Input', 'paste.Input'],
          /** @param {Event} e */
          function(e) {

            var input_value = input.value();

            if (self.input_value_ !== input_value) {

              self.input_value_ = input_value;

              if (!self.input_displayed_) {
                self.input_displayed_ = true;
                self.show();
              }

              self.change();

            }

            if (e.type === 'keydown') {

              if (e.which === rocket.KEY.down) {

                self.down();

              } else if (e.which === rocket.KEY.up) {

                self.up();

              } else if (e.which === rocket.KEY.pageDown) {

                self.pageDown();

              } else if (e.which === rocket.KEY.pageUp) {

                self.pageUp();

              } else if (e.which === rocket.KEY.escape) {

                self.hide();

              } else if (e.which === rocket.KEY.enter) {

                self.enter();
                self.input_displayed_ = false;
                self.hide();

              } else if (e.which === rocket.KEY.tab) {

                self.input_displayed_ = false;
                self.hide();

              }

            }

          }
      );

};


/**
dispose
*/
rocket.Input.prototype.dispose = function() {

  if (this.input_displayed_) {
    this.hide();
  }

  new rocket.Elements([document]).removeEventListener(
      ['mousedown.Input', 'touchstart.Input'],
      this.input_document_listener_
  );

};


/**
Override this.
*/
rocket.Input.prototype.show = function() {};


/**
Override this.
*/
rocket.Input.prototype.hide = function() {};


/**
Override this.
*/
rocket.Input.prototype.cancel = function() {};


/**
Override this.
*/
rocket.Input.prototype.enter = function() {};


/**
Override this.
*/
rocket.Input.prototype.up = function() {};


/**
Override this.
*/
rocket.Input.prototype.down = function() {};


/**
Maybe override this.
*/
rocket.Input.prototype.pageUp = function() {
  for (var i = 0; i < 5; ++i) {
    this.up();
  }
};


/**
Maybe override this.
*/
rocket.Input.prototype.pageDown = function() {
  for (var i = 0; i < 5; ++i) {
    this.down();
  }
};


/**
Override this.
*/
rocket.Input.prototype.change = function() {};
