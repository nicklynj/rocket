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

  (window.ti = new rocket.TimeInput()).render();
  (window.di = new rocket.DateInput()).render();
  (window.i = new rocket.Input()).render();
  
  $('body,html').style({'height': '100%'});
  
});
