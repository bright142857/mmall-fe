/**
 * @author wangmingliangwx
 * @Email  bright142857@foxmail.com
 * @version : index, v 0.1 2018/9/2 14:40 wangmingliangwx Exp$
 */

'use strict'
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header={
    init : function () {
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function () {
      //如果有keyword回填
      var keyword = $.trim(_mm.getUrlParam('keyword'));
      if(keyword){
          $('#search-input').val(keyword);
      }
    },
    bindEvent : function () {
        var _this = this;
        //点击搜索按钮提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        })
        //输入回车后做提交操作
        $('#search-input').keyup(function (e) {
            if(e.keyCode == 13){
                _this.searchSubmit();
            }
        })
    },
    searchSubmit : function () {
        var keyword = $.trim( $('#search-input').val());
        if (keyword){
            window.location.href='./list.html?keyword='+keyword;
        }else {
            _mm.goHome();
        }

    }
};
header.init();
    