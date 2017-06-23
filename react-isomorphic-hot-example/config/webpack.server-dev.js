const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const fs = require('fs');
const babelrc = require('../babel.config.js').dev_server;
const ROOT_PATH = process.cwd();

module.exports = {
    // in order to ignore built-in modules like path, fs, etc.
    target: 'node',
    devtool: 'source-map',
    entry: './src/server/index',
    output: {
        path: ROOT_PATH + '/dist',
        filename: 'server.js',
        publicPath: 'http://127.0.0.1:8080/dist/',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: false,
            __DEV__: true,
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),

        // NOTE: 在服务器端添加source-map支持
        new webpack.BannerPlugin({
          raw: true,
          banner: 'require("source-map-support").install();'
        }),

        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }),

        // The FriendlyErrorsWebpackPlugin (when combined with source-maps)
        // gives Backpack its human-readable error messages.
        new FriendlyErrorsWebpackPlugin(),
        // This plugin is awkwardly named. It does not actually swallow errors.
        // Instead, it just prevents Webpack from printing out compile time
        // stats to the console.
        new webpack.NoEmitOnErrorsPlugin()
    ],

    resolveLoader: {
      moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loader: 'url?limit=10000',
                exclude: /node_modules/
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                options: babelrc
            }
        ],
    },

    // in order to ignore all modules in node_modules folder
    externals: [nodeExternals({})],

	resolve: {
      modules: ['node_modules'],
      extensions: [
        '.json', '.js', '.jsx',
      ],
    },

    node: {
        __dirname: true,
		fs: 'empty',
	    net: 'empty',
	    tls: 'empty'
    },
};
