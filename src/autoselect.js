


/**
AutoSelect

@constructor
@extends {rocket.AutoSuggest}
*/
rocket.AutoSelect = function() {

  this.addEventListener('render', /** @this {rocket.AutoSelect} */ (function() {

    this.place_holder_ = rocket.createElement('div');

    this.getInput().value('');

    var rect = this.getInput().getBoundingClientRect();

    this.place_holder_
      .style({
          'border-radius': 3,
          'position': 'absolute',
          'background-color': '#FFFFFF',
          'border': '1px solid #888888',
          'width': rect.width - 2,
          'top': rect.top - 15,
          'left': rect.left
        })
      .innerHTML(/** @type {string} */ (this.getResult() || '&nbsp;'));

    new rocket.Elements([document.body]).appendChild(this.place_holder_);

  }));

  this.addEventListener('hide', /** @this {rocket.AutoSelect} */ (function() {

    this.getInput().value(/** @type {string} */ (this.getResult() || ''));

    new rocket.Elements([document.body]).removeChild(this.place_holder_);

  }));

};
rocket.inherits(rocket.AutoSelect, rocket.AutoSuggest);


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSelect.prototype.place_holder_;
