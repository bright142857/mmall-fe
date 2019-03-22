/**
 * @author wangmingliangwx
 * @Email  bright142857@foxmail.com
 * @version : user-service, v 0.1 2018/9/2 12:03 wangmingliangwx Exp$
 */

'use strict'
var _mm = require('util/mm.js');

var _cart={
     //获取购物车数量
    getCartCount : function (resolve,reject) {
        //退出登录
        _mm.request({
            url:_mm.getServiceUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error : reject
        });
    },
    // 添加购物车
    add :function(productInfo,resolve,reject){
    	 _mm.request({
            url     : _mm.getServiceUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
     // 购物车List列表
    list :function(resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 购物车选中某个商品
    select :function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 购物车取消选中某个商品
    unSelect :function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 购物车选中某个商品
    selectAll :function(resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 购物车取消选中某个商品
    unSelectAll :function(resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新产品的数量
    update :function(productInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 移除某个商品
    deleteProduct : function(productIds,resolve,reject){
         _mm.request({
            url     : _mm.getServiceUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
};
module.exports = _cart;