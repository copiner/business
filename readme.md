### REVIEW


#### jquery 插件编写

```javascript
//为避免冲突，将我们的方法用一个匿名方法包裹起来
;(function($) {
    //扩展这个方法到jquery
    $.fn.extend({
        //插件名字
        myPlugin: function() {
            //遍历匹配元素的集合
            return this.each(function() {
                //在这里编写相应代码进行处理
            });
        }
    });
 //传递jQuery到方法中，这样我们可以使用任何javascript中的变量来代替"$"      
})(jQuery);
//调用如下
//$("#box").myPlugin();
```

另外，扩展jQuery对象本身
```javascript
//扩展jQuery对象本身
;(function($) {
    //扩展这个方法到jquery
    $.extend({
        //插件名字
        md5: function() {
            //..
        }
    });    
})(jQuery);
//调用如下
//$.md5();
```

#### zepto插件编写

```javascript
;(function($){
    $.fn.myPlugin = function(option){
      //..
    };
})(Zepto);
//调用如下
//$("#box").myPlugin();
```
or

```javascript
;(function($){
    $.extend($.fn, {
    myPlugin: function(option){
       //..
    })
})(Zepto);
//调用如下
//$("#box").myPlugin();
```

自身扩展

```javascript

;(function($){
    $.extend($, {
    md5: function(option){
       //..
    })
})(Zepto);
//调用如下
//$.md5();
```

### gulp插件编写

首先要了解through2，through2的源码仅仅就100多行，本质上就是对于node原生的transform流进行的封装
through2经常被用于处理node的stream

```javascript

```

### TODO

浏览器跨域

深入理解http协议， 手动编写原生http请求



模板引擎原生书写artTemplate ,编写模板引擎
