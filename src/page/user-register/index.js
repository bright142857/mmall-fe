/**
 * @author wangmingliangwx
 * @Email  bright142857@foxmail.com
 * @version : index, v 0.1 2018/9/12 16:16 wangmingliangwx Exp$
 */
require('page/common/nav-simple/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var  butOper = {
	show : function(){
		$('#submit').prop('disabled',false);
	},
	hide : function(){
		$('#submit').prop('disabled',true);
	}

};
var   formMsg =  {
	show : function(msg){
		$('.error-item').show().find('.err-msg').text(msg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

var _register = {
	init : function(){
		this.bindEvent();
	},
	// 绑定事件
	bindEvent : function(){
		var _this = this;
		// 检查用户名
		$('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){return false;}
            _this.checkValid({
            	str  : username,
            	type : 'username'
            })
		});
		// 检查邮箱
		$('#email').blur(function(){
            var email = $.trim($(this).val());
            if(!email){return false;}
            _this.checkValid({
            	str  : email,
            	type : 'email'
            })
		});

	  	$('#submit').click(function(){
	     	_this.submit();
	     });
	     $('.user-content').keyup(function(e){
	     	//点击回车触发提交
	     	if(e.keyCode === 13){
	     		_this.submit();
	     	}
	     })
	},
	// 检查用户名或邮箱是否有效
	checkValid : function(obj){
		_user.checkValid(obj,function(){
			// 信息提示
			formMsg.hide();
			// 按钮失效
			butOper.hide();
		},function(err){
			formMsg.show(err);
			butOper.show();
		})
	},
	submit :  function(){
	  	var formData = {
	     	username 		  : $.trim($('#username').val()),
	     	password  		  : $.trim($('#password').val()),
	     	passwordConfirm   : $.trim($('#password-confirm').val()),
	     	email  			  : $.trim($('#email').val()),
	     	phone  			  : $.trim($('#phone').val()),
	     	question  		  : $.trim($('#question').val()),
	     	answer		  	  : $.trim($('#answer').val())
	     };
	    var vaildateResult = this.vaildate(formData);
	     if(vaildateResult.status){
	     	_user.register(formData,function(res){
	         window.location.href = './result.html?type=register';
	     	},function(msg){
	     		formMsg.show(msg);
	     	})
	     }else{
	     	formMsg.show(vaildateResult.msg);

	     }
  },
	// 验证注册字段
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
      };
      if(formData.password.length < 6 || formData.passwordConfirm.length < 6){
      	result.msg = '密码不能小于6位';
      	return result;
      };
      if(formData.password !== formData.passwordConfirm){
      	result.msg = '两次密码输入不一致';
      	return result;
      };

      if(!_mm.validata(formData.email,'email')){
      	result.msg = '邮箱格式不正确';
      	return result;
      };
      
      if(!_mm.validata(formData.phone,'phone')){
      	result.msg = '手机号无效';
      	return result;
      };
      if(!_mm.validata(formData.question,'require')){
      	result.msg = '找回密码问题不能为空';
      	return result;
      };
      if(!_mm.validata(formData.answer,'require')){
      	result.msg = '密码问题答案不能为空';
      	return result;
      };
      result.status = true;
      result.msg = '验证通过';
      return result;
  },
	
};


$(function(){
	_register.init();
})