/*details 控制器*/
angular.module('starter.details.controller', ['starter.details.service'])
    .controller('detailsCtrl', [
        '$scope',
        '$stateParams',
        '$state',
        '$ionicHistory',
        '$indexedDB',
        function ($scope, $stateParams, $state, $ionicHistory, $indexedDB) {


            /* 默认购物车物品数量 */
            $scope.obj_cartCount = {
                count: "0"
            };

            /* 显示本地数据库中已选商品的数量 */
            function showGoodsNumber() {
                $indexedDB.openStore('goods', function (store) {
                    store.getAll().then(function (allItems) {
                        $.each(allItems, function (index, item) {
                            $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) +
                                parseInt(item.number);
                        })
                    })
                });
            }

            showGoodsNumber();





            /* 通过后台获取到的商品详细信息 */
            $scope.obj_goodsInfo = {
                goodsId: "200067",
                description: "若昕 韩版睡衣女冬法兰绒家居服加厚珊瑚绒女人卡通甜美睡衣秋冬套装 66651K 女",
                prise: "66",
                picture: [],
                src: "",
                isFork: false,
                colorGroup: [
                    {name: "红色", value: "red"},
                    {name: "蓝色", value: "blue"}
                ],
                sizeGroup: [
                    {name: "S", value: "S"},
                    {name: "M", value: "M"},
                    {name: "L", value: "L"}
                ]
            };

            /* 用户选择信息 -- 保存并维护 */
            $scope.obj_goodsDetailInfo = {
                goodsId: $scope.obj_goodsInfo.goodsId,
                isFork: $scope.obj_goodsInfo.isFork,
                description: $scope.obj_goodsInfo.description,
                src: $scope.obj_goodsInfo.src,
                prise: $scope.obj_goodsInfo.prise,
                color: "",
                size: "s",
                number: 1,
                checked: false
            };


            /* 数量加1 */
            $scope.jia1 = function () {
                $scope.obj_goodsDetailInfo.number++;
            };

            /* 数量减1 */
            $scope.jian1 = function () {
                if ($scope.obj_goodsDetailInfo.number > 1) {
                    $scope.obj_goodsDetailInfo.number--;
                }
            };


            /* 加入购物车方法 */

            /* 重要一点：indexedDB非关系型数据库是一次请求打开store只能执行一次操作！！！！ */
            $scope.func_addToCart = function () {
                /* 申明一个存放数据的对象 */
                var obj_newData = {};

                /* 将用户当前选择的数据copy一份给我们创建的对象 */
                angular.copy($scope.obj_goodsDetailInfo, obj_newData);

                /* 将商品id、color、size都设置为ssn的信息
                 * 是因为，通过ssn可以直观的判断，所选择的商品是否已经存在
                 * 将商品所有可变参数都罗列在ssn参数值中 */
                obj_newData.ssn = obj_newData.goodsId + "-" + obj_newData.color + "-" + obj_newData.size;

                /* 查找打开的store中是否有此条数据  --  query()和$eq()方法配合  */
                $indexedDB.openStore('goods', function (store) {
                    /* 得到当前ssn对应的promise对象 -- 如果没有，也返回相应promise对象 */
                    var goodsInfo = store.query().$eq(obj_newData.ssn);
                    /* update 数据 */
                    store.eachWhere(goodsInfo).then(function (item) {
                        /* 如果根据obj_newData.ssn在数据库中匹配到了item，那么返回含有item的数组，
                         * 如果没匹配到，返回空数组 */
                        if (item.length != 0) {
                            /* 商品存在 */
                            /* 增加用户新增的商品数量 */
                            item[0].number = parseInt(item[0].number) + parseInt(obj_newData.number);
                            $indexedDB.openStore('goods', function (store) {
                                /* 更新数据库中对应的ssn处的数据！！ */
                                store.upsert(item);
                            });
                            /*更改购物车数量*/
                            $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) + parseInt(obj_newData.number);
                        } else {
                            /* 商品不存在 */
                            $indexedDB.openStore('goods', function (store) {
                                /* 将商品信息插入表格 */
                                store.insert(obj_newData);
                                /*更改购物车数量 -- 将新增加的商品数量绑定到前台*/
                                $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) + parseInt(obj_newData.number);
                            });
                        }

                    });

                });

            };


            /* 返回首页面 */
            $scope.func_goHome = function () {
                $state.go("tab.home");
            };

            /* 返回前一个页面 */
            $scope.func_goBack = function () {
                $ionicHistory.goBack();
            }


        }]);




