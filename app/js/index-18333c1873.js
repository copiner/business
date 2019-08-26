/**
 * Created by wdaonngg@gmail.com on 2019/08/09.
 * 首页
 */
var Index = {
  initData : function () {


  },

  initEvent : function () {
    Index.initPage()
  },

  initPage : function(){

    var arr = [
      {name:"111"},{name:"222"},{name:"333"},{name:"444"},{name:"555"},
      {name:"666"},{name:"777"},{name:"888"},{name:"999"},{name:"aaa"},
      {name:"bbb"},{name:"ccc"},{name:"ddd"},{name:"eee"},{name:"fff"},
      {name:"ggg"}
    ];

    // console.log(arr.shift());
    // console.log(arr.shift());
    //console.log(Math.ceil(arr.length/5));
    var len = Math.ceil(arr.length/5)
    for(var i=0; i< len; i++){
      if(arr.length > 0){
        var temp = arr.slice(0,5);
        console.log(temp);
      }
      arr = arr.slice(5);
    }

    // var tarr = arr.slice(20);
    // console.log(tarr);
    //
    // var temp = arr.slice(0,5);
    // arr = arr.slice(5);
    // console.log(temp);
    // console.log(arr);

  },

  init : function () {
    Index.initData();
    Index.initEvent();
  }

};

Index.init();
