

/**
Creates rocket.Elements containing an HTMLTableElement along with references
to its rows and cells.

@param {number=} opt_columns The number of columns.
@param {number=} opt_rows The number of rows.
@return {rocket.table.Table_}
  A rocket.Elements containing an HTMLTableElement.
*/
rocket.table = function(opt_columns, opt_rows) {

  var columns;
  var rows;

  if (arguments.length === 2) {
    columns = opt_columns;
    rows = opt_rows;
  } else {
    rows = 1;
    if (arguments.length === 1) {
      columns = opt_columns;
    } else {
      columns = 1;
    }
  }

  var table = /** @type {rocket.table.Table_} */
      (rocket.createElement('table'));
  var tbody = rocket.createElement('tbody');

  table.setAttribute({
    'width': '100%',
    'cellpadding': '0',
    'cellspacing': '0',
    'border': '0'
  });

  table.style({'table-layout': 'fixed'});

  table.trs = [];
  table.tds = [];

  for (var i = 0; i < rows; ++i) {
    var tr = rocket.createElement('tr');
    table.trs.push(tr);
    tr.tds = [];
    for (var j = 0; j < columns; ++j) {
      var td = rocket.createElement('td');
      tr.appendChild(td);
      tr.tds.push(td);
    }
    if (i === 0) {
      table.tds = tr.tds;
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  table.tbody = tbody;

  return table;

};



/**
Syntactic sugar.

Used explicitly and solely for properly documenting and annotating the return
value of rocket.table.

@private
@constructor
@extends {rocket.Elements}
*/
rocket.table.Table_ = function() {};


/**
@type {Array.<rocket.table.Table_.Tr_>}
*/
rocket.table.Table_.prototype.trs;


/**
@type {Array.<rocket.Elements>}
*/
rocket.table.Table_.prototype.tds;


/**
@type {rocket.Elements}
*/
rocket.table.Table_.prototype.tbody;



/**
@private
@constructor
@extends {rocket.Elements}
*/
rocket.table.Table_.Tr_ = function() {};


/**
@type {Array.<rocket.Elements>}
*/
rocket.table.Table_.Tr_.prototype.tds;
