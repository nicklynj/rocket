


/**
AutoSelect is intended to be used as a replacement for an HTMLSelectElement.

It forces the user to select one option from a list of available options.

If the user enters a string that does not correspond to an available option,
the entered string will be deleted when focus leaves the HTMLInputElement.

@constructor
@see {rocket.Input}
@extends {rocket.AutoSuggest}
*/
rocket.AutoSelect = function() {

  this.addEventListener('show', /** @this {rocket.AutoSelect} */ (function() {

    if (this.getResult()) {

      this.place_holder_ = rocket.createElement('div');

      this.getInputElement().value('');

      var rect = this.getInputElement().getBoundingClientRect();

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
        .innerHTML(this.getResult()[0]);

      new rocket.Elements([document.body]).appendChild(this.place_holder_);

      var place_holder_rect = this.place_holder_.getBoundingClientRect();

      this.place_holder_.style({
        'top': rect.top - place_holder_rect.height + 1
      });

    }

  }));

  this.addEventListener('hide', /** @this {rocket.AutoSelect} */ (function() {

    if (this.place_holder_) {

      this.getInputElement().value(this.getResult()[0]);

      new rocket.Elements([document.body]).removeChild(this.place_holder_);

      delete this.place_holder_;

    }

  }));

};
rocket.inherits(rocket.AutoSelect, rocket.AutoSuggest);


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSelect.prototype.place_holder_;


/**
Gets the HTMLDivElement placeholder that contains
the currently selected option.

@return {rocket.Elements}
*/
rocket.AutoSelect.prototype.getPlaceHolder = function() {
  return this.place_holder_;
};
