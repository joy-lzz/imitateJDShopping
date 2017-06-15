/* 详细页面 路由 */
angular.module('starter.details.route', ['starter.details.controller'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('details',{
            url: '/details/:goodsId',
            templateUrl: './areas/details/details.html',
            controller: 'detailsCtrl'
        })

    }]);
