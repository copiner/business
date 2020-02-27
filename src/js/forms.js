var Forms = {
  initData:function(){
    //var d = $(".j_form_test").serialize();
    //console.log(d);
  },

  initEvent:function(){
    $(".j_forms").on('click',function(){
      $("[name='sex']").eq(0).attr('checked',false);
      //$("[name='sex']").eq(1).removeAttr('checked',false);

      $("[name='subject']").eq(3).attr('checked',true);
      var d = $(".j_form_test").serialize();
      console.log(d);
    })
  },

  init:function(){
    Forms.initData();
    Forms.initEvent();
  }
}

Forms.init();
