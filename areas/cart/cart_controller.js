/**
 * Created by Joy-li on 2017/6/12.
 */

/* cart controller */

angular.module('starter.cart.controller', ['starter.cart.service'])
    .controller('cartCtrl', [
        '$scope',
        '$indexedDB',
        function ($scope, $indexedDB) {

            /* 读取用户选择后存储在本地的信息 */
            $scope.obj_goodsInfo = [];

            /* 初始化购物车数据 */
            $indexedDB.openStore('goods', function (store) {
                store.getAll().then(function (items) {
                    $scope.obj_goodsInfo = items;
                    /* 底部初始化 -- 必须在拿到数据后再执行 */
                    $scope.func_checked()
                });
            });

            /* 实现count加减  -- 更改前台数据的时候，同时将数据upsert到后台的数据库！ indexedDB  */
            $scope.func_addOne = function ($event, $index) {
                /* 阻止默认的路由跳转 */
                $event.preventDefault();
                $event.stopPropagation();
                /* 当前所点击的数据 */
                $scope.obj_goodsInfo[$index].number++;
                /* 将变化后的数据重新更新到数据库中 */
                $indexedDB.openStore('goods', function (store) {
                    store.upsert($scope.obj_goodsInfo[$index]);
                });
                $scope.func_checked();
            };
            $scope.func_subtractOne = function ($event, $index) {
                $event.preventDefault();
                $event.stopPropagation();
                if ($scope.obj_goodsInfo[$index].number === 1) {
                    /* 如果数量为1，点击减一，执行删除该数据函数 */
                    /*data.splice($index,1);*/
                    $indexedDB.openStore('goods', function (store) {
                        store.delete($scope.obj_goodsInfo[$index].ssn);
                    });
                    /* 删除完后，重新绑定数据 */
                    $indexedDB.openStore('goods', function (store) {
                        store.getAll().then(function (items) {
                            $scope.obj_goodsInfo = items;
                            /* 变更数据库数据后，重新计算底部数据 */
                            $scope.func_checked();
                        })
                    });
                } else {
                    $scope.obj_goodsInfo[$index].number--;
                    $indexedDB.openStore('goods', function (store) {
                        store.upsert($scope.obj_goodsInfo[$index]);
                    });
                    $scope.func_checked();
                }
            };

            /* 全选/取消全选 */
            $scope.flag = false;
            $scope.func_selectAll = function ($event) {
                if ($event.target === $('#cart strong.selAllTx')[0]) {
                    /* 点击的是strong，需要手动改变 $scope.flag的值 */
                    /* 当前值取非 */
                    $scope.flag = !$scope.flag;
                }
                /* 更改购物车列表的checkbox勾选 */
                /* angular中尽可能减少使用其他框架 -- jQuery */
                /* $('#myCartList input[type="checkbox"]').attr("checked", $scope.flag);*/
                for (var i = 0, len = $scope.obj_goodsInfo.length; i < len; i++) {
                    $scope.obj_goodsInfo[i].checked = $scope.flag;
                }

            };

            /* 功能函数：
             * 1、计算已选择物品的总件数
             * 2、计算已选择物品的总价格
             * 3、判断是否已经全选 */
            $scope.func_checked = function () {
                /* 初始化数据 */
                $scope.totalPricesAndAmount = {
                    totalPrices: 0,
                    amount: 0
                };
                $scope.selectedGoods = [];
                for (var i = 0, len = $scope.obj_goodsInfo.length; i < len; i++) {
                    if ($scope.obj_goodsInfo[i].checked == true) {
                        $scope.selectedGoods.push($scope.obj_goodsInfo[i])
                    }
                }
                for (var j = 0, len = $scope.selectedGoods.length; j < len; j++) {
                    $scope.totalPricesAndAmount.amount += parseInt($scope.selectedGoods[j].number);
                    $scope.totalPricesAndAmount.totalPrices += parseInt($scope.selectedGoods[j].number) * parseFloat($scope.selectedGoods[j].prise);
                }
                $scope.totalPricesAndAmount.totalPrices = $scope.totalPricesAndAmount.totalPrices.toFixed(2);

                /* 每次单机物品列表中的复选框时，进行判断 */
                if ($scope.selectedGoods.length === $scope.obj_goodsInfo.length) {
                    $scope.flag = true;
                }else {
                    $scope.flag = false;
                }

            };




        }]);