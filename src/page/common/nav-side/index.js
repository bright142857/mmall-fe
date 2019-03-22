/**
 * @author wangmingliangwx
 * @Email  bright142857@foxmail.com
 * @version : index, v 0.1 2018/9/2 16:42 wangmingliangwx Exp$
 */

'use strict'
require('./index.css');
var _mm           = require('util/mm.js');
var templateIndex = require('./index.string');

//导航
var _navside={
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
    init : function (option) {
            //拷贝
            $.extend(this.option,option);
            this.renderNav();
    },
    renderNav : function () {
        //计算active的数据
        var  iLength = this.option.navList.length;
        for(var i = 0; i < iLength;i++) {
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        var resulrHtml = _mm.renderHtml(templateIndex,{
            navList : this.option.navList
        });

        $('.nav-side').html(resulrHtml);
    }
};
module.exports = _navside;