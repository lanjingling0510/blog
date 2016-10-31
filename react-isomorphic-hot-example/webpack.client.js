var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commond = process.env.npm_lifecycle_event;
var DEV_HOST = commond === 'dev-client';
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var babelrc = require('./babel.config.js').production_client;

module.exports = {
	target:  "web",
	cache:   false,
	debug:   false,
	devtool: false,
	entry: {
		vendor: ['react', 'react-dom', 'isomorphic-fetch', 'material-ui'],
		home: path.resolve('./src/client/home'),
		applist: path.resolve('./src/client/applist'),
		toplist: path.resolve('./src/client/toplist'),
		appdetail: path.resolve('./src/client/appdetail'),
		keywords_optimization: path.resolve('./src/client/keywords_optimization'),
		keywords_analysis: path.resolve('./src/client/keywords_analysis'),
		keywords_rank: path.resolve('./src/client/keywords_rank'),
		keywords_excavation: path.resolve('./src/client/keywords_excavation'),
		keywords_hot_compare: path.resolve('./src/client/keywords_hot_compare'),
		keywords_hot: path.resolve('./src/client/keywords_hot'),
		keywords_hot_detail: path.resolve('./src/client/keywords_hot_detail'),
		keywords_monitor: path.resolve('./src/client/keywords_monitor'),
		apps_monitor: path.resolve('./src/client/apps_monitor'),
		comments_monitor: path.resolve('./src/client/comments_monitor'),
		account: path.resolve('./src/client/account'),
		login: path.resolve('./src/client/login'),
		register: path.resolve('./src/client/register'),
		forgetPassword: path.resolve('./src/client/forgetPassword'),
		active_verify: path.resolve('./src/client/active_verify'),
		reset_verify: path.resolve('./src/client/reset_verify'),
		superwords_share: path.resolve('./src/client/superwords_share'),
		contact: path.resolve('./src/client/contact'),
		invite: path.resolve('./src/client/invite'),
		notFound: path.resolve('./src/client/notFound'),
		feedback: path.resolve('./src/client/feedback'),
	},
	output:  {
		path:          path.join(__dirname, "./static/dist"),
		filename:      "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].min.js",
		publicPath: '/dist/',
	},
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{ test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=10000' },
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css', 'postcss'],
				})
			},
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				query: babelrc,
				exclude: /node_modules/
			}
		],
		noParse: /\.min\.js/
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: true,
			__DEV__: false,
			__DEV_HOST__: DEV_HOST
		}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		new CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
			minChunks: Infinity
		}),
		new DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new ExtractTextPlugin('[name].[contenthash].css'),
		//提取Loader定义到同一地方
	    new webpack.LoaderOptionsPlugin({
	      minimize: true,
	      debug: false,
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
				require("fs").writeFileSync(path.join(__dirname, "stats.generated.json"), JSON.stringify(stats.toJson().assetsByChunkName));
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
