/*

Exported framework functions

*/

define(['jquery','framework/cookie','framework/URI','framework/dialog','framework/nprogress.min','framework/jquery.scrollintoview.min'],function($,cookie,URI,Dialog,nprogress){

    if ($(window).data('exports-installed') === true) return;
    $(window).data('exports-installed',true);
   
    var exports = {};

    exports.cookie = cookie;
    exports.URI = URI;
    exports.Dialog = Dialog;
    exports.progress = nprogress;
      
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    exports.debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    };
      
    // reload and preserve scroll position, (scroll-lock has the sneaky module)
    exports.reload = function(){
        if (window.sneaky) {
           window.sneaky.sneak();
           location.reload();
        }
    }

    exports.scrollIntoView = function(el){
        $(el).eq(0).scrollintoview();
    }

    exports.scrollTo = function(el) {
        var targetOffset = $(el).offset().top;
        if (document.getElementById('s4-workspace')) {
            $('#s4-workspace,html,body').animate({scrollTop: targetOffset}, 1,'swing',function(){
            });
        } else {
            $('html,body').animate({scrollTop: targetOffset}, 1,'swing',function(){
            });
        }
    }
      
      
    // remove onclick delays http://cubiq.org/remove-onclick-delay-on-webkit-for-iphone
  
    function NoClickDelay(el) {
        this.element = typeof el === 'object' ? el : document.getElementById(el);
        if( window.Touch ) this.element.addEventListener('touchstart', this, false);
    }

    NoClickDelay.prototype = {
        handleEvent: function(e) {
            switch(e.type) {
            case 'touchstart': 
                this.onTouchStart(e); 
                break;
            case 'touchmove': 
                this.onTouchMove(e); 
                break;
            case 'touchend': 
                this.onTouchEnd(e); 
                break;
            }
        },

        onTouchStart: function(e) {
            e.preventDefault();
            this.moved = false;

            this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            if(this.theTarget.nodeType === 3) this.theTarget = this.theTarget.parentNode;
            this.theTarget.className+= ' pressed';

            this.element.addEventListener('touchmove', this, false);
            this.element.addEventListener('touchend', this, false);
        },

        onTouchMove: function() {
            this.moved = true;
            this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
        },

        onTouchEnd: function() {
            this.element.removeEventListener('touchmove', this, false);
            this.element.removeEventListener('touchend', this, false);

            if( !this.moved && this.theTarget ) {
                this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
                var theEvent = document.createEvent('MouseEvents');
                theEvent.initEvent('click', true, true);
                this.theTarget.dispatchEvent(theEvent);
            }

            this.theTarget = undefined;
        }
    };
  
    exports.fastClick = function(el) { new NoClickDelay(el); };      
      
    window.framework = exports;
    return exports;
       
});     