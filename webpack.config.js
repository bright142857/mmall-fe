var  webpack            =  require('webpack'); // 加载webpack,通用模块用到
var ExtractTextPlugin   =  require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin   =  require('html-webpack-plugin'); // html的loader



// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev_win';


// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',  // 源文件
        filename    : 'view/' + name + '.html', // 生成html文件的文件名，默认是index.html
        favicon     : './favicon.ico', // 生成html的图标
        title       : title,  // 生成html文件的标题
        /**
           inject有四个值： true body head false
           true 默认值，script标签位于html文件的 body 底部
           body script标签位于html文件的 body 底部
           head script标签位于html文件的 head中
           false 不插入生成的js文件，这个几乎不会用到的

        */
        inject      : true,
        hash        : true,  // 版本号
        /**
             chunks主要用于多入口文件，当你有多个入口文件，
             那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
             'common' 是通用js
        **/
        chunks      : ['common', name]
    };
};
// webpack config
var config = {
  /**
    入口 应用程序最先读取的源文件
     告诉webpack从哪里开始打包
  */
	entry : {
      'common': ['./src/page/common/index.js'],
      'index': ['./src/page/index/index.js'],
      'user-login': ['./src/page/user-login/index.js'],
      'list': ['./src/page/list/index.js'],
      'detail': ['./src/page/detail/index.js'],
      'cart': ['./src/page/cart/index.js'],
      'order-confirm': ['./src/page/order-confirm/index.js'],
      'order-list': ['./src/page/order-list/index.js'],
      'order-detail': ['./src/page/order-detail/index.js'],
      'payment': ['./src/page/payment/index.js'],
      'user-register': ['./src/page/user-register/index.js'],
      'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
      'user-pass-update': ['./src/page/user-pass-update/index.js'],
      'user-center': ['./src/page/user-center/index.js'],
      'user-center-update': ['./src/page/user-center-update/index.js'],
      'result': ['./src/page/result/index.js'],
      'about': ['./src/page/about/index.js']
	},
  /**
    输出 告诉webpack怎么对待这些打包的代码
  */
	output : {
		  path : __dirname + '/dist',   // 输出路径 通常是绝对路径。
      //虚拟路径  如果配置了publicPath属性,那么本地资源路径,都会被替换成publicPath所指定的地址
    	publicPath : 'dev_win' === WEBPACK_ENV ? '/dist/' : '//s.bright.wang/mmall-fe/dist/',
    	filename : 'js/[name].js'  // 文件名  多个文件的时候,可以用变量[name]代替固定的名字
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
  // 加载器
	module : {
		loaders :[
		      //css
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          //url loader
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
		     {
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
	},
	resolve : {
    //
		alias : {
            // __dirname : 表示当前根目录
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
		}
	},
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://localhost:8080/',
                // target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    },


  // 插件
	plugins : [
		     // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
	     	// 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '我的订单')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果提示')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall'))
		]

};


if (WEBPACK_ENV === 'dev_win') {
   config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
};


module.exports=config;
