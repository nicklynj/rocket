


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
@type {Array.<Object.<number, string>>}
*/
rocket.AutoSuggest.prototype.results_;


/**
@private
@type {Object.<number, string>}
*/
rocket.AutoSuggest.prototype.result_;


/**
@private
@type {function(string)}
*/
rocket.AutoSuggest.prototype.query_;


/**
Override.
*/
rocket.AutoSuggest.prototype.showInternal = function() {

  this.container_ = rocket.createElement('div');
  this.scroller_ = rocket.createElement('div');

  var rect = this.getInputElement().getBoundingClientRect();

  var self = this;

  if (!this.results_) {
    this.results_ = [];
  }

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
    .addEventListener(['mousedown', 'touchstart'], function(e) {
        e.stopPropagation();
      })
    .live('tr', 'mouseover', /** @this {HTMLTableRowElement} */ (
          function() {
            self.highlight_(new rocket.Elements([this]), false);
          }
      ))
    .live('tr', 'click', /** @this {HTMLTableRowElement} */ (
          function() {
            if (this.parentNode === self.tbody_[0]) {
              self.enter();
              self.hide();
            }
          }
      ));

  this.scroller_
      .style({
        'max-height': 200,
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      });

  this.draw_results_();

  this.container_.appendChild(this.scroller_);
  new rocket.Elements([document.body]).appendChild(this.container_);

};


/**
*/
rocket.AutoSuggest.prototype.changeInternal = function() {

  this.query_(/** @type {string} */ (this.getInputElement().value()));

  this.draw_results_();

};


/**
@private
*/
rocket.AutoSuggest.prototype.draw_results_ = function() {

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

  this.draw_results_();

};


/**
@param {function(string)} query
*/
rocket.AutoSuggest.prototype.setQuery = function(query) {

  this.query_ = query;

};


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

  var self = this;

  this.query_ = (/** @param {string} query */ (function(query) {

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

    self.setResults(results);

  }));

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

  this.result_ = result;

  this.getInputElement().value(result[0].replace(/<[^>]+>/g, ''));

  if (new rocket.Elements([document.body]).contains(this.getInputElement())) {
    this.getInputElement()
        .setSelectionRange(0, result[0].length)
        .focus();
  }

};


/**
@return {Object.<number, string>}
*/
rocket.AutoSuggest.prototype.getResult = function() {
  return this.result_;
};


/**
Override.
@param {Object.<number, string>=} opt_result
*/
rocket.AutoSuggest.prototype.enterInternal = function(opt_result) {

  var result;

  if (this.highlighted_.length) {
    result = this.results_[this.highlighted_.getAttribute('rowIndex')];
  } else if (this.results_.length === 1) {
    result = this.results_[0];
  }

  if (result) {

    this.setResult(result);

  }

};


/**
Override.
*/
rocket.AutoSuggest.prototype.hideInternal = function() {

  this.container_.removeEventListener();

  new rocket.Elements([document.body]).removeChild(this.container_);

  delete this.container_;

};


/**
Override.
*/
rocket.AutoSuggest.prototype.upInternal = function() {

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
rocket.AutoSuggest.prototype.downInternal = function() {

  var rows = this.tbody_.children();

  var row_index = this.highlighted_.getAttribute('rowIndex');

  if (rows[row_index + 1]) {

    this.highlight_(rows.i(/** @type {number} */ (row_index + 1)), true);

  } else {

    this.highlight_(rows.i(0), true);

  }

};
