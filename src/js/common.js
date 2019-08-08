/**
 * Created by wds on 2018/10/29.
 * 公用js
 */
var PaymentCode = {};
var Common = {
    //服务器地址prod
    ProjectPath : 'http://10.101.251.167/sstsvr',
    ProjectStaticPath : 'http://10.101.251.167/sstsvr/',
    ProjectName : '/machine',

    //test
    // ProjectPath : 'http://192.168.23.213:9001/sstsvr',
    // ProjectStaticPath : 'http://192.168.23.213:9001/sstsvr/',
    // ProjectName : '/machine',

    //dev
    // ProjectPath : '/api',
    // ProjectStaticPath : 'http://192.168.23.213:9001/sstsvr/',
    // ProjectName : '',

    SUC_CODE : '0000',

    /**
     * 获取当前年月日 时分秒 星期
     * 格式如：2018年10月30日 10:07:40 星期二
     * @returns {string}
     */
    current : function (){
        var d=new Date(),curTime='';
        var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

        curTime += d.getFullYear()+'年'; //获取当前年份
        if(d.getMonth()<9){
            curTime += '0';
        }
        curTime += d.getMonth()+1+'月'; //获取当前月份（0——11）
        if(d.getDate()<10){
            curTime += '0';
        }
        curTime += d.getDate()+'日 ';
        if(d.getHours()<10){
            curTime += '0';
        }
        curTime += d.getHours()+':';
        if(d.getMinutes()<10){
            curTime += '0';
        }
        curTime += d.getMinutes()+':';
        if(d.getSeconds()<10){
            curTime += '0';
        }
        curTime += d.getSeconds()+' ';
        curTime +=weekArray[d.getDay()];

        return curTime;
    },

    /**
     * 动态显示当前时间 及 倒计时
     * @param seconds
     */
    getCurDateAndTime : function (seconds) {
        var timer = setInterval(function(){
            $(".showCurTime").html(Common.current());
            seconds--;
            if(seconds==0){

              if(PaymentCode.flag){
                clearInterval(timer);
                $.piupiu('支付超时！');
                PaymentCode.closeOrder();
                setTimeout(function(){
                  window.location.href = Common.ProjectName+'/index.html?date='+new Date().getTime();
                 }, 3000);
              } else {
                window.location.href = Common.ProjectName+'/index.html?date='+new Date().getTime();;
              }

            } else {
                $(".countdown").text(seconds+'秒');
            }
        },1000);
    },

    /**
     * 数据存储简化
     * sessionStorage
     */
    seGeReItem : function(key,value){
      if(value){
        sessionStorage.setItem(key,value);
      } else if(value == "") {
        sessionStorage.removeItem(key);
      } else {
        return sessionStorage.getItem(key);
      }
    },

    /**
     * 获取url的参数值
     * @parm key url的参数key值
     * @date 2018/05/10
     */
    getUrlSearch : function (key) {
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    /**
     * 获取mac地址
     */
    getMacInfo : function (){
        try{
            var locator = new ActiveXObject ("WbemScripting.SWbemLocator");
            var service = locator.ConnectServer(".");
            var properties = service.ExecQuery("Select * from Win32_NetworkAdapterConfiguration Where IPEnabled =True");
            var e = new Enumerator (properties);
            var p = e.item();
            return p.MACAddress;
        } catch(e){
            $.piupiu("获取MAC地址失败:"+e);
        }
    },

    /**
     * @author wds
     * 获取30位uuid
     * @date 2018/05/10
     */
    getUuid : function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 22; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[21] = hexDigits.substr((s[18] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[3] = s[8] = s[13] = s[18] = "";
        var uuid = s.join("");
        return uuid;
    },

    /**
     * 根据开始位置、长度、替换符号，替换内容的部分字符串
     * @param content 原始字符串
     * @param start 需要替换的开始位置
     * @param length 需要替换的长度
     * @param newStr 替换符
     * @returns {string} 替换后的字符串
     */
    hideContent :  function (content ,start,length,newStr) {
        var result = '';
        result = content.substring(0,start);
        for(var i=0;i<length;i++){
            result += newStr;
        }
        result += content.substring(start+length);
        return result;
    },

    init : function () {
        //倒计时及当前时间显示
        Common.getCurDateAndTime($(".countdown").attr('data-second'));

        $('.backBtn').on('click',function () {
            window.location.href = Common.ProjectName+'/index.html?date='+new Date().getTime();
        });
    }
}

Common.init();

/**
 * @author lwj
 * 重新封装ajax请求
 */
$.extend({
    commonAjax: function (options){
        var url = options.url;
        if (!url) {
            $.piupiu('请求地址为空！');
            return;
        }
        options.url = url + '?date='+new Date().getTime();

        var defaults = {
            type: 'POST',
            contentType:"application/json",
            dataType: 'json',
            cache: false
        };
        var settings = $.extend(defaults, options);
        settings.success =  function (re, textStatus, xhr){
            options.success(re);
        };
        settings.error = function (xhr, status, handler){
            if(options.error) {
                options.error();
            }
        };
        $.ajax(settings);
    }

});
