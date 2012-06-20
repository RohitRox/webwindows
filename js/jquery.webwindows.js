/*!
 * jQuery webwindows
 * Author: @roxxypoxxy
 * Derived from Boxes.js by @xtranophilist
 * Github: https://github.com/RohitRox/webwindows
 */

var WEB_WINDOWS_COUNT = 0
;(function ($) {
  
  $.webwindows = function(data, klass) {
    //$.webwindows.loading(data.settings || [])

    if (data.ajax) fillWebwindowsFromAjax(data.ajax, klass)
    else if (data.image) fillWebwindowsFromImage(data.image, klass)
    else if (data.div) fillWebwindowsFromHref(data.div, klass)
    else if ($.isFunction(data)) data.call($)
    else $.webwindows.reveal(data, klass)
  }
  
  /*
    * Public, $.facebox methods
    */

   $.extend($.webwindows, {
     
     settings: {
       overlay      : false,
       loadingImage : '/img/webwindows/loading.gif',
     },
     webwindowshtml: function(data){
       WEB_WINDOWS_COUNT += 1
       return '<div class="windows" id="webwindows_'+WEB_WINDOWS_COUNT+'"> \
      	  <div class="window-wrap"> \
      	    <div class="window-header"> \
      	      <div class="box-control"><a href="#">-</a><a href="#">X</a></div> \
      	    </div> \
      	    <div class="window-container"> \
      	    '+data+'</div> \
      	  </div> \
      	</div>'
     }
     ,
     reveal: function(data, klass) {
       $('body').append($.webwindows.webwindowshtml(data));
     }
  })
  
  /*
   * Public, $.fn methods
   */

  $.fn.webwindows = function(settings) {
    
    if ($(this).length == 0) return
    
    init(settings)
    
    /*
     * Public methods
     */
    
    
    /*
     * Private methods
     */
    function init(settings){
      
    }
  }


})( jQuery);