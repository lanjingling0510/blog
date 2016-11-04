
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.client-dev.js');

const wds = {
    hostname: '127.0.0.1',
    port: 8080,
};

const compiler = webpack(webpackConfig);
const bundler = new WebpackDevServer(compiler, {
    noInfo: true,
    hot: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: 'http://' + wds.hostname + ':' + wds.port + '/dist/',
    stats: {
        colors: true
    }
});

bundler.listen(wds.port, wds.hostname, () => {
    console.log('✅  client server start, port is %s', '8080');
});

compiler.plugin('done', () => {
    console.log('🚀 😝  Build client bundle done.');
    require('./server.js');
});
