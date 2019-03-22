require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var _mm =  require('util/mm.js');
var _product =  require('service/product-service.js');
var _cart =  require('service/cart-service.js');
var htmlTemplateindex = require('./index.string');
var _page = {
  data : {
      productId : _mm.getUrlParam('productId') || ''
    
  },
  init : function(){
     this.onLoad();
     this.bindEvent();
   }, 

  onLoad : function(){
    this.loadDetail();
  },

  bindEvent : function(){
   var _this= this;
   // 小图换主图
   $(document).on('mouseenter','.p-item-img',function(){
        var thisUrl = $(this).attr('src');
        $('.p-main-img').attr('src',thisUrl);
   });
   // 数量加减
   $(document).on('click','.p-count-btn',function(){
        var oper = $(this).hasClass('plus')  ? 'plus' : 'minus',
        $pCount  = $('.p-count'),
        countVal = parseInt($('.p-count').val()),
        plusVal  = _this.data.stock,  //库存
        minusVal = 0;
       if(oper === 'plus'){
            $pCount.val(countVal < plusVal ? countVal + 1 : plusVal);
        } else if(oper === 'minus'){
            $pCount.val(countVal > minusVal ? countVal - 1: minusVal);
        }
   });
   // 加入购物车
   $(document).on('click','.cart-add',function(){
      var $pCount =parseInt($('.p-count').val());
        if($pCount > 0){
        _cart.add({
          productId : _this.data.productId,
          count     : $pCount
        },function(res){
            window.location.href = "./result.html?type=add-cart"
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
        }
        
   });
  },
  
  loadDetail : function(){
    if(!this.data.productId){
      _mm.goHome();
    }
    var _this = this,
        _html = '',
        $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.detail(_this.data.productId,function(res){
          _this.data.stock = res.stock;
          _this.assembly(res);
         _html =  _mm.renderHtml(htmlTemplateindex,res);
         $pageWrap.html(_html);
        },function(errMsg){
          $pageWrap.html('<p class="error-tips">商品很淘气,找不到了</p>');
        })
  },
  assembly : function(res){
    res.subImages = res.subImages.split(',');
  }
};
$(function(){
  _page.init();
})

