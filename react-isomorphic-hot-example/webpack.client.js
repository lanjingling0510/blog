const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const babelrc = require('./babel.config.js').production_client;

module.exports = {
    target: 'web',
    cache: false,
    devtool: false,
    entry: {
        vendor: [
            'react', 'react-dom'
        ],
        home: './src/client/home',
        account: './src/client/account'
    },
    output: {
        path: path.join(__dirname, './static/dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].min.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json']
            }, {
                test: /\.(png|jpg|jpeg|gif|webp)$/i,
                loader: 'url?limit=10000'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css', 'postcss']
                })
            }, {
                test: /\.jsx?$/,
                loaders: ['babel'],
                query: babelrc,
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: true,
			__DEV__: false,
			'process.env': {
                NODE_ENV: '"production"'
            }
		}),
        new CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
			minChunks: Infinity
		}),
        new DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new AssetsPlugin({
			filename: 'stats.generated.json',
			path: path.join(__dirname),
		}),
        //提取Loader定义到同一地方
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: '/',
                postcss: function(webpack) {
                    return [
                        require('postcss-import')({
                            onImport: function(files) {
                                files.forEach(this.addDependency);
                            }.bind(this)
                        }),
                        require('postcss-url')(),
                        require('postcss-cssnext')({
                            browsers: ['Chrome >= 34', '> 5%', 'last 5 versions']
                        }),
                        require('postcss-nested')()
                    ];
                }
            }
        }),
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.json', '.js', '.jsx']
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
