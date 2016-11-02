const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const validate = require('webpack-validator');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const AssetsPlugin = require('assets-webpack-plugin');
const babelrc = require('./babel.config.js').dev_client;

const config = {
    target: 'web',
	devtool: 'eval',
    entry: {
        vendor: [
            'react',
			'react-dom'
        ],
        home: './src/client/home',
        account: './src/client/account'
    },
    output: {
        path: path.join(__dirname, './static/dist'),
        filename: '[name].js',
        chunkFilename: '[name].min.js',
        publicPath: 'http://0.0.0.0:8080/dist/'
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
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: babelrc
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __PRODUCTION__: false,
            __DEV__: true,
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			minChunks: Infinity
		}),
        new webpack.HotModuleReplacementPlugin(),
        new AssetsPlugin({
			filename: 'stats.generated.json',
			path: path.join(__dirname),
		}),
        //提取Loader定义到同一地方
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
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

Object.keys(config.entry).forEach((key) => {
    const _entry = config.entry[key];
    if (key === 'vendor') return;
    config.entry[key] =
	[
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		'webpack/hot/only-dev-server',
		_entry
	];
});

//用于webpack配置验证
module.exports = validate(config);
