/**
 * Created by Joy-li on 2017/5/25.
 */

/* guidePage route */
angular.module('starter.guidePage.route', ['starter.guidePage.ctrl'])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('guidePage',{
                url : '/guidePage',
                templateUrl : './areas/guidePage/guidePage.html',
                controller : 'guidePageCtrl'
            })
    }]);