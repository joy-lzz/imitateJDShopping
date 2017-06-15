/**
 * Created by Joy-li on 2017/6/12.
 */

/* cart route */
angular.module('starter.cart.route', ['starter.cart.controller'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tab.cart', {
            url: '/cart',
            views : {
                'tab-cart': {
                    templateUrl: './areas/cart/cart.html',
                    controller: 'cartCtrl'
                }
            }
        })
    }]);