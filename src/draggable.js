


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
rocket.Draggable.z_index_ = 0;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.x_;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.y_;


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
rocket.Draggable.prototype.fill_ = false;


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

@param {boolean} fix Whether to fix dragging to the x axis.
*/
rocket.Draggable.prototype.setFixX = function(fix) {

  this.fixX_ = fix;

};


/**
Prevent the Element from being moved on the horizontal y axis.

@param {boolean} fix Whether to fix dragging to the y axis.
*/
rocket.Draggable.prototype.setFixY = function(fix) {

  this.fixY_ = fix;

};


/**
Set the default or current x or left position of the HTMLDivElement container.

This can only be called if the draggable HTMLElement
is already attached to a parent HTMLElement.

@param {number} x The x offset in pixels.
*/
rocket.Draggable.prototype.setX = function(x) {

  this.x_ = x;

  this.init_draggable_container_();

  if (this.container_) {
    this.container_.style({'left': this.x_});
  }

};


/**
Set the default or current y or top position of the HTMLDivElement container.

This can only be called if the draggable HTMLElement
is already attached to a parent HTMLElement.

@param {number} y The y offset in pixels.
*/
rocket.Draggable.prototype.setY = function(y) {

  this.y_ = y;

  this.init_draggable_container_();

  if (this.container_) {
    this.container_.style({'top': this.y_});
  }

};


/**
Fill the empty space created by appending the draggable Element to a container
with its position set to absolute.

Defaults to false.

@param {boolean} fill Whether to fill the empty space with a place holder.
*/
rocket.Draggable.prototype.setFill = function(fill) {

  this.fill_ = fill;

};


/**
Increment a global zIndex counter and assign it to any Draggable Element when
dragging is initiated.

Defaults to false.

@param {boolean} z_index Whether to use zIndex.
*/
rocket.Draggable.prototype.setZIndex = function(z_index) {

  this.z_index_ = z_index;

};


/**
Whenever a Draggable is dragged, append it to the end of its parent container.

Defaults to false.

@param {boolean} append_child
  Whether to appendChild the HTMLElement to its parent when it's moved.
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
@type {rocket.Elements}
*/
rocket.Draggable.prototype.element_;


/**
@private
@type {function(Event)}
*/
rocket.Draggable.prototype.first_mouse_down_handler_;


/**
@private
@type {function(Event)}
*/
rocket.Draggable.prototype.mouse_down_handler_;


/**
@private
@type {function(Event)}
*/
rocket.Draggable.prototype.mouse_move_handler_;


/**
@private
@type {function()}
*/
rocket.Draggable.prototype.mouse_up_handler_;


/**
@private
@type {ClientRect}
*/
rocket.Draggable.prototype.offset_rect_;


/**
@private
@type {ClientRect}
*/
rocket.Draggable.prototype.dragging_rect_;


/**
@private
@type {ClientRect}
*/
rocket.Draggable.prototype.bounding_rect_;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.mouse_x_;


/**
@private
@type {number}
*/
rocket.Draggable.prototype.mouse_y_;


