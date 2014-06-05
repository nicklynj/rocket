


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
rocket.Draggable = function() {

  this.bounds_ = new rocket.Elements([document.body]);

};
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
@private
@type {boolean}
*/
rocket.Draggable.prototype.fill_ = true;


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
Fill the empty space created by appending the draggable Element to a container
with its position set to absolute.

Defaults to true.

@param {boolean=} opt_fill
@return {boolean} Whether to draw a filler Element.
*/
rocket.Draggable.prototype.fill = function(opt_fill) {

  if (arguments.length) {
    this.fill_ = /** @type {boolean} */ (opt_fill);
  }

  return this.fill_;

};


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.bounds_;


/**
Define a bounding Element to restrict the movement of the draggable Element.

@param {rocket.Elements=} opt_bounding_element
  A bounding Element.
@return {rocket.Elements}
  The current bounding Element.
*/
rocket.Draggable.prototype.bound = function(opt_bounding_element) {

  if (arguments.length) {
    this.bounds_ = rocket.$(opt_bounding_element);
  }

  return this.bounds_;

};


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
rocket.Draggable.prototype.mouse_up_handler_;


/**
Decorate.

@param {rocket.Elements} element
*/
rocket.Draggable.prototype.decorate = function(element) {

  this.element_ = element;

  var doc = new rocket.Elements([document]);

  /** @type {ClientRect} */
  var dragging_rect;
  /** @type {ClientRect} */
  var bounding_rect;

  var mouse_x;
  var mouse_y;

  var self = this;

  var mouse_down_handler = /** @param {Event} e */ (function(e) {

    dragging_rect = self.container_.getBoundingClientRect();
    bounding_rect = self.bounds_.getBoundingClientRect();

    mouse_x = e.pageX;
    mouse_y = e.pageY;

    doc
      .addEventListener('mousemove', mouse_move_handler)
      .addEventListener(
            'mouseup',
            self.mouse_up_handler_
        );

  });

  var mouse_move_handler = /** @param {Event} e */ (function(e) {

    if (!self.fixX_) {

      var left = dragging_rect.left + e.pageX - mouse_x;

      self.container_.style({
        'left': rocket.clamp(
            left,
            bounding_rect.left,
            bounding_rect.width - dragging_rect.width
        )
      });

    }

    if (!self.fixY_) {

      var top = dragging_rect.top + e.pageY - mouse_y;

      self.container_.style({
        'top': rocket.clamp(
            top,
            bounding_rect.top,
            bounding_rect.height - dragging_rect.height
        )
      });

    }

  });

  this.mouse_up_handler_ = function() {
    doc
      .removeEventListener('mousemove', mouse_move_handler)
      .removeEventListener(
            'mouseup',
            self.mouse_up_handler_
        );
  };

  var rect = element.getBoundingClientRect();

  this.container_ =
      rocket.createElement('div')
      .preventSelect()
      .style({
        'position': 'absolute',
        'left': rect.left,
        'top': rect.top,
        'width': rect.width,
        'height': rect.height
      })
      .addEventListener('mousedown', mouse_down_handler);

  this.setComponentElement(this.container_);

  var parent = element.parentNode();

  if (parent.length) {

    parent.insertBefore(this.container_, element);

    if (this.fill_) {

      this.filler_ =
          /** @type {rocket.Elements} */ (
          rocket.createElement('div').style({
            'width': rect.width,
            'height': rect.height
          }));

      parent.insertBefore(this.filler_, element);

    }

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

    this.mouse_up_handler_();

    this.container_.parentNode().removeChild(this.container_);

    if (this.fill_) {
      this.filler_.parentNode().removeChild(this.filler_);
    }

    this.removeEventListener();

  }

};
