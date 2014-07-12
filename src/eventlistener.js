


/**
A wrapper class used to represent and easily manipulate the given EventListener.

@implements {EventListener}
@constructor
@param {EventTarget} target
@param {string} type
@param {(EventListener|function(!Event))} fnct
*/
rocket.EventListener = function(target, type, fnct) {

  this.target_ = target;
  this.type_ = type;
  this.handleEvent =
      /** @type {function(this:EventTarget, Event)} */
      (fnct.handleEvent || fnct);

};


/**
todo.

@private
*/
rocket.EventListener.listener_key_ = 0;


/**
todo.

@private
@type {Object.<number, rocket.EventListener>}
*/
rocket.EventListener.listeners_ = {};


/**
Get current listeners_.

@return {Object.<number, rocket.EventListener>}
*/
rocket.EventListener.getListeners = function() {
  return rocket.EventListener.listeners_;
};


/**
@type {function(this:EventTarget, Event)}
*/
rocket.EventListener.prototype.handleEvent;


/**
target.

@private
@type {EventTarget}
*/
rocket.EventListener.prototype.target_;


/**
Get the target.

@return {EventTarget}
*/
rocket.EventListener.prototype.get_target = function() {
  return this.target_;
};


/**
type.

@private
@type {string}
*/
rocket.EventListener.prototype.type_;


/**
This listener_key_.

@type {number}
*/
rocket.EventListener.prototype.listener_key_;


/**
bound.

@type {function(Event)}
*/
rocket.EventListener.prototype.bound_handler_;


/**
getbound.

@return {function(Event)} Bound function.
*/
rocket.EventListener.prototype.get_bound = function() {

  if (!this.bound_handler_) {

    var listener_key_ = ++rocket.EventListener.listener_key_;
    this.listener_key_ = listener_key_;
    rocket.EventListener.listeners_[listener_key_] = this;

    this.bound_handler_ = /** @type {function(Event)} */ (function(evt) {
      if (rocket.EventListener.listeners_[listener_key_]) {
        rocket.EventListener.listeners_[listener_key_].handleEvent.call(
            rocket.EventListener.listeners_[listener_key_].target_,
            new rocket.Event(evt)
        );
      }
    });

    var transformer =
        rocket.EventListener.event_listener_transformers_[this.type_];

    if (transformer) {
      this.bound_handler_ = transformer.transformer(this.bound_handler_);
    }

  }

  return this.bound_handler_;

};


/**
getboundtypes.

@return {Array.<string>}
*/
rocket.EventListener.prototype.get_bound_types = function() {
  var transformer =
      rocket.EventListener.event_listener_transformers_[this.type_];
  if (transformer) {
    return transformer.types;
  } else {
    return [this.type_];
  }
};


/**
remove bound.
*/
rocket.EventListener.prototype.remove_bound = function() {

  delete rocket.EventListener.listeners_[this.listener_key_];
  delete this.bound_handler_;
  delete this.listener_key_;

};


/**
Creates a wrapper function to only call listener on
a mouse enter or leave event.

@private
@param {function(Event)} listener The event listener.
@return {function(Event)}
  The listener to be bound using addEventListener.
*/
rocket.EventListener.event_listener_transformer_after_key_down_ =
    function(listener) {

  var interval;
  var time_out;

  var time_out_function = function() {

    if (interval) {

      clearInterval(interval);
      interval = 0;

    }

    time_out = 0;

  };

  /** @type {HTMLInputElement} */
  var self;
  /** @type {string} */
  var value;
  /** @type {Event} */
  var event;

  var interval_function = function() {

    if (self.value !== value) {

      clearInterval(interval);
      interval = 0;

      listener.call(self, event);

    }

  };


  return (/**
  @this {HTMLInputElement}
  @param {Event} the_event The event.
  */ (function(the_event) {

        listener.call(this, the_event);

        if (the_event.type === 'keyup') {

          if (interval) {

            clearInterval(interval);
            interval = 0;

            if (time_out) {

              clearTimeout(time_out);
              time_out = 0;

            }

          }

        } else {

          if (!interval) {

            self = this;
            value = this.value;
            event = the_event;

            interval = setInterval(interval_function, 17);

          }

          if (time_out) {

            clearTimeout(time_out);

          }

          time_out = setTimeout(time_out_function, 100);

        }

      })
  );

};


/**
Creates a wrapper function to only call listener on
a mouse enter or leave event.

@private
@param {function(Event)} listener The event listener.
@return {function(Event)}
  The listener to be bound using addEventListener.
*/
rocket.EventListener.event_listener_transformer_mouse_enter_leave_ =
    function(listener) {

  return (/**
  @this {EventTarget}
  @param {Event} the_event The event.
  */(function(the_event) {

        /** @type {(EventTarget|Node)} */
        var related_target = the_event.relatedTarget;

        if (related_target) {

          while ((/** @type {EventTarget} */ (related_target) !== this) &&
              (related_target =
                  /** @type {Node} */ (related_target).parentNode)) {}

        }

        if (!related_target) {
          listener.call(this, the_event);
        }

      })
  );

};


/**
Custom DOM Events.

@const
@private
@type {Object.<string,{transformer: function(function(Event)):function(Event), types: Array.<string>}>}
*/
rocket.EventListener.event_listener_transformers_ = {
  'afterkeydown': {
    'transformer':
        rocket.EventListener.event_listener_transformer_after_key_down_,
    'types': ['keydown', 'keyup']
  },
  'mouseenter': {
    'transformer':
        rocket.EventListener.event_listener_transformer_mouse_enter_leave_,
    'types': ['mouseover']
  },
  'mouseleave': {
    'transformer':
        rocket.EventListener.event_listener_transformer_mouse_enter_leave_,
    'types': ['mouseout']
  }
};

