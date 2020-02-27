//获取窗口可视范围的高度
function getClientHeight(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{
        var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}

function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

function getScrollHeight(){
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}

var throttle = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}


window.οnscrοll = function(){
    // 窗口可视范围的高度
    var height=getClientHeight(),
        // 窗口滚动条高度
        theight=getScrollTop(),
        // 窗口可视范围的高度
        rheight=getScrollHeight(),
        // 滚动条距离底部的高度
        bheight=rheight-theight-height;
        console.log(bheight);
    document.getElementById('show').innerHTML='此时浏览器可见区域高度为：'+height+'<br />此时文档内容实际高度为：'+rheight+'<br />此时滚动条距离顶部的高度为：'+theight+'<br />此时滚动条距离底部的高度为：'+bheight;
}

/*
$(window).scroll(throttle(function(){
  var scrollTop = $(window).scrollTop();
  var scrollHeight = $(document).height();
  var windowHeight = $(window).height();
  // console.log('scrollTop'+scrollTop);
  // console.log('scrollHeight'+scrollHeight);
  // console.log('windowHeight'+windowHeight);
  console.log(scrollHeight - scrollTop - windowHeight <= 100);
  if(scrollHeight - scrollTop - windowHeight <= 100){
      //加载更多
　　}
},300));
*/
