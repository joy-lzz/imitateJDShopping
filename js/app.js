// Ionic Starter App

/* 项目启动javaScript文件 */

angular.module('starter', [
    'ionic',
    /* 图片延迟加载 -- 主模块依赖 -- 所有子模块都可以直接使用 */
    'ionicLazyLoad',
    'starter.route',  // 主路由文件 -- 串联关键 -- 类似于路由表
    'starter.global',
    'starter.config'
])

    .run(['$ionicPlatform', function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }]);





