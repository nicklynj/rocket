


/**
AutoSuggest

@constructor
@extends {rocket.Input}
*/
rocket.AutoSuggest = function() {};
rocket.inherits(rocket.AutoSuggest, rocket.Input);


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.container_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.scroller_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.table_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.tbody_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.highlighted_;


/**
@private
@type {string}
*/
rocket.AutoSuggest.prototype.query_;


/**
@private
@type {Array.<Object.<number, string>>}
*/
rocket.AutoSuggest.prototype.results_;


/**
@private
@type {Object.<number, string>}
*/
rocket.AutoSuggest.prototype.result_;


/**
Override.
*/
rocket.AutoSuggest.prototype.show = function() {

  this.container_ = rocket.createElement('div');
  this.scroller_ = rocket.createElement('div');

  var rect = this.getInput().getBoundingClientRect();

  var self = this;

  this.results_ = [];

  this.container_
    .style({
        'border-radius': 3,
        'position': 'absolute',
        'background-color': '#FFFFFF',
        'border': '1px solid #888888',
        'cursor': 'pointer',
        'width': rect.width - 2,
        'top': rect.bottom - 1,
        'left': rect.left
      })
    .preventSelect()
    .addEventListener('mousedown', function(e) {
        e.stopPropagation();
      })
    .live('tr', 'mouseover', /** @this {HTMLTableRowElement} */ (
          function() {
            self.highlight_(new rocket.Elements([this]), false);
          }
      ))
    .live('tr', 'click', function() {
        self.enter();
        self.hide();
        self.hidden(true);
      });

  this.scroller_
      .style({
        'max-height': 200,
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      });

  this.container_.appendChild(this.scroller_);
  new rocket.Elements([document.body]).appendChild(this.container_);

};


/**
*/
rocket.AutoSuggest.prototype.change = function() {

  if (this.query_ !== this.getInput().value()) {
    this.query_ = /** @type {string} */ (this.getInput().value());
    this.query(this.query_);
  }

  this.highlighted_ = new rocket.Elements([]);

  this.table_ = rocket.createElement('table');
  this.tbody_ = rocket.createElement('tbody');

  this.table_
    .setAttribute({
        'width': '100%',
        'cellpadding': '1',
        'cellspacing': '0',
        'border': '0'
      })
    .style({
        'table-layout': 'fixed'
      });

  for (var row = 0; this.results_[row]; ++row) {
    var tr = rocket.createElement('tr');
    for (var col = 0; this.results_[row][col]; ++col) {
      tr.appendChild(
          /** @type {rocket.Elements} */
          (rocket.createElement('td')
              .innerHTML(this.results_[row][col])
              .style({
                'white-space': 'nowrap',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis'
              })
          )
      );
    }
    this.tbody_.appendChild(tr);
  }

  this.table_.appendChild(this.tbody_);

  this.scroller_.innerHTML('').appendChild(this.table_);

};


/**
@param {Array.<Object.<number, string>>} results
*/
rocket.AutoSuggest.prototype.setResults = function(results) {

  this.results_ = results;

  if (!this.hidden()) {
    this.change();
  }

};


/**
@param {string} str
*/
rocket.AutoSuggest.prototype.query = function(str) {};


/**
@param {Array.<Object.<number, string>>} data
*/
rocket.AutoSuggest.prototype.data = function(data) {

  data.sort(function(a, b) {
    for (var i = 0; a[i]; ++i) {
      if (a[i] < b[i]) {
        return -1;
      } else if (a[i] > b[i]) {
        return 1;
      }
    }
    return 0;
  });

  this.query = /** @param {string} query */ (function(query) {

    var results = [];

    query = query.toLowerCase();

    for (var i = 0; data[i]; ++i) {
      for (var j = 0; data[i][j]; ++j) {
        if (
            data[i][j]
              .toLowerCase()
              .replace(/<[^>]+>/g, '')
              .indexOf(query) !== -1
        ) {
          results.push(data[i]);
          break;
        }
      }
    }

    this.setResults(results);

  });

};


/**
@private
@param {rocket.Elements} element
@param {boolean} scroll
*/
rocket.AutoSuggest.prototype.highlight_ = function(element, scroll) {

  this.highlighted_.style({
    'backgroundColor': ''
  });

  this.highlighted_ = element;

  this.highlighted_.style({
    'backgroundColor': '#D5E2FF'
  });


  if (scroll) {

    var row_rect = this.highlighted_.getBoundingClientRect();
    var container_rect = this.scroller_.getBoundingClientRect();

    if (row_rect.bottom > container_rect.bottom) {

      this.scroller_.setAttribute({
        'scrollTop':
            this.scroller_.getAttribute('scrollTop') +
            row_rect.bottom -
            container_rect.bottom
      });

    } else if (row_rect.top < container_rect.top) {

      this.scroller_.setAttribute({
        'scrollTop':
            this.scroller_.getAttribute('scrollTop') -
            container_rect.top +
            row_rect.top
      });

    }

  }

};


/**
@param {Object.<number, string>} result
*/
rocket.AutoSuggest.prototype.setResult = function(result) {
  this.results_ = [result];
  this.enter();
};


/**
@return {Object.<number, string>}
*/
rocket.AutoSuggest.prototype.getResult = function() {
  return this.result_;
};


/**
Override.
*/
rocket.AutoSuggest.prototype.enter = function() {

  var result;

  if (this.highlighted_) {
    result = this.results_[this.highlighted_.getAttribute('rowIndex')];
  }

  if (!result && this.results_.length === 1) {
    result = this.results_[0];
  }

  if (result) {

    this.result_ = result;

    this.getInput()
      .value(result[0])
      .setSelectionRange(0, result[0].length)
      .focus();

  }

};


/**
Override.
*/
rocket.AutoSuggest.prototype.hide = function() {

  this.container_.removeEventListener();

  new rocket.Elements([document.body]).removeChild(this.container_);

  delete this.container_;

};


/**
Override.
*/
rocket.AutoSuggest.prototype.up = function() {

  var rows = this.tbody_.children();

  var row_index = this.highlighted_.getAttribute('rowIndex');

  if (!row_index) {

    this.highlight_(rows.i(rows.length - 1), true);

  } else {

    this.highlight_(rows.i(row_index - 1), true);

  }

};


/**
Override.
*/
rocket.AutoSuggest.prototype.down = function() {

  var rows = this.tbody_.children();

  var row_index = this.highlighted_.getAttribute('rowIndex');

  if (rows[row_index + 1]) {

    this.highlight_(rows.i(/** @type {number} */ (row_index + 1)), true);

  } else {

    this.highlight_(rows.i(0), true);

  }

};
