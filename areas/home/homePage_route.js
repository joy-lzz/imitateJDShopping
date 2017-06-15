/**
 * Created by Joy-li on 2017/5/30.
 */

/* homePage_route */
angular.module('starter.homePage.route', ['starter.homePage.controller'])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            /* 注意！ 路由名字不能用‘-’连接，要用'.'的方式！！-- 不然出错 */
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: './areas/home/homePage.html',
                        controller: 'homePageCtrl'
                    }
                }

            });

    }]);