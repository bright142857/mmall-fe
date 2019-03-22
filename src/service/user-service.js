/**
 * @author wangmingliangwx
 * @Email  bright142857@foxmail.com
 * @version : user-service, v 0.1 2018/9/2 12:03 wangmingliangwx Exp$
 */

'use strict'
var _mm = require('util/mm.js');

var _user={
    // 登录
    login : function(value,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/user/login.do'),
                    method : 'POST',
                    data   : value,
                    success : resolve,
                    error : reject
                });
    },

    // 注册提交
    register : function(obj,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/user/register.do'),
                    method : 'POST',
                    data   : obj,
                    success : resolve,
                    error : reject
                });
    },

     // 检查用户名是否有效
    checkValid : function(obj,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/user/check_valid.do'),
                    method : 'POST',
                    data   : obj,
                    success : resolve,
                    error : reject
                });
    },

    // 获取用户信息
    checkLogin : function (resolve,reject) {
        _mm.request({
            url:_mm.getServiceUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },

    // 获取修改密码提示问题
    forgetGetQuestion : function(username,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/user/forget_get_question.do'),
                    method : 'POST',
                    data   : {
                        username : username
                    },
                    success : resolve,
                    error : reject
                });
    },
    // 提交问题答案
    forgetCheckAnswer : function(userinfo,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/user/forget_check_answer.do'),
                    method : 'POST',
                    data   : userinfo,
                    success : resolve,
                    error : reject
                });
    },
    // 重设密码
    forgetResetPassword: function(userinfo,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl(' /user/forget_reset_password.do'),
                    method : 'POST',
                    data   : userinfo,
                    success : resolve,
                    error : reject
                });
    },
    // 获取用户信息
    getInformation : function (resolve,reject) {
        // 退出登录
        _mm.request({
            url:_mm.getServiceUrl('/user/get_information.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 修改用户信息
    updateInformation : function(userinfo,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl(' /user/update_information.do'),
                    method : 'POST',
                    data   : userinfo,
                    success : resolve,
                    error : reject
                });
    },
    // 登录状态重置密码
    resetPassword : function(userinfo,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl(' /user/reset_password.do'),
                    method : 'POST',
                    data   : userinfo,
                    success : resolve,
                    error : reject
                });
    },
    // 登出
    logout : function (resolve,reject) {
        // 退出登录
        _mm.request({
            url:_mm.getServiceUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
};
module.exports = _user;