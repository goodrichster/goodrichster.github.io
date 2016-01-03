   
 define(["jquery"],function($){
    return function(el){
        var verbose = false;
        if (/_fw_trim_verbose/.test(document.location)) {
           verbose = true;
        }

        if (verbose) {
           console.info("Element",el)
        }


        if ($(el).data('trim-installed') == true) return;
        $(el).data('trim-installed',true);
        
        var $el = $(el);

        var $clone = $(el.cloneNode(true)).css('overflow', 'visible').height('auto').css('max-height','none');
        $el.after($clone);

        // no need to trim
        if ($clone.outerHeight() <= $el.outerHeight()) {

           if (verbose) {
              console.info("Not trimming",el,$clone.outerHeight(),$el.outerHeight())
           }
           $clone.remove();
           return;
        };
        
        var $target = $(".trim-ellipsis,.trim-ellipsis-char",$clone).eq(0); //target the one in the clone
        if ($target.size() == 0) return;
        var option = 'word';
        if ($target.hasClass('trim-ellipsis-char')) option = 'char';

        function bestfit(clone,orig,target,origtext,pos,step,direction,option) {
           if (!origtext || origtext.length == 0) return text;
           var newtext;
           
           if (option == 'word') {
               // look for first space before pos
               for (var i = 0; i<100;i++) {
                 if (origtext[pos+(i*direction)] == ' ') {
                   pos = pos + (i*direction);
                   break;
                 }
               }
           }
           newtext = origtext.substr(0, pos);
           if (verbose) {
               console.info("NEW",direction,pos,step,newtext)
           }
           
           if (step == 0) {
              return;
           }
           if (step > 0) {
              newtext = newtext + "&hellip;"
              target.html(newtext);
           }

           
           var sizediff = clone.outerHeight() - orig.outerHeight();
           
           // split the string in half, looking for the best fit.
           // once you start splitting by 0, then stop
           direction = -1;
           if (sizediff > 0) {
              pos = pos - Math.floor(step/2)
           } else {
              pos = pos + Math.floor(step/2)
              direction = 1;
           }
           bestfit(clone,orig,target,origtext,pos - 1,Math.floor(step/2),direction,option);
        }
        
        var text = $target.html();
        bestfit($clone,$el,$target,text,text.length,text.length,1,option);
        $el.html($clone.html());
        $clone.remove();
    }
 });