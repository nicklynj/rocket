


/**
TimeInput

@constructor
@extends {rocket.Input}
*/
rocket.TimeInput = function() {};
rocket.inherits(rocket.TimeInput, rocket.Input);


/**
@type {rocket.Elements}
*/
rocket.TimeInput.prototype.container_;


/**
*/
rocket.TimeInput.prototype.showInternal = function() {

  var rect = this.getInputElement().getBoundingClientRect();

  /** @type {HTMLTableCellElement} */
  var highlighted;

  var previous_background_color;
  var previous_color;

  /** @type {Object.<number, HTMLTableCellElement>} */
  var selected = {};

  var self = this;

  this.container_ = rocket.createElement('div')
    .style({
        'border-radius': 3,
        'position': 'absolute',
        'border': '1px solid #888888',
        'cursor': 'pointer',
        'width': 400,
        'left': rect.left,
        'top': rect.bottom - 1
      })
    .preventSelect()
    .addEventListener(['mousedown', 'touchstart'], function(e) {
        e.stopPropagation();
      })
    .live('td', 'mouseover', /** @this {HTMLTableCellElement} */ (function() {

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
    .live('td', 'click', /** @this {HTMLTableCellElement} */ (function() {

        var row = /** @type {HTMLTableRowElement} */ (this.parentNode).rowIndex;

        if (selected[row]) {
          selected[row].style.backgroundColor = '';
          selected[row].style.color = '';
        }

        highlighted = null;

        selected[row] = this;

        this.style.backgroundColor = '#10246A';
        this.style.color = '#FFFFFF';

        var hour = selected[0];
        var minute = selected[1];
        var meridian = selected[2];

        if (hour && minute && meridian) {

          self.getInputElement()
              .value(
                  rocket.padLeft(
                      hour.innerHTML,
                      2,
                      '0'
                  ) + ':' +
                  minute.innerHTML + ' ' +
                  meridian.innerHTML
              )
              .focus()
              .setSelectionRange(0, 8);

          self.hide();

        }

      }));

  this.draw_times_();

  new rocket.Elements([document.body]).appendChild(this.container_);

  this.container_.fit();

};


/**
@private
*/
rocket.TimeInput.prototype.draw_times_ = function() {

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
  for (var i = 0; i < 12; ++i) {
    td = rocket.createElement('td');
    td.setAttribute({
      'align': 'center'
    });
    td.innerHTML('' + (i || 12));
    tr.appendChild(td);
  }
  tbody.appendChild(tr);

  tr = rocket.createElement('tr');
  for (var i = 0; i < 4; ++i) {
    td = rocket.createElement('td');
    td.setAttribute({
      'align': 'center',
      'colspan': 3
    });
    td.innerHTML('' + (i * 15 || '00'));
    tr.appendChild(td);
  }
  tbody.appendChild(tr);

  tr = rocket.createElement('tr');

  td = rocket.createElement('td');
  td.setAttribute({
    'align': 'center',
    'colspan': 6
  });
  td.innerHTML('am');
  tr.appendChild(td);

  td = rocket.createElement('td');
  td.setAttribute({
    'align': 'center',
    'colspan': 6
  });
  td.innerHTML('pm');
  tr.appendChild(td);

  tbody.appendChild(tr);

  table.appendChild(tbody);

  this.container_.appendChild(table);

};


/**
Override.
*/
rocket.TimeInput.prototype.enterInternal = function() {

  var time =
      rocket.strToTime(/** @type {string} */ (this.getInputElement().value()));

  if (time) {

    this.getInputElement().value(time);

  }

};


/**
*/
rocket.TimeInput.prototype.hideInternal = function() {

  var time =
      rocket.strToTime(/** @type {string} */ (this.getInputElement().value()));

  if (time) {
    this.getInputElement().value(time);
  }

  this.container_.removeEventListener();

  new rocket.Elements([document.body]).removeChild(this.container_);

  delete this.container_;

};
