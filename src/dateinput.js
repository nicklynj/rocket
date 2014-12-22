


/**
DateInput is intended to be used quickly enter a Date.

This is not an ideal class for entering past dates.

This class only helps to populate a value into an HTMLInputElement.  It does
not provide any methods to get the populated value.

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
@type {number}
*/
rocket.DateInput.prototype.calendar_year_;


/**
@private
@type {number}
*/
rocket.DateInput.prototype.calendar_month_;


/**
@private
@type {Date}
*/
rocket.DateInput.prototype.entered_date_;


/**
Overridden method from the Input helper class.
*/
rocket.DateInput.prototype.showInternal = function() {

  var rect = this.getInputElement().getBoundingClientRect();

  /** @type {HTMLTableCellElement} */
  var highlighted;

  var previous_background_color;
  var previous_color;

  var self = this;

  this.container_ = rocket.createElement('div')
    .style({
        'border-radius': 3,
        'position': 'absolute',
        'border': '1px solid #888888',
        'cursor': 'pointer',
        'width': 300,
        'left': rect.left,
        'top': rect.bottom - 1
      })
    .preventSelect()
    .addEventListener(['mousedown', 'touchstart'], function(e) {
        e.stopPropagation();
      })
    .live('td', 'mouseover',
      /** @this {HTMLTableCellElement} */
      (function() {

        if (highlighted) {
          highlighted.style.backgroundColor = previous_background_color;
          highlighted.style.color = previous_color;
        }

        previous_background_color = this.style.backgroundColor;
        previous_color = this.style.color;

        this.style.backgroundColor = '#D5E2FF';
        this.style.color = '';

        highlighted = this;

      }))
    .live('td', 'click',
      /** @this {HTMLTableCellElement} */
      (function() {

        if (this.innerHTML === '&lt;&lt;') {

          --self.calendar_year_;
          self.draw_calendar_();

        } else if (this.innerHTML === '&lt;') {

          if (self.calendar_month_) {
            --self.calendar_month_;
          } else {
            self.calendar_month_ = 11;
            --self.calendar_year_;
          }
          self.draw_calendar_();

        } else if (this.innerHTML === '&gt;&gt;') {

          ++self.calendar_year_;
          self.draw_calendar_();

        } else if (this.innerHTML === '&gt;') {

          if (self.calendar_month_ < 11) {
            ++self.calendar_month_;
          } else {
            self.calendar_month_ = 0;
            ++self.calendar_year_;
          }
          self.draw_calendar_();

        } else {

          var date = +this.innerHTML;

          if (date) {

            var year = self.calendar_year_;
            var month = self.calendar_month_;

            if (
                (/** @type {HTMLTableRowElement} */
                (this.parentNode).rowIndex === 1) &&
                (date > 6)
            ) {

              if (month === 0) {
                --year;
                month = 12;
              }

            } else if (
                (/** @type {HTMLTableRowElement} */
                (this.parentNode).rowIndex > 4) &&
                (date < 22)
            ) {

              if (month === 11) {
                ++year;
              }
              month = ((month + 2) % 12) || 12;

            } else {

              ++month;

            }

            self.getInputElement()
                .value(
                    rocket.padLeft(month, 2, '0') + '/' +
                    rocket.padLeft(this.innerHTML, 2, '0') + '/' +
                    year
                    )
                .setSelectionRange(0, 10)
                .focus();

            self.hide();

          }

        }

      }));

  this.changeInternal();

  new rocket.Elements([document.body]).appendChild(this.container_);

  this.container_.fit();

};


/**
Overridden method from the Input helper class.
*/
rocket.DateInput.prototype.enterInternal = function() {

  var date =
      rocket.strToDate(
          /** @type {string} */ (this.getInputElement().value())
      );

  if (date) {
    this.getInputElement()
      .value(
        rocket.padLeft(date.getMonth() + 1, 2, '0') + '/' +
        rocket.padLeft(date.getDate(), 2, '0') + '/' +
        date.getFullYear()
        )
      .setSelectionRange(0, 10);
  }

};


