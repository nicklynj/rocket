

/**
Allows passing an array of parameters to a constructor.

@param {Function} constructor The class constructor.
@param {Array} args An Array of arguments.
@return {Object} The instantiated object.
@example
// given
var Baz = function(a,b,c,var_args){};

// the following two statements produce equivalent results
new Baz(a,b,c,d,e);

var foo = [a,b,c,d,e];
rocket.construct(Baz, foo);
*/
rocket.construct = function(constructor, args) {

  /**
  @ignore
  @constructor
  */
  function Temporary_Class() {

    constructor.apply(this, args);

  };

  Temporary_Class.prototype = constructor.prototype;

  return new Temporary_Class();

};
