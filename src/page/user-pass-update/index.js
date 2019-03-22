require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var _mm =  require('util/mm.js');
var _user =  require('service/user-service.js');

var _page = {
  init : function(){
   this.onLoad();
   this.bindEvent();
   },
  onLoad : function(){
      // 初始化左侧信息
    navside.init({
      name : 'user-pass-update'
     });
  
  },
  bindEvent : function(){
    var _this= this;
    $(document).on('click','#btn-submit',function(){
       _this.submit();
    })
   
  },
  submit : function(){
    var formData = {
        password         : $.trim($('#password').val()),
        passwordNew      : $.trim($('#passwordNew').val()),
        passwordConfirm  : $.trim($('#password-confirm').val()),
       };
      var vaildateResult = this.vaildate(formData);
       if(vaildateResult.status){
        _user.resetPassword({
          passwordOld : formData.password,
          passwordNew : formData.passwordNew
        },function(res,msg){
          _mm.successTips(msg);
        },function(msg){
          _mm.errorTips(msg);
        })
       }else{
          _mm.errorTips(vaildateResult.msg);

       }
  },
  // 验证注册字段
  vaildate : function(formData){
      var result = {
        status : false,
        msg    : ''
      };
    

      if(!_mm.validata(formData.password,'require')){
        result.msg = '原密码不能为空';
        return result;
      };
      if(!formData.passwordNew || formData.passwordNew.length < 6){
        result.msg = '新密码长度不能小于6位';
        return result;
      };
      if(formData.passwordNew  !== formData.passwordConfirm){
        result.msg = '两次密码输入不一致';
        return result;
      };
      result.status = true;
      result.msg = '验证通过';
      return result;
  },



};
$(function(){
  _page.init();
})

