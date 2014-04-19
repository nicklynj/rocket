


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
rocket.TimeInput.prototype.show = function() {

  this.dispose_();

  var rect = this.getInput().getBoundingClientRect();

  /**
  @type {rocket.Elements}
  */
  var highlighted;
  var highlighted_background;
  var highlighted_color;
  /**
  @type {Object.<number, rocket.Elements>}
  */
  var selected = {};

  var self = this;

  this.container_ = rocket.createElement('div')
    .style({
        'position': 'absolute',
        'border': '1px solid #888888',
        'cursor': 'pointer',
        'width': 400,
        'left': rect.left,
        'top': rect.bottom - 1
      })
    .preventSelect()
    .addEventListener(
      'mousedown',
      /** @type {function(Event)} */
      (function(e) {
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
          'color': '#000000'
        });

      }))
    .live('td', 'click', /** @this {HTMLTableCellElement} */ (function() {

        var row = /** @type {HTMLTableRowElement} */ (this.parentNode).rowIndex;

        if (selected[row]) {
          selected[row].style({
            'background-color': '',
            'color': ''
          });
        }

        highlighted = null;

        selected[row] = /** @type {rocket.Elements} */
            (new rocket.Elements([this]).style({
              'background-color': '#10246A',
              'color': '#FFFFFF'
            }));

        var hour = selected[0];
        var minute = selected[1];
        var meridian = selected[2];

        if (hour && minute && meridian) {

          self.getInput()
              .value(
                  rocket.padLeft(
                      /** @type {string} */ (hour.innerHTML()),
                      2,
                      '0'
                  ) + ':' +
                  minute.innerHTML() + ' ' +
                  meridian.innerHTML()
              )
              .focus()
              .setSelectionRange(0, 8);

          self.dispose_();

        }

      }));

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

  new rocket.Elements([document.body]).appendChild(this.container_);

  this.container_.fit();

};


/**
*/
rocket.TimeInput.prototype.hide = function() {

  var time =
      rocket.strToTime(/** @type {string} */ (this.getInput().value()));
  if (time) {
    this.getInput().value(time);
  }

  this.dispose_();

};


/**
@private
*/
rocket.TimeInput.prototype.dispose_ = function() {

  if (this.container_) {

    new rocket.Elements([document.body]).removeChild(this.container_);
    this.container_.removeEventListener();

    delete this.container_;

  }

};
