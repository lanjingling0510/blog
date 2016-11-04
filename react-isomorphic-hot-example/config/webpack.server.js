const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const babelrc = require('../babel.config.js').production_server;
const ROOT_PATH = process.cwd();

module.exports = {
    // in order to ignore built-in modules like path, fs, etc.
    target: 'node',
    cache: false,
    debug: false,
    context: ROOT_PATH + '/src',
    entry: './server/index',
    output: {
        path: ROOT_PATH + '/dist',
        filename: 'server.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.DefinePlugin({
			__CLIENT__: false,
			__SERVER__: true,
			__PRODUCTION__: true,
			__DEV__: false,
			'process.env': {
                NODE_ENV: '"production"'
            }
		}),
    ],
    module: {
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json']
            }, {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loader: 'url?limit=10000',
                exclude: /node_modules/
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelrc
            }
        ],
    },
    // in order to ignore all modules in node_modules folder
    externals: [nodeExternals()],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.json', '.js', '.jsx']
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
