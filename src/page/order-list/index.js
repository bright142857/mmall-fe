require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var _mm =  require('util/mm.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var htmlTemplateindex = require('./index.string');

var _page = {
  data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
  init : function(){
   this.onLoad();
   },
  onLoad : function(){
     this.loadOrderList();
      // 初始化左侧信息
	  navside.init({
	   	name : 'order-list'
	   });
	  // 加载用户信息
  },
  // 加载订单列表
    loadOrderList: function(){
        var _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(htmlTemplateindex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="error-tips">加载订单失败，请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }

};
$(function(){
	_page.init();
})

