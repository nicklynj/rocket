


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
          'top': 0,
          'width': rect.width - 2,
          'left': rect.left
        })
      .innerHTML(/** @type {string} */ (this.getResult() || '&nbsp;'));

    new rocket.Elements([document.body]).appendChild(this.place_holder_);

    var place_holder_rect = this.place_holder_.getBoundingClientRect();

    this.place_holder_.style({
      'top': rect.top - place_holder_rect.height + 1
    });

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


/**
@return {rocket.Elements}
*/
rocket.AutoSelect.prototype.getPlaceHolder = function() {
  return this.place_holder_;
};
