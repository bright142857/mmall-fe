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
  data : {
    username    : '',
    question    : '',
    answer      : '',
    forgetToken : ''
  },
  init : function(){
   // 显示第一步
   this.onLoadSeptUserName();
   this.bindEvent();
  },
  bindEvent   :   function(){
  	var _this = this;
    // 第一步获取找回密码提示问题
    $('#submit-username').click(function(){
      var username = $.trim($('#username').val());
      if(!!username){
       _user.forgetGetQuestion(username,function(res){
        _this.data.username = username;
        _this.data.question = res;
        _this.onLoadSeptQuestion();
       },function(errMsg){
        formMsg.show(errMsg);
       })
      }
      else{
        formMsg.show('请输入用户名');
      }
    });
    // 第二步提交问题答案
    $('#submit-question').click(function(){
      var answer = $.trim($('#answer').val());
      if(!!answer){
       _user.forgetCheckAnswer({
        username : _this.data.username,
        question : _this.data.question,
        answer   : answer
       },function(res){
        _this.data.forgetToken = res;
        _this.onLoadSeptPassWord();
       },function(errMsg){
        formMsg.show(errMsg);
       })
      }
      else{
        formMsg.show('请输入答案');
      }
    });
     // 第三步提交新密码
    $('#submit-password').click(function(){
      var password = $.trim($('#password').val());
      if(!!password && password.length >= 6){
       _user.forgetResetPassword({
        username : _this.data.username,
        forgetToken : _this.data.forgetToken,
        passwordNew   : password
       },function(res){
         window.location.href='./result.html?type=pass-reset'
       },function(errMsg){
        formMsg.show(errMsg);
       })
      }
      else{
        formMsg.show('密码不能小于六位');
      }
    })
  	
  },
  // 第一步
  onLoadSeptUserName : function(){
    $('.user-step-username').show();
  },
  // 第二步
  onLoadSeptQuestion : function(){
    // 隐藏错误提示
    formMsg.hide();
    $('.user-step-username').hide()
      .siblings('.user-step-qusetion').show()
      .find('.question').text(this.data.question);
  },
  // 第三步
  onLoadSeptPassWord : function(){
     formMsg.hide();
    $('.user-step-qusetion').hide()
      .siblings('.user-step-password').show();
  },
  

 
};



$(function(){
	_page.init();
});
