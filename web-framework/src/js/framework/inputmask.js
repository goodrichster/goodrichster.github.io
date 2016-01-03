/*
activate scrollup items
*/   
     
define(['jquery','framework/jquery.inputmask'],function($){

     return function(el){
        //$(el).css('border','1px solid blue');
        var $el = $(el);
        var mask = $(el).data('mask');
        if (mask == 'email') {
          $el.inputmask({alias:'email','placeholder':''});
        } else if (mask == 'integer') {
          $el.inputmask({ alias: 'integer', rightAlign:false});
        } else if (mask == 'date') {
          $el.inputmask('mm/dd/yyyy');
        }

        

     }     
});

