/*
dialog class
*/

define(['jquery'],function($){
  function Dialog(options) {
      this.options = options;
  }
  
  Dialog.prototype.render = function(options) {
      var html = ''
      if (options.id) {
          html += '<div id="'+options.id+'">'
      } else {
          html += '<div>'
      }
      html += '<div class="js-framework color-framework component-framework pattern-framework grid-framework type-framework responsive-framework">'
      html += '<div class="modal-backdrop black-bg"></div>'
      html += '<div class="modal">'
      html += '<div class="shim16" id="modal-shim"></div>';
      html += '<div class="shim18 mobile-hidden"></div>';
      var styl = '';
      styl += options.width ? 'max-width:'+options.width : '';
      html += '<div class="container mobile-container tablet-container" style="'+styl+'">'
      var cls = '';
      cls += options.backgroundColor == 'black' ? '' : 'white-bg';
      cls += options.textColor == 'white' ? 'white' : '';
      var closeColor = options.textColor == 'white' ? 'white' : 'hbsred';
      var anim = options.animation == 'slidedown' ? 'modal-slidedown' : 'modal-fadein';
      html += '   <div class="modal-dialog ' + anim + ' ' + cls + '">'
      if (options.title) {
          html += '     <div class="modal-header"> '
          html += '          <button type="button" class="modal-header-close btn-unstyled '+closeColor+' eta">&times;</button>'
          html += '          <div class="kappa-uc modal-header-text">'+ options.title +'</div>'
          if (options.textColor == 'white') {
              html += '          <div class="hr white-bg"></div>'
          } else {
              html += '          <div class="hr"></div>'
          }
          html += '     </div>'
          html += '     <div class="modal-body">' + options.body + '</div>';
      } else {
          html += '     <div class="modal-header"> '
          html += '          <button type="button" class="modal-header-close btn-unstyled '+closeColor+' eta" style="margin:0">&times;</button>'
          html += '          <div class="clear"></div>'
          html += '     </div>'
          html += '     <div class="modal-body" style="padding-top:0">' + options.body + '</div>';
      } 

      if (options.buttons && $.isPlainObject(options.buttons)) {
          html += '     <div class="modal-footer" style="text-align:right"><div class="shim24"></div>'
          if (options.title) html += '<div class="hr"></div>'
          var num = 0;
          $.each(options.buttons, function( key, value ) {
             if (num == 0) {
                 html += '       <button class="btn-submit hbsred-bg button-'+num+'" style="min-width:75px">'+key+'</button>'
             } else {
                 html += '       <button class="btn-submit silver-bg button-'+num+'" style="min-width:75px">'+key+'</button>'
             }
             num++;
          }); 
          html += '       <div class="shim12"></div>';
          html += '     </div>';
      } else if (options.buttons && $.isArray(options.buttons)) {
          html += '     <div class="modal-footer" style="text-align:right"><div class="shim24"></div>'
          if (options.title) html += '<div class="hr"></div>'
          var num = 0;
          $.each(options.buttons, function( i, obj ) {
             html += '       <button class="button-'+num+' '+(obj['class']||obj['className'])+'" style="min-width:75px;'+(obj.style || '')+'">'+obj.label+'</button>'
             num++;
          });
          html += '       <div class="shim12"></div>';
          html += '     </div>';
      } else {
          html += '<div class="shim24"></div>'
      }
      html += '   </div>'
      html += '<div class="shim32"></div>';
      html += '</div>'  // .modal
      html += '<div class="shim32"></div>';
      html += '</div>'
      html += '</div></div>'
      return html;
  }
  
  Dialog.prototype.open = function() {
      var self = this;
      window.topDialog = this;
      $("#framework-modal").remove();
      var options = this.options;
      var h = this.render(options);
      var h = '<div id="framework-modal">' + h + '</div>'
      $("body").append(h);
      if (typeof options.body == 'object') $("#framework-modal .modal-body").html(options.body);
      $("#framework-modal .modal-footer").on('click','button',function(){
          var key = $(this).text();
          if ($.isArray(options.buttons)) {
            $.each(options.buttons,function(i,obj){
                if (obj.label == key) {
                     var fn = obj.onClick;
                     if (fn) fn.apply(self);
                }
            })
          } else {
             var fn = options.buttons[key];
             if (fn) fn.apply(self);
          }
      })

      $(".modal").on('click', function(e){
        if ($(event.target).is('.modal')) {
           self.close();
        }
      });

      $(document).off('esc.dialog').on('esc.dialog',function(e){
         window.topDialog.close();
      });
      $("#framework-modal").on('click','.modal-header-close',function(){
          self.close();
      });
      /*
      caused issues on the email class modal, when you drag it triggers the close
      $("#framework-modal").on('mousedown','.modal',function(event){
        if ($(event.target).is('.modal')) {
          self.close();
        }
      })*/ 
      $("#framework-modal").on('touchmove','.modal-backdrop',function(event){
         event.preventDefault();
      });
      window.requestAnimationFrame(function(){
        $("body").addClass("modal-open");
        if (options.centered) self.center();
        $(document).trigger('framework.domupdate');
        if (window.Widgets) Widgets.refresh();
      });
  };

  Dialog.prototype.center = function(){
     var winHeight = $("#framework-modal .modal").height() * .75;
     var dlgHeight = $("#framework-modal .modal-body").height();
     var diff = (winHeight / 2)  - (dlgHeight / 2)
     if (diff > 0) {
         $("#modal-shim").height(diff);
     } else {
         $("#modal-shim").height(0);
     }
  },

  Dialog.prototype.onClose = function(fn){
    this.closeFn = fn;
  },


  Dialog.prototype.close = function() {
     window.topDialog = null;
     if (this.closeFn) this.closeFn();
     $("body").removeClass("modal-open");
     window.setTimeout(function(){
         $("#framework-modal").remove()
     },200);
  };

  Dialog.prototype.find = function(tag) {
     return $("#framework-modal").find(tag);
  };

  return Dialog;
  
});

