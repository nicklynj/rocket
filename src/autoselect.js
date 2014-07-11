


/**
AutoSelect

@constructor
@extends {rocket.AutoSuggest}
*/
rocket.AutoSelect = function() {

  this.addEventListener('show', /** @this {rocket.AutoSelect} */ (function() {

    if (this.getResult()) {

      this.place_holder_ = rocket.createElement('div');

      this.getInputElement().value('');

      this.change();

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
@return {rocket.Elements}
*/
rocket.AutoSelect.prototype.getPlaceHolder = function() {
  return this.place_holder_;
};
