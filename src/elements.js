


/**
A wrapper class used to represent and easily manipulate the given Array of
Elements.

Returned from the rocket.$ query function.

@constructor
@param {(NodeList|Array.<Element>)} elements An Array of Elements to represent.
@see {rocket.$}
*/
rocket.Elements = function(elements) {
  this.length = elements.length;
  for (var i = 0; elements[i]; ++i) {
    this[i] = elements[i];
  }
};


/**
Adds a class or a list of classes to these Elements.

The class_names given will be added to every one of these Elements.

The class_names are arrayify'd.

@param {(string|Array.<string>)} class_names The class names to add.
@return {rocket.Elements} These elements.
@see {rocket.arrayify}
@example
// any of the following lines will add the two classes "foo" and "bar" to "body"
$('body').addClass('foo').addClass('bar');
$('body').addClass('foo bar');
$('body').addClass('foo,bar');
$('body').addClass('foo, bar');
$('body').addClass('foo bar');
$('body').addClass(['foo','bar']);
*/
rocket.Elements.prototype.addClass = function(class_names) {

  class_names = rocket.arrayify(class_names);

  var memo = {};

  var i = 0;
  var len = this.length;

  var j;
  var jlen = class_names.length;

  var initial_class_name;

  var final_class_name;
  var joined_class_names = class_names.join(' ');

  for (; i < len; ++i) {

    initial_class_name =
        /** @type {Element} */ (this[i]).className;

    if (initial_class_name in memo) {

      this[i].className = memo[initial_class_name];

    } else {

      if (initial_class_name === '' ||
          initial_class_name === joined_class_names) {

        final_class_name = class_names;

      } else {

        final_class_name = rocket.arrayify(initial_class_name);

        for (j = 0; j < jlen; ++j) {
          if (rocket.indexOf(final_class_name, class_names[j]) === -1) {
            final_class_name.push(class_names[j]);
          }
        }

      }

      this[i].className = memo[initial_class_name] = final_class_name.join(' ');

    }

  }

  return this;

};


/**
Adds an EventListener to the these Elements.

The types are arrayify'd.

@param {(string|Array.<string>)} types
@param {(EventListener|function(Event))} fnct
@return {rocket.Elements}
@see {rocket.EventListener}
@see {rocket.EventTarget}
@example
$('body').addEventListener('click',function(){
  alert('You just clicked the ' + this.nodeName);
});

$('body').addEventListener('mouseenter', function(){
  alert('Your mouse entered the ' + this.nodeName);
});

$('body').addEventListener('mouseenter, mouseleave', function(){
  alert('Your mouse entered or left the ' + this.nodeName);
});

$('body').addEventListener(['mouseenter', 'mouseleave'], function(){
  alert('Your mouse entered or left the ' + this.nodeName);
});
*/
rocket.Elements.prototype.addEventListener = function(types, fnct) {

  var i = 0;
  var len = this.length;

  types = rocket.arrayify(types);
  for (; i < len; ++i) {
    for (var j = 0; types[j]; ++j) {
      rocket.EventTarget.prototype.addEventListener.call(
          this[i],
          types[j],
          fnct
      );
    }
  }

  return this;

};


/**
Appends a child Element to these Elements.

Returns a rocket.Elements of the appended child node(s).

The given child can be a rocket.Elements wrapped array of Elements or an
Element created directly from document.createElement.

@param {(Element|Array.<Element>|rocket.Elements)} child_node
  The node(s) to append.
@return {rocket.Elements} Appended child node(s).
@link https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild
@example
$('body').appendChild($.createElement('div'));
$('body').appendChild(document.createElement('div'));
$('body').appendChild($('div'));
*/
rocket.Elements.prototype.appendChild = function(child_node) {

  var i;
  var len;
  var child_nodes;

  if (this.length) {

    if (child_node.nodeType) {
      child_nodes = [child_node];
    } else {
      child_nodes =
          /** @type {Array.<Element>} */ (child_node);
    }

    i = 0;
    len = child_nodes.length;

    for (; i < len; ++i) {
      /** @type {Element} */ (this[0]).appendChild(child_nodes[i]);
    }

  } else {
    child_nodes = [];
  }

  return new rocket.Elements(child_nodes);

};


/**
Maps malformed attributes to their proper cased attribute names.

@private
@type {Object.<string, string>}
*/
rocket.Elements.attribute_map_ = {
  'acceptcharset': 'acceptCharset',
  'accesskey': 'accessKey',
  'cellindex': 'cellIndex',
  'cellpadding': 'cellPadding',
  'cellspacing': 'cellSpacing',
  'characterset': 'characterSet',
  'classlist': 'classList',
  'classname': 'className',
  'clientheight': 'clientHeight',
  'clientleft': 'clientLeft',
  'clienttop': 'clientTop',
  'clientwidth': 'clientWidth',
  'colspan': 'colSpan',
  'contenteditable': 'contentEditable',
  'datetime': 'dateTime',
  'defaultcharset': 'defaultCharset',
  'defaultchecked': 'defaultChecked',
  'defaultselected': 'defaultSelected',
  'defaultvalue': 'defaultValue',
  'defaultview': 'defaultView',
  'documentelement': 'documentElement',
  'for': 'htmlFor',
  'frameborder': 'frameBorder',
  'htmlfor': 'htmlFor',
  'innerhtml': 'innerHTML',
  'innertext': 'innerText',
  'keytype': 'keyType',
  'maxlength': 'maxLength',
  'noresize': 'noResize',
  'offsetheight': 'offsetHeight',
  'offsetleft': 'offsetLeft',
  'offsetparent': 'offsetParent',
  'offsettop': 'offsetTop',
  'offsetwidth': 'offsetWidth',
  'outerhtml': 'outerHTML',
  'outertext': 'outerText',
  'readonly': 'readOnly',
  'readystate': 'readyState',
  'rowindex': 'rowIndex',
  'rowspan': 'rowSpan',
  'screenleft': 'screenLeft',
  'screentop': 'screenTop',
  'scrollheight': 'scrollHeight',
  'scrollleft': 'scrollLeft',
  'scrolltop': 'scrollTop',
  'scrollwidth': 'scrollWidth',
  'sectionrowindex': 'sectionRowIndex',
  'selectedindex': 'selectedIndex',
  'selectionend': 'selectionEnd',
  'selectionstart': 'selectionStart',
  'sourceindex': 'sourceIndex',
  'tabindex': 'tabIndex',
  'tagname': 'tagName',
  'tbodies': 'tBodies',
  'tfoot': 'tFoot',
  'thead': 'tHead',
  'usemap': 'useMap',
  'valign': 'vAlign'
};


/**
Calls blur on the first Element of these Elements.

@return {rocket.Elements} These elements.
@example
$('input').blur();
*/
rocket.Elements.prototype.blur = function() {

  if (this.length) {
    /** @type {Element} */ (this[0]).blur();
  }

  return this;

};


/**
Checks/unchecks these Elements or returns the first of these Elements
checked state.

If opt_checked is given, then check or uncheck these Elements.  If not,
then return whether the first of these Elements is checked.

@param {boolean=} opt_checked Check/uncheck these Elements.
@return {(rocket.Elements|boolean|undefined)}
  Whether the first of these Elements is checked.
*/
rocket.Elements.prototype.checked = function(opt_checked) {

  if (arguments.length === 0) {
    return /** @type {boolean|undefined} */ (this.getAttribute('checked'));
  } else {
    return this.setAttribute('checked', opt_checked);
  }

};


