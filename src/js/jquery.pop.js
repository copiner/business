// jQuery.fn.piupiu = function(msg){
//     var popHtml = '<div class="modal">'+
//                     '<div class="modal-content">'+
//                         '<div class="modal-header">'+
//                           '<span>温馨提示</span>'+
//                         '</div>'+
//                         '<div class="modal-body">'+
//                           '<span>'+msg+'</span>'+
//                         '</div>'+
//                         '<div class="modal-footer">'+
//                           '<input type="button" class="modal-btn" value="我知道了">'+
//                         '</div>'+
//                       '</div>'+
//                     '</div>';
//     jQuery("body").append(popHtml);
//     jQuery(".modal").show();
//     jQuery('.modal-btn').on('click',function(){
//       jQuery('.modal').hide();
//       return false;
//     });
// }

jQuery.extend({

  piupiu:function(msg){
    var popHtml = '<div id="piuModal" class="modal">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                          '<span>温馨提示</span>'+
                        '</div>'+
                        '<div class="modal-body">'+
                          '<span>'+msg+'</span>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                          '<input type="button" class="modal-btn" id="modalDo" value="我知道了">'+
                        '</div>'+
                      '</div>'+
                    '</div>';
    jQuery("body").append(popHtml);
    jQuery("#piuModal").show();
    jQuery('#modalDo').on('click',function(){
      jQuery('#piuModal').remove();
      return false;
    });
  }

})
