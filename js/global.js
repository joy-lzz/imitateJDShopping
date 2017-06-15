/**
 * Created by Joy-li on 2017/5/25.
 */

/* 全局变量配置 -- 全局常量对象 -- 所有子模块使用时，不需要写依赖，仅注入全局常量对象即可 */
angular.module('starter.global', [])
    .constant('globalConst', {
        'SERVER_PATH': '192.168.1.1:8080/',
        'VERSION': "1.2.1",
        'PLATFORM': 'ANDROID'
    });