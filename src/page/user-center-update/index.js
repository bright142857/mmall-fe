require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var _mm =  require('util/mm.js');
var _user =  require('service/user-service.js');
var htmlTemplateindex = require('./index.string');

var _page = {
  init : function(){
   this.onLoad();
   this.bindEvent();
   },
  onLoad : function(){
      // 初始化左侧信息
    navside.init({
      name : 'user-center'
     });
    // 加载用户信息
    this.loadUserInfo();
  },
  loadUserInfo : function(){
    var userHtml = '';
    _user.getInformation(function(res){
      userHtml =  _mm.renderHtml(htmlTemplateindex,res);
      $('.panel-body').html(userHtml);
    },function(errMsg){
      _mm.errorTips(errMsg);
    })
  },
  bindEvent : function(){
    var _this= this;
    $(document).on('click','#btn-submit',function(){
       _this.submit();
    })
   
  },
  submit : function(){
    var formData = {
        email         : $.trim($('#email').val()),
        phone         : $.trim($('#phone').val()),
        question        : $.trim($('#question').val()),
        answer          : $.trim($('#answer').val())
       };
      var vaildateResult = this.vaildate(formData);
       if(vaildateResult.status){
        _user.updateInformation(formData,function(res,msg){
          _mm.successTips(msg);
          window.location.href='./user-center.html';
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
  _page.init();
})