/**
Returns a rocket.Elements of these elements children (replaces childNodes).

If you don't know the difference between this and childNodes,
this is the method that you actually want to use.

@return {rocket.Elements} These elements.
@link
https://developer.mozilla.org/en-US/docs/Web/API/ParentNode.children
@example
$('body').children();
*/
rocket.Elements.prototype.children = function() {

  var i = 0;
  var len = this.length;
  var children = [];
  var j;
  var jlen;
  var this_i_children;
  var this_i_children_j;

  for (; i < len; ++i) {

    this_i_children =
        /** @type {Element} */ (this[i]).children;
    j = 0;
    jlen = this_i_children.length;

    for (; j < jlen; ++j) {

      this_i_children_j =
          /** @type {Element} */ (this_i_children[j]);

      if (this_i_children_j.nodeType === 1) {
        children.push(this_i_children_j);
      }

    }

  }

  return new rocket.Elements(children);

};


/**
cloneNode

@param {boolean} deep
@return {rocket.Elements}
*/
rocket.Elements.prototype.cloneNode = function(deep) {

  var results = [];

  for (var i = 0, len = this.length; i < len; ++i) {

    results[i] = /** @type {Element} */ (this[i]).cloneNode(deep);

  }

  return new rocket.Elements(results);

};


/**
Checks if all of these Elements contain the given Element.

@param {(Element|rocket.Elements)} element The Element.
@return {boolean} Whether the Element is contained by all of these Elements.
*/
rocket.Elements.prototype.contains = function(element) {

  var elements = rocket.$(element);

  for (var i = 0, len = this.length, jlen = elements.length; i < len; ++i) {
    for (var j = 0; j < jlen; ++j) {
      if (!(/** @type {Element} */ (this[i])).contains(elements[j])) {
        return false;
      }
    }
  }

  return true;

};


/**
Set/get the dataset attributes on these Elements.

@param {(string|Object.<string, string>)} attribute The attribute.
@param {string=} opt_value The value to set.
@return {(string|undefined|rocket.Elements)} This Elements.
@link
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.dataset
@example
// set the value of 'foo' to 'bar' two different ways
$('body').dataset('foo','bar');
$('body').dataset({'foo': 'bar'});

// get the value of 'foo'
$('body').dataset('foo');
*/
rocket.Elements.prototype.dataset = function(attribute, opt_value) {

  var attributes;

  /** @type {string} */
  var key;

  var i = 0;
  var len = this.length;

  if (arguments.length === 1) {

    if (typeof attribute === 'string') {

      if (len) {
        return this.dataset_get_(this[0], attribute);
      } else {
        return undefined;
      }

    } else {

      attributes = attribute;

    }

  } else {

    attributes = {};
    attributes[attribute] = opt_value;

  }


  for (; i < len; ++i) {
    for (key in attributes) {
      this.dataset_set_(this[i], key, attributes[key]);
    }
  }

  return this;

};


/**
Get a dataset attribute from an element.

@private
@param {HTMLElement} element The Element.
@param {string} attribute The attribute.
@return {string} The value.
*/
rocket.Elements.prototype.dataset_get_ = function(element, attribute) {

  if (element.dataset) {

    rocket.Elements.prototype.dataset_get_ = function(element, attribute) {
      return element.dataset[attribute];
    };

  } else {

    rocket.Elements.prototype.dataset_get_ = function(element, attribute) {
      return element.getAttribute('data-' + attribute);
    };

  }

  return rocket.Elements.prototype.dataset_get_(element, attribute);

};


/**
Set a dataset attribute on an element.

@private
@param {HTMLElement} element The Element.
@param {string} key The attribute key.
@param {string} value The value.
*/
rocket.Elements.prototype.dataset_set_ = function(element, key, value) {

  if (element.dataset) {

    rocket.Elements.prototype.dataset_set_ = function(element, key, value) {
      element.dataset[key] = value;
    };

  } else {

    rocket.Elements.prototype.dataset_set_ = function(element, key, value) {
      element.setAttribute('data-' + key, value);
    };

  }

  rocket.Elements.prototype.dataset_set_(element, key, value);

};


/**
Enables and disables these Elements.

@param {boolean=} opt_disabled Disabled state.
@return {(rocket.Elements|boolean|undefined)}
  The disabled state or these elements.
*/
rocket.Elements.prototype.disabled = function(opt_disabled) {

  if (arguments.length === 0) {
    return /** @type {boolean|undefined} */ (this.getAttribute('disabled'));
  } else {
    return this.setAttribute('disabled', opt_disabled);
  }

};


/**
dispatch.

@param {(Event|string)} event_or_type
@return {rocket.Elements}
*/
rocket.Elements.prototype.dispatchEvent = function(event_or_type) {

  var events;
  var i = 0;
  var len = this.length;

  if (event_or_type.type) {
    events = [event_or_type];
  } else {
    events = rocket.arrayify(/** @type {string} */ (event_or_type));
  }

  for (; i < len; ++i) {
    for (var j = 0; events[j]; ++j) {
      rocket.EventTarget.prototype.dispatchEvent.call(
          this[i],
          events[j]
      );
    }
  }

  return this;

};


/**
Elements every.

@param {function(this:Object, Object, number, Object)} fnct The fnct.
@param {Object=} opt_self The value to use as this when executing fnct.
@return {boolean} True if every; else false.
*/
rocket.Elements.prototype.every = function(fnct, opt_self) {

  if (Array.prototype.every) {

    rocket.Elements.prototype.every = Array.prototype.every;

  } else {

    rocket.Elements.prototype.every = function(fnct, opt_self) {
      return rocket.every(this, fnct, opt_self);
    };

  }

  return this.every(fnct, opt_self);

};


/**
Fades these elements to a given opacity.

@param {number} to_opacity
  The opacity to which to fade. A number between zero and one.
@param {number=} opt_duration
  The duration of the fade in milliseconds or defaults to rocket.step duration.
@param {function(this:rocket.Elements)=} opt_callback
  Callback to execute after the fade on these elements.
@return {rocket.Elements} These Elements.
@example
// fade away the body in three seconds
$('body').fade(0, 3000, function(){
  alert('I am done fading!');
});
@see {rocket.step}
@link http://www.w3schools.com/cssref/css3_pr_opacity.asp
*/
rocket.Elements.prototype.fade =
    function(to_opacity, opt_duration, opt_callback) {

  var i = 0;
  var len = this.length;
  var self = this;

  /** @type {Array.<number>} */
  var opacity_initials = [];
  /** @type {Array.<number>} */
  var opacity_deltas = [];
  /** @type {Array.<rocket.Elements>} */
  var elementses = [];

  var callback;

  if (opt_callback) {

    callback = function() {
      opt_callback.call(self);
    };

  }

  for (; i < len; ++i) {

    elementses[i] = new rocket.Elements([this[i]]);
    opacity_initials[i] =
        /** @type {number} */ (elementses[i].style('opacity'));
    opacity_deltas[i] = to_opacity - opacity_initials[i];

  }

  rocket.step(
      function(x, trig_x) {

        for (i = 0; i < len; ++i) {

          elementses[i].style(
              'opacity',
              opacity_initials[i] +
              trig_x * opacity_deltas[i]
          );

        }

      },
      opt_duration,
      callback
  );

  return this;

};


