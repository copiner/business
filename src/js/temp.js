//根据选择的领卡区县 加载 领卡网点
  var sites = Common.getSitesList(AdminParams.adminAreaCode);//获取当前网点列表
  $("#RCCardOutlets").val(AdminParams.adminOrg);
  $("#RCCardOutletsInput").val(AdminParams.adminOrgName);

  //网点列表支持联想查询
  $("#RCCardOutletsInput").on('focus',function(){
    $("#RCCardOutletsArea").show();
    var sitem = $(this).val();
    if(sitem){
      Common.levSites(sitem,sites,$("#RCCardOutletsArea"));
      $("#RCCardOutlets").val('');
    }
  })
  $("#RCCardOutletsInput").bind('input propertychange',Util.debounce(function(e){
    //console.log($(this).val());
    var sitem = $(this).val();
    Common.levSites(sitem,sites,$("#RCCardOutletsArea"));
    //$("#RCCardOutlets").val('');
  },300))

  $("#RCCardOutletsArea").delegate("li", 'click', function (e) {
    e.stopImmediatePropagation();

    $("#RCCardOutlets").val($(this).attr('orgcode'));
    $("#RCCardOutletsInput").val($(this).text());
    $("#RCCardOutletsArea").hide();
  });

  /**
     * 联想查询对应网点
     * @param data 网点列表
     * @param item 输入框内容
     * @param $obj 结果展示dom
     * @author wds
     * @date 2019/12/13
       */
    levSites : function(item,data,$obj){
      var area = [];
      var item = item.trim();
      if(item){

        if(!data && data.length == 0){
          return;
        }

        $.each(data,function(i,v){
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
        area = data;
      }

      var ul = $("<ul>");
      $.each(area,function(i,v){
        $( "<li>" )
        .attr('orgcode',v.orgCode)
        .append( v.orgNameAbr )
        .appendTo( ul )
      })

      $obj.html(ul)
    },
