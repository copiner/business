/*1. 自动轮播图且无缝   定时器，过渡*/
/*2. 点要随着图片的轮播改变  根据索引切换*/
/*3. 滑动效果  利用touch事件完成*/
/*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
/*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/


var banner = function () {

    /*轮播图*/
    var banner = document.querySelector('.sec_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    console.log(width);
    /*图片容器*/
    var imageBox = banner.querySelector('.j_swiper');
    /*点容器*/
    var pointBox = banner.querySelector('.j_dots');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    console.log(points)
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }


    /*程序的核心 index */
    var index = 0;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*做位移*/
        setTranslateX(-index * width);
    }, 1000);
    /*需要等最后一张动画结束去判断 是否瞬间定位第一张*/
    //在每次过渡结束后会触发该函数
    imageBox.addEventListener('transitionend', function () {

        if (index >= 7) {/*自动滚动的无缝*/
            index = 0;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        } else if (index <= 0) {  /*滑动的时候也需要无缝*/
            index = 7;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }
        /*根据索引设置点*/
        /*此时此刻  index  的取值范围  0-6*/
        /*点索引  index */
        setPoint();
    });

    /*设置点的方法*/
    var setPoint = function () {
        /*index*/
        /*清除样式*/
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        /*给对应的加上样式*/

        points[index].classList.add('now');
    }

    /*绑定事件*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        /*记录起始位置的X坐标*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移  不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslateX(translateX);
        //是否发生了移动
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        /*4.  5.  实现*/
        /*要使用移动的距离*/
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                /*吸附*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*切换*/
                if (distanceX > 0) { /*右滑动 上一张*/
                    index--;
                } else {    /*左滑动 下一张*/
                    index++;
                }
                /*根据index去动画的移动*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    });

}
banner();
