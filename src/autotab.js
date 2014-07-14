


/**
AutoTab will automatically "tab" thru an Array of HTMLInputElement.

@constructor
@implements {rocket.Disposable}
@param {rocket.Elements} elements
An Array of HTMLInputElement or a rocket.Elements.
*/
rocket.AutoTab = function(elements) {

  this.elements_ = rocket.$(elements);
  this.inputs_ = [];
  this.values_ = [];

  for (var i = 0; this.elements_[i]; ++i) {
    this.inputs_.push(this.elements_[i]);
    this.values_.push(
        /** @type {HTMLInputElement} */
        (this.elements_[i]).value
    );
  }

  var self = this;

  this.listener_ =
      /**
      @this {HTMLInputElement}
      @param {Event} e
      */
      function(e) {

    var value = this.value;
    var index = rocket.indexOf(self.inputs_, this);
    var max_length = this.maxLength;

    var selection_start = (new rocket.Elements([this])).selectionStart();
    var selection_end = (new rocket.Elements([this])).selectionEnd();

    var next_focus_offset;
    var next_selection_range_start;
    var next_selection_range_end;
    var do_not_prevent_default;

    if (e.type === 'keydown') {

      if (selection_start === selection_end) {

        if ((e.which === rocket.KEY.left) &&
            self.inputs_[index - 1] &&
            (selection_start === 0)) {

          next_focus_offset = -1;
          next_selection_range_start = self.inputs_[index - 1].value.length;
          next_selection_range_end = next_selection_range_start;

        } else if ((e.which === rocket.KEY.right) &&
            self.inputs_[index + 1] &&
            (selection_start === value.length)) {

          next_focus_offset = 1;
          next_selection_range_start = 0;
          next_selection_range_end = 0;

        } else if ((e.which === rocket.KEY.backspace) &&
            self.inputs_[index - 1] &&
            (selection_start === 0)) {

          next_focus_offset = -1;
          next_selection_range_start = self.inputs_[index - 1].value.length;
          next_selection_range_end = self.inputs_[index - 1].value.length;

        }

      }

    }

    if ((value.length === max_length) &&
        (/** @type {string} */ (self.values_[index]).length < max_length) &&
        self.inputs_[index + 1] &&
        (selection_start === max_length) &&
        (selection_end === max_length)) {

      next_focus_offset = 1;
      do_not_prevent_default = true;
      next_selection_range_start = 0;
      next_selection_range_end = self.inputs_[index + 1].value.length;

    }

    if (next_focus_offset) {

      (new rocket.Elements([self.inputs_[index + next_focus_offset]]))
          .focus()
          .setSelectionRange(
              /** @type {number} */ (next_selection_range_start),
              /** @type {number} */ (next_selection_range_end)
          );

      if (!do_not_prevent_default) {
        e.preventDefault();
      }

    }

    self.values_[index] = value;

  };

  this.elements_.addEventListener(
      [
        'keydown.AutoTab',
        'keyup.AutoTab'
      ],
      this.listener_
  );

};


/**
@private
@type {Array.<HTMLInputElement>}
*/
rocket.AutoTab.prototype.inputs_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoTab.prototype.elements_;


/**
@private
@type {Function}
*/
rocket.AutoTab.prototype.listener_;


/**
Remove all added EventListener from the given HTMLInputElement.
*/
rocket.AutoTab.prototype.dispose = function() {

  if (this.elements_) {

    this.elements_.removeEventListener(
        [
          'keydown.AutoTab',
          'keyup.AutoTab'
        ],
        this.listener_
    );

    delete this.elements_;
    delete this.inputs_;
    delete this.listener_;

  }

};
