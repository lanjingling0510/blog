const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const babelrc = require('../babel.config.js').dev_server;
const ROOT_PATH = process.cwd();

module.exports = {
    // in order to ignore built-in modules like path, fs, etc.
    target: 'node',
    devtool: 'source-map',
    context: ROOT_PATH + '/src',
    entry: './server/index',
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
        // 在服务器端添加source-map支持
        new webpack.BannerPlugin({
          raw: true,
          banner: 'require("source-map-support").install();'
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
    externals: [nodeExternals({})],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.json', '.js', '.jsx']
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
