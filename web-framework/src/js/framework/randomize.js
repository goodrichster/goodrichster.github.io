/*
// setup randomize container
*/

define(['jquery'],function($){

    // shuffle plugin http://mktgdept.com/jquery-shuffle
    function shuffle(items) {
       var c=[];
       return items.each(function(){
          c.push($(this).clone(true))
       }).each(function(a,b){
          $(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);
          c.splice(a,1)
       })
    }
     
    return function(el){
        var $el = $(el);
        var num = 4;
   
        if ($(el).data('random-installed') == true) return;
        $(el).data('random-installed',true);

        if (/random-(\d+)/.test($el.attr('class'))) {
           num = parseInt(RegExp.$1);
        }

        var $items = $el.find('.random-item');
        shuffle($items);
        for(var i =0; i < num ;i++) {
           $el.find('.random-item').eq(i).show();
        }
        $el.find('.random-item:hidden').remove()

        //$items.show();
  
   }
       
});     