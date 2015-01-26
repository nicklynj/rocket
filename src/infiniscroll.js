


/**
InfiniScroll is used to dynamically draw only visible rows in an
HTMLTableElement that appears to contain many (thousands of) rows.

@constructor
@extends {rocket.Component}
*/
rocket.InfiniScroll = function() {};
rocket.inherits(rocket.InfiniScroll, rocket.Component);


/**
@type {number}
@private
*/
rocket.InfiniScroll.prototype.height_;


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
@type {boolean}
@private
*/
rocket.InfiniScroll.prototype.no_wrap_ = false;


/**
@type {Array.<string>}
@private
*/
rocket.InfiniScroll.prototype.result_;


/**
@type {rocket.Elements}
@private
*/
rocket.InfiniScroll.prototype.row_;


/**
@type {rocket.Elements}
@private
*/
rocket.InfiniScroll.prototype.cell_;


/**
@type {number}
@private
*/
rocket.InfiniScroll.prototype.scroll_top_;


/**
Requests twice the visible area of HTMLTableRowElement to help prevent the user
from viewing emptyness.

Defaults to false.

Requests twice as many results in the direction which the user is scrolling.

@param {boolean} pad_results
*/
rocket.InfiniScroll.prototype.setPadResults = function(pad_results) {

  this.pad_results_ = pad_results;
  this.init_sizes_();

};


/**
Set the height of the scrollable HTMLDivElement container.

@param {number} height
*/
rocket.InfiniScroll.prototype.setHeight = function(height) {

  this.height_ = height;
  this.init_sizes_();

};


/**
Set to true to wrap text in columns.

@param {boolean} wrap
*/
rocket.InfiniScroll.prototype.setWrap = function(wrap) {

  this.no_wrap_ = wrap;

};


/**
Set the height of each HTMLTableRowElement.

Defaults to twenty pixels.

@param {number} row_height
*/
rocket.InfiniScroll.prototype.setRowHeight = function(row_height) {

  this.row_height_ = row_height;
  this.init_sizes_();

};


/**
Set the maximum number of possible results or length.

@param {number} length
*/
rocket.InfiniScroll.prototype.setLength = function(length) {

  this.length_ = length;
  this.init_sizes_();

};


/**
The given query function is called with two parameters: index and length; the
query function then must call setResults(data).

The index is the zero based position of the first result requested.

The length is the number of results requested.

Data is an Array of rows, where each row is an Array of columns, where each
column is a String.

@param {function(number, number)} query
*/
rocket.InfiniScroll.prototype.setQuery = function(query) {

  this.query_ = query;

};


/**
Create and set a query function based upon an Array of data.

Data is an Array of rows, where each row is an Array of columns, where each
column is a String.

@param {Array.<Array.<string>>} data
@return {function(number, number)}
*/
rocket.InfiniScroll.prototype.data = function(data) {

  var self = this;

  return this.query_ = /** @param {number} index @param {number} length */ (
      function(index, length) {
        self.setResults(data.splice(index, length));
      });

};


/**
Get the HTMLTableElement that contains the viewable portion of the results.

@return {rocket.Elements} The HTMLTableElement.
*/
rocket.InfiniScroll.prototype.getTable = function() {
  return this.table_;
};


/**
Get the most recently selected result row from
the data object passed to setResults.

@return {Array.<string>} The selected data row.
*/
rocket.InfiniScroll.prototype.getResult = function() {
  return this.result_;
};


/**
Get the most recently selected HTMLTableCellElement.

@return {rocket.Elements} The HTMLTableCellElement.
*/
rocket.InfiniScroll.prototype.getCell = function() {
  return this.cell_;
};


/**
Get the most recently selected HTMLTableRowElement.

@return {rocket.Elements} The HTMLTableRowElement.
*/
rocket.InfiniScroll.prototype.getRow = function() {
  return this.row_;
};


/**
Get the HTMLDivElement that has a scrollbar.

@return {rocket.Elements} The HTMLDivElement.
*/
rocket.InfiniScroll.prototype.getScroller = function() {
  return this.scrolling_element_;
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
rocket.InfiniScroll.prototype.index_length_;


/**
@private
@type {number}
*/
rocket.InfiniScroll.prototype.length_;


/**
@private
@type {number}
*/
rocket.InfiniScroll.prototype.query_length_;


/**
@private
@type {rocket.Elements}
*/
rocket.InfiniScroll.prototype.scrolling_element_;


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
@type {function(this:rocket.InfiniScroll, number, number)}
*/
rocket.InfiniScroll.prototype.query_;


/**
Overridden method from the Input helper class.

@param {rocket.Elements} element
*/
rocket.InfiniScroll.prototype.decorateInternal = function(element) {

  this.container_ = rocket.createElement('div');
  this.padding_ = rocket.createElement('div');

  this.scrolling_element_ = element;

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

    diff = (index + self.query_length_) - self.length_;
    var index_length = self.query_length_ - ((diff > 0) ? diff : 0);

    if (
        (index !== self.index_) ||
        (index_length !== self.index_length_)
    ) {

      self.index_ = index;
      self.index_length_ = index_length;

      self.query_.call(
          self,
          index,
          index_length
      );

    }

  };

  element.addEventListener('scroll', this.element_scroller_);

  this.init_sizes_();

};


/**
@private
*/
rocket.InfiniScroll.prototype.init_sizes_ = function() {

  if (this.getComponentElement()) {

    this.getComponentElement().style({
      'height': this.height_,
      'overflow-y': 'scroll'
    });

    this.container_.style({
      'height': this.row_height_ * this.length_
    });

    this.query_length_ = Math.ceil(this.height_ / this.row_height_);

    if (this.pad_results_) {
      this.query_length_ *= 2;
    }

    this.getComponentElement().dispatchEvent('scroll');

  }

};


/**
Data is an Array of rows, where each row is an Array of columns, where each
column is a String.

@param {Array.<Array.<string>>} data
*/
rocket.InfiniScroll.prototype.setResults = function(data) {

  var rows = data.length;

  var cols = 0;
  while (cols in data[0]) {
    ++cols;
  }

  var table = rocket.table(cols, rows);

  var self = this;

  table.live('td', 'click', /** @this {HTMLTableCellElement} */ (function() {
    self.result_ =
        data[/** @type {HTMLTableRowElement} */ (this.parentNode).rowIndex];
    self.cell_ = new rocket.Elements([this]);
    self.row_ = new rocket.Elements([this.parentNode]);
    self.dispatchEvent('select');
  }));

  for (var row = 0; row < rows; ++row) {

    table.trs[row].style({
      'height': this.row_height_
    });

    for (var col = 0; col < cols; ++col) {
      table.trs[row].tds[col].innerHTML(data[row][col]);
      if (!this.no_wrap_) {
        table.trs[row].tds[col].style({
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
      }
    }

  }

  if (this.table_) {

    this.table_.removeEventListener();
    this.container_.replaceChild(table, this.table_);

  } else {

    this.container_.appendChild(table);

  }

  this.table_ = table;

  this.padding_.style({
    'height': this.index_ * this.row_height_
  });

  this.dispatchEvent('drawresults');

};


/**
Overridden method from the Component helper class.
*/
rocket.InfiniScroll.prototype.disposeInternal = function() {

  if (this.container_) {

    if (this.table_) {
      this.table_.removeEventListener();
    }

    this.getComponentElement().removeEventListener(
        'scroll',
        this.element_scroller_
    );

    delete this.container_;

  }

};
