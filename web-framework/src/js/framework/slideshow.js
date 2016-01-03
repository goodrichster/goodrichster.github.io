/*
activate carousels
*/

define(['jquery'],function($){
    function renderSlideshowNav(el,images){
       if (images.length == 0) return;
       var h = '<ul class="slideshow-nav mobile-hidden">'
       h += '<li><a href="#" class="prev"><span class="icon-circle-arrow-left"></span></a></li>'
       h += '<li><a href="#" class="next"><span class="icon-circle-arrow-right"></span></a></li>'
       
       if ($(el).hasClass('dark')) {
           h = h.replace('icon-circle-arrow-left','icon-circle-arrow-left-white');
           h = h.replace('icon-circle-arrow-right','icon-circle-arrow-right-white');
       }
       h += '</ul>';
       $('.slideshow-controls',el).append(h);
       
       
       // hover states
       $(".slideshow-nav span",el).hover(function(){
          if ($(this).hasClass('fade')) {
             // pass
          } else if (this.className.indexOf('left-white') > -1) {
             this.className = 'icon-circle-arrow-left-inverted inherit-bg';
          } else if (this.className.indexOf('left') > -1 && $(el).hasClass('light')) {
             this.className = 'icon-circle-arrow-left-white';
          } else if (this.className.indexOf('left') > -1) {
             this.className = 'icon-circle-arrow-left-white-inverted inherit-bg';
          } else if (this.className.indexOf('right-white') > -1) {
             this.className = 'icon-circle-arrow-right-inverted inherit-bg';
          } else if (this.className.indexOf('right') > -1 && $(el).hasClass('light')) {
             this.className = 'icon-circle-arrow-right-white';
          } else if (this.className.indexOf('right') > -1) {
             this.className = 'icon-circle-arrow-right-white-inverted inherit-bg';
          }
       },function(){
          if ($(this).hasClass('fade')) {
            // pass
          } else if (this.className.indexOf('left-inverted') > -1) {
             this.className = 'icon-circle-arrow-left-white';
          } else if (this.className.indexOf('left') > -1) {
             this.className = 'icon-circle-arrow-left';
          } else if (this.className.indexOf('right-inverted') > -1) {
             this.className = 'icon-circle-arrow-right-white';
          } else if (this.className.indexOf('right') > -1) {
             this.className = 'icon-circle-arrow-right';
          }
       });
       
       // next,prev click
       $(".slideshow-nav .next,.slideshow-nav .prev",el).click(function(event){
          event.preventDefault();
          if ($(this).hasClass('disabled')) return;
          if ($(this).hasClass('next')) {
             $(".slideshow-thumbnails .active",el).next().find('a').click();
          } else {
             $(".slideshow-thumbnails .active",el).prev().find('a').click();
          }
       })
       
    }

    function renderSlideshowViewport(el,images){
       var img = images[0].src;
       var h = '<div class="slideshow-viewport mobile-hidden"><img src="'+img+'" class="fluid"/></div><div class="slideshow-controls mobile-hidden"></div>';
       $(el).append(h);
    }
    
    function renderSlideshowThumbnails(el,images){
       var $controls = $('.slideshow-controls',el);
       var h = '<div class="slideshow-thumbnails-viewport"><ul class="slideshow-thumbnails">'
       images.each(function(){
          var thumb = $(this).parent().find("img.thumbnail").eq(0).attr('src') || this.src;
          var src = this.src;
          h += '<li><a href="#" class="stroke2 inherit-border-color-onhover"><img src="'+thumb+'" width="56" height="52" data-src="'+src+'"/></a></li>';
       });
       if ($(el).hasClass('dark')) {
           h = h.replace(/stroke2 /g,'white-stroke2 ');
       }
       h += '</ul></div>';
       $controls.append(h);
       if (images.filter("[title]").size() > 0) {
          var c = '<div class="slideshow-caption nu"></div>';
          var fullimg = $(".slideshow-images img:not(.thumbnail)",el).eq(0);
          if (fullimg && fullimg.attr('title')) {
             $(".slideshow-caption").html(fullimg.attr('title'));
          } 
          $controls.append(c);
          $controls.addClass('captioned');
       }
       
       // image thumbnail click
       $(".slideshow-thumbnails a",el).click(function(event){
          var index = $(".slideshow-thumbnails a",el).index(this);
          
          // first thumbnail
          if (index == 0) {
             if ($(el).hasClass('dark')) {
               $(".slideshow-nav .prev",el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-left-white').removeClass('icon-circle-arrow-left-white-inverted inherit-bg');
             } else {
               $(".slideshow-nav .prev",el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-left').removeClass('icon-circle-arrow-left-white-inverted inherit-bg icon-circle-arrow-left-white');
             }
          } else {
             $(".slideshow-nav .prev",el).removeClass('disabled').find('span').removeClass('fade');
          }
          
          // last thumbnail 
          if (index == images.length - 1) {
             if ($(el).hasClass('dark')) {
               $(".slideshow-nav .next",el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-right-white').removeClass('icon-circle-arrow-right-white-inverted inherit-bg');
             } else {
               $(".slideshow-nav .next",el).addClass('disabled').find('span').addClass('fade icon-circle-arrow-right').removeClass('icon-circle-arrow-right-white-inverted icon-circle-arrow-right-white inherit-bg');
             }
          } else {
             $(".slideshow-nav .next",el).removeClass('disabled').find('span').removeClass('fade');
          }
          
          // animate if necessary 
          if (images.length > 5) {
             // recenter after each click
             
             var w = $(this).parent().width() + 8; // 8px margin
             var end = w*(index-2);
             if (end < 0) end = 0;
             console.info('animating',end)
             $(el).find('.slideshow-thumbnails').stop().animate({left:-end},500,"swing");
          }
          
          var img = $('img',this).data('src');
          $(".slideshow-viewport img",el).attr('src',img);
          
          var fullimg = $(".slideshow-images img:not(.thumbnail)",el).eq(index);
          console.info("index",index,fullimg[0]);
          if (fullimg && fullimg.attr('title')) {
             $(".slideshow-caption",el).fadeOut('fast',function(){
               $(this).html(fullimg.attr('title')).fadeIn('fast');
             })
          } else {
             $(".slideshow-caption",el).html('');
          }
          $(".slideshow-thumbnails .active",el).removeClass("active");
          $(this).parent().addClass("active");
          event.preventDefault();
          event.stopPropagation();
       })
       
    }

    function renderMobileCarousel(el,images) {
       if (images.length == 0) return;
       var h = '<div class="carousel-container mobile-visible">'
       h += '<ul class="carousel-panels">';
       images.each(function(){
          var src = $(this).attr('src');
          var caption = $(this).attr('title')
          if (caption) {
             h += '<li><img src="'+src+'" class="fluid"/><div>'+caption+'</div></li>';
          } else {
             h += '<li><img src="'+src+'" class="fluid"/></li>';
          }
       });
       h += '</ul>'
       h += '<div class="carousel-nav carousel-nav-minimal carousel-nav-centered"></div>';
       h += '</div>'
       $(el).append(h);
    }
    
    
	return function(el){
    
        if ($(el).hasClass('slideshow-pattern')) return;
       
        $(el).addClass('slideshow-pattern');
        $(".slideshow-images",el).hide();
        var images = $(el).find(".slideshow-images > li > img:not(.thumbnail)");
        renderSlideshowViewport(el,images);
        renderSlideshowThumbnails(el,images);
        renderSlideshowNav(el,images);
        renderMobileCarousel(el,images);
        $(".slideshow-thumbnails a",el).eq(0).click();
	}     
});

