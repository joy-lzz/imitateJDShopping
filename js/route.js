// Starter route

/* 总路由！！实现页面的跳转关键！！配合子路由，构建项目总路由表 */

/* 总路由模块 -- 依赖各功能模块的子路由！！汇总成路由表 -- 串联整个项目的路由跳转 */

angular.module('starter.route', [
    'starter.guidePage.route',
    'starter.tab.route',
    'starter.homePage.route',
    'starter.category.route',
    'starter.goodsList.route',
    'starter.details.route',
    'starter.cart.route'
])

    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
            /* 路由表中所有路由都没匹配时，路由跳转到指定页面 -- 重定向 -- redirectTo */
            $urlRouterProvider.otherwise('/tab/home');
        }]);
