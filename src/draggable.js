


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

  this.bounds_ = rocket.$('html');

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
rocket.Draggable.z_index_ = 0;


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
@private
@type {boolean}
*/
rocket.Draggable.prototype.z_index_ = false;


/**
@private
@type {boolean}
*/
rocket.Draggable.prototype.append_child_ = false;


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.bounds_;


/**
Prevent the Element from being moved on the horizontal x axis.

@param {boolean} fix
*/
rocket.Draggable.prototype.setFixX = function(fix) {

  this.fixX_ = fix;

};


/**
Prevent the Element from being moved on the horizontal y axis.

@param {boolean} fix
*/
rocket.Draggable.prototype.setFixY = function(fix) {

  this.fixY_ = fix;

};


/**
Fill the empty space created by appending the draggable Element to a container
with its position set to absolute.

Defaults to true.

@param {boolean} fill
*/
rocket.Draggable.prototype.setFill = function(fill) {

  this.fill_ = fill;

};


/**
Increment a global zIndex counter and assign it to any Draggable Element when
dragging is initiated.

Defaults to false.

@param {boolean} z_index
*/
rocket.Draggable.prototype.setZIndex = function(z_index) {

  this.z_index_ = z_index;

};


/**
Whenever a Draggable is dragged, append it to the end of its parent container.

Defaults to false.

@param {boolean} append_child
*/
rocket.Draggable.prototype.setAppendChild = function(append_child) {

  this.append_child_ = append_child;

};


/**
Define a bounding Element to restrict the movement of the draggable Element.

@param {rocket.Elements} bounding_element
  A bounding Element.
*/
rocket.Draggable.prototype.setBounds = function(bounding_element) {

  this.bounds_ = rocket.$(bounding_element);

};


/**
@private
@type {rocket.Elements}
*/
rocket.Draggable.prototype.filler_;


/**
@private
@type {function()}
*/
rocket.Draggable.prototype.mouse_up_handler_;


/**
Overridden method from the Input helper class.

@param {rocket.Elements} element
*/
rocket.Draggable.prototype.decorateInternal = function(element) {

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

    if (self.z_index_) {
      self.container_.style({
        'zIndex': '' + (++rocket.Draggable.z_index_)
      });
    }

    if (self.append_child_) {

      self.container_.parentNode().appendChild(self.container_);
      mouse_move_handler(e);

    }

    doc
      .addEventListener(['mousemove', 'touchmove'], mouse_move_handler)
      .addEventListener(
            ['mouseup', 'touchend'],
            self.mouse_up_handler_
        );

  });

  var mouse_move_handler = /** @param {Event} e */ (function(e) {

    if (e.type === 'touchmove') {
      e.preventDefault();
    }

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
      .removeEventListener(['mousemove', 'touchmove'], mouse_move_handler)
      .removeEventListener(
            ['mouseup', 'touchend'],
            self.mouse_up_handler_
        );
  };

  var rect = element.getBoundingClientRect();

  this.container_ =
      rocket.createElement('div')
      .preventSelect()
      .style({
        'position': 'absolute',
        'width': rect.width,
        'height': rect.height
      })
      .addEventListener(['mousedown', 'touchstart'], mouse_down_handler);

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
Overridden method from the Component helper class.

if decorated, the moving Element will be returned to its original position.
*/
rocket.Draggable.prototype.disposeInternal = function() {

  if (this.container_) {

    if (!this.getComponentRendered()) {
      this.container_.parentNode().insertBefore(
          this.getComponentElement(),
          this.container_
      );
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
