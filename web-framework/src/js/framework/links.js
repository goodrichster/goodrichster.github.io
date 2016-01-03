/*
activate link controller
*/   
     
define(['jquery'],function($){
	return function(el){
    
       
       $("a",el).each(function(){
       
          // skip twitter intent links
          if (this.href && this.href.indexOf('twitter.com/intent') > -1) return;
          
          GlobalCore.std_link(this);
       });
       	
       
	}     
});

