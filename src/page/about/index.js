require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
/*var _mm =  require('util/mm.js');
var _user =  require('service/user-service.js');
var htmlTemplateindex = require('./index.string');*/

var _page = {
  init : function(){
   this.onLoad();
   },
  onLoad : function(){
      // 初始化左侧信息
	  navside.init({
	   	name : 'about'
	   });

  }


};
$(function(){
	_page.init();
})

