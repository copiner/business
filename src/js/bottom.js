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

$(window).scroll(throttle(function(){
  var scrollTop = $(window).scrollTop();
  var scrollHeight = $(document).height();
  var windowHeight = $(window).height();
  // console.log('scrollTop'+scrollTop);
  // console.log('scrollHeight'+scrollHeight);
  // console.log('windowHeight'+windowHeight);
  console.log(scrollHeight - scrollTop - windowHeight <= 100);
  if(scrollHeight - scrollTop - windowHeight <= 100){
      Index.siteMore();//加载更多
　　}
},300));
