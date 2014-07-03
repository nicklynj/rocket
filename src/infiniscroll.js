


/**
InfiniScroll.

@param {number} length
@constructor
@extends {rocket.Component}
*/
rocket.InfiniScroll = function(length) {

  this.length_ = length;

};
rocket.inherits(rocket.InfiniScroll, rocket.Component);


/**
@type {number}
@private
*/
rocket.InfiniScroll.prototype.height_ = 300;


/**
@type {number}
@private
*/
rocket.InfiniScroll.prototype.row_height_ = 20;


/**
@type {boolean}
@private
*/
rocket.InfiniScroll.prototype.pad_results_ = false;


/**
@type {number}
@private
*/
rocket.InfiniScroll.prototype.scroll_top_;


/**
Requests twice the viewable area of results
to prevent seeing empty rows when scrolling.

Defaults to false.

@param {boolean=} opt_pad_results
@return {boolean}
*/
rocket.InfiniScroll.prototype.padResults = function(opt_pad_results) {

  if (arguments.length) {

    this.pad_results_ = /** @type {boolean} */ (opt_pad_results);

  }

  return this.pad_results_;

};


/**
Set or get the height of the scrollable container.

@param {number=} opt_height
@return {number}
*/
rocket.InfiniScroll.prototype.height = function(opt_height) {

  if (arguments.length) {

    this.height_ = /** @type {number} */ (opt_height);

  }

  return this.height_;

};


/**
The given query function is called with two parameters: index and length.
The given query function then must call InfiniScroll.results(data).

@param {function(number, number)=} opt_query
@return {function(number, number)}
*/
rocket.InfiniScroll.prototype.query = function(opt_query) {

  if (arguments.length) {

    this.query_ =
        /** @type {(function(number, number):Array.<Array.<string>>)} */
        (opt_query);

  }

  return this.query_;

};


/**
Creates and assigns an InfiniScroll.query() function given a set of data.

Data is an Array of rows, where each row is an Array of columns, where each
column is a String.

@param {Array.<Array.<string>>} data
@return {function(number, number)}
*/
rocket.InfiniScroll.prototype.data = function(data) {

  var self = this;

  return this.query_ = /** @param {number} index @param {number} length */ (
      function(index, length) {
        self.results(data.splice(index, length));
      });

};


/**
@private
@type {number}
*/
rocket.InfiniScroll.prototype.index_;


/**
@private
@type {number}
*/
rocket.InfiniScroll.prototype.query_length_;


/**
@private
@type {rocket.Elements}
*/
rocket.InfiniScroll.prototype.container_;


/**
@private
@type {rocket.Elements}
*/
rocket.InfiniScroll.prototype.padding_;


/**
@private
@type {rocket.Elements}
*/
rocket.InfiniScroll.prototype.element_;


/**
@private
@type {function()}
*/
rocket.InfiniScroll.prototype.element_scroller_;


/**
@private
@type {rocket.table.Table_}
*/
rocket.InfiniScroll.prototype.table_;


/**
@private
@type {function(number, number)}
*/
rocket.InfiniScroll.prototype.query_;


/**
Decorate.

@param {rocket.Elements} element
*/
rocket.InfiniScroll.prototype.decorate = function(element) {

  this.element_ = element;

  element.style({
    'height': this.height_,
    'overflow-y': 'scroll'
  });

  this.container_ = rocket.createElement('div');
  this.padding_ = rocket.createElement('div');

  this.container_.style({
    'height': this.row_height_ * this.length_
  });

  this.query_length_ = Math.ceil(this.height_ / this.row_height_);

  if (this.pad_results_) {
    this.query_length_ *= 2;
  }

  this.padding_.style({
    'height': 0
  });

  this.container_.appendChild(this.padding_);

  element.appendChild(this.container_);

  var self = this;

  this.element_scroller_ = function() {

    var scroll_top = /** @type {number} */ (element.getAttribute('scrollTop'));

    var index = Math.floor(scroll_top / self.row_height_);

    if (self.pad_results_) {

      if (scroll_top < self.scroll_top_) {

        index -= Math.ceil(self.query_length_ / 3);

      } else {

        index -= Math.ceil(self.query_length_ / 6);

      }

      if (index < 0) {
        index = 0;
      }

    }

    self.scroll_top_ = scroll_top;

    var diff = (index + self.query_length_) - self.length_;

    if (diff > 0) {
      index -= diff;
    }

    if (index < 0) {
      index = 0;
    }

    if (index !== self.index_) {

      self.index_ = index;

      diff = (index + self.query_length_) - self.length_;

      self.query_(
          index,
          self.query_length_ - ((diff > 0) ? diff : 0)
      );

    }

  };

  element.addEventListener('scroll', this.element_scroller_);

  element.dispatchEvent('scroll');

};


/**
Data is an Array of rows, where each row is an Array of columns, where each
column is a String.

@param {Array.<Array.<string>>} data
*/
rocket.InfiniScroll.prototype.results = function(data) {

  var rows = data.length;
  var cols = data[0].length;

  var table = rocket.table(cols, rows);

  for (var row = 0; row < rows; ++row) {

    table.trs[row].style({
      'height': this.row_height_
    });

    for (var col = 0; col < cols; ++col) {
      table.trs[row].tds[col].innerHTML(data[row][col]);
    }

  }

  if (this.table_) {

    this.container_.replaceChild(table, this.table_);

  } else {

    this.container_.appendChild(table);

  }

  this.table_ = table;

  this.padding_.style({
    'height': this.index_ * this.row_height_
  });

};


/**
Dispose.
*/
rocket.InfiniScroll.prototype.dispose = function() {

  if (this.container_) {

    this.element_.removeEventListener('scroll', this.element_scroller_);

    delete this.padding_;
    delete this.container_;
    delete this.table_;

    this.disposeInternal();

  }

};
