/**
 * Created by liuwj on 2018/10/29.
 * 首页 --选择功能
 */
var Index = {
  initData : function () {
    $(".showCurTime").html(Common.current());

    Common.seGeReItem("macAddr",Common.getMacInfo());

    Common.seGeReItem("orderId","");

    Common.seGeReItem("innerUrl","");
    Common.seGeReItem("outerUrl","");

    Common.seGeReItem("csn","");//芯片号
    Common.seGeReItem("cardNo","");//市民卡号
    Common.seGeReItem("name","");//姓名
    Common.seGeReItem("idNo","");//身份证号
    Common.seGeReItem("mobile","");
    Common.seGeReItem("payAmt","");//充值金额

    Common.seGeReItem("trCode","");//业务类型代码-- 170\172\174\176
    Common.seGeReItem("expireDate","");//失效时间
    Common.seGeReItem("inCardAmt","");//写卡金额
    Common.seGeReItem("ticketId","");//票型编号
    Common.seGeReItem("busrefcode","");//公交凹码
    Common.seGeReItem("sfbh","");//APP端收费编号
    Common.seGeReItem("inCardAmt","");//写卡金额

  },

  initEvent : function () {
    $("#goPark").on("click",function(){
      window.location.href = Common.ProjectName+'/read-card-park.html?date='+new Date().getTime();
    });

    $("#goTemple").on("click",function(){
      window.location.href = Common.ProjectName+'/read-card-temple.html?date='+new Date().getTime();
    });

    $("#goInsurance").on("click",function(){
      window.location.href = Common.ProjectName+'/read-insurance-card.html?date='+new Date().getTime();
    });
  },

  init : function () {
    Index.initData();
    Index.initEvent();
  }

};

Index.init();
