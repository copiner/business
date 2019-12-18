//函数防抖
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null)   clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random());
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));


//函数节流
//节流throttle代码（时间戳）
var throttle = function(func, delay) {
　　var prev = Date.now();
　　return function() {
　　　　var context = this;
　　　　var args = arguments;
　　　　var now = Date.now();
　　　　if (now - prev >= delay) {
　　　　　　func.apply(context, args);
　　　　　　prev = Date.now();
　　　　}
　　}
}
function handle1() {
　　console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle1, 1000));


// 节流throttle代码

//节流throttle代码（定时器）
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
function handle2() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle2, 1000));

//节流throttle代码（时间戳+定时器）
var throttle = function(func, delay) {
    var timer = null;
    var startTime = Date.now();
    return function() {
        var curTime = Date.now();
        var remaining = delay - (curTime - startTime);
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(func, remaining);
        }
    }
}
function handle3() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle3, 1000));