/**
Overridden method from the Input helper class.

@param {rocket.Elements} element The draggable HTMLElement.
*/
rocket.Draggable.prototype.decorateInternal = function(element) {

  this.element_ = element;

  var self = this;

  if ((this.x_ === undefined) && (this.y_ === undefined)) {

    this.first_mouse_down_handler_ = /** @param {Event} e */ (function(e) {

      self.init_draggable_container_();

      element.removeEventListener(
          ['mousedown', 'touchstart'],
          self.first_mouse_down_handler_
      );

      self.mouse_down_handler_(e);

    });

    element.addEventListener(
        ['mousedown', 'touchstart'],
        this.first_mouse_down_handler_
    );

  } else {

    this.init_draggable_container_();

  }


  this.mouse_down_handler_ = /** @param {Event} e */ (function(e) {

    e.preventDefault();

    self.offset_rect_ = self.container_.getOffset();
    self.dragging_rect_ = self.element_.getBoundingClientRect();
    self.bounding_rect_ =
        (self.bounds_ || rocket.$('html')).getBoundingClientRect();

    self.mouse_x_ = e.pageX;
    self.mouse_y_ = e.pageY;

    if (self.z_index_) {
      self.container_.style({
        'zIndex': '' + (++rocket.Draggable.z_index_)
      });
    }

    if (self.append_child_) {

      self.container_.parentNode().appendChild(self.container_);
      self.mouse_move_handler_(e);

    }

    new rocket.Elements([document])
      .addEventListener(['mousemove', 'touchmove'], self.mouse_move_handler_)
      .addEventListener(
            ['mouseup', 'touchend'],
            self.mouse_up_handler_
        );

    self.dispatchEvent('dragstart');

  });

  this.mouse_move_handler_ = /** @param {Event} e */ (function(e) {

    if (e.type === 'touchmove') {
      e.preventDefault();
    }

    if (!self.fixX_) {

      var left = e.pageX - self.mouse_x_;

      self.container_.style({
        'left': rocket.clamp(
            left,
            self.bounding_rect_.left - self.dragging_rect_.left,
            self.bounding_rect_.right - self.dragging_rect_.right
        ) + self.offset_rect_.left
      });

    }

    if (!self.fixY_) {

      var top = e.pageY - self.mouse_y_;

      self.container_.style({
        'top': rocket.clamp(
            top,
            self.bounding_rect_.top - self.dragging_rect_.top,
            self.bounding_rect_.bottom - self.dragging_rect_.bottom
        ) + self.offset_rect_.top
      });

    }

  });

  this.mouse_up_handler_ = function() {

    new rocket.Elements([document])
      .removeEventListener(
            ['mousemove', 'touchmove'],
            self.mouse_move_handler_
        )
      .removeEventListener(
            ['mouseup', 'touchend'],
            self.mouse_up_handler_
        );

    self.dispatchEvent('dragend');

  };



};


/**
@private
*/
rocket.Draggable.prototype.init_draggable_container_ = function() {

  if (!this.container_ && this.element_) {

    var rect = this.element_.getBoundingClientRect();

    var left;
    var top;

    if (this.x_ === undefined) {

      if (this.element_.style('left') === '') {

        left = '';

      } else {

        left = 0;
        rect.height = 0;

      }

    } else {

      left = this.x_;

    }

    if (this.y_ === undefined) {

      if (this.element_.style('top') === '') {

        top = '';

      } else {

        top = 0;
        rect.height = 0;

      }

    } else {

      top = this.y_;

    }

    this.container_ =
        rocket.createElement('div')
        .preventSelect()
        .style({
          'position': 'absolute',
          'width': rect.width,
          'height': rect.height,
          'left': left,
          'top': top
        })
        .addEventListener(
            ['mousedown', 'touchstart'],
            this.mouse_down_handler_
        );

    this.setComponentElement(this.container_);

    var parent = this.element_.parentNode();

    parent.insertBefore(this.container_, this.element_);

    if (this.fill_) {

      this.filler_ =
          /** @type {rocket.Elements} */ (
          rocket.createElement('div').style({
            'width': rect.width,
            'height': rect.height
          }));

      parent.insertBefore(this.filler_, this.element_);

    }

    this.container_.appendChild(this.element_);

  }

};


/**
Overridden method from the Component helper class.

if decorated, the moving Element will be returned to its original position.
*/
rocket.Draggable.prototype.disposeInternal = function() {

  if (this.first_mouse_down_handler_) {

    this.element_.removeEventListener(
        ['mousedown', 'touchstart'],
        this.first_mouse_down_handler_
    );

  }

  if (this.container_) {

    var parent = this.container_.parentNode();

    if (!this.getComponentRendered()) {
      parent.insertBefore(
          this.element_,
          this.container_
      );
    }

    this.container_.removeEventListener();

    this.mouse_up_handler_();

    parent.removeChild(this.container_);

    if (this.fill_) {
      parent.removeChild(this.filler_);
    }

    this.removeEventListener();

    delete this.container_;

  }

};
