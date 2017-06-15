/**
 * Created by Joy-li on 2017/5/25.
 */

/* 配置模块 */
/* H5客户端web数据库模块 */
angular.module('starter.config', ['indexedDB'])
    .config([
        '$ionicConfigProvider',
        '$indexedDBProvider',
        function ($ionicConfigProvider, $indexedDBProvider) {

            /* 和app数据库建立连接 -- indexedDB */
            $indexedDBProvider
                .connection('jdShopping')
                .upgradeDatabase(1, function (event, db, tx) {
                    var objStore = db.createObjectStore('goods', {keyPath: 'ssn'});
                    /*objStore.createIndex('name_idx', 'name', {unique: false});
                     objStore.createIndex('age_idx', 'age', {unique: false});*/
                });

            /* 缓存配置 */
            // $ionicConfigProvider.views.forwardCache(true);

            /*  不同平台兼容性配置 */

            /* tabs位置统一 */
            $ionicConfigProvider.tabs.position('bottom');

            /* tabs样式统一 */
            $ionicConfigProvider.tabs.style('standard');

            /* navTitle居中 */
            $ionicConfigProvider.navBar.alignTitle('center');

            /* ... */
            $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
            $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-thin-left');

            /* 视图变化过程中，实现动画的默认状态 */
            $ionicConfigProvider.platform.android.views.transition('android');
            $ionicConfigProvider.platform.ios.views.transition('ios');

            /* 切换开关样式 */
            $ionicConfigProvider.form.toggle('ios');


        }]);