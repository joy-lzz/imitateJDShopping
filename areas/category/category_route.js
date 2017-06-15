/**
 * Created by Joy-li on 2017/6/1.
 */
/* category 路由 */
angular.module('starter.category.route', ['starter.category.controller'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tab.category', {
            url: '/category',
            views: {
                'tab-category': {
                    templateUrl: './areas/category/category.html',
                    controller: 'categoryCtrl'
                }
            }
        })

    }]);