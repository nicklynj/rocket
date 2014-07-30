window.$ = rocket.extend(rocket.$, rocket);
rocket.ready(function(){
  // $('div').addEventListener('mouseenter',function(){
    // $(this).style({'border':'1px solid red'});
  // });
  // $('div').addEventListener('mouseleave',function(){
    // $(this).style({'border':''});
  // });

  // var as = new rocket.AutoSuggest();
  // var data = [];
  // for(var i = 0; i < 5; ++i){
    // data.push({0: 'foobar' + Math.random(), 1: 'barfoo'});
  // }
  // as.data(data);
  // as.render();

  // window.as = as;

  // as.addEventListener('render', function(){
    // this.getTable().tbody.firstElementChild().firstElementChild().setAttribute({
      // 'width': 200
    // });
  // });

  // try {

    // var at = new rocket.AutoSelect();
    // var data = [];
    // for(var i = 0; i < 100; ++i){
      // data.push({0: 'foobar' + Math.random(), 1: 'barfoo'});
    // }
    // at.data(data);
    // at.render();

    // window.at = at;

  // } catch (e) {}

  // at.addEventListener('render', function(){
    // this.getTable().tbody.firstElementChild().firstElementChild().setAttribute({
      // 'width': 200
    // });
  // });



  $('input').style({'margin':50,'width':300,'border':'1px solid gray'});


  // new rocket.AutoTab([$('input').i(0), $('input').i(1), $('input').i(2)]);

  (window.asg = new rocket.AutoSuggest()).render();
  $('body').appendChild($.createElement('input'));
  (window.asl = new rocket.AutoSelect()).render();
  (window.msl = new rocket.ManualSelect()).render();
  (window.ti = new rocket.TimeInput()).render();
  (window.di = new rocket.DateInput()).render();
  (window.i = new rocket.DateInput()).render();

  var container = $.createElement('div').style({'position':'relative'});

  $('body').appendChild(container);
  
  
  
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });

  $('body').appendChild(d);

  (window.d = new rocket.Draggable()).decorate(d);
  window.d.setAppendChild(true);
  window.d.setFill(true);
  container.appendChild(d);
  
    
  
  
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });

  $('body').appendChild(d);

  (window.d = new rocket.Draggable()).decorate(d);
  window.d.setAppendChild(true);
  // window.d.setFill(true);
  container.appendChild(d);
  // window.d.setX(100);
  // window.d.setY(100);
  d.style({'left': 100, 'top': 100, 'position': 'absolute'});
  
  
  
  
  
  
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });

  $('body').appendChild(d);

  (window.d = new rocket.Draggable()).decorate(d);
  window.d.setAppendChild(true);
  // window.d.setFill(true);
  container.appendChild(d);
  window.d.setX(200);
  window.d.setY(200);
  
  
 
 
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });

  $('body').appendChild(d);

  (window.d = new rocket.Draggable()).decorate(d);
  window.d.setAppendChild(true);
  // window.d.setFill(true);
  container.appendChild(d);
  window.d.setX(300);
  window.d.setY(300);
  
 
 
 
 
  
  var foo = [];
  for(var i = 0; i < 100; ++i){
    foo.push([''+$.random(1000000,1001000),''+i]);
  }

  asl.data(foo);
  asg.data(foo);
  msl.data(foo);

  // $('body,html').style({'height': '100%'});

  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));
  $('body').appendChild($.createElement('div').innerHTML(Math.random()));

  var bar = $('body').appendChild($.createElement('div').innerHTML('bar'));
  $('body').appendChild($.createElement('input').addEventListener('afterkeydown', function() {
    bar.innerHTML(this.value || 'bar');
  }));

  var to;

  var len = 10000;

  var timeout;
  var infini = new rocket.InfiniScroll();
  infini.setLength(len);
  infini.setHeight(600);
  infini.setQuery(function(index, length){
    var rows = [];
    for (var i = 0; i < length; ++i) {
      rows.push([i + index, i, index, length, $.random()]);
    }
    // clearTimeout(timeout)
    // timeout = setTimeout(function(){console.log('query index:"'+index+'" length:"'+length+'" RESULTS');
      infini.setResults(rows);
    // },3000);
  });
  // infini.padResults(true);
  infini.render();

  // var container = $.createElement('div').style({'height': 300, 'overflow-y': 'scroll'});
  // var table = rocket.table(5, len);
  // for(var i = 0; i < len; ++i) {
    // table.trs[i].tds[0].innerHTML(i);
    // table.trs[i].tds[1].innerHTML(i);
    // table.trs[i].tds[2].innerHTML(i + i);
    // table.trs[i].tds[3].innerHTML(len);
    // table.trs[i].tds[4].innerHTML($.random());
  // }
  // $('body').appendChild(container).appendChild(table);

});




/**
ManualSelect

@constructor
@extends {rocket.ManualSuggest}
*/
rocket.ManualSelect = function() {
      
  var self = this;
  var fake_value = function(){
    if (self.getResult()) {
      self.getInputElement().value('');
      self.change();
      self.getInputElement().value(self.getResult()[0]);
    }
  };
  var fake_select = function(){
    if (self.getResult()) {
      self.getInputElement().setSelectionRange(0, self.getResult()[0].length);
    }
  };
  
  this.addEventListener('show', function() {
    setTimeout(fake_value, 0);
    setTimeout(fake_select, 0);
  });

  this.addEventListener('enter', function() {
    setTimeout(fake_select, 0);
  });

  this.addEventListener('hide', function() {
    if (this.getResult()) {
      this.getInputElement().value(this.getResult()[0]);
    }
  });

};
rocket.inherits(rocket.ManualSelect, rocket.AutoSuggest);