/**
Overridden method from the Input helper class.
*/
rocket.DateInput.prototype.hideInternal = function() {

  var date =
      rocket.strToDate(/** @type {string} */ (this.getInputElement().value()));

  if (date) {
    this.getInputElement().value(
        rocket.padLeft(date.getMonth() + 1, 2, '0') + '/' +
        rocket.padLeft(date.getDate(), 2, '0') + '/' +
        date.getFullYear()
    );
  }

  this.container_.removeEventListener();

  new rocket.Elements([document.body]).removeChild(this.container_);

  delete this.container_;

};


/**
Overridden method from the Input helper class.
*/
rocket.DateInput.prototype.changeInternal = function() {

  this.entered_date_ =
      rocket.strToDate(
          /** @type {string} */ (this.getInputElement().value())
      );

  var date = this.entered_date_ || (new Date());

  this.calendar_year_ = date.getFullYear();
  this.calendar_month_ = date.getMonth();

  this.draw_calendar_();

};


/**
@private
*/
rocket.DateInput.prototype.draw_calendar_ = function() {

  var table = rocket.createElement('table');
  var tbody = rocket.createElement('tbody');

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

  var tr = rocket.createElement('tr');

  this.draw_calendar_header_(tr);

  tbody.appendChild(tr);

  this.draw_calendar_contents_(tbody);

  table.appendChild(tbody);

  this.container_.innerHTML('').appendChild(table);

};


/**
@private
@param {rocket.Elements} tr
*/
rocket.DateInput.prototype.draw_calendar_header_ = function(tr) {

  var td;

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
          months[this.calendar_month_] + ' ' +
          this.calendar_year_
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

};


/**
@private
@param {rocket.Elements} tbody
*/
rocket.DateInput.prototype.draw_calendar_contents_ = function(tbody) {

  var days_in_month =
      32 -
      new Date(
          this.calendar_year_,
          this.calendar_month_,
          32
      ).getDate();

  var days_in_prev_month =
      32 -
      new Date(
          this.calendar_year_,
          this.calendar_month_ - 1,
          32
      ).getDate();

  var start_day_of_month =
      new Date(
          this.calendar_year_,
          this.calendar_month_
      ).getDay();

  var today = new Date();
  var today_year = today.getFullYear();
  var today_month = today.getMonth();
  var today_date = today.getDate();

  var prev_month_date = days_in_prev_month - (start_day_of_month || 7);

  var month_date = 0;

  var next_month_date = 0;

  for (var row = 0; row < 6; ++row) {

    var tr = rocket.createElement('tr');

    for (var col = 0; col < 7; ++col) {

      var td = rocket.createElement('td');

      td.setAttribute({
        'align': 'center'
      });

      if (prev_month_date < days_in_prev_month) {

        ++prev_month_date;

        td.style({
          'color': '#888888'
        });

        td.innerHTML('' + prev_month_date);

      } else if (month_date < days_in_month) {

        ++month_date;

        if (
            (today_year === this.calendar_year_) &&
            (today_month === this.calendar_month_) &&
            (today_date === month_date)
        ) {
          tr.style({
            'background-color': '#EEEEEE'
          });
          td.style({
            'background-color': '#DDDDDD'
          });
        }

        if (
            (this.entered_date_) &&
            (this.entered_date_.getFullYear() === this.calendar_year_) &&
            (this.entered_date_.getMonth() === this.calendar_month_) &&
            (this.entered_date_.getDate() === month_date)
        ) {
          td.style({
            'background-color': '#10246A',
            'color': '#FFFFFF'
          });
        }

        td.innerHTML('' + month_date);

      } else {

        ++next_month_date;

        td.style({'color': '#888888'});

        td.innerHTML('' + next_month_date);

      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);

  }

};
