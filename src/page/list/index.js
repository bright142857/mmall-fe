require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var _mm =  require('util/mm.js');
var Pagination = require('util/pagination/index.js');
var _product =  require('service/product-service.js');
var htmlTemplateindex = require('./index.string');


var _page = {
  data : {
    dataList : {
      categoryId : _mm.getUrlParam('categoryId') || '',
      keyword    : _mm.getUrlParam('keyword')    || '',
      pageNum    : _mm.getUrlParam('pageNum')    || 1, 
      pageSize   : _mm.getUrlParam('pageSize')   || 10, 
      orderBy    : _mm.getUrlParam('orderBy')    || 'dafault'
    }
  },
  init : function(){
     this.onLoad();
     this.bindEvent();
   }, 
  onLoad : function(){
    this.LoadList();
  },
  bindEvent : function(){
    var _this = this;
    // 点击排序
    $('.sort-item').click(function(){
      var $this = $(this);
      if($this.data('type') === 'default'){ // 默认排序
        // 如果已经选中,直接返回
        if($this.hasClass('active')){
          return false;
        }
        _this.data.dataList.pageNum = 1;
        _this.data.dataList.orderBy = 'dafault';
        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
      } else if($this.data('type') === 'price'){ // 价格排序
        if($this.hasClass('asc')){
          $this.addClass('active desc').removeClass('asc').siblings('.sort-item').removeClass('active');
          _this.data.dataList.pageNum = 1;
          _this.data.dataList.orderBy = 'price_desc';
        }else{
          $this.addClass('active asc').removeClass('desc').siblings('.sort-item').removeClass('active');
          _this.data.dataList.pageNum = 1;
          _this.data.dataList.orderBy = 'price_asc';
        }
      };
      _this.LoadList();
    })
  },
  
  // 加载列表页
  LoadList : function(){
    var _this     = this,
        listHtml  = '',
        dataList  = this.data.dataList,
        $pListCon = $('.p-list-con');
        // 去除无用参数
        !!dataList.categoryId ? 
          (delete dataList.keyword) : (delete dataList.categoryId);
        $pListCon.html('<div class="loading"></div>');
        _product.list(dataList,function(res){
            listHtml = _mm.renderHtml(htmlTemplateindex,{
              list : res.list
            });
        $pListCon.html(listHtml);
        _this.loadPagination({
          pageNum         : res.pageNum, // 当前页数
          pages            : res.pages, // 总页数
          hasPreviousPage : res.hasPreviousPage, // 是否有上一页
          prePage         : res.prePage,
          hasNextPage     : res.hasNextPage, //是否有下一页
          nextPage        : res.nextPage 
        });
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
  },
  // 加载页码
  loadPagination : function(pageInfo){
    var _this = this;
    !! this.pagination ? '' : (this.pagination = new  Pagination());
     this.pagination.render($.extend({},pageInfo,{
        container     : $('.pagination'),
        onSelectPage  : function(pageNum){
            _this.data.dataList.pageNum = pageNum;
            // 重新加载
            _this.LoadList();
        }
     }))
  }



};
$(function(){
  _page.init();
})

