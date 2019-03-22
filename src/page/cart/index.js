require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm =  require('util/mm.js');
var _cart =  require('service/cart-service.js');
var htmlTemplateindex = require('./index.string');
var _page = {
  
  init : function(){
     this.onLoad();
     this.bindEvent();
   }, 
  data : {},
  onLoad : function(){
    this.loadCart();
  },
  bindEvent : function(){
    var _this = this;
    // 选中/取消选中
    $(document).on('click','.cart-select',function(){
      // 获取procuctId
      var $this       = $(this),
          $productId  = $this.parents('.cart-table').data('product-id');       
      // 判断是否选中
      if($this.is(':checked')){ // 选中
          _cart.select($productId,function(res){
            _this.renderHtmlCart(res);
          },function(){
             _this.showErrorTips();
          })
       }else{
           _cart.unSelect($productId,function(res){
              _this.renderHtmlCart(res);
          },function(){
             _this.showErrorTips();
          })
       }});
    // 全选/取消全选
    $(document).on('click','.cart-select-all',function(){
       var $this       = $(this);
       if($this.is(':checked')){ // 选中
          _cart.selectAll(function(res){
            _this.renderHtmlCart(res);
          },function(){
            _this.showErrorTips();
          })
       }else{
           _cart.unSelectAll(function(res){
              _this.renderHtmlCart(res);
          },function(){
             _this.showErrorTips();
          })
       }})  
     // 商品数量的变化
    $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.update({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderHtmlCart(res);
            }, function(errMsg){
                _this.showErrorTips();
            });
        });
        // 删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }  
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
  },
  
  // 加载cartList列表
  loadCart : function(){
    var _this = this,
        $wrap = $('.page-wrap');
    _cart.list(function(res){
      _this.renderHtmlCart(res);
    },function(err){
      _this.showErrorTips();
    })
  },
 // 删除指定商品，支持批量，productId用逗号分割
  deleteCartProduct : function(productIds){
      var _this = this;
      _cart.deleteProduct(productIds, function(res){
          _this.renderHtmlCart(res);
      }, function(errMsg){
          _this.showErrorTips();
      });
  },
  // 渲染HTML
  renderHtmlCart : function(data){
    // 缓存购物车
    this.data.cartInfo = data;
    data.notEmpty =  this.data.cartInfo.cartProductVoList.length;
    var carthtml  =   _mm.renderHtml(htmlTemplateindex,data);
    $('.page-wrap').html(carthtml);
    nav.loadCartCount();
  },
  // 错误提示
  showErrorTips : function(){
    var $wrap = $('.page-wrap');
    $wrap.html('<p class="err-tip">好像出错了,刷新下试试</p>');
  }
};
$(function(){
  _page.init();
})

