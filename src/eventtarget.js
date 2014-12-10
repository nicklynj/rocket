


/**
A wrapper class used to represent and easily manipulate the given EventTarget.

Can be extended by a child class to provide the methods:
addEventListener, removeEventListener,and dispatchEvent to the child class.

@implements {EventTarget}
@constructor
@example
// provide add/remove/dispatch EventListeners to Baz
var Baz = function() {};
rocket.inherits(Baz, rocket.EventTarget);
@see {rocket.Event}
@see {rocket.EventListener}
@link
http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
@link
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
*/
rocket.EventTarget = function() {};


/**
If this is an Element, then nodeName will be populated.

@type {string}
@ignore
*/
rocket.EventTarget.prototype.nodeName;


/**
If this is the Window, then window will be itself.

@type {rocket.EventTarget}
@ignore
*/
rocket.EventTarget.prototype.window;


/**
If this is the Window, then self will be itself.

@type {rocket.EventTarget}
@ignore
*/
rocket.EventTarget.prototype.self;


/**
Functional definition used for compiler compatibility with IE.

@type {function(string, (EventListener|function(Event)))}
@ignore
*/
rocket.EventTarget.prototype.attachEvent;


/**
Functional definition used for compiler compatibility with IE.

@type {function(string, (EventListener|function(Event)))}
@ignore
*/
rocket.EventTarget.prototype.detachEvent;


/**
If this is an Element, then parentNode will be used
to propagate a dispatchEvent.

@type {rocket.EventTarget}
@ignore
*/
rocket.EventTarget.prototype.parentNode;


/**
Contains a tree of all of the current EventListeners for EventTargets.

@private
@type {Object.<number, Object.<string, Object.<string, Array.<EventListener>|undefined>|undefined>|undefined>}
*/
rocket.EventTarget.listener_tree_ = {};


/**
Gets current listener_tree_.

@return {Object.<number, Object.<string, Object.<string, Array.<EventListener>|undefined>|undefined>|undefined>}
*/
rocket.EventTarget.getListenerTree = function() {
  return rocket.EventTarget.listener_tree_;
};


/**
Removes all eventListeners from all eventTargets.

@param {boolean=} opt_remove_only_element_listeners
Only remove any EventListener that has been attached to an Element.
*/
rocket.EventTarget.removeAllEventListeners =
    function(opt_remove_only_element_listeners) {

  var tree = rocket.EventTarget.listener_tree_;

  for (var guid in tree) {

    for (var type in tree[+guid]) {

      for (var ns in tree[+guid][type]) {

        var target = (
            /** @type {rocket.EventTarget} */ (
                /** @type {rocket.EventListener} */ (
                    tree[+guid][type][ns][0]
                ).get_target()
            ));

        if (
            (!opt_remove_only_element_listeners) ||
            (target.nodeName || target.window && target.window === target.self)
        ) {
          rocket.EventTarget.prototype.removeEventListener.call(target);
        }

        break;

      }

      break;

    }

  }

};


/**
Adds an EventListener to be called when an Event occurs on this EventTarget.

An optional namespace can be provided within the type parameter.
The Event.type is every character up to until, but not including,
the first period. The namespace is every character after the first period.

Providing a namespace allows for easier, future
EventListener removal and dispatching.

@param {string} type The Event.type for which to listen.  An optional namespace
  can also be provided following a period "." character.
@param {(EventListener|function(!Event))} listener
  The EventListener or the function to call when the Event occurs.
@example
$('body').addEventListener('click',function(){
  alert('You just clicked the ' + this.nodeName);
});

$('body').addEventListener('click.foobar',function(){
  alert('This EventListener uses the namespace "foobar"!');
});
@link
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
*/
rocket.EventTarget.prototype.addEventListener =
    function(type, listener) {

  var guid = rocket.guid(this);

  var name_space;
  var dot_pos = type.indexOf('.');
  if (dot_pos !== -1) {
    name_space = type.substr(dot_pos + 1);
    type = type.substr(0, dot_pos);
  } else {
    name_space = '';
  }

  switch (undefined) {

    case rocket.EventTarget.listener_tree_[guid]:
      rocket.EventTarget.listener_tree_[guid] = {};

    case rocket.EventTarget.listener_tree_[guid][type]:
      rocket.EventTarget.listener_tree_[guid][type] = {};

    case rocket.EventTarget.listener_tree_[guid][type][name_space]:
      rocket.EventTarget.listener_tree_[guid][type][name_space] = [];

  }

  var listeners = rocket.EventTarget.listener_tree_[guid][type][name_space];

  for (var i = 0, len = listeners.length; i < len; ++i) {
    if (listeners[i].handleEvent === listener ||
        listeners[i].handleEvent === listener.handleEvent) {
      return;
    }
  }

  var event_listener = new rocket.EventListener(this, type, listener);

  if (this.nodeName || this.window && this.window === this.self) {
    var bound_fnct = event_listener.get_bound();
    var bound_types = event_listener.get_bound_types();
    if (this.addEventListener) {
      for (var i = 0; bound_types[i]; ++i) {
        this.addEventListener(bound_types[i], bound_fnct, false);
      }
    } else {
      for (var i = 0; bound_types[i]; ++i) {
        this.attachEvent('on' + bound_types[i], bound_fnct);
      }
    }
  }

  listeners.push(event_listener);

};


