const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const fs = require('fs');
const babelrc = require('./babel.config.js').dev_server;

module.exports = {
    // in order to ignore built-in modules like path, fs, etc.
    target: 'node',
    cache: true,
    debug: true,
    entry: './src/server/index',
    output: {
        path: path.join(__dirname, './dist'),
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
