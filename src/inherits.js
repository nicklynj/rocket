

/**
Allows inheritance from a given parent class to a given child class.

Assigns a superClass_ pointer in the child class to the parent class.

@param {Function} child_class Child class.
@param {Function} parent_class Parent class.
@test {{'a': 'b', 'c': 'd', 'superClass_': Foo.prototype, 'constructor': Bar}}
  Test inheriting a trait from a parent.

var Foo = function(){};
Foo.prototype.a = 'b';

var Bar = function(){};
rocket.inherits(Bar, Foo);
Bar.prototype.c = 'd';

new Bar();
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
