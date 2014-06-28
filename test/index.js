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
  (window.asl = new rocket.AutoSelect()).render();
  (window.ti = new rocket.TimeInput()).render();
  (window.di = new rocket.DateInput()).render();
  (window.i = new rocket.DateInput()).render();
  
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });
  
  $('body').appendChild(d);
  
  (window.d = new rocket.Draggable()).decorate(d);
  window.d.appendChild(true);
    
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });
  
  $('body').appendChild(d);
  
  (window.d = new rocket.Draggable()).decorate(d);
  window.d.appendChild(true);
    
  var d = $.createElement('div').innerHTML('draggable').style({
    'padding': 50,
    'width': 600,
    'background-color': '#DDDDDD',
    'border': '1px solid red'
  });
  
  $('body').appendChild(d);
  
  (window.d = new rocket.Draggable()).decorate(d);
  window.d.appendChild(true);
  
  var foo = [];
  for(var i = 0; i < 1000; ++i){
    foo.push([''+$.random(1000000,1001000)]);
  }
  
  asl.data(foo);
  asg.data(foo);
  
  $('body,html').style({'height': '100%'});
  
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
  
});
