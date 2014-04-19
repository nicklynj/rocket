


/**
Helper class for getting a user entered date.

@constructor
@extends {rocket.Input}
*/
rocket.DateInput = function() {};
rocket.inherits(rocket.DateInput, rocket.Input);


/**
@private
@type {rocket.Elements}
*/
rocket.DateInput.prototype.container_;


/**
@private
@type {Date}
*/
rocket.DateInput.prototype.calendar_date_;


/**
@private
@type {Date}
*/
rocket.DateInput.prototype.input_date_;


/**
@private
@type {rocket.Elements}
*/
rocket.DateInput.prototype.prev_month_tds_;


/**
@private
@type {rocket.Elements}
*/
rocket.DateInput.prototype.next_month_tds_;


/**
*/
rocket.DateInput.prototype.show = function() {

  this.dispose_();

  var rect = this.getInput().getBoundingClientRect();

  /**
  @type {rocket.Elements}
  */
  var highlighted;
  var highlighted_background;
  var highlighted_color;

  var self = this;

  this.container_ = rocket.createElement('div')
    .style({
        'position': 'absolute',
        'border': '1px solid #888888',
        'cursor': 'pointer',
        'width': 300,
        'left': rect.left,
        'top': rect.bottom - 1
      })
    .preventSelect()
    .addEventListener(
      'mousedown',
      /** @type {function(Event)} */ (function(e) {
        e.stopPropagation();
      }))
    .live('td', 'mouseover', /** @this {HTMLTableCellElement} */ (function() {

        if (highlighted) {
          highlighted.style({
            'background-color': highlighted_background,
            'color': highlighted_color
          });
        }

        highlighted = new rocket.Elements([this]);

        highlighted_background = highlighted.style('background-color');
        highlighted_color = highlighted.style('color');

        highlighted.style({
          'background-color': '#D5E2FF',
          'color': ''
        });

      }))
    .live('td', 'click', /** @this {HTMLTableCellElement} */ (function() {

        var year = self.calendar_date_.getFullYear();
        var month = self.calendar_date_.getMonth();
        var date = self.calendar_date_.getDate();

        if (this.innerHTML === '&lt;&lt;') {
          self.calendar_date_ =
              new Date(
                  year - 1,
                  month,
                  date
              );
          self.render_calendar_();
        } else if (this.innerHTML === '&lt;') {
          self.calendar_date_ =
              new Date(
                  year,
                  month - 1,
                  date
              );
          self.render_calendar_();
        } else if (this.innerHTML === '&gt;&gt;') {
          self.calendar_date_ =
              new Date(
                  year + 1,
                  month,
                  date
              );
          self.render_calendar_();
        } else if (this.innerHTML === '&gt;') {
          self.calendar_date_ =
              new Date(
                  year,
                  month + 1,
                  date
              );
          self.render_calendar_();
        } else if (this.innerHTML.match(/^\d+$/)) {

          if (self.prev_month_tds_.indexOf(this) !== -1) {
            --month;
          } else if (self.next_month_tds_.indexOf(this) !== -1) {
            ++month;
          }

          self.input_date_ =
              new Date(
                  year,
                  month,
                  this.innerHTML
              );

          self.hide();

          self.getInput()
            .focus()
            .setSelectionRange(0, 10);

        }

      }));

  this.input_date_ =
      rocket.strToDate(/** @type {string} */ (this.getInput().value()));

  this.calendar_date_ = this.input_date_ || new Date();

  this.render_calendar_();

  new rocket.Elements([document.body]).appendChild(this.container_);

  this.container_.fit();

};


