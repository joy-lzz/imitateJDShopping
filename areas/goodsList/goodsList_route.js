/**
 * Created by Joy-li on 2017/6/5.
 */

/* goodsList 路由 */

angular.module('starter.goodsList.route', ['starter.goodsList.controller'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('goodsList', {
            url: '/goodsList/:typeNumber',
            templateUrl: './areas/goodsList/goodsList.html',
            controller: 'goodsListCtrl'
        })

    }]);