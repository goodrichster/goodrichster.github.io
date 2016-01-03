/*
activate carousels, test hello
*/
   
define(['jquery','framework/cookie','framework/jquery.hammer'],function($,cookie,Hammer){

    function renderCarouselNav(el,color,inverted){
       var size = $(el).find(".carousel-panels > li").size();
       $(el).data('size',size)
       //$(el).find(".carousel-nav:hidden").remove();
       $(el).find(".carousel-nav").each(function(){
           var nav = $(this);
           var h = '<ul class="nav-carousel">';
           if (color == 'white' && inverted) {
               h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left-white"></span></a></li>';
           } else if (color == 'white') {
               h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left"></span></a></li>';
           } else {
               h += '<li class="prev"><a href="#"><span class="icon-circle-arrow-left-white-inverted black-bg icon-transition-bg-color"></span></a></li>'; 
           }
           
           for (var i = 0;i<size;i++) {
                h += '<li class="dot"><a href="#"><span class="icon-dot icon-transition-color">&#8226;</span></a></li>';
           }

           if (color == 'white' && inverted) {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right-white"></span></a></li>';
           } else if (color == 'white') {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right"></span></a></li>';
           } else {
                h += '<li class="next desktop-visible"><a href="#"><span class="icon-circle-arrow-right-white-inverted black-bg icon-transition-bg-color"></span></a></li>';
           }

           h += '</ul>';
           if (nav.hasClass('carousel-nav-centered')) {
                h = '<table style="margin-left: auto !important;margin-right: auto !important;"><tr><td>'+h+'</td></tr></table>'
           }
           nav.html(h);
           if (nav.hasClass('carousel-nav-minimal')) {
               nav.find('.prev,.next').hide();
           }
       })
    }
    
    function setPanel(el,num,animate,color,inverted) {
      var size = $(el).data('size')

      $(el).data('num',num);

      var id = $(el).attr('id');
      if (id && $(el).hasClass('has-memory')) { 
         cookie.set(id,num);
      } 

      $(el).find('.active').removeClass("active");  
      if (inverted) {  
          $(el).find('.dot span').removeClass(color+" active-"+color).addClass('white fade');
      } else {
          $(el).find('.dot span').removeClass(color+" active-"+color).addClass('black');    
      }
      // at beginning 
      if (color == 'white') {
          if (num == 0) {
             if (inverted) {
                $(el).find(".prev").addClass("disabled").find('span').addClass("fade");
             } else {
                $(el).find(".prev").addClass("disabled").find('span').addClass("fade").addClass("icon-circle-arrow-left").removeClass("icon-circle-arrow-left-white");
             }
          } else {
             $(el).find(".prev").removeClass("disabled").find('span').removeClass("fade");
          }
          // at end
          if (num == size - 1) {
             if (inverted) {
                $(el).find(".next").addClass("disabled").find('span').addClass("fade");
             } else {
                $(el).find(".next").addClass("disabled").find('span').addClass("fade").addClass("icon-circle-arrow-right").removeClass("icon-circle-arrow-right-white");;
             }
          } else {
             $(el).find(".next").removeClass("disabled").find('span').removeClass("fade");
          }
      } else {
          if (num == 0) {
             $(el).find(".prev").addClass("disabled").find('span').removeClass('inherit-bg '+color+'-bg black-bg').addClass("silver-bg");
          } else {
             var span = $(el).find(".prev").removeClass('disabled').find('span');
             if (span.hasClass(color+'-bg')) span.removeClass('silver-bg').addClass(color+"-bg");
             else span.removeClass('silver-bg').addClass("black-bg");
          }
          // at end
          if (num == $(el).data('size') - 1) {
             $(el).find(".next").addClass("disabled").find('span').removeClass('inherit-bg '+color+'-bg black-bg').addClass("silver-bg");
          } else {
             var span = $(el).find(".next").removeClass('disabled').find('span')
             if (span.hasClass(color+'-bg')) span.removeClass('silver-bg').addClass(color+"-bg");
             else span.removeClass('silver-bg').addClass("black-bg");
          }
      }

      // set dot
      $(el).find(".carousel-nav").each(function(){
        if (inverted) {
           $(this).find(".dot").eq(num).addClass("active").find("span").addClass(color+" active-"+color).removeClass('black fade');
        } else {
           $(this).find(".dot").eq(num).addClass("active").find("span").addClass(color+" active-"+color).removeClass('black fade');
        }
      })

      var w = $(el).width();
      var end = 0;

      var panels = $(el).find('.carousel-panels > li');
      for (var i = 0; i<num; i++) {
         end += panels.eq(i).width();
      }
      
      var speed = animate ? 500 : 0;
      $(el).data('pos',-end)
      
      // expand the navigation to a lower position if necessary
      $(el).find('.carousel-panels > li').css('max-height','none');
      var oldmaxheight = $(el).data('maxheight') || 0;
      var maxheight = oldmaxheight;
      var newmaxheight = $(el).find('.carousel-panels > li').eq(num).height();
      if (newmaxheight > maxheight) maxheight = newmaxheight;
      $(el).data('maxheight',maxheight);
      $(el).find('.carousel-panels > li').css('max-height',maxheight + 'px');
      $(el).find('.carousel-panels').stop().animate({left:-end},speed,"swing",function(){
        $(el).find('.carousel-panels > li').slice(0,num+2).removeClass('hidden').find('.lazy').show().trigger('appear');
      });
      
    }    
    
    function resize(el){ 
      var w = $(el).width();
      $(el).data('width',w);

      if (!$(el).find('.carousel-panels').hasClass('carousel-panels-fixed-width')) {
         $(el).find('.carousel-panels > li').css('width',w);
      }

    }
    
    function touchEvents($el){
         var panels = $el.find('.carousel-panels');
         function handleHammer(ev){
            // disable browser scrolling
            ev.gesture.preventDefault();
            switch(ev.type) {
                case 'dragright':
                case 'dragleft':
                    var pos = $el.data('pos') + ev.gesture.deltaX;
                    var num = $el.data('num')
                    var size = $el.data('size')
                    if (num == 0 && pos > 0) {
                       // first item, don't drag
                    } else if (num == (size - 1) && pos < 0) {
                       // last item, don't drag
                    } else {
                       panels.css({left:pos});
                    }
                    break;
                case 'release':
                    if (ev.gesture.deltaX < -100) {
                      $el.find(".next a").eq(0).trigger("click");
                    }
                    if (ev.gesture.deltaX > 100) {
                      $el.find(".prev a").eq(0).trigger("click");
                    }
                    break;
            }
         }
         if ('ontouchstart' in window) {
            $("img",$el).bind('dragstart', function(e) {return false;}) // prevent dragging of images
            // MJ: Change default touchaction to 'pan-y' so page scrolling isn't disabled in Chrome 35+, etc.
            // - https://github.com/hammerjs/hammer.js/wiki/How-to-fix-Chrome-35--and-IE10--scrolling-(touch-action)
            panels.hammer({ stop_browser_behavior: { touchAction: 'pan-y' }, drag_lock_to_axis: true, drag_vertical:false }).on("release dragleft dragright", handleHammer);
            //console.log(panels.data('hammer').options);
         }
    }
    
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
        
        if ($el.data('carousel-installed') == true) return;
        $el.data('carousel-installed',true);

        if ($el.hasClass("has-shuffle")) {
            shuffle($el.find(".carousel-panels > li"));
        } 

        var color = 'teal';
        var inverted = false;
        if ($(el).parents('.inherit-bg').size() > 0 || $(el).hasClass('carousel-monotone')){
           color = 'white';
        }
        if ($(el).hasClass('carousel-inverted')) {
           color = 'white';
           inverted = true;
        }

        renderCarouselNav(el,color,inverted);
        resize(el);
        $(window).load(function(){
          resize(el);
        })

        $(document).bind("framework.resize framework.domupdate",function(){
           resize(el);
           setPanel(el,$(el).data('num'),false,color,inverted);
        });
        
        touchEvents($el);
        
        var id = $el.attr('id');
        var startnum = parseInt(cookie.get(id)) || 0;
        if (startnum > $(el).data('size')) startnum = 0;
        $(el).data('num',startnum);

        setPanel(el,$(el).data('num'),false,color,inverted);

        $(window).load(function(){
           //fix resizing problems when the carousel has images
           setPanel(el,$(el).data('num'),false,color,inverted);
        })
        $(el).on("click",".nav-carousel .dot a",function(event){
           var num = $(this).parent().parent().find(".dot a").index(this);
           setPanel(el,num,true,color,inverted);
           event.preventDefault();
        })
        $(el).on("click",".next a",function(event){
           if (!$(this).parent().hasClass("disabled")) {
             var num = $(el).data('num') + 1;
             setPanel(el,num,true,color,inverted);
             if (window.analytics) analytics.event('carousel-arrow-next');
           }
           event.preventDefault();
        })
        $(el).on('click','.carousel-next',function(event){
           var num = $(el).data('num') + 1;
           setPanel(el,num,true,color,inverted);
           if (window.analytics) analytics.event('carousel-next');
           event.preventDefault();
        })
        $(el).on('click','.carousel-prev',function(event){
           var num = $(el).data('num') - 1;
           setPanel(el,num,true,color,inverted);
           if (window.analytics) analytics.event('carousel-prev');
           event.preventDefault();
        })
        $(el).on("click",".prev a",function(event){
           if (!$(this).parent().hasClass("disabled")) {
             var num = $(el).data('num') - 1;
             setPanel(el,num,true,color,inverted);
             if (window.analytics) analytics.event('carousel-arrow-prev');
           }
           event.preventDefault();
        })
        
       // hover states
       $(".next a,.prev a,.dot a",el).hover(function(){
          if ($('html.ua-touch').length != 0) return; // turn off hover effects on mobile
          var icon = this.firstChild;
          if (inverted) return;
          if ($(icon).hasClass('silver-bg') || $(icon).hasClass('fade')) {
             // pass
          } else if (color == 'white' && icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left-white';
          } else if (color == 'black' && icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left';
          } else if (color == 'white' && icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right-white';
          } else if (color == 'black' && icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right';
          } else if (color == 'white' && icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-'+color) == -1) {
             icon.className = 'icon-dot white icon-transition-color';
          } else if (icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left-white-inverted '+color+'-bg icon-transition-bg-color';
          } else if (icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right-white-inverted '+color+'-bg icon-transition-bg-color';
          } else if (icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-'+color) > -1) {
             icon.className = 'icon-dot '+color+' icon-transition-color active-'+color;
          } else if (icon.className.indexOf('dot') > -1) {
             icon.className = 'icon-dot '+color+' icon-transition-color';
          }
       },function(){
          var icon = this.firstChild;
          if (inverted) return;
          if ($(icon).hasClass('silver-bg') || $(icon).hasClass('fade')) {
            // pass
          } else if (color == 'white' && icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left';
          } else if (color == 'black' && icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left-white';
          } else if (color == 'white' && icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right';
          } else if (color == 'white' && icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right-white';
          } else if (icon.className.indexOf('left') > -1) {
             icon.className = 'icon-circle-arrow-left-white-inverted black-bg icon-transition-bg-color';
          } else if (icon.className.indexOf('right') > -1) {
             icon.className = 'icon-circle-arrow-right-white-inverted black-bg icon-transition-bg-color';
          } else if (icon.className.indexOf('dot') > -1 && icon.className.indexOf('active-'+color) > -1) {
             icon.className = 'icon-dot '+color+' icon-transition-color active-'+color;
          } else if (icon.className.indexOf('dot') > -1) {
             icon.className = 'icon-dot black icon-transition-color';
          }

       });
        
	}     
});

