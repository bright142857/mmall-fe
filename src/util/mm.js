var Hogan = require('hogan.js');

var conf = {
    serveHost: ''
};
var _mm = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            url: param.url || '',
            type: param.method || 'get',
            data: param.data || '',
            dataType: param.type || 'json',
            async: param.async || 'true',
            success: function (res) {
                //请求成功并返回正确数据
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //无登录状态，强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })

    },
    //获取服务器地址
    getServiceUrl: function (path) {
        return conf.serveHost + path;
    },
    //获取url参数
    getUrlParam: function (name) {
      var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '哪里不对了！');
    },
    //字段的验证,支持非空 ,手机,邮箱的判断
    validata: function (value, type) {
        var value = $.trim(value);
        //非空
        if ('require' == type) {
            return !!value;   //取两次反  return !!value;与return Boolean(); 一个意思
        };
        //手机号
        if ('phone' == type){
            return /^1[3|4|5|6|7|8][0-9]{9}$/.test(value);
        };
        //邮箱
        if ('email' == type) {
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
        };
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);    },
    goHome : function () {
        window.location.href = './index.html';
    }


};

module.exports = _mm;