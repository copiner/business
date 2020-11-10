
window.onload = function(){

  var dataArr = [];
  var dataList = document.getElementById('dataList');
  var input = document.getElementById('input');

  //初始化数据
  var childs = dataList.children;  //在IE下注释也算节点,不能用于
  for (var i = 0; i < childs.length; i++) {
      dataArr.push(childs[i].innerText);
  }
  console.log(dataArr);

  //focus事件
  input.onfocus = function(){
    dataList.style.display = "";
  }

  var ifilter = function(event){
    var e = event.target || event.srcElement;
    var str = e.value;
    console.log(str);
    dataList.innerHTML = '';  //清空div下的所有P元素
    dataArr.forEach(function (item) {
        if(item.indexOf(str) != -1){
            var p = document.createElement('p');
            var text = document.createTextNode(item);
            p.appendChild(text);
            dataList.appendChild(p);
        }
    })
    console.log("dataList.innerHTML：" + dataList.innerHTML)
    if(dataList.innerHTML == ''){
        var p = document.createElement('p');
        var text = document.createTextNode('暂无数据');
        p.style.color = '#d7d7d7';
        p.appendChild(text);
        dataList.appendChild(p);
    }
    p.onclick = function () { event.stopImmediatePropagation(); }  //阻止事件的冒泡
  }
  //输入事件
  input.oninput = debounce(ifilter,500);


  dataList.onclick = function(event){//利用事件委托机制,获取点击的P源
    var e = event.target || event.srcElement;
    console.log(e);
    input.value = e.innerText;
    dataList.style.display = 'none';
  }


}


function debounce(fn,delay){
    var timer = null //借助闭包
    return function() {
        var context = this
        var args = arguments
        if(timer) clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
    }
}

/**
   stopImmediatePropagation() 和 stopPropagation()的区别在哪儿呢？
　　后者只会阻止冒泡或者是捕获。 但是前者除此之外还会阻止该元素的其他事件发生，但是后者就不会阻止其他事件的发生
 **/

 function debounces(fn,delay){
     var timer = null; //借助闭包
     return function() {
         if(timer) clearTimeout(timer)
         timer = setTimeout(fn,delay) // 简化写法
     }
 }