/**
@private
*/
rocket.DateInput.prototype.render_calendar_ = function() {

  var table = rocket.createElement('table');
  var tbody = rocket.createElement('tbody');
  var tr;
  var td;

  table
    .setAttribute({
        'width': '100%',
        'cellpadding': '5',
        'cellspacing': '1',
        'border': '0'
      })
    .style({
        'table-layout': 'fixed',
        'background-color': '#CCCCCC'
      });

  tbody.style({
    'background-color': '#FFFFFF'
  });

  tr = rocket.createElement('tr');

  td = rocket.createElement('td');
  td
    .innerHTML('&lt;&lt;')
    .setAttribute({
        'align': 'center'
      });
  tr.appendChild(td);

  td = rocket.createElement('td');
  td
    .innerHTML('&lt;')
    .setAttribute({
        'align': 'center'
      });
  tr.appendChild(td);

  var months = /** @type {Object.<number, string>} */ ([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]);

  td = rocket.createElement('td');
  td
      .innerHTML(
          months[this.calendar_date_.getMonth()] + ' ' +
          this.calendar_date_.getFullYear()
      )
      .setAttribute({
            'colspan': 3,
            'align': 'center'
      });

  tr.appendChild(td);

  td = rocket.createElement('td');
  td
    .innerHTML('&gt;')
    .setAttribute({
        'align': 'center'
      });
  tr.appendChild(td);

  td = rocket.createElement('td');
  td
    .innerHTML('&gt;&gt;')
    .setAttribute({
        'align': 'center'
      });
  tr.appendChild(td);

  tbody.appendChild(tr);

  var days_in_month =
      32 -
      new Date(
          this.calendar_date_.getFullYear(),
          this.calendar_date_.getMonth(),
          32
      ).getDate();
  var days_in_prev_month =
      32 -
      new Date(
          this.calendar_date_.getFullYear(),
          this.calendar_date_.getMonth() - 1,
          32
      ).getDate();
  var start_day_of_month =
      new Date(
          this.calendar_date_.getFullYear(),
          this.calendar_date_.getMonth()
      ).getDay();

  var prev_month_date = days_in_prev_month - (start_day_of_month || 7);
  var month_date = 0;
  var next_month_date = 0;

  var outter_style = {
    'color': '#888888'
  };

  var outter_attribute = {
    'align': 'center'
  };

  var inner_attribute = {
    'align': 'center'
  };

  var select = {
    'background-color': '#10246A',
    'color': '#FFFFFF'
  };

  var highlight_today = {
    'background-color': '#DDDDDD'
  };

  var highlight_week = {
    'background-color': '#EEEEEE'
  };

  var today = new Date();

  this.prev_month_tds_ = new rocket.Elements([]);
  this.next_month_tds_ = new rocket.Elements([]);

  for (var row = 0; row < 6; ++row) {

    tr = rocket.createElement('tr');

    for (var col = 0; col < 7; ++col) {
      td = rocket.createElement('td');

      if (prev_month_date < days_in_prev_month) {

        this.prev_month_tds_.push(td[0]);

        td
          .setAttribute(outter_attribute)
          .style(outter_style)
          .innerHTML('' + ++prev_month_date);

      } else if (month_date < days_in_month) {

        td
          .setAttribute(inner_attribute)
          .innerHTML('' + ++month_date);

        if (
            (today.getFullYear() === this.calendar_date_.getFullYear()) &&
            (today.getMonth() === this.calendar_date_.getMonth()) &&
            (today.getDate() === month_date)
        ) {
          td.style(highlight_today);
          tr.style(highlight_week);
        }

        if (
            this.input_date_ &&
            (this.input_date_.getFullYear() ===
                this.calendar_date_.getFullYear()) &&
            (this.input_date_.getMonth() === this.calendar_date_.getMonth()) &&
            (this.input_date_.getDate() === month_date)
        ) {
          td.style(select);
        }

      } else {

        this.next_month_tds_.push(td[0]);

        td
          .style(outter_style)
          .setAttribute(outter_attribute)
          .innerHTML('' + ++next_month_date);

      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  this.container_.innerHTML('').appendChild(table);

};


/**
*/
rocket.DateInput.prototype.hide = function() {

  if (this.input_date_) {

    this.getInput().value(
        rocket.padLeft('' + (this.input_date_.getMonth() + 1), 2, '0') + '/' +
        rocket.padLeft('' + this.input_date_.getDate(), 2, '0') + '/' +
        this.input_date_.getFullYear()
    );

  }

  this.dispose_();

};


/**
@private
*/
rocket.DateInput.prototype.dispose_ = function() {

  if (this.container_) {

    new rocket.Elements([document.body]).removeChild(this.container_);
    this.container_.removeEventListener();

    delete this.container_;

  }

};