/**
Elements filter.

@param {function(this:Object, Object, number, Object)} fnct The fnct.
@param {Object=} opt_self The value to use as this when executing fnct.
@return {rocket.Elements} Filtered Elements.
*/
rocket.Elements.prototype.filter = function(fnct, opt_self) {
  return new rocket.Elements(rocket.filter(this, fnct, opt_self));
};


/**
Returns a rocket.Elements of these elements firstElementChild.

If you don't know the difference between this and firstChild,
this is the method that you actually want to use.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.firstElementChild = function() {

  if (this.length === 0) {

    return new rocket.Elements([]);

  } else {

    if (/** @type {Element} */ (this[0]).firstElementChild !== undefined) {

      rocket.Elements.prototype.firstElementChild = function() {

        var i = 0;
        var len = this.length;
        var children = [];
        var child;

        for (; i < len; ++i) {

          child = /** @type {Element} */ (this[i]).firstElementChild;

          if (child) {
            children.push(child);
          }

        }

        return new rocket.Elements(children);

      };

    } else {

      rocket.Elements.prototype.firstElementChild = function() {

        var i = 0;
        var len = this.length;
        var children = [];
        var child;

        for (; i < len; ++i) {

          child = /** @type {Element} */ (this[i]).firstChild;

          while (child && child.nodeType !== 1) {
            child = child.nextSibling;
          }

          if (child) {
            children.push(child);
          }

        }

        return new rocket.Elements(children);

      };

    }

    return this.firstElementChild();

  }

};


/**
Fits these Elements within a container.

@param {rocket.Elements=} opt_container
@return {rocket.Elements} These Elements.
*/
rocket.Elements.prototype.fit = function(opt_container) {

  var container;

  if (arguments.length) {

    container = opt_container.getBoundingClientRect();

  } else {

    container = rocket.$('html').getBoundingClientRect();

  }

  var i = 0;
  var len = this.length;

  for (; i < len; ++i) {

    var element = this.i(i);

    var rect = element.getBoundingClientRect();

    if (rect.right > container.right) {

      element.style(
          'left',
          element.style('left') - rect.right + container.right
      );

      rect = element.getBoundingClientRect();

    }

    if (rect.left < container.left) {
      element.style(
          'left',
          element.style('left') + container.left - rect.left
      );
    }

    if (rect.bottom > container.bottom) {

      element.style(
          'top',
          element.style('top') - rect.bottom + container.bottom
      );

      rect = element.getBoundingClientRect();

    }

    if (rect.top < container.top) {
      element.style(
          'top',
          element.style('top') + container.top - rect.top
      );
    }

  }

  return this;

};


/**
Focus on the first element of these Elements.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.focus = function() {

  if (this.length) {
    /** @type {Element} */ (this[0]).focus();
  }

  return this;

};


/**
Elements forEach.

@param {function(this:Object, Object, number, Object)} fnct The fnct.
@param {Object=} opt_self The value to use as this when executing fnct.
*/
rocket.Elements.prototype.forEach = function(fnct, opt_self) {

  if (Array.prototype.forEach) {

    rocket.Elements.prototype.forEach = Array.prototype.forEach;

  } else {

    rocket.Elements.prototype.forEach = function(fnct, opt_self) {
      return rocket.forEach(this, fnct, opt_self);
    };

  }

  this.forEach(fnct, opt_self);

};


/**
Gets an attribute from the first of these element(s).

Case sensitive attributes are automatically properly cased.

Reserved word attributes are properly remapped.

This returns undefined if there are no elements in this rocket.Elements.

For getting the value of an HTMLSelectElement:
if a value is present on the selected option,
then that value will be returned.  If a value is not present on the
selected option, then that option's innerHTML will be returned.

For getting the value of an HTMLSelectElement with the multiple property
set: an array of selected option values is returned.

@param {string} attribute The attribute.
@return {(string|boolean|number|Array.<string>|undefined)} The first value.
*/
rocket.Elements.prototype.getAttribute = function(attribute) {

  var element;
  var option;
  var options;
  var i;
  var len;
  var values;
  var value;

  if (this.length) {

    element = /** @type {Element} */ (this[0]);

    if (attribute === 'value' && element.nodeName === 'SELECT') {

      element = /** @type {HTMLSelectElement} */ (element);

      if (element.multiple) {

        options = element.options;

        i = 0;
        len = options.length;
        values = [];

        for (; i < len; ++i) {

          option = /** @type {HTMLOptionElement} */ (options[i]);

          if (option.selected) {

            values.push(option.value || option.innerHTML);

          }

        }

        return values;

      } else {

        value = element.value;

        if (value) {

          return value;

        } else {

          option = /** @type {HTMLOptionElement} */
              (element.options[element.selectedIndex]);

          return option.value || option.innerHTML;

        }

      }

    } else {

      return element[rocket.Elements.attribute_map_[attribute] || attribute];

    }

  } else {

    return undefined;

  }

};


/**
Normalized getBoundingClientRect.

Use this to determine an element's horizontal and vertical
offset, width, and height.

This returns an object that has the following numeric properties:
<ul>
  <li>top
  <li>right
  <li>bottom
  <li>left
  <li>width
  <li>height
</ul>

@param {boolean=} opt_no_offset
  Set to true to ignore the window's current scroll position.
@return {ClientRect} The bounding client rectangle.
*/
rocket.Elements.prototype.getBoundingClientRect = function(opt_no_offset) {

  if (this.length) {

    var rect = /** @type {Element} */ (this[0]).getBoundingClientRect();
    var documentElement = document.documentElement;
    var body = document.body;

    var y_offset;
    var x_offset;

    if (opt_no_offset) {

      y_offset = 0;
      x_offset = 0;

    } else {

      y_offset =
          ((window.pageYOffset === 0) ?
              0 :
              (window.pageYOffset ||
              documentElement && documentElement.scrollTop ||
              body && body.scrollTop ||
              0)) -
          (documentElement && documentElement.clientTop ||
          body && body.clientTop ||
          0);

      x_offset =
          ((window.pageXOffset === 0) ?
              0 :
              (window.pageXOffset ||
              documentElement && documentElement.scrollLeft ||
              body && body.scrollLeft ||
              0)) -
          (documentElement && documentElement.clientLeft ||
          body && body.clientLeft ||
          0);

    }

    return /** @type {ClientRect} */ ({
      top: rect.top + y_offset,
      right: rect.right + x_offset,
      bottom: rect.bottom + y_offset,
      left: rect.left + x_offset,
      width: rect.width || (rect.right - rect.left),
      height: rect.height || (rect.bottom - rect.top)
    });

  } else {

    return /** @type {ClientRect} */ ({
      top: NaN,
      right: NaN,
      bottom: NaN,
      left: NaN,
      width: NaN,
      height: NaN
    });

  }

};


