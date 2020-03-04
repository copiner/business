var xhr = null; // IE8/9需用window.XDomainRequest兼容

if (window.XDomainRequest) {

    xhr = new XDomainRequest();

    xhr.onload = function () {

        console.log(xhr.responseText);

    }

    xhr.timeout=4000;

    xhr.open("post", 'http://127.0.0.1:7999/Api/PrintInvoicePreview');

    xhr.XDomainRequest="text/plain";

    xhr.send(data.msg);

    xhr.onerror = function () {

        dialogAlert("请求失败，请确认打印助手服务已经启动！");

    };

    xhr.ontimeout=function(){

        dialogAlert("请求失败，请确认打印助手服务已经启动！");

    }

} else {

    xhr = new XMLHttpRequest();

    // 前端设置是否带cookie

    xhr.open('post', 'http://127.0.0.1:7999/Api/PrintInvoicePreview', true);

    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.send(data.msg);

    xhr.onreadystatechange = function () {

    };

}
