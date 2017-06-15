/**
 * Created by Joy-li on 2017/6/5.
 */

/* goodsList 控制器 */

angular.module('starter.goodsList.controller', ['starter.goodsList.service'])
    .controller('goodsListCtrl', [
        '$scope',
        '$stateParams',
        '$ionicHistory',
        '$ionicLoading',
        'goodsListService',
        function ($scope, $stateParams, $ionicHistory, $ionicLoading, goodsListService) {


            // 列表数据对象
            $scope.obj_goodsListData = [];

            // 默认让他有更多数据可以加载  -- flag
            $scope.pms_isMoreItemsAvailable = true;

            // 分页查询对象,保存一些分页信息和查询条件
            $scope.obj_paginationInfo = {
                amountMax: "",
                amountMin: "",
                billNum: "",
                createUser: "",
                dateFrom: "",
                dateTo: "",
                deptID: "",
                deptName: "",
                keyWord: "",
                loginName: "",
                billType: "",
                pageNum: 1,
                pageSize: 10,
                sortFlag: "0",
                sortType: "desc",
                typeNumber: ""
            };


            /* 在我们进入视图页面的时候，调用我们的刷新方法 -- 生命周期要理解 */
            $scope.$on('$ionicView.beforeEnter', function (e) {
                $scope.func_refreshGoodsList();
            });

            /* 刷新获取最新数据 -- 每次刷新都是全新状态 */
            $scope.func_refreshGoodsList = function () {
                // 每次刷新将页码值变为1，增强我们代码的健壮性 -- 为了安全考虑
                $scope.obj_paginationInfo.pageNum = 1;
                // 将商品编号传入分页信息中
                $scope.obj_paginationInfo.typeNumber = $stateParams.typeNumber;
                // 将分页信息变为字符串对象
                var message = JSON.stringify($scope.obj_paginationInfo);
                var promise = goodsListService.refreshGoodsList(message);
                promise.then(
                    // 成功的回调函数
                    function (data) {
                        // 如果数据不为空，我们将数据挂载到 $scope.obj_goodsListData数组中
                        if (data != null) {
                            $scope.obj_goodsListData = data;
                        }
                        else {
                            $scope.pms_isMoreItemsAvailable = false;
                        }
                    },
                    //失败的回调函数
                    function (reason) {
                        console.log("3");

                    }).finally(function () {
                        // 停止广播ion-refresher
                        $scope.$broadcast('scroll.refreshComplete');
                        // 刷新之后我们再让他默认变回来可以加载更多数据
                        $scope.pms_isMoreItemsAvailable = true;
                    })
            };


            /* 获取更多数据的方法（上拉加载更多数据）*/
            $scope.func_loadMoreGoodsList = function () {
                // 为了用户友好性，加一个遮罩层
                $ionicLoading.show({
                    template: 'Loading...'
                });
                // 增加分页信息
                $scope.obj_paginationInfo.pageNum += 1;
                /* 测试函数是否执行 */
                /* console.log($scope.obj_paginationInfo.pageNum); */
                // 将商品编号传入分页信息中
                $scope.obj_paginationInfo.typeNumber = $stateParams.typeNumber;
                // 将分页信息变为字符串对象
                var message = JSON.stringify($scope.obj_paginationInfo);
                var promise = goodsListService.loadMoreGoodsList(message);
                promise.then(
                    // 成功的回调函数
                    function (data) {
                        // 如果数据不为空，我们将数据挂载到 $scope.obj_goodsListData数组中
                        if (data != null) {
                            // 将返回的数据一条条添加到obj_goodsListData数组中
                            /*$.each(data, function (index, item) {
                             $scope.obj_goodsListData.push(item);
                             });*/
                            /* 最简单的方式实现数组的拼接！！ */
                            Array.prototype.push.apply($scope.obj_goodsListData, data);
                            /* console.log($scope.obj_goodsListData.length); */
                        }
                        else {
                            $scope.pms_isMoreItemsAvailable = false;
                        }

                    },
                    //失败的回调函数
                    function (reason) {

                    }).finally(function () {
                        // 停止广播ion-infinite
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        // 关闭遮罩层
                        setTimeout(function () {
                            $ionicLoading.hide();
                        }, 1000)

                    })
            };


            $scope.func_goBack = function () {
                $ionicHistory.goBack();
            };


            /* 测试 */
            /*var promise = goodsListService.test();
             promise.then(function (data) {
             console.log(data) ;
             }, function (error) {
             console.log(error);
             });*/

            /* 测试promise对象的执行顺序 */
            /*var promise1 = goodsListService.testPromise();*/

            /* promise对象的then()方法return回来的结果是下一个then()方法的输入参数！！
             * 也就是上一个的输出是下一个的输入
             * 这样的操作很好的避免了异步操作的层层嵌套！！ 代码看起来更整洁规范 */
            /*promise1.then(function (data) {
             return data;
             }).then(function (data) {
             console.log(data + '@@第二个then方法');
             });*/


        }]);