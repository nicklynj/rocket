


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
@type {boolean}
@private
*/
rocket.Input.prototype.input_shown_ = false;


/**
@param {boolean=} opt_hidden
@return {boolean}
*/
rocket.Input.prototype.hidden = function(opt_hidden) {

  if (arguments.length) {

    if (opt_hidden) {
      this.input_shown_ = false;
    } else {
      this.input_shown_ = true;
    }

  }

  return !this.input_shown_;

};


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
    if (self.input_shown_) {
      self.input_shown_ = false;
      self.cancel();
      self.hide();
    }
  });

  new rocket.Elements([document]).addEventListener(
      ['mousedown.Input', 'touchstart.Input'],
      this.input_document_listener_
  );

  input
      .addEventListener(
          'keyup.Input',
          /** @param {Event} e */
          function(e) {

            if (e.which === rocket.KEY.tab) {
              if (!self.input_shown_) {
                self.input_shown_ = true;
                self.show();
                self.change();
              }
            }

          }
      )
      .addEventListener(
          ['mousedown.Input', 'touchstart.Input'],
          /** @param {Event} e */
          function(e) {

            e.stopPropagation();
            if (!self.input_shown_) {
              new rocket.Elements([document]).dispatchEvent('mousedown');
              self.input_shown_ = true;
              self.show();
              self.change();
            }

          }
      )
      .addEventListener(
          ['afterkeydown.Input', 'cut.Input', 'paste.Input'],
          /** @param {Event} e */
          function(e) {

            if (
                (e.type !== 'keyup') ||
                (e.which !== rocket.KEY.enter)
            ) {

              if (!self.input_shown_) {
                self.input_shown_ = true;
                self.show();
              }

              if (e.type === 'keydown') {

                if (e.which === rocket.KEY.down) {

                  self.down();
                  return;

                } else if (e.which === rocket.KEY.up) {

                  self.up();
                  return;

                } else if (e.which === rocket.KEY.pageDown) {

                  for (var i = 0; i < 5; ++i) {
                    self.down();
                  }
                  return;

                } else if (e.which === rocket.KEY.pageUp) {

                  for (var i = 0; i < 5; ++i) {
                    self.up();
                  }
                  return;

                } else if (e.which === rocket.KEY.escape) {

                  self.cancel();
                  self.hide();
                  return;

                } else if (
                    (e.which === rocket.KEY.enter) ||
                    (e.which === rocket.KEY.tab)
                ) {

                  self.enter();
                  self.input_shown_ = false;
                  self.hide();
                  return;

                }

              }

              self.change();

            }

          }
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
Override this.
*/
rocket.Input.prototype.change = function() {};


/**
*/
rocket.Input.prototype.dispose = function() {

  if (this.input_element_) {

    if (this.input_shown_) {
      this.hide();
    }

    this.input_element_.removeEventListener('.Input');
    new rocket.Elements([document]).removeEventListener(
        ['mousedown.Input', 'touchstart.Input'],
        this.input_document_listener_
    );

    delete this.input_element_;

    this.disposeInternal();

  }

};
