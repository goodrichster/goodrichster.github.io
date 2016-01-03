/*
activate img controller
*/   
     
define(['jquery'],function($){
    return function(el){

        window.imgZoomresizeDialog = function(img){
            if (img.naturalWidth) $("#framework-modal .container").css('max-width',img.naturalWidth);
        }

        $(el).off('.img-zoom').on('click.img-zoom','.img-zoom',function(e){
            console.info("HERE");
            var dlg = new framework.Dialog({
                                             body: $('<img class="fluid" onload="window.imgZoomresizeDialog(this)"/>').attr('src',this.href),
                                             backgroundColor: "black",
                                             textColor: "white",
                                             width: "800px"
                                          });
           dlg.open();
           e.preventDefault();
        });

        function isImageOk(img) {
            if (!img.complete) {
                return false;
            }
            if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
                return false;
            }
            return true;
        }

        $(window).load(function(){       
            $("img",el).each(function(){
                var $el = $(this);
                if ($el.data('imgcontroller-installed') == true) return;
                $el.data('imgcontroller-installed',true);
                if (!isImageOk(this)) {
                    $(this).addClass('broken-image');
                    this.style.visibility = "hidden";
                }
           });
        })
       
    }     
});

