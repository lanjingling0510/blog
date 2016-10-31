var webpack       = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path          = require("path");
var fs            = require("fs");
var babelrc = require('./babel.config.js').dev_server;


module.exports = {
	// in order to ignore built-in modules like path, fs, etc.
	target:  "node",
	cache:   true,
	debug:   true,
	entry:   ["webpack/hot/poll?1000", "./src/server/index"],
	output:  {
		path:          path.join(__dirname, "./dist"),
		filename:      "server.js",
		publicPath: 'http://0.0.0.0:8080/dist/',
		libraryTarget: 'commonjs2',
	},
	plugins: [
		new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: false,
            __DEV__: true,
            __DEV_HOST__: true,
            "process.env": {NODE_ENV: '"development"'},
        }),
		new webpack.HotModuleReplacementPlugin(),
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
	externals: [nodeExternals({
		whitelist: ["webpack/hot/poll?1000"]
	})],
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