/**
Removes an EventListener from being called when an Event occurs on
this EventTarget.

An optional namespace can be provided within the type parameter.
The Event.type is every character up to until, but not including,
the first period. The namespace is every character after the first period.

If no namespace is provided, then all namespaces are assumed.

If a namespace is provided, then only EventListeners added with the given
namespace will be removed.

@param {string=} opt_type
  The Event.type to be removed.
  If not given, then all Event.types will be removed.  An optional namespace
  can also be provided following a period "." character.
@param {(EventListener|function(!Event))=} opt_fnct
  The EventListener or the function to be removed.
  If not given, then all EventListeners or functions will be removed.
@example
// remove a previously added EventListener from the document
$(document).removeEventListener('click', some_event_listener);

// remove all click EventListeners from the document
$(document).removeEventListener('click');

// remove all EventListeners from the document
$(document).removeEventListener();

// remove all EventListeners from the document that were added with
// the namespace "foobar"
$(document).removEventListener('.foobar');

// remove all clik EventListeners from the document that were added with
// the namespace "foobar"
$(document).removEventListener('click.foobar');
@link
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener
*/
rocket.EventTarget.prototype.removeEventListener =
    function(opt_type, opt_fnct) {

  var guid = rocket.guid.peek(this);

  if (guid) {

    var listeners = rocket.EventTarget.listener_tree_[guid];

    if (listeners) {

      var name_space;
      var dot_pos;
      if (arguments.length !== 0 && (dot_pos = opt_type.indexOf('.')) !== -1) {
        name_space = opt_type.substr(dot_pos + 1);
        opt_type = opt_type.substr(0, dot_pos);
      } else {
        name_space = '';
      }

      for (var type in listeners) {

        if (arguments.length === 0 || opt_type === '' || opt_type === type) {

          for (var ns in listeners[type]) {

            if (name_space === '' || ns === name_space) {

              for (var i = 0; listeners[type][ns][i]; ++i) {

                var fnct = listeners[type][ns][i].handleEvent;

                if (arguments.length !== 2 || opt_fnct === fnct ||
                    opt_fnct.handleEvent === fnct) {

                  if (this.nodeName ||
                      this.window && this.window === this.self) {

                    var listener = /** @type {rocket.EventListener} */
                        (listeners[type][ns][i]);
                    var bound = listener.get_bound();
                    var bound_types = listener.get_bound_types();
                    if (this.removeEventListener) {
                      for (var j = 0; bound_types[j]; ++j) {
                        this.removeEventListener(bound_types[j], bound, false);
                      }
                    } else {
                      for (var j = 0; bound_types[j]; ++j) {
                        this.detachEvent('on' + bound_types[j], bound);
                      }
                    }
                    listener.remove_bound();

                  }

                  listeners[type][ns].splice(i, 1);

                  if (rocket.isEmpty(listeners[type][ns])) {
                    delete listeners[type][ns];
                    if (rocket.isEmpty(listeners[type])) {
                      delete listeners[type];
                      if (
                          rocket.isEmpty(
                              rocket.EventTarget.listener_tree_[guid]
                          )
                      ) {
                        delete rocket.EventTarget.listener_tree_[guid];
                      }
                    }
                    break;
                  }

                  i -= 1;

                }

              }

            }

          }

        }

      }

    }

  }

};


/**
Calls the EventListeners that have been added for an Event on this EventTarget.

An optional namespace can be provided within the type parameter.
The Event.type is every character up to until, but not including,
the first period. The namespace is every character after the first period.

If no namespace is provided, then all namespaces are assumed.

If a namespace is provided, then only EventListeners added with the given
namespace will be called.

@param {(Event|string)} event_or_type The Event.type for which to listen.
  An optional namespace can also be provided following a period "." character.
@return {boolean} Whether any EventListener called Event.preventDefault.
@link
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.dispatchEvent
*/
rocket.EventTarget.prototype.dispatchEvent = function(event_or_type) {

  var guid = rocket.guid.peek(this);
  /** @type {Event} */
  var evt;
  /** @type {string} */
  var type;

  if (event_or_type.type) {
    evt = /** @type {Event} */ (event_or_type);
    type = event_or_type.type;
  } else {
    evt = new rocket.Event(event_or_type);
    type = /** @type {string} */ (event_or_type);
  }

  if (!evt.target) {
    evt.target = this;
  }

  if (guid) {

    var name_space;
    var dot_pos = type.indexOf('.');
    if (dot_pos !== -1) {
      name_space = type.substr(dot_pos + 1);
      type = type.substr(0, dot_pos);
    } else {
      name_space = '';
    }

    var listeners = rocket.EventTarget.listener_tree_[guid];

    if (listeners) {

      if (listeners[type]) {

        for (var ns in listeners[type]) {

          if (name_space === '' || ns === name_space) {

            /** @type {Array.<rocket.EventListener>} */
            var queue = [];
            for (var i = 0; listeners[type][ns][i]; ++i) {
              queue.push(listeners[type][ns][i]);
            }

            for (var i = 0; queue[i]; ++i) {

              if (rocket.indexOf(
                  /** @type {Array.<rocket.EventListener>} */
                  (listeners[type][ns]),
                  queue[i]) !== -1) {

                (queue[i]).handleEvent.call(
                    this,
                    evt
                );

                if (/** @type {rocket.Event} */
                    (evt).immediatePropagationStopped) {
                  return !evt.defaultPrevented;
                }

              }

            }

          }

        }

      }

    }

  }

  if (this.nodeName && this.parentNode && !evt.propagationStopped) {
    rocket.EventTarget.prototype.dispatchEvent.call(
        /** @type {rocket.EventTarget} */ (this.parentNode),
        evt
    );
  }

  return !evt.defaultPrevented;

};
