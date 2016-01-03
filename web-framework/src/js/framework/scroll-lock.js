/*
save scroll position on click
*/   
     
define(['jquery'],function($){

    /*!
     * Scroll Sneak
     * http://mrcoles.com/scroll-sneak/
     *
     * Copyright 2010, Peter Coles
     * Licensed under the MIT licenses.
     * http://mrcoles.com/media/mit-license.txt
     *
     * Date: Mon Mar 8 10:00:00 2010 -0500
     */
    var ScrollSneak = function(prefix, wait) {
        // clean up arguments (allows prefix to be optional - a bit of overkill)
        if (typeof(wait) == 'undefined' && prefix === true) prefix = null, wait = true;
        prefix = (typeof(prefix) == 'string' ? prefix : window.location.host).split('_').join('');
        var pre_name;

        // scroll function, if window.name matches, then scroll to that position and clean up window.name
        this.scroll = function() {
            if (window.name.search('^'+prefix+'_(\\d+)_(\\d+)_') == 0) {
                var name = window.name.split('_');
                if (document.getElementById('s4-workspace')) {
                    window.setTimeout(function(){
                       $('#s4-workspace').animate({scrollTop: name[2]}, 1);
                    },1000);
                } else {
                    $(document).ready(function(){
                       window.scroll(name[1], name[2]);
                    })
                }
                window.name = name.slice(3).join('_');
            }
        }
        // if not wait, scroll immediately
        if (!wait) this.scroll();

        this.sneak = function() {
            // prevent multiple clicks from getting stored on window.name
            if (typeof(pre_name) == 'undefined') pre_name = window.name;

            // get the scroll positions
            var top = 0, left = 0;
            if (typeof(window.pageYOffset) == 'number') { // netscape
                top = window.pageYOffset, left = window.pageXOffset;
            } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) { // dom
                top = document.body.scrollTop, left = document.body.scrollLeft;
            } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) { // ie6
                top = document.documentElement.scrollTop, left = document.documentElement.scrollLeft;
            }

            if (document.getElementById('s4-workspace')) {
                top =  $('#s4-workspace').scrollTop();
            }

            // store the scroll
            if (top || left) window.name = prefix + '_' + left + '_' + top + '_' + pre_name;
            return true;
        }
    }

     window.sneaky = new ScrollSneak();

     return function(el){
        var $el = $(el);
        if ($el.data('noscroll-installed') === true) return;
        $el.data('noscroll-installed',true);
        $el.click(window.sneaky.sneak);
     }
});

