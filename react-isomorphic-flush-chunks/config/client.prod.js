const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_PATH = process.cwd();

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [/node_modules/, path.resolve(ROOT_PATH, 'src', 'style')],
        use: ExtractCssChunks.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: { config: { path: path.join(__dirname, 'postcss.config.js') } }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(ROOT_PATH, 'src', 'components'),
          path.resolve(ROOT_PATH, 'src', 'page'),
          path.resolve(ROOT_PATH, 'src', 'layout')
        ],
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: { config: { path: path.join(__dirname, 'postcss.config.js') } }
            }
          ]
        })
      },

      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),

    // 复制静态文件到build目录下
    CopyWebpackPlugin([{ from: `${ROOT_PATH}/src/image/favicon.png` }]),


    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    })
  ]
};
