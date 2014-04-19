//
//
//
///**
//AutoSelect
//
//@constructor
//@extends {rocket.Input}
//*/
//rocket.AutoSelect = function() {
//
//  this.results_ = [];
//  var self = this;
//
//};
//rocket.inherits(rocket.AutoSelect, rocket.Input);
//
//
///**
//@private
//@type {rocket.Elements}
//*/
//rocket.AutoSelect.prototype.container_;
//
//
///**
//@private
//@type {rocket.table.Table_}
//*/
//rocket.AutoSelect.prototype.table_;
//
//
///**
//@private
//@type {rocket.Elements}
//*/
//rocket.AutoSelect.prototype.highlighted_row_;
//
//
///**
//@private
//@type {string}
//*/
//rocket.AutoSelect.prototype.query_;
//
//
///**
//@private
//@type {Array.<Object.<number, string>>}
//*/
//rocket.AutoSelect.prototype.results_;
//
//
///**
//@private
//@type {Object.<number, string>}
//*/
//rocket.AutoSelect.prototype.result_;
//
//
///**
//@param {Object.<number, string>} result
//*/
//rocket.AutoSelect.prototype.setResult = function(result) {
//
//  this.result_ = result;
//  this.getInput().value(result[0]);
//
//  this.dispatchEvent('select');
//
//};
//
//
///**
//@return {Object.<number, string>}
//*/
//rocket.AutoSelect.prototype.getResult = function() {
//
//  return this.result_;
//
//};
//
//
///**
//@return {rocket.Elements}
//*/
//rocket.AutoSelect.prototype.getContainer = function() {
//
//  return this.container_;
//
//};
//
//
///**
//@return {rocket.Elements}
//*/
//rocket.AutoSelect.prototype.getTable = function() {
//
//  return this.table_;
//
//};
//
//
///**
//@param {Array.<Object.<number, string>>} results
//*/
//rocket.AutoSelect.prototype.setResults = function(results) {
//
//  this.results_ = results;
//
//};
//
//
///**
//@param {Array.<Object.<number, string>>} data
//*/
//rocket.AutoSelect.prototype.data = function(data) {
//
//  this.query = /** @param {string} query */ (function(query) {
//
//    var results = [];
//    var len = query.length;
//
//    for (var i = 0; data[i]; ++i) {
//      if (data[i][0].substr(0, len) === query) {
//        results.push(data[i]);
//      }
//    }
//
//    this.setResults(results);
//
//  });
//
//};
//
//
///**
//@param {string} query
//*/
//rocket.AutoSelect.prototype.query = function(query) {};
//
//
///**
//@param {Event} e
//*/
//rocket.AutoSelect.prototype.show = function(e) {
//
//  if (!this.container_) {
//
//    this.render_search_();
//
//  }
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.highlight_next_row_ = function() {
//
//  var next;
//
//  if (this.highlighted_row_ &&
//      (
//          next = this.highlighted_row_.nextElementSibling()
//      ).length) {
//
//    this.highlight_row_(next, true);
//
//  } else {
//    this.highlight_row_(this.table_.tbody.firstElementChild(), true);
//  }
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.highlight_previous_row_ = function() {
//
//  var previous;
//
//  if (this.highlighted_row_ &&
//      (
//          previous = this.highlighted_row_.previousElementSibling()
//      ).length) {
//
//    this.highlight_row_(previous, true);
//
//  } else {
//    this.highlight_row_(this.table_.tbody.lastElementChild(), true);
//  }
//
//};
//
//
///**
//@param {Event} e
//*/
//rocket.AutoSelect.prototype.hide = function(e) {
//
//  this.dispose_();
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.render_search_ = function() {
//
//  this.dispose_();
//
//  this.container_ = rocket.createElement('div');
//  var rect = this.getInput().getBoundingClientRect();
//
//  this.scrollable = rocket.createElement('div').style({
//    'border': '1px solid #CCCCCC',
//    'margin-top': 10,
//    'max-height': 200,
//    'overflow': 'auto'
//  });
//
//  var self = this;
//
//  this.container_
//      .style({
//        'padding': 10,
//        'cursor': 'pointer',
//        'position': 'absolute',
//        'background-color': '#FFFFFF',
//        'border': '1px solid #888888',
//        'width': rect.width + 20,
//        'top': rect.top - 10,
//        'left': rect.left - 10
//      })
//      .addEventListener(
//          'mousedown',
//          /** @param {Event} e */
//          (function(e) {
//            e.stopPropagation();
//          })
//      )
//      .live('tr', 'mouseover', /** @this {HTMLTableRowElement} */ (
//          function() {
//            self.highlight_row_(
//                new rocket.Elements([this]),
//                false
//            );
//          }
//      ))
//      .live('tr', 'click', function() {
//        self.select_row_();
//      });
//
//  this.container_.appendChild(rocket.createElement('div').style({
//    'border': '1px solid #CCCCCC',
//    'width': rect.width,
//    'height': rect.height
//  }).innerHTML(this.getInput().value()));
//
//  this.search = rocket.createElement('input').setAttribute({
//    'placeholder': 'type to search'
//  });
//
//  delete this.query_;
//  this.search.addEventListener('afterkeydown,cut,paste',function(e){
//
//    if (self.query_ !== this.value) {
//      self.query(this.value);
//      self.render_results_();
//      self.query_ = this.value;
//    }
//
//    if (e.type === 'keydown') {
//
//      var next;
//
//      if (e.which === rocket.KEY.down) {
//
//        self.highlight_next_row_();
//
//      } else if (e.which === rocket.KEY.up) {
//
//        self.highlight_previous_row_();
//
//      } else if (e.which === rocket.KEY.pageDown) {
//
//        for (var i = 0; i < 5; ++i) {
//          self.highlight_next_row_();
//        }
//
//      } else if (e.which === rocket.KEY.pageUp) {
//
//        for (var i = 0; i < 5; ++i) {
//          self.highlight_previous_row_();
//        }
//
//      } else if (e.which === rocket.KEY.enter) {
//
//        if (self.highlighted_row_) {
//
//          self.select_row_();
//
//        } else {
//
//          var children = self.table_.tbody.children();
//          if (children.length === 1) {
//            self.highlighted_row_ = children;
//            self.select_row_();
//          }
//
//        }
//
//      }
//
//    }
//
//  }).dispatchEvent('afterkeydown');
//
//  this.search.style({
//    'margin-top': 10,
//    'border': '1px solid #CCCCCC',
//    'width': rect.width,
//    'height': rect.height
//  });
//
//  setTimeout(function(){
//    self.search.focus();
//  },14);
//  this.container_.appendChild(this.search);
//
//
//  this.container_.appendChild(this.scrollable);
//  new rocket.Elements([document.body]).appendChild(this.container_);
//
//  delete this.result_;
//
//  this.dispatchEvent('render');
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.render_results_ = function() {
//
//  this.table_ = rocket.table(0, 0);
//  this.table_.setAttribute({
//    'cellpadding': 1
//  });
//
//  for (var row = 0; this.results_[row]; ++row) {
//    var tr = rocket.createElement('tr');
//    for (var col = 0; this.results_[row][col]; ++col) {
//      tr.appendChild(
//          /** @type {rocket.Elements} */
//          (rocket.createElement('td')
//              .innerHTML(this.results_[row][col])
//              .style({
//                'white-space': 'nowrap',
//                'overflow': 'hidden',
//                'text-overflow': 'ellipsis'
//              })
//          )
//      );
//    }
//    this.table_.tbody.appendChild(tr);
//  }
//
//  this.scrollable.innerHTML('').appendChild(this.table_);
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.dispose_ = function() {
//
//  if (this.container_) {
//
//    new rocket.Elements([document.body]).removeChild(this.container_);
//    this.container_.removeEventListener();
//
//    delete this.container_;
//    delete this.highlighted_row_;
//
//  }
//
//};
//
//
///**
//@private
//@param {rocket.Elements} row
//@param {boolean} adjust_scroll_top
//*/
//rocket.AutoSelect.prototype.highlight_row_ =
//    function(row, adjust_scroll_top) {
//
//  if (this.highlighted_row_) {
//    this.highlighted_row_.style({
//      'background-color': ''
//    });
//  }
//
//  this.highlighted_row_ = /** @type {rocket.Elements} */ (row.style({
//    'background-color': '#D5E2FF'
//  }));
//
//  if (adjust_scroll_top) {
//
//    var row_rect = this.highlighted_row_.getBoundingClientRect();
//    var container_rect = this.scrollable.getBoundingClientRect();
//
//    if (row_rect.bottom > container_rect.bottom) {
//
//      this.scrollable.setAttribute({
//        'scrollTop':
//            this.scrollable.getAttribute('scrollTop') +
//            row_rect.bottom -
//            container_rect.bottom
//      });
//
//    } else if (row_rect.top < container_rect.top) {
//
//      this.scrollable.setAttribute({
//        'scrollTop':
//            this.scrollable.getAttribute('scrollTop') -
//            container_rect.top +
//            row_rect.top
//      });
//
//    }
//
//  }
//
//};
//
//
///**
//@private
//*/
//rocket.AutoSelect.prototype.select_row_ = function() {
//
//  if (this.highlighted_row_) {
//
//    var result =
//        this.results_[this.highlighted_row_.getAttribute('rowIndex')];
//
//    var val = result[0];
//    this.getInput()
//        .value(
//            this.query_ = val
//        )
//        .focus()
//        .setSelectionRange(
//            0,
//            val.length
//        );
//    this.dispose_();
//
//    var self = this;
//    setTimeout(
//        function() {
//          self.dispose_();
//        },
//        14
//    );
//
//    this.result_ = result;
//
//    this.dispatchEvent('select');
//
//  }
//
//};
//