/**
Get current Element offset attributes.
@return {ClientRect} The offset attributes of the Element.
*/
rocket.Elements.prototype.getOffset = function() {

  if (this.length) {

    var left = this.getAttribute('offsetLeft');
    var top = this.getAttribute('offsetTop');
    var height = this.getAttribute('offsetHeight');
    var width = this.getAttribute('offsetWidth');
    var parent = this.getAttribute('offsetParent');

    return /** @type {ClientRect} */ ({
      top: top,
      right: left + width,
      bottom: top + height,
      left: left,
      width: width,
      height: height,
      parent: parent
    });

  } else {
    return /** @type {ClientRect} */ ({
      top: NaN,
      right: NaN,
      bottom: NaN,
      left: NaN,
      width: NaN,
      height: NaN,
      parent: null
    });
  }

};


/**
Checks to see if any of these elements have any of class_names.

@param {(string|Array.<string>)} class_names The class names to check.
@return {boolean} True if an element exists in these Elements that has a class
  found in class_names.
*/
rocket.Elements.prototype.hasClass = function(class_names) {

  class_names = rocket.arrayify(class_names);

  /** @type {Array.<RegExp>} */
  var reg_exps = [];
  var this_class_name;

  var i = 0;
  var len = this.length;

  var j;
  var jlen = class_names.length;

  for (; i < len; ++i) {

    this_class_name = /** @type {Element} */ (this[i]).className;

    for (j = 0; j < jlen; ++j) {

      if (!reg_exps[j]) {
        reg_exps[j] = new RegExp('(?:\\s|^)' + class_names[j] + '(?:\\s|$)');
      }

      if (reg_exps[j].test(this_class_name)) {
        return true;
      }

    }
  }

  return false;

};


/**
Hides these elements.

Sets the display style of these Elements to none.

If the opt_visibility parameter is true, then visibility,
instead of display is used; visibility is set to hidden.

@param {boolean=} opt_visibility Use visibility.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.hide = function(opt_visibility) {

  return /** @type {rocket.Elements} */ (this.style(
      opt_visibility ?
          {'visibility': 'hidden'} :
          {'display': 'none'}
      ));

};


/**
Return a new rocket.Elements containing only the Element at offset i.

@param {number} i The offset.
@return {rocket.Elements} The new rocket.Elements.
*/
rocket.Elements.prototype.i = function(i) {

  if (this[i]) {
    return new rocket.Elements([this[i]]);
  } else {
    return new rocket.Elements([]);
  }

};


/**
Returns the first index at which a given element can be found in the array,
or -1 if it is not present.

@param {(Element|rocket.Elements|Array.<Element>)} needle
  The Element to locate in the array.
@param {number=} opt_offset The position from which to start the search.
@return {number}
  The index of the located element or -1 if the element was not found.
*/
rocket.Elements.prototype.indexOf = function(needle, opt_offset) {

  var element;

  if (needle.nodeType) {
    element = needle;
  } else {
    element = /** @type {Element} */ (needle[0]);
  }

  return rocket.indexOf(
      this,
      element,
      opt_offset
  );

};


/**
Sets/gets this innerHTML text.

@param {string=} opt_html The innerHTML.
@return {(rocket.Elements|string|undefined)} The string or these elements.
*/
rocket.Elements.prototype.innerHTML = function(opt_html) {

  if (arguments.length === 0) {
    return /** @type {(string|undefined)} */ (this.getAttribute('innerHTML'));
  } else {
    return this.setAttribute('innerHTML', opt_html);
  }

};


/**
Returns a rocket.Elements of the appended child nodes.

@param {(Element|Array.<Element>|rocket.Elements)} child_node
  The node(s) to append.
@param {(Element|Array.<Element>|rocket.Elements)} before_these
  The node before which to insert.
@return {rocket.Elements} Appended child nodes.
*/
rocket.Elements.prototype.insertBefore = function(child_node, before_these) {

  var i;
  var len;

  var before_this;
  var child_nodes;

  if (this.length) {

    if (child_node.nodeType) {
      child_nodes = [child_node];
    } else {
      child_nodes = /** @type {Array.<Element>} */ (child_node);
    }


    if (!before_these) {
      before_this = null;
    } else {
      if (before_these.nodeType) {
        before_this = before_these;
      } else {
        before_this = /** @type {Element} */ (before_these[0]);
      }
    }

    i = 0;
    len = child_nodes.length;

    for (; i < len; ++i) {
      /** @type {Element} */ (this[0]).insertBefore(
          child_nodes[i],
          /** @type {Element} */ (before_this) || null
      );
    }

  } else {

    child_nodes = [];

  }

  return new rocket.Elements(child_nodes);

};


/**
Returns a rocket.Elements of these elements lastElementChild.

If you don't know the difference between this and lastChild,
this is the method that you actually want to use.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.lastElementChild = function() {

  if (this.length === 0) {

    return new rocket.Elements([]);

  } else {

    if (/** @type {Element} */ (this[0]).lastElementChild !== undefined) {

      rocket.Elements.prototype.lastElementChild = function() {

        var i = 0;
        var len = this.length;
        var children = [];
        var child;

        for (; i < len; ++i) {

          child = /** @type {Element} */ (this[i]).lastElementChild;

          if (child) {
            children.push(child);
          }

        }

        return new rocket.Elements(children);

      };

    } else {

      rocket.Elements.prototype.lastElementChild = function() {

        var i = 0;
        var len = this.length;
        var children = [];
        var child;

        for (; i < len; ++i) {

          child = /** @type {Element} */ (this[i]).lastChild;

          while (child && child.nodeType !== 1) {
            child = child.previousSibling;
          }

          if (child) {
            children.push(child);
          }

        }

        return new rocket.Elements(children);

      };

    }

    return this.lastElementChild();

  }


};


/**
Returns the last index at which a given element can be found in the array,
or -1 if it is not present.

@param {(Element|rocket.Elements|Array.<Element>)} needle
  The Element to locate in the array.
@param {number=} opt_offset The position from which to start the search.
@return {number}
  The index of the located element or -1 if the element was not found.
*/
rocket.Elements.prototype.lastIndexOf = function(needle, opt_offset) {

  var element;

  if (needle.nodeType) {

    element = needle;

  } else {

    element = /** @type {Element} */ (needle[0]);

  }

  return rocket.lastIndexOf(
      this,
      element,
      opt_offset
  );

};


/**
The number of Elements.

@type {number}
*/
rocket.Elements.prototype.length;


/**
Binds a live event handler to these elements.

@param {string} selector The CSS selector to match descendant elements.
@param {(string|Array.<string>)} handles The event types and
  namespaces to be used to attach the given handler.
@param {function(Event)} handler The event handler.
@return {rocket.Elements} This Elements.
*/
rocket.Elements.prototype.live = function(selector, handles, handler) {

  return this.addEventListener(
      handles,
      /**
      @this {Element}
      @param {Event} event The event.
      */
      function(event) {

        var element = /** @type {Event} */ (event).target;

        while (element && element !== this) {

          if (
              rocket.Elements.matches_helper_(
                  /** @type {Element} */ (element),
                  selector
              )
          ) {

            handler.call(element, event);

          }

          element = /** @type {Node} */ (element).parentNode;

        }

      }

  );

};


/**
Elements map.

@param {function(this:Object, Object, number, Object)} fnct The fnct.
@param {Object=} opt_self The value to use as this when executing fnct.
@return {Array} Array of return values.
*/
rocket.Elements.prototype.map = function(fnct, opt_self) {

  if (Array.prototype.map) {

    rocket.Elements.prototype.map = Array.prototype.map;

  } else {

    rocket.Elements.prototype.map = function(fnct, opt_self) {
      return rocket.map(this, fnct, opt_self);
    };

  }

  return this.map(fnct, opt_self);

};


