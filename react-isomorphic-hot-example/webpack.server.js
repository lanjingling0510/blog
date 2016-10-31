var webpack       = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path          = require("path");
var fs            = require("fs");
var babelrc = require('./babel.config.js').production_server;

var commond = process.env.npm_lifecycle_event;
var __DEV_HOST__ = commond === 'dev-server';

module.exports = {
	// in order to ignore built-in modules like path, fs, etc.
	target:  "node",
	cache:   false,
	debug:   false,
	entry:   ["./src/server/index"],
	output:  {
		path:          path.join(__dirname, "./dist"),
		filename:      "server.js",
		publicPath: '/dist/',
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false, __DEV_HOST__: __DEV_HOST__}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}})
	],
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loader: 'url?limit=10000', exclude: /node_modules/},
			{
		      test: /\.jsx?$/,
		      exclude: /node_modules/,
		      loader: 'babel',
			  query: babelrc,
		  	}
		],
		noParse: /\.min\.js/
	},
	// in order to ignore all modules in node_modules folder
	externals: [nodeExternals()],
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
		fs:        "empty"
	}
};
