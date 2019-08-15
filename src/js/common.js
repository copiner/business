/**
 * Created by wdaonngg on 2018/10/29.
 * 公用js
 */
var PaymentCode = {};
var Common = {
    //服务器地址prod
    ProjectPath : '',
    ProjectName : '',

    //test
    // ProjectPath : '',
    // ProjectName : '',

    //dev
    // ProjectPath : '/api',
    // ProjectName : '',

    SUC_CODE : '0000',

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
     * @author wds
     * 获取18位uuid
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
    }

}

$.extend({
    commonAjax: function (options){
        var url = options.url;
        if (!url) {
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