/**
matches matchesSelector.

@param {string} query
@return {boolean}
*/
rocket.Elements.prototype.matches = function(query) {

  var i = 0;
  var len = this.length;

  for (; i < len; ++i) {
    if (!rocket.Elements.matches_helper_(this[i], query)) {
      return false;
    }
  }

  return true;

};


/**
matches.

@private
@param {Element} element
@param {string} query
@return {boolean}
*/
rocket.Elements.matches_helper_ = function(element, query) {

  if (document.body.webkitMatchesSelector) {

    rocket.Elements.matches_helper_ = function(element, query) {
      return element.webkitMatchesSelector(query);
    };

  } else if (document.body.mozMatchesSelector) {

    rocket.Elements.matches_helper_ = function(element, query) {
      return element.mozMatchesSelector(query);
    };

  } else if (document.body.msMatchesSelector) {

    rocket.Elements.matches_helper_ = function(element, query) {
      return element.msMatchesSelector(query);
    };

  } else if (document.body.matches) {

    rocket.Elements.matches_helper_ = function(element, query) {
      return element.matches(query);
    };

  } else {

    rocket.Elements.matches_helper_ = function(element, query) {

      if (query.charAt(0) === '#') {
        return element.id === query.substr(1);
      } else {

        var dot = query.indexOf('.');

        if (dot === -1) {
          return element.nodeName === query.toUpperCase();
        } else {
          var node_name = query.substr(0, dot).toUpperCase();
          if (!node_name || node_name === element.nodeName) {
            var class_name = query.substr(dot + 1);
            var class_names = rocket.arrayify(element.className);
            for (var i = 0; class_names[i]; ++i) {
              if (class_names[i] === class_name) {
                return true;
              }
            }
          }
          return false;
        }

      }

    };

  }

  return rocket.Elements.matches_helper_(element, query);

};


/**
Returns a rocket.Elements of these elements nextElementSibling.

If you don't know the difference between this and nextSibling,
this is the method that you actually want to use.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.nextElementSibling = function() {

  if (this.length === 0) {

    return new rocket.Elements([]);

  } else {

    if (/** @type {Element} */ (this[0]).nextElementSibling !== undefined) {

      rocket.Elements.prototype.nextElementSibling = function() {

        var i = 0;
        var len = this.length;
        var siblings = [];
        var sibling;

        for (; i < len; ++i) {

          sibling = /** @type {Element} */ (this[i]).nextElementSibling;

          if (sibling) {

            siblings.push(sibling);

          }

        }

        return new rocket.Elements(siblings);

      };

    } else {

      rocket.Elements.prototype.nextElementSibling = function() {

        var i = 0;
        var len = this.length;
        var siblings = [];
        var sibling;

        for (; i < len; ++i) {

          sibling = /** @type {Element} */ (this[i]).nextSibling;

          while (sibling && sibling.nodeType !== 1) {
            sibling = sibling.nextSibling;
          }

          if (sibling) {

            siblings.push(sibling);

          }

        }

        return new rocket.Elements(siblings);

      };

    }

    return this.nextElementSibling();

  }

};


/**
Returns a rocket.Elements of these elements parentNode.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.parentNode = function() {

  var i = 0;
  var len = this.length;
  var parent;
  var parents = [];

  for (; i < len; ++i) {
    parent = /** @type {Element} */ (this[i]).parentNode;
    if (parent) {
      parents.push(parent);
    }
  }

  return new rocket.Elements(parents);

};


/**
Pops an element from the end of this Elements.

@return {(undefined|rocket.Elements)} The pop'd Element.
*/
rocket.Elements.prototype.pop = function() {

  if (this.length) {

    var element = /** @type {Element} */ (this[--this.length]);

    delete this[this.length];

    return new rocket.Elements([element]);

  } else {

    return new rocket.Elements([]);

  }

};


/**
Prevents these elements from being selected or "highlighted".

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.preventSelect = function() {

  return this.addEventListener(
      [
        'selectstart.preventSelect',
        'mousedown.preventSelect'
      ],
      /** @type {function(Event)} */
      (function(the_event) {
        the_event.preventDefault();
      })
  );

};


/**
Returns a rocket.Elements of these elements previousElementSibling.

If you don't know the difference between this and previousSibling,
this is the method that you actually want to use.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.previousElementSibling = function() {

  if (this.length === 0) {

    return new rocket.Elements([]);

  } else {

    if (/** @type {Element} */ (this[0]).previousElementSibling !== undefined) {

      rocket.Elements.prototype.previousElementSibling = function() {

        var i = 0;
        var len = this.length;
        var siblings = [];
        var sibling;

        for (; i < len; ++i) {

          sibling = /** @type {Element} */ (this[i]).previousElementSibling;

          if (sibling) {

            siblings.push(sibling);

          }

        }

        return new rocket.Elements(siblings);

      };

    } else {

      rocket.Elements.prototype.previousElementSibling = function() {

        var i = 0;
        var len = this.length;
        var siblings = [];
        var sibling;

        for (; i < len; ++i) {

          sibling = /** @type {Element} */ (this[i]).previousSibling;

          while (sibling && sibling.nodeType !== 1) {
            sibling = sibling.previousSibling;
          }

          if (sibling) {

            siblings.push(sibling);

          }

        }

        return new rocket.Elements(siblings);

      };

    }

    return this.previousElementSibling();

  }

};


/**
Pushes an element onto the end of this Elements.

@param {...Element} var_args The Element(s).
@return {number} The new number of Elements in this.
*/
rocket.Elements.prototype.push = function(var_args) {
  return Array.prototype.push.apply(this, arguments);
};


/**
Reduces these elements.

@param {function(*=, *=, number=, (Array|rocket.Elements)=) : *} fnct
  The reducer.
@param {*=} opt_initial_value The initial value.
@return {*} The reduced value (the return value of the reducer function).
*/
rocket.Elements.prototype.reduce = function(fnct, opt_initial_value) {

  if (Array.prototype.reduce) {

    rocket.Elements.prototype.reduce = Array.prototype.reduce;

  } else {

    rocket.Elements.prototype.reduce = function(fnct, opt_initial_value) {

      if (arguments.length === 2) {

        return rocket.reduce(this, fnct, opt_initial_value);

      } else {

        return rocket.reduce(this, fnct);

      }

    };

  }

  if (arguments.length === 2) {

    return this.reduce(fnct, opt_initial_value);

  } else {

    return this.reduce(fnct);

  }

};


/**
Reduces these elements from the right.

@param {function(*=, *=, number=, (Array|rocket.Elements)=) : *} fnct
  The reducer.
@param {*=} opt_initial_value The initial value.
@return {*} The reduced value (the return value of the reducer function).
*/
rocket.Elements.prototype.reduceRight = function(fnct, opt_initial_value) {

  if (Array.prototype.reduceRight) {

    rocket.Elements.prototype.reduceRight = Array.prototype.reduceRight;

  } else {

    rocket.Elements.prototype.reduceRight = function(fnct, opt_initial_value) {

      if (arguments.length === 2) {
        return rocket.reduceRight(this, fnct, opt_initial_value);
      } else {
        return rocket.reduceRight(this, fnct);
      }

    };

  }

  if (arguments.length === 2) {
    return this.reduceRight(fnct, opt_initial_value);
  } else {
    return this.reduceRight(fnct);
  }

};


