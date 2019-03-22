'use strict'
var _mm = require('util/mm.js');

var _order={
     //获取商品清单
    getProductList : function (resolve,reject) {
        //退出登录
        _mm.request({
            url:_mm.getServiceUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        });
    },
    // 创建订单
    submitProduct : function (shoppingInfo,resolve,reject) {
        //退出登录
        _mm.request({
            url:_mm.getServiceUrl('/order/create.do'),
            data:shoppingInfo,
            success : resolve,
            error : reject
        });
    },

     // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServiceUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
     // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServiceUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServiceUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _order;