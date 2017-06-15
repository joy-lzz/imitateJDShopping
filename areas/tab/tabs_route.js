/**
 * Created by Joy-li on 2017/5/31.
 */

/* tab route -- tab页面抽象虚拟路由配置 */
angular.module('starter.tab.route', ['starter.tab.controller'])
    .config(['$stateProvider', function ($stateProvider) {
        /* 抽象虚拟路由 -- 不能直接使用，需要配合子路由一起才能呈现页面 */
        $stateProvider.state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: './areas/tab/tabs.html',
            controller: 'tabCtrl'
        });
    }]);