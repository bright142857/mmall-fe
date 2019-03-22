'use strict'
var _mm = require('util/mm.js');

var _product={
    // 获取列表页
    list : function(listData,resolve,reject){
        _mm.request({
                    url:_mm.getServiceUrl('/product/list.do'),
                    data   : listData,
                    success : resolve,
                    error : reject
                });
    },
    // 查看详情
    detail : function(productId,resolve,reject){
    	_mm.request({
                    url:_mm.getServiceUrl('/product/detail.do'),
                    data   : {
                    	productId : productId
                    },
                    success : resolve,
                    error : reject
                });
    }

    
};
module.exports = _product;