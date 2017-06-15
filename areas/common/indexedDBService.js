/**
 * Created by Joy-li on 2017/6/8.
 */

/* indexedDB 服务 */

angular.module('db', [])
    .service('indexedDB', ['$http', '$q', function ($http, $q) {

        /* indexedDB兼容性配置 */
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;


        /* this指向当前indexedDB服务对象 -- 存起来 */
        var _self = this;

        /* 配置indexedDB中的某一个store */
        var myDB = {
            name: 'db',
            version: 1,
            /* dataBase -- 与数据库建立连接后，值等于success的event.target.result */
            db: null
        };


        /* 与数据库dataBase建立连接 */
        _self.openDB = function (name, version) {
            /* 延迟对象 */
            var d = $q.defer();
            /* 如果用户有自定义store的name和version属性，则按自定义值来标识 */
            var name = name || myDB.name;
            var version = version || myDB.version;

            /* 打开数据库 -- 根据open传入的参数决定打开哪一张表格，如果当前没有该表格，则创建表
             * 每一张表的标识都是 name和version参数！！ */
            var result = window.indexedDB.open(name, version);

            /* 错误 */
            result.onerror = function (e) {
                console.log("Open DB Error!");
                d.reject('error');
            };

            /* 成功打开 */
            result.onsuccess = function (e) {
                /* 将打开的dataBase赋值给配置对象 -- 与找到的数据库建立连接 myDB.db指向当前数据库 */
                myDB.db = e.target.result;
                console.log(myDB.db);
                d.resolve('success');
            };


            /* 数据库版本变更 */
            /* 新建一个dataBase的时候，会自动执行这个事件 -- 创建两个store -- 名分别为users和infos */
            result.onupgradeneeded = function (e) {
                myDB.db = e.target.result;
                /* 建表时，myDB.db.objectStoreNames.contains('users')返回false */
                if (!myDB.db.objectStoreNames.contains('users')) {
                    /* 创建名为 “users” 的store表 -- 并指定关键路径 */
                    myDB.db.createObjectStore('users', {keyPath: 'id'});
                }
                if (!myDB.db.objectStoreNames.contains('infos')) {
                    myDB.db.createObjectStore('infos', {autoIncrement: true});
                }
                d.resolve('upgradeneeded');
            };
            return d.promise;
        };

        /* 获取数据 */
        _self.get = function (db, storeName, key) {
            var d = $q.defer();
            /* 检测是否传入dataBase */
            var db = db || myDB.db;
            /* 通过IDBDatabase得到IDBTransaction */
            var transaction = db.transaction(storeName);
            /* 通过IDBTransaction得到IDBObjectStore */
            var store = transaction.objectStore(storeName);
            /* 通过表获取数据 */
            var result = store.get(key);
            result.onsuccess = function (e) {
                _self.result = e.target.result;
                d.resolve(_self.result);
            };
            result.onerror = function (e) {
                d.reject(e);
            };
            return d.promise;
        };

        /* 添加数据 */
        _self.put = function (db, storeName, value) {
            var db = db || myDB.db;
            console.log(myDB.db);
            var transaction = db.transaction(storeName, 'readwrite');
            var store = transaction.objectStore(storeName);
            if (value !== null && value !== undefined) {
                /* 将数据put进入store表 */
                store.put(value);
            }
        };

        /* 删除数据 */
        _self.remove = function (db, storeName, value) {
            var db = db || myDB.db;
            var transaction = db.transaction(storeName, 'readwrite');
            var store = transaction.objectStore(storeName);
            var result = store.delete(value);
            result.onsuccess = function (e) {
                console.log(e);
            };
            result.onerror = function (e) {
                console.log(e);
            };
        };


        return _self;

    }]);