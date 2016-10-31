var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var validate = require("webpack-validator"); //用于webpack配置验证
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var babelrc = require('./babel.config.js').dev_client;

var config = {
	target:  "web",
	entry: {
		vendor: ['react', 'react-dom', 'isomorphic-fetch', 'material-ui'],
		home: './src/client/home',
		applist: './src/client/applist',
		toplist: './src/client/toplist',
		appdetail: './src/client/appdetail',
		keywords_optimization: './src/client/keywords_optimization',
		keywords_analysis: './src/client/keywords_analysis',
		keywords_rank: './src/client/keywords_rank',
		keywords_excavation: './src/client/keywords_excavation',
		keywords_hot_compare: './src/client/keywords_hot_compare',
		keywords_hot: './src/client/keywords_hot',
		keywords_hot_detail: './src/client/keywords_hot_detail',
		keywords_monitor: './src/client/keywords_monitor',
		apps_monitor: './src/client/apps_monitor',
		comments_monitor: './src/client/comments_monitor',
		account: './src/client/account',
		login: './src/client/login',
		register: './src/client/register',
		forgetPassword: './src/client/forgetPassword',
		active_verify: './src/client/active_verify',
		reset_verify: './src/client/reset_verify',
		superwords_share: './src/client/superwords_share',
		contact: './src/client/contact',
		invite: './src/client/invite',
		notFound: './src/client/notFound',
		feedback: './src/client/feedback',
	},
	output:  {
		path:          path.join(__dirname, "./static/dist"),
		filename:      "[name].js",
		chunkFilename: "[name].min.js",
		publicPath: 'http://0.0.0.0:8080/dist/',
	},
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{ test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=10000' },
			{test: /\.css$/, loader: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader: ['css', 'postcss'],
			})},
			{
	          test: /\.jsx?$/,
	          exclude: /node_modules/,
	          loader: 'babel-loader',
	          query: babelrc,
	        }
		],
		noParse: /\.min\.js/
	},
	plugins: [
		new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __PRODUCTION__: false,
            __DEV__: true,
            __DEV_HOST__: true,
            "process.env": {NODE_ENV: '"development"'},
        }),
		new ExtractTextPlugin('[name].css'),
		new CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			minChunks: Infinity,
		}),
		new webpack.HotModuleReplacementPlugin(),
		//提取Loader定义到同一地方
		new webpack.LoaderOptionsPlugin({
		  minimize: false,
		  debug: true,
		  devtool: 'eval',
		  options: {
			context: '/',
			postcss: function (webpack) {
				return [
					require("postcss-import")({
						onImport: function (files) {
							files.forEach(this.addDependency);
						}.bind(this),
					}),
					require("postcss-url")(),
					require("postcss-cssnext")({
						browsers: [
							'ie >= 9',
				            'ie_mob >= 10',
				            'ff >= 30',
				            'chrome >= 33',
				            'safari >= 6',
				            'opera >= 23',
				            'ios >= 7',
				            'android >= 4.4',
				            'bb >= 10'
						]
					}),
					require("postcss-nested")(),
				];
			}
		  }
		}),
		function(compiler) {
			this.plugin("done", function(stats) {
				const fs = require("fs");
				const url = path.join(__dirname, "stats.generated.json");
				fs.writeFileSync(url, JSON.stringify(stats.toJson().assetsByChunkName));
			});
		}
	],
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"static"
		],
		extensions: ["", ".json", ".js", ".jsx"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};


Object.keys(config.entry).forEach((key) => {
	const _entry = config.entry[key];
	if (key === 'vendor') return;
	config.entry[key] = [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		'webpack/hot/only-dev-server',

		_entry,
	];
});

module.exports = validate(config);
