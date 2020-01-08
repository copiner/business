var box = document.querySelector('.j_box');
var content = document.querySelector('.j_box_con');
document.addEventListener('click', function(e) {
  console.log('document');
}, false);
document.body.addEventListener('click', function(e) {
  console.log('body');
}, false);
box.addEventListener('click', function(e) {
  console.log('box');
}, false);
content.addEventListener('click', function(e) {
  console.log('content');
}, false);

var abc = document.querySelector('.j_abc');

abc.addEventListener('click', function(e) {
  console.log('a');
  e.stopPropagation();//阻止事件冒泡
  e.preventDefault();//阻止默认事件

}, false);

// $(".j_box_con a").on('click',function(e){
//   return false;
// })


/*----------------事件捕获------------------------*/

// document.addEventListener('click', function(e) {
//   console.log('document');
// }, true);
// document.body.addEventListener('click', function(e) {
//   console.log('body');
// }, true);
// box.addEventListener('click', function(e) {
//   console.log('box');
// }, true);
// content.addEventListener('click', function(e) {
//   console.log('content');
// }, true);
