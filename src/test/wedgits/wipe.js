<script>
/**
 * jQuery Plugin to obtain touch gestures
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010)
 */
;(function($, undefined){
   $.fn.touchwipe = function(settings) {
     var config = {
            min_move_x: 50,
            min_move_y: 20,
            wipeLeft: function() { },
            wipeRight: function() { },
            preventDefaultEvents: false
     };

     if (settings) $.extend(config, settings);

     this.each(function() {
         var startX;
         var startY;
         var isMoving = false;
         var directionLocked = null;

         function cancelTouch() {
             this.removeEventListener('touchmove', onTouchMove);
             startX = null;
             isMoving = false;
             directionLocked = false;
         }

         function onTouchMove(e) {
             if(config.preventDefaultEvents) {
                 e.preventDefault();
             }
             if(isMoving) {
                 var x = e.changedTouches ? e.changedTouches[0].clientX: e.clientX;
                 var y = e.changedTouches ? e.changedTouches[0].clientY: e.clientY;
                 var dx = startX - x;
                 var dy = startY - y;

                var absDistX = Math.abs(dx);
                var absDistY = Math.abs(dy);

                if (directionLocked === "y") {
                    return
                } else {
                    if (directionLocked === "x") {
                        e.preventDefault()
                    } else {
                        absDistX = Math.abs(dx);
                        absDistY = Math.abs(dy);
                        if (absDistX < 4) {
                            return
                        }
                        if (absDistY > absDistX ) {
                            dx = 0;
                            directionLocked = "y";
                            return
                        } else {
                            e.preventDefault();
                            directionLocked = "x"
                        }
                    }
                }

                if(absDistX >= config.min_move_x) {
                    cancelTouch();
                    if(dx > 0) {
                        config.wipeLeft();
                    }
                    else {
                        config.wipeRight();
                    }
                 }
             }
         }

         function onTouchStart(e)
         {
             if (e.touches.length == 1) {
                 startX = e.changedTouches ? e.changedTouches[0].clientX: e.clientX;
                 startY = e.changedTouches ? e.changedTouches[0].clientY: e.clientY;
                 isMoving = true;
                 directionLocked = false;
                 this.addEventListener('touchmove', onTouchMove, false);
             }
         }
         if ('ontouchstart' in document.documentElement) {
             this.addEventListener('touchstart', onTouchStart, false);
         }
     });

     return this;
   };
 })(jQuery);
