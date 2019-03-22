require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm    =  require('util/mm.js');
var _order   =  require('service/order-service.js');
var _address =  require('service/address-service.js');
var htmlTemplateAddress = require('./address-list.string');
var htmlTemplateProduct = require('./product-list.string');
var addressModal        = require('./address-modal.js');

var _page = {
  data:{},
  init : function(){
     this.onLoad();
     this.bindEvent();
  },  
  onLoad : function(){
   this.loadAddressList();
   this.loadProductList();
  },
  bindEvent : function(){
    var _this = this;
   // 选中地址
   $(document).on('click','.panel-item',function(){
      $(this).addClass('active').siblings('.panel-item').removeClass('active');
      var productId = $(this).data('id');
      _this.data.productSelectId = productId;
   });
   // 提交订单
   $(document).on('click','.order-submit',function(){
      var shoppingId = _this.data.productSelectId;
      if(!shoppingId){
        _mm.errorTips('请选择收货地址后提交');
        return false;
      }
      _order.submitProduct({
        shippingId : shoppingId
      },function(res,msg){
         window.location.href = './payment.html?orderNumber=' + res.orderNo;
      },function(errMsg){
        _mm.errorTips(errMsg);
      });
   });
    // 添加新地址
   $(document).on('click','.address-item',function(){
      addressModal.show({
         isUpdate : false,
         onSuccess : function(){
          _this.loadAddressList();
         }
      });
   });
   // 地址的编辑
    $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.panel-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    // 地址删除
     $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.panel-item').data('id');
            if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });

  },
  // 加载收货地址
  loadAddressList:function(){
    var _this = this;
     $('.address-con').html('<div class="loading"></div>');
  	_address.getaddressList(
  		function(res,msg){
        _this.addressFilter(res);
         var addressList =  _mm.renderHtml(htmlTemplateAddress,res);
         $('.address-con').html(addressList);
  		},
  		function(msg){
         $('.address-con').html('<p class="err-tip">获取收货地址失败,刷新重试一下</p>');
  		}
  	)
  },
  // 处理地址列表中选中状态
    addressFilter : function(data){
        if(this.data.productSelectId){
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.productSelectId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            // 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.productSelectId = null;
            }
        }
    },
  // 加载商品列表
  loadProductList:function(){
    $('.product-con').html('<div class="loading"></div>');
  	_order.getProductList(function(res,msg){
  		var productList = _mm.renderHtml(htmlTemplateProduct,res);
      $('.product-con').html(productList);
  	},function(msg){
  		$('.product-con').html('<p class="err-tip">获取订单失败,刷新重试一下</p>');
  	});
  },
  
};



$(function(){
  _page.init();
})

