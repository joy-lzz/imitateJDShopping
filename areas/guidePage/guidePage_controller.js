/**
 * Created by Joy-li on 2017/5/25.
 */

/* guidePage controller */
angular.module('starter.guidePage.ctrl', [])
    .controller('guidePageCtrl', [
        '$scope',
        '$location',
        '$state',
        function ($scope, $location,$state) {


            /* 找到所有带有animate属性的div --  onSlideChangeEnd事件使用*/
            var items = $('#guideSlide .swiper-slide .animate');

            /* 引导页slide初始化 */
            var guideSlide = new Swiper('#guideSlide', {
                /* 控制分页 */
                pagination: '.swiper-pagination',
                /* 控制滑动事件结束后执行的回调函数 */
                onSlideChangeEnd: function (swiper) {
                    /* 获得当前显示分页的index */
                    var index = guideSlide.activeIndex;
                    /* 遍历当前的元素，给当前页添加guide-show样式，去除hidden样式 */
                    for (var i = 0, len = items.length; i < len; i++) {

                        if (i === index) {
                            $(items[i]).removeClass('hidden');
                            $(items[i]).addClass('guide-show');
                        } else {
                            $(items[i]).removeClass('guide-show');
                            $(items[i]).addClass('hidden');
                        }

                    }

                }
            });


            $scope.func_goHome = function () {
                /* 方式一：更改路由的path值，路由匹配改变
                 * angular普遍使用 */
                /*$location.path('/tab/home');*/

                /* 方式二：$state对象 -- go()方法实现路由跳转 -- 指定路由名称！！
                 * ionic推荐使用这个方式！！ */
                $state.go('tab.home');
            }


        }]);