/**
 * Created by Joy-li on 2017/5/30.
 */
angular.module('starter.homePage.controller', [])
    .controller('homePageCtrl', ['$scope', function ($scope) {

        /* 控制搜索框透明度变色 */
        scrollChangeBg();

        /* 返回顶部 */
        goTop();

        /*初始化模拟的数据 -- 数据一般是后台获取*/
        getHeaderSlideData();
        getToutiaoSlideData();


        /* 监听当前路由匹配的模板视图（ion-view）完全加载后执行的事件
         * 因为很多数据是后台拿的，所以有些标签还未完全自动生成！ 在操作这些标签之前，要等ion-view加载完全后执行 */
        $scope.$on('$ionicView.afterEnter', function (event) {
            initHeaderSlider();  // 初始化头部swiper
            initToutiaoSlider(); // 初始化头条swiper
        });

        /* 获取头部滚动数据，模拟一个json对象 */
        function getHeaderSlideData() {
            $scope.headerSlideData = [
                {
                    alt: "双十一预热主场会",
                    src: "img/home/home-headerSlide-1.jpg"
                },
                {
                    alt: "11月11天家电低价不停歇",
                    src: "img/home/home-headerSlide-2.jpg"
                },
                {
                    alt: "家具盛典 好货提前抢",
                    src: "img/home/home-headerSlide-3.jpg"
                },
                {
                    alt: "IT抢券节",
                    src: "img/home/home-headerSlide-4.jpg"
                },
                {
                    alt: "潮流数码 双11爽购攻略",
                    src: "img/home/home-headerSlide-5.jpg"
                }
            ];
        }

        /* 获取头条滚动数据，模拟一个json对象 */
        function getToutiaoSlideData() {
            $scope.toutiaoSlideData = [
                '兰博丹尼 可爱零钱包 5555',
                '桂格即食燕麦片超值装1478g',
                '维达 卫生纸 140g卷纸*10卷'
            ];
        }


        /* 初始化swiper-slide -- headerSlider */
        function initHeaderSlider() {
            var headerSlider = new Swiper('#headerSlider', {
                /* 在slider的前后各添加一张相同的slider -- 播放更加流畅些 */
                slidesPerView: 1,
                /* 分页器 */
                pagination: '.swiper-pagination',
                /* 分页器可点击 */
                paginationClickable: true,
                /* !!自动更新 -- 当我们修改Swiper时，自动重新实例化一次
                 * 因为数据是后台来的，可能或修改变化，slider版面可能发生变化 */
                observer: true,
                observeParents: true,
                /* 自动播放 */
                autoplay: 2000,
                /* 默认第一块slider居中 */
                centeredSlides: true,
                /* 循环播放模式 */
                loop: true,
                /* 用户操作swiper后，是否禁止autoplay，默认值为true */
                autoplayDisableOnInteraction: false
            });
        }

        /* 初始化头条swiper-slider */
        function initToutiaoSlider() {
            var toutiaoSlider = new Swiper('#toutiaoSlider', {
                /* slider方向 -- horizontal和vertical */
                direction: 'vertical',
                autoplay: 2000,
                loop: true,
                observer: true,
                observeParents: true,
                autoplayDisableOnInteraction: false
            });
        }

        /* scroll时，搜索框背景变色 */
        function scrollChangeBg() {
            var $homeContent = $('#home-content');
            var nowOpacity = 0;
            $homeContent.on('scroll', function () {
                if ($(this).scrollTop() / 250 < .85) {
                    nowOpacity = $(this).scrollTop() / 250;
                }
                $("#headerBar-bg").css({
                    opacity: nowOpacity
                });
            });
        }

        /* 点击返回顶部 */
        function goTop() {
            var $homeContent = $('#home-content');
            var $backTop = $('.back_top');
            var top = 0;
            /* 内容页面滚动时，计算说明时候显示goTop盒子 */
            $homeContent.on('scroll', function () {
                top = $homeContent.scrollTop();
                if (top > 200) {
                    $backTop.css('opacity', 1);
                } else {
                    $backTop.css('opacity', 0);
                }
            });
            /* 点击返回顶部 */
            $backTop.on('click', function () {
                $homeContent.animate({
                    scrollTop : 0
                },500);
            })



        }


    }]);