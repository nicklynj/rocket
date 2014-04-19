


/**
AutoSuggest

@constructor
@extends {rocket.Input}
*/
rocket.AutoSuggest = function() {

  this.results_ = [];

};
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
@type {rocket.table.Table_}
*/
rocket.AutoSuggest.prototype.table_;


/**
@private
@type {rocket.Elements}
*/
rocket.AutoSuggest.prototype.highlighted_row_;


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
@param {Object.<number, string>=} opt_result
*/
rocket.AutoSuggest.prototype.setResult = function(opt_result) {

  if (arguments.length) {

    this.result_ = /** @type {Object.<number, string>} */ (opt_result);
    this.getInput().value(opt_result[0]);

  } else {

    delete this.result_;
    this.getInput().value('');

  }

  this.dispatchEvent('select');

};


/**
@return {Object.<number, string>}
*/
rocket.AutoSuggest.prototype.getResult = function() {

  return this.result_;

};


/**
@return {rocket.Elements}
*/
rocket.AutoSuggest.prototype.getContainer = function() {

  return this.container_;

};


/**
@return {rocket.Elements}
*/
rocket.AutoSuggest.prototype.getTable = function() {

  return this.table_;

};


/**
@param {Array.<Object.<number, string>>} results
*/
rocket.AutoSuggest.prototype.setResults = function(results) {

  this.results_ = results;

  if (this.container_) {
    this.render_results_();
  }

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
@param {string} query
*/
rocket.AutoSuggest.prototype.query = function(query) {};


/**
@param {Event} e
*/
rocket.AutoSuggest.prototype.show = function(e) {

  var query = /** @type {string} */ (this.getInput().value());

  if (!this.container_ || (this.query_ !== query)) {

    if (this.query_ !== query) {
      this.query(this.query_ = query);
    }

    this.render_results_();

  }

  if (e.type === 'keydown') {

    var next;

    if (e.which === rocket.KEY.down) {

      this.highlight_next_row_();

    } else if (e.which === rocket.KEY.up) {

      this.highlight_previous_row_();

    } else if (e.which === rocket.KEY.pageDown) {

      for (var i = 0; i < 5; ++i) {
        this.highlight_next_row_();
      }

    } else if (e.which === rocket.KEY.pageUp) {

      for (var i = 0; i < 5; ++i) {
        this.highlight_previous_row_();
      }

    }

  }

};


/**
@private
*/
rocket.AutoSuggest.prototype.highlight_next_row_ = function() {

  var next;

  if (this.highlighted_row_ &&
      (
          next = this.highlighted_row_.nextElementSibling()
      ).length) {

    this.highlight_row_(next, true);

  } else {
    this.highlight_row_(this.table_.tbody.firstElementChild(), true);
  }

};


/**
@private
*/
rocket.AutoSuggest.prototype.highlight_previous_row_ = function() {

  var previous;

  if (this.highlighted_row_ &&
      (
          previous = this.highlighted_row_.previousElementSibling()
      ).length) {

    this.highlight_row_(previous, true);

  } else {
    this.highlight_row_(this.table_.tbody.lastElementChild(), true);
  }

};


/**
@param {Event} e
*/
rocket.AutoSuggest.prototype.hide = function(e) {

  if (e.type === 'keydown' && e.which === rocket.KEY.enter) {

    if (this.highlighted_row_) {

      this.select_row_();

    } else {

      var children = this.table_.tbody.children();
      if (children.length === 1) {
        this.highlighted_row_ = children;
        this.select_row_();
      }

    }

  }

  this.dispose_();

};


/**
@private
*/
rocket.AutoSuggest.prototype.render_results_ = function() {

  this.dispose_();

  this.container_ = rocket.createElement('div');
  this.scroller_ = rocket.createElement('div');
  this.table_ = rocket.table(0, 0);
  var rect = this.getInput().getBoundingClientRect();

  var self = this;

  this.table_.setAttribute({
    'cellpadding': 1
  });

  this.container_
      .style({
        'position': 'absolute',
        'background-color': '#FFFFFF',
        'border': '1px solid #888888',
        'width': rect.width - 2,
        'top': rect.bottom - 1,
        'left': rect.left
      })
      .addEventListener(
          'mousedown',
          /** @param {Event} e */
          (function(e) {
            e.stopPropagation();
          })
      );

  this.scroller_
      .style({
        'cursor': 'pointer',
        'max-height': 200,
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      })
      .live('tr', 'mouseover', /** @this {HTMLTableRowElement} */ (
          function() {
            self.highlight_row_(
                new rocket.Elements([this]),
                false
            );
          }
      ))
      .live('tr', 'click', function() {
        self.select_row_();
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
    this.table_.tbody.appendChild(tr);
  }

  this.scroller_.appendChild(this.table_);
  this.container_.appendChild(this.scroller_);
  new rocket.Elements([document.body]).appendChild(this.container_);

  delete this.result_;

  this.dispatchEvent('render');

};


/**
@private
*/
rocket.AutoSuggest.prototype.dispose_ = function() {

  if (this.container_) {

    new rocket.Elements([document.body]).removeChild(this.container_);
    this.container_.removeEventListener();
    this.scroller_.removeEventListener();

    delete this.container_;
    delete this.scroller_;
    delete this.highlighted_row_;

  }

};


/**
@private
@param {rocket.Elements} row
@param {boolean} adjust_scroll_top
*/
rocket.AutoSuggest.prototype.highlight_row_ = function(row, adjust_scroll_top) {

  if (this.highlighted_row_) {
    this.highlighted_row_.style({
      'background-color': ''
    });
  }

  this.highlighted_row_ = /** @type {rocket.Elements} */ (row.style({
    'background-color': '#D5E2FF'
  }));

  if (adjust_scroll_top) {

    var row_rect = this.highlighted_row_.getBoundingClientRect();
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
@private
*/
rocket.AutoSuggest.prototype.select_row_ = function() {

  if (this.highlighted_row_) {

    var result = this.results_[this.highlighted_row_.getAttribute('rowIndex')];

    var val = result[0];
    this.getInput()
        .value(
            this.query_ = val
        )
        .focus()
        .setSelectionRange(
            0,
            val.length
        );
    this.dispose_();

    this.result_ = result;

    this.dispatchEvent('select');

  }

};