/**
Returns a rocket.Elements of the removed child nodes.

@param {(Element|Array.<Element>|rocket.Elements)} child_node
  The node(s) to remove.
@return {rocket.Elements} Removed child nodes.
*/
rocket.Elements.prototype.removeChild = function(child_node) {

  var i;
  var len;
  var child_nodes;

  if (this.length) {

    if (child_node.nodeType) {

      child_nodes = [child_node];

    } else {

      child_nodes = /** @type {Array.<Element>} */ (child_node);

    }

    i = 0;
    len = child_nodes.length;

    for (; i < len; ++i) {
      /** @type {Element} */ (this[0]).removeChild(child_nodes[i]);
    }

  } else {

    child_nodes = [];

  }

  return new rocket.Elements(child_nodes);

};


/**
Removes a class or a list of classes from these Elements.

@param {(string|Array.<string>)} class_names The class names to remove.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.removeClass = function(class_names) {

  class_names = rocket.arrayify(class_names);

  var memo = {};

  var i = 0;
  var len = this.length;

  var j;
  var jlen = class_names.length;

  var initial_class_name;
  var final_class_name;
  var index;
  var joined_class_names = class_names.join(' ');

  for (; i < len; ++i) {

    initial_class_name = /** @type {Element} */ (this[i]).className;

    if (initial_class_name in memo) {

      this[i].className = memo[initial_class_name];

    } else {

      if (initial_class_name === '' ||
          initial_class_name === joined_class_names) {

        final_class_name = [];

      } else {

        final_class_name = rocket.arrayify(initial_class_name);

        for (j = 0; j < jlen; ++j) {

          index = rocket.indexOf(final_class_name, class_names[j]);

          if (index !== -1) {
            final_class_name.splice(index, 1);
          }
        }

      }

      this[i].className = memo[initial_class_name] = final_class_name.join(' ');

    }

  }

  return this;

};


/**
removeeventlistener.

@param {(string|Array.<string>)=} opt_types
@param {(EventListener|function(Event))=} opt_fnct
@return {rocket.Elements}
*/
rocket.Elements.prototype.removeEventListener = function(opt_types, opt_fnct) {

  var types;
  var i = 0;
  var len = this.length;

  if (arguments.length === 0) {

    for (; i < len; ++i) {
      rocket.EventTarget.prototype.removeEventListener.call(this[i]);
    }

  } else {

    types =
        rocket.arrayify(
            /** @type {(string|Array.<string>)} */ (opt_types)
        );
    for (; i < len; ++i) {
      for (var j = 0; types[j]; ++j) {
        if (arguments.length === 1) {
          rocket.EventTarget.prototype.removeEventListener.call(
              this[i],
              types[j]
          );
        } else {
          rocket.EventTarget.prototype.removeEventListener.call(
              this[i],
              types[j],
              opt_fnct
          );
        }
      }
    }

  }

  return this;

};


/**
Returns a rocket.Elements of the removed child node.

@param {(Element|Array.<Element>|rocket.Elements)} new_children
  The new node.
@param {(Element|Array.<Element>|rocket.Elements)} old_children
  The node to replace.
@return {rocket.Elements} Removed child node.
*/
rocket.Elements.prototype.replaceChild = function(new_children, old_children) {

  var new_child;
  var old_child;

  if (this.length) {

    if (new_children.nodeType) {
      new_child = new_children;
    } else {
      new_child = /** @type {Element} */ (new_children[0]);
    }

    if (old_children.nodeType) {
      old_child = old_children;
    } else {
      old_child = /** @type {Element} */ (old_children[0]);
    }

    /** @type {Element} */ (this[0]).replaceChild(
        /** @type {Element} */ (new_child),
        /** @type {Element} */ (old_child)
    );

    return new rocket.Elements([old_child]);

  } else {

    return new rocket.Elements([]);

  }

};


/**
Scrolls the first of these Elements into view.

@param {boolean=} opt_align_with_top
  If true, align the Element with the top of;
  else align the Element with the bottom of the page.
  Defaults to true.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.scrollIntoView = function(opt_align_with_top) {

  if (this.length) {

    if (arguments.length === 1) {
      /** @type {Element} */ (this[0]).scrollIntoView(opt_align_with_top);
    } else {
      /** @type {Element} */ (this[0]).scrollIntoView();
    }

  }

  return this;

};


/**
Sets/gets these selected states.

@param {boolean=} opt_selected Selected state.
@return {(rocket.Elements|boolean|undefined)}
  The selected state or these elements.
*/
rocket.Elements.prototype.selected = function(opt_selected) {

  if (arguments.length === 0) {
    return /** @type {boolean|undefined} */ (this.getAttribute('selected'));
  } else {
    return this.setAttribute('selected', opt_selected);
  }

};


/**
Returns the end of the selection for this Elements.

@return {number} The selection end.
*/
rocket.Elements.prototype.selectionEnd = function() {

  var len = this.length;

  if (this.length) {

    if (/** @type {HTMLInputElement} */ (this[0]).selectionEnd !==
            undefined) {

      rocket.Elements.prototype.selectionEnd = function() {
        return this.length ?
            /** @type {HTMLInputElement} */ (this[0]).selectionEnd :
            -1;
      };

    } else {

      rocket.Elements.prototype.selectionEnd = function() {

        if (this.length) {

          var range = document.selection.createRange();
          var value_length =
              /** @type {HTMLInputElement} */ (this[0]).value.length;

          return value_length - range.moveEnd('character', value_length);

        } else {

          return -1;

        }

      };

    }

    return this.selectionEnd();
  }

  return -1;

};


/**
Returns the start of the selection for this Elements.

@return {number} The selection start.
*/
rocket.Elements.prototype.selectionStart = function() {

  var len = this.length;

  if (this.length) {

    if (/** @type {HTMLInputElement} */ (this[0]).selectionStart !==
            undefined) {

      rocket.Elements.prototype.selectionStart = function() {
        return this.length ?
            /** @type {HTMLInputElement} */ (this[0]).selectionStart :
            -1;
      };

    } else {

      rocket.Elements.prototype.selectionStart = function() {

        if (this.length) {

          var range = document.selection.createRange();
          var value_length =
              /** @type {HTMLInputElement} */ (this[0]).value.length;

          return Math.abs(range.moveStart('character', -value_length));

        } else {

          return -1;

        }

      };

    }

    return this.selectionStart();
  }

  return -1;

};


