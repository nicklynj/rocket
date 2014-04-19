

/**
Sets the given Object's expando property if it is not present;
returns the given Object's expando property value.

@param {Object} obj The object to inspect.
@return {number} The object's rocket_guid.
*/
rocket.guid = function(obj) {
  return /** @type {undefined|number} */ (obj[rocket.expando]) ||
      (obj[rocket.expando] = ++rocket.guid.counter_);
};


/**
Returns the given Object's expando property or the number zero if the expando
property has never been assigned onto the given Object.

@param {Object} obj The object to inspect.
@return {number} The object's rocket_guid or zero.
*/
rocket.guid.peek = function(obj) {
  return /** @type {undefined|number} */ (obj[rocket.expando]) || 0;
};


/**
The rocket guid counter.  This is the last guid that was assigned.

@private
*/
rocket.guid.counter_ = 0;
