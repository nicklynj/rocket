


/**
Allows an Element to be moved by clicking and dragging the mouse.

An empty filler HTMLDivElement is created with the moving Element's width and
height and placed in the moving Element's original position.

An HTMLDivElement container is created with its position set to absolute and
with the moving Element's width and height.  This container is placed on top of
the empty filler HTMLDivElement.  The moving Element is appended to this
container.  This container is then moved via setting the left and right style
attributes.

The moving Element's style attributes are not touched.

When disposed, if decorated, the moving Element will be returned to its original
position.

@constructor
@extends {rocket.Component}
*/
rocket.Draggable = function() {};
rocket.inherits(rocket.Draggable, rocket.Component);


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.container_;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.current_left_;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.current_top_;


/**
@private
@type {boolean}
*/
rocket.Draggable.prototype.fixX_ = false;


/**
@private
@type {boolean}
*/
rocket.Draggable.prototype.fixY_ = false;


/**
Prevent the Element from being moved on the horizontal x axis.

@param {boolean=} opt_fix
@return {boolean} Whether the horizontal x axis is currently fixed.
*/
rocket.Draggable.prototype.fixX = function(opt_fix) {

  if (arguments.length) {
    this.fixX_ = /** @type {boolean} */ (opt_fix);
  }

  return this.fixX_;

};


/**
Prevent the Element from being moved on the vertical y axis.

@param {boolean=} opt_fix
@return {boolean} Whether the vertical y axis is currently fixed.
*/
rocket.Draggable.prototype.fixY = function(opt_fix) {

  if (arguments.length) {
    this.fixY_ = /** @type {boolean} */ (opt_fix);
  }

  return this.fixY_;

};


/**
@private
@type {ClientRect}
*/
rocket.Draggable.prototype.bounds_;


/**
Define a bounding rectangle to restrict the movement of the Element.

@param {ClientRect} rect
  An Object with: left, top, right, bottom number properties.
@return {ClientRect}
  The current bounding ClientRect.
*/
rocket.Draggable.prototype.bound = function(rect) {

  if (arguments.length) {
    this.bounds_ = rect;
  }

  return this.bounds_;

};


/**
@private
@type {ClientRect}
*/
rocket.Draggable.prototype.rect_;


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.filler_;


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.element_;


/**
@private
@type {function()}
*/
rocket.Draggable.prototype.mouse_up_leave_handler_;


/**
Decorate.

@param {rocket.Elements} element
*/
rocket.Draggable.prototype.decorate = function(element) {

  this.element_ = element;

  var doc = new rocket.Elements([document]);

  var mouse_x;
  var mouse_y;

  var self = this;

  var mouse_down_handler = /** @param {Event} e */ (function(e) {

    mouse_x = e.pageX;
    mouse_y = e.pageY;

    doc
      .addEventListener('mousemove', mouse_move_handler)
      .addEventListener(
            ['mouseup', 'mouseleave'],
            self.mouse_up_leave_handler_
        );

  });

  var mouse_move_handler = /** @param {Event} e */ (function(e) {

    if (!self.fixX_) {

      var left = self.current_left_ + e.pageX - mouse_x;

      if (
          self.bounds_ &&
              (
              (left < self.bounds_.left) ||
              ((left + self.rect_.width) > self.bounds_.right)
              )
      ) {

        left = self.current_left_;

      } else {

        self.current_left_ = left;

      }

      self.container_.style({
        'left': left
      });

      mouse_x = e.pageX;

    }

    if (!self.fixY_) {

      var top = self.current_top_ + e.pageY - mouse_y;

      if (
          self.bounds_ &&
              (
              (top < self.bounds_.top) ||
              ((top + self.rect_.height) > self.bounds_.bottom)
              )
      ) {

        top = self.current_top_;

      } else {

        self.current_top_ = top;

      }

      self.container_.style({
        'top': top
      });

      mouse_y = e.pageY;

    }

  });

  this.mouse_up_leave_handler_ = function() {
    doc
      .removeEventListener('mousemove', mouse_move_handler)
      .removeEventListener(
            ['mouseup', 'mouseleave'],
            self.mouse_up_leave_handler_
        );
  };

  this.rect_ = element.getBoundingClientRect();

  this.current_left_ = this.rect_.left;
  this.current_top_ = this.rect_.top;

  this.container_ =
      rocket.createElement('div')
      .preventSelect()
      .style({
        'position': 'absolute',
        'left': this.rect_.left,
        'top': this.rect_.top,
        'width': this.rect_.width,
        'height': this.rect_.height
      })
      .addEventListener('mousedown', mouse_down_handler);

  this.setComponentElement(this.container_);

  var parent = element.parentNode();

  if (parent.length) {

    parent.insertBefore(this.container_, element);

    this.filler_ =
        /** @type {rocket.Elements} */ (
        rocket.createElement('div').style({
          'width': this.rect_.width,
          'height': this.rect_.height
        }));

    parent.insertBefore(this.filler_, element);

  }

  this.container_.appendChild(element);

};


/**
Disposes this Component.

if decorated, the moving Element will be returned to its original position.
*/
rocket.Draggable.prototype.dispose = function() {

  if (this.container_) {

    if (!this.rendered()) {
      this.container_.parentNode().insertBefore(this.element_, this.container_);
    }

    this.container_.removeEventListener();

    this.mouse_up_leave_handler_();

    this.container_.parentNode().removeChild(this.container_);
    this.filler_.parentNode().removeChild(this.filler_);

    this.removeEventListener();

  }

};
