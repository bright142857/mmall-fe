require('./index.css');
var listTemplate = require('./index.string');
var _mm  = require('util/mm.js');


var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container       : null,   // 要渲染的div  $('.pagination')
        pageNum         : 1,      // 当前页数
        pageRange       : 3,      // 范围
        onSelectPage    : null    // 回调函数
	}; 
	// 事件处理
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		// 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
       typeof _this.option.onSelectPage === 'function' 
       		 &&_this.option.onSelectPage($this.data('value'));
	});
};

Pagination.prototype.render = function(pagInfo){
	// 合并参数
   this.option = $.extend({},this.defaultOption,pagInfo);
   // 如果不是jquery参数返回
   if(!(this.option.container instanceof jQuery)){
   		return false;
   };
   // 如果当前只有一页,无需渲染直接返回
   if(this.option.pages <= 1){
   	return false;
   };
   // 页面渲染
   this.option.container.html(this.getPaginatonHtml());
};

Pagination.prototype.getPaginatonHtml = function(){
	var html 		= '',
		option 		= this.option,
		pageArray	= [],
		start		= option.pageNum - option.pageRange > 0 
						? option.pageNum - option.pageRange	: 1,
		end 		= option.pageNum + option.pageRange  < option.pages ?
						option.pageNum + option.pageRange : option.pages;
		// 上一页
		pageArray.push({
			name : '上一页',
	        value : this.option.prePage,
	        disabled : !this.option.hasPreviousPage
		});	
		// 数字按钮
		for(var i = start; i <= end; i++){
			pageArray.push({
				 name : i,
	            value : i,
	            active : (i === option.pageNum)
			});			
		}
		//下一页
		 pageArray.push({
	        name : '下一页',
	        value : this.option.nextPage,
	        disabled : !this.option.hasNextPage
    	});

		html = _mm.renderHtml(listTemplate,{
			pageArray 	: pageArray,
			pageNum     : option.pageNum,
        	pages       : option.pages
		});
		
		return html;
};

module.exports = Pagination;