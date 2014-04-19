

/**
Allows inheritance from a given parent class to a given child class.

@param {Function} child_class Child class.
@param {Function} parent_class Parent class.
*/
rocket.inherits = function(child_class, parent_class) {

  /**
  @ignore
  @constructor
  */
  function Temporary_Class() {};

  Temporary_Class.prototype = parent_class.prototype;

  child_class.prototype = new Temporary_Class();

  child_class.prototype.constructor = child_class;
  child_class.prototype.superClass_ = parent_class.prototype;

};
