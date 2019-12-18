var Area = {

  initData:function(){
    Area.initList();

    $(".j_doublec").on('click',function(){
      $(this).prop("disabled", "disabled");
      console.log('doubleclick');
    })
  },

  initEvent:function(){
    var debounce = function(fn, delay) {
      var timer;
      return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }

    // var btn = document.querySelector(".j_try");
    // btn.oninput = debounce(function(e){
    //   console.log(this.value);
    // },500)

    $(".j_inarea").bind('input propertychange',debounce(function(e){
      console.log($(this).val());
      $(".j_area").show();
      var sites = $(this).val();
      if(sites.length > 0){
        Area.levSites(sites);
      } else {
        Area.initList()
      }

    },500))

    $(".j_inarea").on('focus',function(){
      $(".j_area").show();
      if($(this).val().length == 0){
        Area.initList();
      }

    })

    $(".j_sel").on('change',function(){
      $('.j_sea').show();
    })

    /*方案1*/
    $(".j_area").on("click",'li', function(e) {
      e.stopImmediatePropagation();
      $(".j_inarea").val($(this).text());
      $(".j_inarea").attr("code",$(this).attr('orgcode'));
      $(".j_area").hide();
    });

    /*方案1 点击事件TODO*/

    // $("#area").on("touchstart",'li', function(e) {
    //     console.log("2222")
    //     e.preventDefault();
    //     $(this).css('background',"#ccc");
    // });
    //
    // $("#area").on("touchend",'li', function(e) {
    //     console.log("333")
    //     e.preventDefault();
    //     $(this).css('background',"#fff");
    //     document.removeEventListener('touchmove',this.preventDefault, true);
    // });
  },

  initList : function(){
    var arr = sites.data;

    if(arr.length == 0){
      return;
    }

    var ul = $("<ul>");
    $.each(arr,function(i,v){
      $( "<li>" )
      .attr('orgCode',v.orgCode)
      .append( v.orgNameAbr )
      .appendTo( ul )
    })

    $(".j_area").html(ul)
  },

  levSites : function(item){
    var area = [];
    var arr = sites.data;

    if(arr.length == 0){
      return;
    }

    if(item){
      $.each(arr,function(i,v){
        if(v.orgCode && v.orgNameAbr){
          if( v.orgNameAbr.indexOf(item) != -1 && area.length < 15 ){
            area.push({
              orgCode : v.orgCode,
              orgNameAbr : v.orgNameAbr
            })
          }
        }
      })
    } else {
      area = arr;
    }

    var ul = $("<ul>");
    $.each(area,function(i,v){
      $( "<li>" )
      .attr('orgCode',v.orgCode)
      .append( v.orgNameAbr )
      .appendTo( ul )
    })

    $(".j_area").html(ul)
  },

  init : function(){
    Area.initData();
    Area.initEvent();
  }
}

Area.init();