/**
Sets attributes on all of these elements.

Either an object of zero or more key and value pairs
can be used as the attribute; or setting a single key and
value pair can be done using both parameters.

Case sensitive attributes are automatically properly cased.

Reserved word attributes are properly remapped.

For setting the value of an HTMLSelectElement: first all option Elements
are checked for an equivalent value attribute.  If an equivalent value
attribute is found on an HTMLOptionElement, then that HTMLOptionElement
is selected.  If an equivalent value attribute is not found, then all
HTMLOptionElement's innerHTML attributes are checked for an equivalent value,
if found, that HTMLOptionElement is selected.

For setting the value of an HTMLSelectElement with the multiple property
set: any HTMLOptionElement that has an equivalent value or innerHTML attribute
is selected.  If an Array is used as the value, then all values in the Array
will be used.

@param {(string|Object.<string, (string|boolean|number)>)} attribute
  The attributes.
@param {(string|boolean|number)=} opt_value The value.
@return {rocket.Elements} These elements.
@example
$('table').setAttribute('border','0');
$('table').setAttribute({'border':'0'});
$('table').setAttribute({'border':'0','cellpadding':'0'});
$('select').setAttribute({'value': 'foo'});

// only if select multiple="multiple"
$('select').setAttribute({'value': ['foo','bar']});
*/
rocket.Elements.prototype.setAttribute = function(attribute, opt_value) {

  var attributes;

  if (arguments.length === 1) {

    attributes = attribute;

  } else {

    attributes = {};
    attributes[attribute] = opt_value;

  }

  var i = 0;
  var len = this.length;
  var j;
  var jlen;
  var k;
  var klen;
  var options;
  var index;
  var string_value;
  var atts;
  var selected;

  for (; i < len; ++i) {

    for (var key in attributes) {

      if (key === 'value' &&
          /** @type {Element} */ (this[i]).nodeName === 'SELECT') {

        options = /** @type {HTMLSelectElement} */ (this[i]).options;

        j = 0;
        jlen = options.length;

        if (/** @type {HTMLSelectElement} */ (this[i]).multiple) {

          if (rocket.isArray(attributes[key])) {

            atts =
                /** @type {Array.<(string|boolean|number)>} */
                   (attributes[key]);

          } else {

            atts = [attributes[key]];

          }

          klen = atts.length;

          for (; j < jlen; ++j) {

            /** @type {HTMLOptionElement} */
            (options[j]).selected = selected = false;

            for (k = 0; k < klen && selected === false; ++k) {

              string_value = (atts[k] + '');

              if (/** @type {HTMLOptionElement} */
                  (options[j]).value === string_value ||
                  /** @type {HTMLOptionElement} */
                  (options[j]).innerHTML === string_value) {

                options[j].selected = selected = true;

              }

            }

          }

        } else {

          index = -1;

          for (; j < jlen && index === -1; ++j) {
            if (/** @type {HTMLOptionElement} */ (options[j]).value ===
                (/** @type {string} */ (attributes[key]) + '')) {

              index = j;

            }
          }

          if (index === -1) {

            j = 0;

            for (; j < jlen && index === -1; ++j) {
              if (/** @type {HTMLOptionElement} */ (options[j]).innerHTML ===
                  (/** @type {string} */ (attributes[key]) + '')) {

                index = j;

              }
            }

          }

          if (index !== -1) {
            this[i].selectedIndex = index;
          }

        }

      } else {

        /** @type {Element} */ (this[i])[
            rocket.Elements.attribute_map_[key] || key] = attributes[key];

      }

    }

  }

  return this;

};


/**
Sets the selected text in the first of these elements.

@param {number} begin The beginning of the selection.
@param {number} end The ending of the selection.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.setSelectionRange = function(begin, end) {

  if (this.length) {

    if (/** @type {HTMLInputElement} */ (this[0]).setSelectionRange) {

      rocket.Elements.prototype.setSelectionRange = function(begin, end) {

        if (this.length) {

          /** @type {HTMLInputElement} */ (this[0]).setSelectionRange(
              begin,
              end
          );

          /** @type {Element} */ (this[0]).focus();

        }

        return this;

      };

    } else {

      rocket.Elements.prototype.setSelectionRange = function(begin, end) {

        var range;

        if (this.length) {

          range = /** @type {HTMLInputElement} */ (this[0]).createTextRange();

          range.moveStart('character', begin);
          range.moveEnd(
              'character',
              end - /** @type {HTMLInputElement} */ (this[0]).value.length
          );

          range.select();

        }

        return this;

      };

    }

    return this.setSelectionRange(begin, end);

  }

  return this;

};


/**
Shifts an Element from the beginning of this Elements.

@return {rocket.Elements} The shift'd Element.
*/
rocket.Elements.prototype.shift = function() {

  if (this.length) {

    var element = /** @type {Element} */ (this[0]);
    var i = 1;
    var len = this.length;

    for (; i < len; ++i) {
      this[i - 1] = this[i];
    }

    delete this[--this.length];

    return new rocket.Elements([element]);

  } else {

    return new rocket.Elements([]);

  }

};


/**
Shows these elements.

Resets the display style of these Elements an empty string value.

If the opt_visibility parameter is true, then visibility,
instead of display is used; visibility to an empty string.

@param {boolean=} opt_visibility Use visibility.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.show = function(opt_visibility) {

  return /** @type {rocket.Elements} */ (this.style(
      opt_visibility ?
          {'visibility': ''} :
          {'display': ''}
      ));

};


/**
Selects part of this Elements and returns a new Elements.

@param {number} start Where to star the slice.
@param {number=} opt_end Where to stop the slice.
@return {rocket.Elements} The sliced part of this Elements.
*/
rocket.Elements.prototype.slice = function(start, opt_end) {
  return new rocket.Elements(
      Array.prototype.slice.apply(this, arguments)
  );
};


/**
Elements some.

@param {function(this:Object, Object, number, Object)} fnct The fnct.
@param {Object=} opt_self The value to use as this when executing fnct.
@return {boolean} True if any; else false.
*/
rocket.Elements.prototype.some = function(fnct, opt_self) {

  if (Array.prototype.some) {

    rocket.Elements.prototype.some = Array.prototype.some;

  } else {

    rocket.Elements.prototype.some = function(fnct, opt_self) {
      return rocket.some(this, fnct, opt_self);
    };

  }

  return this.some(fnct, opt_self);

};


/**
Mutates this Elements and returns a new Elements of the removed elements.

@param {number} index The index to start changing this Rocket.
@param {number=} opt_how_many How many elements to remove.
@param {...Element} var_args The elements to add.
@return {rocket.Elements} A Elements of the removed elements.
*/
rocket.Elements.prototype.splice = function(index, opt_how_many, var_args) {
  return new rocket.Elements(
      Array.prototype.splice.apply(this, arguments)
  );
};


/**
Converts a hyphenated property to a camelCase'd property.

@private
@param {string} property The property possibly hyphenated.
@return {string} The property camelCase'd.
*/
rocket.Elements.prototype.style_camel_case_ = function(property) {

  var split;
  var len;
  var i;

  if (property.indexOf('-') === -1) {

    return property;

  } else {

    split = property.split('-');
    len = split.length;
    i = 1;

    for (; i < len; ++i) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].substr(1);
    }

    return split.join('');

  }

};


/**
Set/get styles.

@param {(string|Object.<string, (string|number)>)} styles Styles.
@param {(string|number)=} opt_value The value to set.
@return {(string|number|undefined|rocket.Elements)} This Elements.
*/
rocket.Elements.prototype.style = function(styles, opt_value) {

  var map;

  if (arguments.length === 1) {

    if (typeof styles === 'string') {
      return this.style_get_(styles);
    } else {
      map = styles;
    }

  } else {

    map = {};
    map[styles] = opt_value;

  }

  this.style_set_(map);

  return this;

};


