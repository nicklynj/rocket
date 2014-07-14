


/**
A wrapper class used to represent and easily manipulate the given Event.

Also normalizes Event properties and methods.

@extends {Event}
@constructor
@param {(Event|string)} evt_or_type
  The given native Event or an Event.type for which to create an Event.
@param {boolean=} opt_bubbles Whether this Event should bubble.
@param {boolean=} opt_cancelable Whether this Event can be cancelled.
@see {rocket.EventTarget}
@see {rocket.EventListener}
@link
http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event
@link
https://developer.mozilla.org/en-US/docs/Web/API/Event
*/
rocket.Event = function(evt_or_type, opt_bubbles, opt_cancelable) {

  if (evt_or_type.type) {

    this.type = evt_or_type.type;
    this.originalEvent = /** @type {Event} */ (evt_or_type);

    var property;

    for (var i = 0; property = rocket.Event.properties_[i]; ++i) {
      this[property] = evt_or_type[property];
    }

    if (this.defaultPrevented === true || this.returnValue === false) {
      this.defaultPrevented = true;
    } else {
      this.defaultPrevented = false;
    }

    if (this.cancelBubble === true) {
      this.propagationStopped = true;
    } else {
      this.propagationStopped = false;
    }

    if (this.which === undefined && this.keyCode !== undefined) {
      this.which = this.keyCode;
    }

    if (this.target === undefined && this.srcElement !== undefined) {
      this.target = this.srcElement;
    }

    if (this.relatedTarget === undefined &&
        this.fromElement !== undefined &&
        this.toElement !== undefined) {

      this.relatedTarget = (this.fromElement === this.target) ?
          this.toElement :
          this.fromElement;

    }

    if (this.pageX === undefined && this.clientX !== undefined) {

      this.pageX = this.clientX;

      var body = document.body;
      var documentElement = document.documentElement;

      if (documentElement) {
        this.pageX += documentElement.scrollLeft - documentElement.clientLeft;
      } else if (body) {
        this.pageX += body.scrollLeft - body.clientLeft;
      }

      this.pageY = this.clientY;

      if (documentElement) {
        this.pageY += documentElement.scrollTop - documentElement.clientTop;
      } else if (body) {
        this.pageY += body.scrollTop - body.clientTop;
      }

    }


  } else {
    this.type = /** @type {string} */ (evt_or_type);
  }

  if (arguments.length === 1) {
    this.bubbles = true;
    this.cancelable = true;
  } else if (arguments.length === 2) {
    this.bubbles = true;
    this.cancelable = /** @type {boolean} */ (opt_cancelable);
  } else {
    this.bubbles = /** @type {boolean} */ (opt_bubbles);
    this.cancelable = /** @type {boolean} */ (opt_cancelable);
  }

};


/**
Array of properties to extend from Event.

@private
@type {Array.<string>}
*/
rocket.Event.properties_ = [
  'which',
  'keyCode',
  'target',
  'srcElement',
  'relatedTarget',
  'fromElement',
  'toElement',
  'pageX',
  'pageY',
  'clientX',
  'clientY'
];


/**
A reference to the original Event.

This can be used to access properties that are not extended from the
original Event; or to access their original non-normalized values.

@type {Event}
*/
rocket.Event.prototype.originalEvent;


/**
Normalized propagationStopped.

This property should be considered read-only.

To stop propagation call Event.stopPropagation().

@type {boolean}
*/
rocket.Event.prototype.propagationStopped = false;


/**
Normalized immediatePropagationStopped.

This property should be considered read-only.

To immediately stop propagation call Event.stopImmediatePropagation().

@type {boolean}
*/
rocket.Event.prototype.immediatePropagationStopped = false;


/**
Normalized defaultPrevented.

This property should be considered read-only.

To prevent the default related Event action call Event.preventDefault().

@type {boolean}
*/
rocket.Event.prototype.defaultPrevented = false;


/**
Normalized stopPropagation().

@link
https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation
*/
rocket.Event.prototype.stopPropagation = function() {

  if (this.originalEvent) {

    if (typeof this.originalEvent.stopPropagation === 'function') {

      this.originalEvent.stopPropagation();

    } else {

      this.originalEvent.cancelBubble = true;

    }

  }

  this.propagationStopped = true;

};


/**
Normalized stopImmediatePropagation().

@link
https://developer.mozilla.org/en-US/docs/Web/API/event.stopImmediatePropagation
*/
rocket.Event.prototype.stopImmediatePropagation = function() {

  if (this.originalEvent &&
      typeof this.originalEvent.stopImmediatePropagation === 'function') {

    this.originalEvent.stopImmediatePropagation();

  }

  this.immediatePropagationStopped = true;

};


/**
Normalized preventDefault().

@link
https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault
*/
rocket.Event.prototype.preventDefault = function() {

  if (this.originalEvent) {

    if (typeof this.originalEvent.preventDefault === 'function') {

      this.originalEvent.preventDefault();

    } else {

      this.originalEvent.returnValue = false;

    }

  }

  this.defaultPrevented = true;

};
