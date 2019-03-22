require('page/common/nav-simple/index.js');
require('./index.css');
var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');

var   formMsg =  {
	show : function(msg){
		$('.error-item').show().find('.err-msg').text(msg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

 var _page = {
  init : function(){
   this.bindEvent();
  },
  bindEvent   :   function(){
  	var _this = this;
  	$('#submit').click(function(){
     	_this.submit();
     });
     $('.user-content').keyup(function(e){
     	//点击灰车触发提交
     	if(e.keyCode === 13){
     		_this.submit();
     	}
     })
  },
  submit :  function(){
  	var formData = {
     	username : $.trim($('#username').val()),
     	password  : $.trim($('#password').val())
     };
     var vaildateResult = this.vaildate(formData);
     if(vaildateResult.status){
     	_user.login(formData,function(err){
         window.location.href = _mm.getUrlParam('redirect') || './index.html';
     	},function(msg){
     		formMsg.show(msg);
     	})
     }else{
     	formMsg.show(vaildateResult.msg);
     }
  },

  vaildate : function(formData){
      var result = {
      	status : false,
      	msg	   : ''
      };
      if(!_mm.validata(formData.username,'require')){
      	result.msg = '用户名不能为空';
      	return result;
      };
       if(!_mm.validata(formData.password,'require')){
      	result.msg = '密码不能为空';
      	return result;
      }
      result.status = true;
      result.msg = '验证通过';
      return result;
  },

 
};



$(function(){
	_page.init();
});