/**
Get a style attribute.

@private
@param {string} style The style.
@return {(string|number|undefined)} The vaule.
*/
rocket.Elements.prototype.style_get_ = function(style) {

  var camel_cased_style = this.style_camel_case_(style);
  var transformer;

  if (this.length) {

    if (transformer = rocket.Elements.style_transformers_[camel_cased_style]) {

      return transformer.get(this[0]);

    } else {

      /** @type {string} */
      var ret = /** @type {Element} */ (this[0]).style[camel_cased_style];

      if (ret.match(/^\d+(\.\d+)?px$/)) {
        return parseFloat(ret) || 0;
      } else {
        return ret;
      }

    }

  } else {

    return undefined;

  }

};


/**
Set a style attribute.

@private
@param {Object.<string, (string|number)>} styles The styles map.
*/
rocket.Elements.prototype.style_set_ = function(styles) {

  var i = 0;
  var len = this.length;

  /** @type {string} */
  var key;

  for (key in styles) {

    this.style_set_helper_(key, styles[key]);

  }

};


/**
@private
@param {string} key
@param {(string|number)} value
*/
rocket.Elements.prototype.style_set_helper_ =
    function(key, value) {

  var camel_cased_style = this.style_camel_case_(key);

  var transformer = rocket.Elements.style_transformers_[camel_cased_style];

  for (var i = 0, len = this.length; i < len; ++i) {

    if (transformer = rocket.Elements.style_transformers_[camel_cased_style]) {

      transformer.set(this[i], value);

    } else {

      if (typeof value === 'number') {
        /** @type {Element} */ (this[i]).style[camel_cased_style] =
            value + 'px';
      } else {
        /** @type {Element} */ (this[i]).style[camel_cased_style] =
            value;
      }

    }

  }


};


/**
Gets the float from an element.

@private
@param {Element} element The element.
@return {string} The float.
*/
rocket.Elements.style_transformer_float_get_ = function(element) {

  var style = element.style;

  return style.cssFloat || style.styleFloat || '';

};


/**
Set a float on an element.

@private
@param {Element} element The element.
@param {string} value The float.
*/
rocket.Elements.style_transformer_float_set_ =
    function(element, value) {

  var style = element.style;

  style.cssFloat = value;
  style.styleFloat = value;

};


/**
Gets an opacity from an element.

@private
@param {Element} element The element.
@return {number} The opacity between zero and one.
*/
rocket.Elements.style_transformer_opacity_get_ = function(element) {

  if (element.style.opacity === undefined) {

    rocket.Elements.style_transformer_opacity_get_ = function(element) {

      var filter = element.style.filter;
      var result;

      if (filter) {

        result = /opacity=(\d+)/.exec(filter);

        if (result) {
          return result[1] / 100;
        } else {
          return 1;
        }

      } else {

        return 1;

      }

    };

  } else {

    rocket.Elements.style_transformer_opacity_get_ = function(element) {

      return parseFloat(element.style.opacity) ||
          element.style.opacity === '' && 1 ||
          0;

    };

  }

  return rocket.Elements.style_transformer_opacity_get_(element);

};


/**
Set an opacity on an element.

@private
@param {Element} element The element.
@param {number} value The opacity between zero and one.
*/
rocket.Elements.style_transformer_opacity_set_ =
    function(element, value) {

  if (element.style.opacity === undefined) {

    rocket.Elements.style_transformer_opacity_set_ =
        function(element, value) {

      var style = element.style;
      var style_filter = style.filter;
      var filter_regexp = /alpha\(opacity=\d+(\.\d+)?\)/;
      var filter_string;
      var other_filter;

      if (!style.zoom) {

        style.zoom = 1;

      }

      if (value === 1) {

        if (style_filter) {

          if (filter_regexp.test(style_filter)) {

            if (other_filter = style_filter.replace(filter_regexp, '')) {
              style.filter = other_filter.replace(/^,|,$|,,/, '');
            } else {
              style.removeAttribute('filter');
            }

          }

        }

      } else {

        filter_string = 'alpha(opacity=' + (value * 100) + ')';

        if (style_filter) {

          if (filter_regexp.test(style_filter)) {
            style.filter = style_filter.replace(filter_regexp, filter_string);
          } else {
            style.filter += ',' + filter_string;
          }


        } else {

          style.filter = filter_string;

        }

      }

    };

  } else {

    rocket.Elements.style_transformer_opacity_set_ =
        function(element, value) {

      element.style.opacity = value;

    };

  }

  rocket.Elements.style_transformer_opacity_set_(element, value);

};


/**
Transformers for setting/getting CSS Styles.

@private
@const
@ignore
@type {Object.<string, {get:function(Element): (string|number), set: function(Element, (string|number))}>}
*/
rocket.Elements.style_transformers_ = {
  'float': {
    'get': rocket.Elements.style_transformer_float_get_,
    'set': rocket.Elements.style_transformer_float_set_
  },
  'opacity': {
    'get': rocket.Elements.style_transformer_opacity_get_,
    'set': rocket.Elements.style_transformer_opacity_set_
  }
};


/**
Submit this form.

@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.submit = function() {

  if (this.length) {
    /** @type {HTMLFormElement} */ (this[0]).submit();
  }

  return this;

};


/**
Toggles a class or a list of classes on these Elements.

@param {(string|Array.<string>)} class_names The class names to toggle.
@return {rocket.Elements} These elements.
*/
rocket.Elements.prototype.toggleClass = function(class_names) {

  class_names = rocket.arrayify(class_names);

  var memo = {};

  var i = 0;
  var len = this.length;

  var j;
  var jlen = class_names.length;

  var initial_class_name;
  var final_class_name;
  var index;
  var joined_class_names = class_names.join(' ');

  for (; i < len; ++i) {

    initial_class_name = /** @type {Element} */ (this[i]).className;

    if (initial_class_name in memo) {

      this[i].className = memo[initial_class_name];

    } else {

      if (initial_class_name === '') {

        final_class_name = class_names;

      } else if (initial_class_name === joined_class_names) {

        final_class_name = [];

      } else {

        final_class_name = rocket.arrayify(initial_class_name);

        for (j = 0; j < jlen; ++j) {

          index = rocket.indexOf(final_class_name, class_names[j]);

          if (index === -1) {
            final_class_name.push(class_names[j]);
          } else {
            final_class_name.splice(index, 1);
          }
        }

      }

      this[i].className = memo[initial_class_name] = final_class_name.join(' ');

    }

  }

  return this;

};


/**
Unshifts an Element(s) onto the beginning of this Elements.

@param {...Element} var_args The Element(s).
@return {number} The new number of Elements in this.
*/
rocket.Elements.prototype.unshift = function(var_args) {

  return Array.prototype.unshift.apply(this, arguments) || this.length;

};


/**
Sets/gets this value text.

Can be used to set selected value(s) on both single and multiple
select elements as well.

Returns an array of selected values for a multiple select.

Paramter of an array of values to set a multiple select.

@param {string=} opt_value The value.
@return {(rocket.Elements|string|Array.<string>|undefined)}
  The value or these elements.
*/
rocket.Elements.prototype.value = function(opt_value) {

  if (arguments.length === 0) {
    return /** @type {string|undefined} */ (this.getAttribute('value'));
  } else {
    return this.setAttribute('value', opt_value);
  }

};

