/*

activate cover images

*/

define(['jquery'],function($){

    function resize($container) {
          var $img = $(".cover-img img",$container);
          var height = $container.height();
          $(".cover-body,.cover-img",$container).css('height',height);
          
          // fill vertical
          $img.css('width',$container.width());
          $img.css('height','auto');
          
          if ($img.height() < $container.height()){
              // fill horizontally
              $img.css('width','auto');
              $img.css('height',$container.height());
          }
          
          var bottom = -height;
          var left = 0;
          
          if ($container.hasClass('cover-right')){
              left = $container.width() - $img.width();
          } else if ($container.hasClass('cover-left')){
              left = 0;
          } else {
              left = ($container.width() - $img.width()) / 2;
          }
          
          $(".cover-img",$container).css('margin-bottom',bottom).css('margin-left',left).css('visibility','visible');
    }

    return function(el){
    
        var $el = $(el);
        if ($el.data('cover-installed') == true) return;
        $el.data('cover-installed',true);
        
        $(window).load(function(){
           resize($el);
        })
        
        $(document).bind("framework.resize",function(){
           resize($el);
        })
    }
});

